'use client'

import '@/styles/consultation-modal.css'
import { ChevronDown, ClockIcon, SendIcon, ShieldCheck } from '@/components/ui/Icons'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'

export type ConsultationLocale = 'ar' | 'en'
type Status = 'idle' | 'success' | 'error'

type ConsultationFormProps = {
  locale: ConsultationLocale
  variant?: 'modal' | 'page'
  onSubmittingChange?: (isSubmitting: boolean) => void
}

const MAX_ATTACHMENT_SIZE = 4 * 1024 * 1024
const ALLOWED_ATTACHMENT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const specializations = [
  { value: 'commercial', ar: 'القضايا التجارية', en: 'Commercial Law' },
  { value: 'corporate', ar: 'الشركات والعقود', en: 'Corporate & Contracts' },
  { value: 'real-estate', ar: 'القضايا العقارية', en: 'Real Estate' },
  { value: 'labor', ar: 'القضايا العمالية', en: 'Labor Law' },
  { value: 'family', ar: 'الأحوال الشخصية', en: 'Family Law' },
  { value: 'arbitration', ar: 'التحكيم', en: 'Arbitration' },
  { value: 'other', ar: 'تخصص آخر', en: 'Other' },
]

const consultationTypes = [
  { value: 'phone', ar: 'استشارة هاتفية', en: 'Phone Consultation' },
  { value: 'online', ar: 'استشارة أونلاين', en: 'Online Consultation' },
  { value: 'office', ar: 'زيارة المكتب', en: 'Office Visit' },
]

const times = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

export const consultationTranslations = {
  ar: {
    trigger: 'احجز استشارتك',
    badge: 'استشارة قانونية',
    title: 'احجز',
    highlight: 'استشارتك المجانية',
    description:
      'املأ البيانات التالية وسيتواصل معك فريقنا لتأكيد الموعد. الجلسة الأولى للتقييم المبدئي مجانية بالكامل.',
    contact: 'بيانات التواصل',
    appointment: 'تفاصيل الاستشارة',
    case: 'تفاصيل القضية',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    city: 'المدينة',
    specialization: 'التخصص المطلوب',
    type: 'نوع الاستشارة',
    date: 'التاريخ المفضل',
    time: 'الوقت المفضل',
    summary: 'ملخص القضية',
    attachment: 'إرفاق ملف أو صورة',
    attachmentHint: 'PDF أو Word أو JPG أو PNG أو WebP — بحد أقصى 4MB',
    attachmentSizeError: 'حجم الملف أكبر من 4MB.',
    attachmentTypeError: 'نوع الملف غير مدعوم. اختر صورة أو ملف PDF أو Word.',
    namePlaceholder: 'أدخل اسمك الرباعي',
    phonePlaceholder: '05xxxxxxxx',
    emailPlaceholder: 'name@example.com',
    cityPlaceholder: 'الرياض',
    summaryPlaceholder: 'اشرح لنا طبيعة القضية أو الاستشارة المطلوبة بإيجاز...',
    choose: 'اختر من القائمة',
    submit: 'إرسال طلب الاستشارة',
    sending: 'جاري إرسال الطلب...',
    success: 'تم إرسال طلبك بنجاح. سيتواصل معك فريقنا لتأكيد الموعد.',
    error: 'تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.',
    close: 'إغلاق',
    privacy: 'بياناتك محمية وتُعامل بسرية تامة',
    confirmation: 'الموعد يخضع لتأكيد فريق العمل',
    optional: 'اختياري',
  },
  en: {
    trigger: 'Book a Consultation',
    badge: 'LEGAL CONSULTATION',
    title: 'Book Your',
    highlight: 'Free Consultation',
    description:
      'Complete the form and our team will contact you to confirm your appointment. The initial assessment is complimentary.',
    contact: 'Contact Information',
    appointment: 'Consultation Details',
    case: 'Case Details',
    name: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    city: 'City',
    specialization: 'Legal Specialization',
    type: 'Consultation Type',
    date: 'Preferred Date',
    time: 'Preferred Time',
    summary: 'Case Summary',
    attachment: 'Attach a file or image',
    attachmentHint: 'PDF, Word, JPG, PNG, or WebP — up to 4MB',
    attachmentSizeError: 'The file is larger than 4MB.',
    attachmentTypeError: 'Unsupported file type. Choose an image, PDF, or Word document.',
    namePlaceholder: 'Enter your full name',
    phonePlaceholder: '+966 5xxxxxxxx',
    emailPlaceholder: 'name@example.com',
    cityPlaceholder: 'Riyadh',
    summaryPlaceholder: 'Briefly describe your legal inquiry...',
    choose: 'Select an option',
    submit: 'Submit Consultation Request',
    sending: 'Submitting request...',
    success: 'Your request was submitted successfully. Our team will contact you to confirm.',
    error: 'Unable to submit your request. Please try again.',
    close: 'Close',
    privacy: 'Your information is handled confidentially',
    confirmation: 'Appointments require confirmation',
    optional: 'Optional',
  },
} as const

function SectionHeading({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/25 bg-[#C9A96E]/10 text-xs font-bold text-[#D9B36A]">
        {number}
      </span>
      <h3 className="text-sm font-bold text-white sm:text-base">{children}</h3>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}

function Field({
  label,
  children,
  optional,
  optionalText,
}: {
  label: string
  children: ReactNode
  optional?: boolean
  optionalText?: string
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2.5 flex items-center gap-1 text-[13px] font-medium text-white/85">
        {label}
        {optional ? (
          <span className="ms-1 text-[11px] text-white/35">({optionalText})</span>
        ) : (
          <span className="text-[#C9A96E]">*</span>
        )}
      </span>
      {children}
    </label>
  )
}

export default function ConsultationForm({
  locale,
  variant = 'page',
  onSubmittingChange,
}: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [minDate] = useState(() => {
    const now = new Date()
    return [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-')
  })
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [fileError, setFileError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const t = consultationTranslations[locale]

  const updateSubmitting = (value: boolean) => {
    setIsSubmitting(value)
    onSubmittingChange?.(value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    const formData = new FormData(event.currentTarget)
    const attachment = formData.get('attachment')

    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_ATTACHMENT_SIZE) {
        setFileError(t.attachmentSizeError)
        return
      }

      if (!ALLOWED_ATTACHMENT_TYPES.has(attachment.type)) {
        setFileError(t.attachmentTypeError)
        return
      }
    }

    const payload = {
      fullName: String(formData.get('fullName') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      city: String(formData.get('city') || '').trim(),
      specialization: String(formData.get('specialization') || ''),
      consultationType: String(formData.get('consultationType') || ''),
      preferredDate: String(formData.get('preferredDate') || ''),
      preferredTime: String(formData.get('preferredTime') || ''),
      summary: String(formData.get('summary') || '').trim(),
      locale,
    }
    updateSubmitting(true)
    setStatus('idle')
    setFileError(null)
    try {
      const requestBody = new FormData()
      requestBody.append('_payload', JSON.stringify(payload))

      if (attachment instanceof File && attachment.size > 0) {
        requestBody.append('file', attachment)
      }

      const response = await fetch('/api/consultation-requests', {
        method: 'POST',
        body: requestBody,
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      formRef.current?.reset()
      setSelectedDate('')
      setSelectedTime('')
      setFileError(null)
    } catch {
      setStatus('error')
    } finally {
      updateSubmitting(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={variant === 'modal' ? 'flex min-h-0 flex-1 flex-col' : 'w-full'}
    >
      <div
        className={
          variant === 'modal'
            ? 'consultation-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-10 sm:py-9 lg:px-12'
            : 'p-5 sm:p-7 lg:p-8'
        }
      >
        <div className="space-y-9">
          <section>
            <SectionHeading number="01">{t.contact}</SectionHeading>
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <Field label={t.name}>
                <input
                  name="fullName"
                  required
                  autoComplete="name"
                  maxLength={120}
                  placeholder={t.namePlaceholder}
                  className="consultation-field"
                />
              </Field>
              <Field label={t.phone}>
                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={8}
                  maxLength={20}
                  autoComplete="tel"
                  dir="ltr"
                  placeholder={t.phonePlaceholder}
                  className="consultation-field"
                />
              </Field>
              <Field label={t.email}>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t.emailPlaceholder}
                  className="consultation-field"
                  dir="ltr"
                />
              </Field>
              <Field label={t.city} optional optionalText={t.optional}>
                <input
                  name="city"
                  autoComplete="address-level2"
                  maxLength={100}
                  placeholder={t.cityPlaceholder}
                  className="consultation-field"
                />
              </Field>
            </div>
          </section>
          <section>
            <SectionHeading number="02">{t.appointment}</SectionHeading>
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <Field label={t.specialization}>
                <div className="relative">
                  <select
                    name="specialization"
                    required
                    defaultValue=""
                    className="consultation-field cursor-pointer appearance-none pe-11"
                  >
                    <option value="" disabled>
                      {t.choose}
                    </option>
                    {specializations.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item[locale]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[#C9A96E]"
                  />
                </div>
              </Field>
              <Field label={t.type}>
                <div className="relative">
                  <select
                    name="consultationType"
                    required
                    defaultValue=""
                    className="consultation-field cursor-pointer appearance-none pe-11"
                  >
                    <option value="" disabled>
                      {t.choose}
                    </option>
                    {consultationTypes.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item[locale]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[#C9A96E]"
                  />
                </div>
              </Field>
              <Field label={t.date}>
                <input
                  name="preferredDate"
                  type="date"
                  required
                  min={minDate}
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="consultation-field cursor-pointer [color-scheme:dark]"
                />
              </Field>
              <Field label={t.time}>
                <div className="relative">
                  <select
                    name="preferredTime"
                    required
                    value={selectedTime}
                    onChange={(event) => setSelectedTime(event.target.value)}
                    className="consultation-field cursor-pointer appearance-none pe-11"
                  >
                    <option value="" disabled>
                      {t.choose}
                    </option>
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[#C9A96E]"
                  />
                </div>
              </Field>
            </div>
          </section>
          <section>
            <SectionHeading number="03">{t.case}</SectionHeading>
            <Field label={t.summary}>
              <textarea
                name="summary"
                required
                rows={4}
                maxLength={3000}
                placeholder={t.summaryPlaceholder}
                className="consultation-field min-h-[135px] resize-y py-3 leading-7"
              />
            </Field>
            <Field label={t.attachment} optional optionalText={t.optional}>
              <input
                name="attachment"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                className="consultation-file-input"
                aria-describedby="consultation-attachment-hint"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0]
                  setFileError(null)

                  if (!file) return

                  if (file.size > MAX_ATTACHMENT_SIZE) {
                    setFileError(t.attachmentSizeError)
                    event.currentTarget.value = ''
                    return
                  }

                  if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
                    setFileError(t.attachmentTypeError)
                    event.currentTarget.value = ''
                  }
                }}
              />
              <span
                id="consultation-attachment-hint"
                className={fileError ? 'mt-2 block text-xs text-red-300' : 'mt-2 block text-xs text-white/40'}
                role={fileError ? 'alert' : undefined}
              >
                {fileError || t.attachmentHint}
              </span>
            </Field>
          </section>
          {status !== 'idle' && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl border px-4 py-3 text-center text-sm ${status === 'success' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}
            >
              {status === 'success' ? t.success : t.error}
            </div>
          )}
        </div>
      </div>
      <footer
        className={
          variant === 'modal'
            ? 'shrink-0 border-t border-white/[0.08] bg-[#101A28] px-5 py-4 sm:px-10 sm:py-5 lg:px-12'
            : 'border-t border-white/[0.08] bg-[#0D1724] px-5 py-5 sm:px-7 lg:px-8'
        }
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-2 text-center sm:text-start">
            <div className="flex items-center justify-center gap-2 text-[11px] text-white/60 sm:justify-start">
              <ShieldCheck size={15} className="text-[#C9A96E]" />
              {t.privacy}
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 sm:justify-start">
              <ClockIcon size={15} className="text-[#C9A96E]" />
              {t.confirmation}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || status === 'success'}
            className="flex h-[49px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#E2C48C] via-[#C9A96E] to-[#A27B32] px-7 text-[13px] font-bold text-[#07111E] shadow-[0_8px_28px_rgba(201,169,110,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[230px]"
          >
            {isSubmitting ? (
              <span className="size-4 animate-spin rounded-full border-2 border-[#07111E]/25 border-t-[#07111E]" />
            ) : (
              <SendIcon size={17} />
            )}
            {isSubmitting ? t.sending : t.submit}
          </button>
        </div>
      </footer>
    </form>
  )
}
