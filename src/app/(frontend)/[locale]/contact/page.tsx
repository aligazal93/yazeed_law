import ConsultationForm from '@/components/ConsultationForm'
import PageHero from '@/components/layouts/BreadCrumb'
import Container from '@/components/layouts/Container'
import { getSiteSettings } from '@/lib/api'
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from '@/components/ui/Icons'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo'

type Locale = 'ar' | 'en'

const copy = {
  ar: {
    home: 'الرئيسية',
    page: 'اتصل بنا',
    title: 'نسعد بتواصلك معنا',
    description:
      'املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة، أو تواصل معنا مباشرة عبر الهاتف أو الواتساب.',
    formBadge: 'نموذج التواصل',
    formTitle: 'أرسل تفاصيل قضيتك',
    formDescription: 'كل ما تشاركه معنا يُحفظ بسرية مهنية تامة.',
    office: 'موقع المكتب',
    phone: 'الهاتف والواتساب',
    email: 'البريد الإلكتروني',
    hours: 'ساعات العمل',
    map: 'موقع المكتب على الخريطة',
  },
  en: {
    home: 'Home',
    page: 'Contact Us',
    title: 'We Are Happy to Hear from You',
    description:
      'Complete the form and our team will contact you within 24 hours, or reach us directly by phone or WhatsApp.',
    formBadge: 'Contact Form',
    formTitle: 'Tell Us About Your Case',
    formDescription:
      'Everything you share with us is treated with complete professional confidentiality.',
    office: 'Office Location',
    phone: 'Phone & WhatsApp',
    email: 'Email Address',
    hours: 'Working Hours',
    map: 'Office location on the map',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const text = copy[locale]
  return createPageMetadata({
    locale,
    path: '/contact',
    title: text.title,
    description: text.description,
  })
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-[#0A1320] p-4 transition-colors hover:border-[#C9A96E]/30 sm:p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/10 text-[#D9B36A]">
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="mb-1.5 text-sm font-bold text-white">{title}</h2>
        <div className="break-words text-xs leading-6 text-white/55">{children}</div>
      </div>
    </div>
  )
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const settings = await getSiteSettings(locale)
  const text = copy[locale]
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`
  const phoneHref = `tel:${settings.phone.replace(/[^+\d]/g, '')}`
  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`
    : null

  return (
    <main className="min-h-screen bg-[#020B18] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PageHero
        breadcrumbs={[{ label: text.home, href: `/${locale}` }, { label: text.page }]}
        title={text.title}
        content={text.description}
      />
      <section className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_55%,rgba(201,169,110,0.07),transparent_30%)]" />
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
            <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0A1320] shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
              <div className="border-b border-white/[0.07] px-5 py-6 sm:px-7 lg:px-8">
                <span className="mb-2 block text-xs font-semibold text-[#C9A96E]">
                  {text.formBadge}
                </span>
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">{text.formTitle}</h2>
                <p className="text-xs leading-6 text-white/45 sm:text-sm">{text.formDescription}</p>
              </div>
              <ConsultationForm locale={locale} variant="page" />
            </div>

            <aside className="grid gap-3 sm:grid-cols-2 lg:sticky lg:top-0 lg:grid-cols-1">
              <InfoCard icon={<MapPinIcon size={20} />} title={text.office}>
                <address className="not-italic">{settings.address}</address>
              </InfoCard>
              <InfoCard icon={<PhoneIcon size={20} />} title={text.phone}>
                <a
                  href={phoneHref}
                  dir="ltr"
                  className="block transition-colors hover:text-[#D9B36A]"
                >
                  {settings.phone}
                </a>
                {settings.whatsapp && (
                  <a
                    href={whatsappHref || undefined}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="mt-1 flex items-center gap-1.5 transition-colors hover:text-[#D9B36A]"
                  >
                    <MessageCircleIcon size={13} />
                    {settings.whatsapp}
                  </a>
                )}
              </InfoCard>
              <InfoCard icon={<MailIcon size={20} />} title={text.email}>
                <a
                  href={`mailto:${settings.email}`}
                  dir="ltr"
                  className="transition-colors hover:text-[#D9B36A]"
                >
                  {settings.email}
                </a>
              </InfoCard>
              <InfoCard icon={<ClockIcon size={20} />} title={text.hours}>
                <p className="whitespace-pre-line">{settings.workingHours}</p>
              </InfoCard>
            </aside>
          </div>

          <div className="mt-6 overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#0A1320] p-1.5 shadow-[0_25px_70px_rgba(0,0,0,0.22)]">
            <iframe
              src={mapUrl}
              title={text.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full rounded-[17px] border-0 grayscale-[0.1] sm:h-[400px] lg:h-[460px]"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </main>
  )
}
