import type { ConsultationRequest } from '@/payload-types'
import type { CollectionAfterChangeHook } from 'payload'

const specializationLabels: Record<ConsultationRequest['specialization'], string> = {
  commercial: 'القضايا التجارية',
  corporate: 'الشركات والعقود',
  'real-estate': 'القضايا العقارية',
  labor: 'القضايا العمالية',
  family: 'الأحوال الشخصية',
  arbitration: 'التحكيم',
  other: 'تخصص آخر',
}

const consultationTypeLabels: Record<ConsultationRequest['consultationType'], string> = {
  phone: 'استشارة هاتفية',
  online: 'استشارة أونلاين',
  office: 'زيارة المكتب',
}

const escapeHTML = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const formatDate = (value: string): string => {
  try {
    return new Intl.DateTimeFormat('ar-SA', {
      dateStyle: 'long',
      timeZone: 'Asia/Riyadh',
    }).format(new Date(value))
  } catch {
    return value
  }
}

const buildAdminURL = (id: ConsultationRequest['id']): string | null => {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

  return siteURL ? `${siteURL}/admin/collections/consultation-requests/${id}` : null
}

export const sendConsultationNotification: CollectionAfterChangeHook<ConsultationRequest> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const apiKey = process.env.RESEND_API_KEY
  const sender = process.env.RESEND_FROM_EMAIL
  const recipient = process.env.NOTIFICATION_EMAIL

  if (!apiKey || !sender || !recipient) {
    req.payload.logger.warn(
      'Consultation notification skipped because the Resend environment variables are not fully configured.',
    )
    return doc
  }

  const adminURL = buildAdminURL(doc.id)
  const attachment = doc.filename
    ? `<p style="margin:8px 0"><strong>المرفق:</strong> ${escapeHTML(doc.filename)}</p>`
    : '<p style="margin:8px 0"><strong>المرفق:</strong> لا يوجد</p>'

  try {
    await req.payload.sendEmail({
      from: sender,
      to: recipient,
      replyTo: doc.email,
      subject: `طلب استشارة جديد من ${doc.fullName}`,
      text: [
        'تم استلام طلب استشارة جديد.',
        `الاسم: ${doc.fullName}`,
        `الهاتف: ${doc.phone}`,
        `البريد الإلكتروني: ${doc.email}`,
        `المدينة: ${doc.city || 'غير محددة'}`,
        `التخصص: ${specializationLabels[doc.specialization]}`,
        `نوع الاستشارة: ${consultationTypeLabels[doc.consultationType]}`,
        `الموعد: ${formatDate(doc.preferredDate)} - ${doc.preferredTime}`,
        `ملخص القضية: ${doc.summary}`,
        `المرفق: ${doc.filename || 'لا يوجد'}`,
        adminURL ? `فتح الطلب: ${adminURL}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#172033;line-height:1.8">
          <div style="background:#0d1724;color:#fff;padding:24px;border-radius:16px 16px 0 0">
            <h1 style="margin:0;font-size:22px">طلب استشارة جديد</h1>
            <p style="margin:6px 0 0;color:#d8bd87">تم استلام طلب جديد من خلال موقع YAZ Law</p>
          </div>
          <div style="border:1px solid #e6dfd2;border-top:0;padding:24px;border-radius:0 0 16px 16px">
            <p style="margin:8px 0"><strong>الاسم:</strong> ${escapeHTML(doc.fullName)}</p>
            <p style="margin:8px 0"><strong>الهاتف:</strong> <span dir="ltr">${escapeHTML(doc.phone)}</span></p>
            <p style="margin:8px 0"><strong>البريد الإلكتروني:</strong> ${escapeHTML(doc.email)}</p>
            <p style="margin:8px 0"><strong>المدينة:</strong> ${escapeHTML(doc.city || 'غير محددة')}</p>
            <p style="margin:8px 0"><strong>التخصص:</strong> ${escapeHTML(specializationLabels[doc.specialization])}</p>
            <p style="margin:8px 0"><strong>نوع الاستشارة:</strong> ${escapeHTML(consultationTypeLabels[doc.consultationType])}</p>
            <p style="margin:8px 0"><strong>الموعد المفضل:</strong> ${escapeHTML(formatDate(doc.preferredDate))} — ${escapeHTML(doc.preferredTime)}</p>
            <p style="margin:8px 0"><strong>ملخص القضية:</strong></p>
            <p style="white-space:pre-wrap;background:#f6f3ed;padding:14px;border-radius:10px">${escapeHTML(doc.summary)}</p>
            ${attachment}
            ${
              adminURL
                ? `<a href="${escapeHTML(adminURL)}" style="display:inline-block;margin-top:16px;background:#b58b42;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px">فتح الطلب في لوحة الإدارة</a>`
                : ''
            }
          </div>
        </div>
      `,
    })
  } catch (error) {
    req.payload.logger.error({ err: error }, 'Failed to send consultation notification email.')
  }

  return doc
}
