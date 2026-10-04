import Image from 'next/image'
import Link from 'next/link'

import {
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from '@animateicons/react/lucide'

import type { Locale } from '@/lib/getDictionary'
import Container from './Container'

type FooterProps = {
  locale: Locale
}

const content = {
  ar: {
    ctaBadge: 'تقييم قضائي ومؤسسي مدقق',
    ctaTitle: 'هل تحتاج إلى استشارة قانونية؟',
    ctaDescription:
      'اترك رقمك ومستشارك معك خلال 24 ساعة، لدراسة أولية وتقييم البدائل القانونية بالكامل، ودون أي التزام.',
    callNow: 'اتصل بنا الآن',
    contactNow: 'تواصل معنا الآن',

    description:
      'نحن فريق متكامل يجمع بين الكفاءة القانونية والخبرة العملية، لحماية مصالح عملائنا وتحقيق أفضل النتائج الممكنة.',

    quickLinksTitle: 'روابط سريعة',
    quickLinks: [
      { label: 'الرئيسية', href: '' },
      { label: 'من نحن', href: '/about' },
      { label: 'مجالات الاختصاص', href: '/practice-areas' },
      { label: 'تواصل معنا', href: '/contact' },
      { label: 'المقالات', href: '/articles' },
    ],

    practicesTitle: 'الممارسات القانونية',
    practices: [
      { label: 'تأسيس وحوكمة الشركات', href: '/services/corporate-law' },
      { label: 'التحكيم الدولي', href: '/services/arbitration' },
      { label: 'النزاعات التجارية والإنشاء', href: '/services/commercial-disputes' },
      { label: 'حماية الملكية الفكرية', href: '/services/intellectual-property' },
      { label: 'الدفاع في القضايا المالية', href: '/services/criminal-law' },
    ],

    licenseTitle: 'الترخيص والاعتماد',
    licenseDescription:
      'مكتب محاماة مرخص من وزارة العدل ونقابة المحامين، وعضو بالهيئات القانونية والتحكيمية المعتمدة.',

    licenseNumber: 'ترخيص مهني رقم 402008',
    licenseSub: 'سجل تجاري واستشاري رقم 98402',

    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    copyright:
      'جميع الحقوق محفوظة © 2026 شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية.',
  },

  en: {
    ctaBadge: 'Professional Legal Assessment',
    ctaTitle: 'Do You Need Legal Advice?',
    ctaDescription:
      'Leave your details and our legal team will review your case within 24 hours, with no obligation.',
    callNow: 'Call Us Now',
    contactNow: 'Contact Us',

    description:
      'An integrated legal team combining professional expertise and practical experience to protect our clients’ interests and achieve the best possible outcomes.',

    quickLinksTitle: 'Quick Links',
    quickLinks: [
      { label: 'Home', href: '' },
      { label: 'About Us', href: '/about' },
      { label: 'Practice Areas', href: '/practice-areas' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Articles', href: '/articles' },
    ],

    practicesTitle: 'Legal Practices',
    practices: [
      { label: 'Corporate Governance', href: '/services/corporate-law' },
      { label: 'International Arbitration', href: '/services/arbitration' },
      { label: 'Commercial Disputes', href: '/services/commercial-disputes' },
      { label: 'Intellectual Property', href: '/services/intellectual-property' },
      { label: 'Financial & Criminal Law', href: '/services/criminal-law' },
    ],

    licenseTitle: 'Licensing & Accreditation',
    licenseDescription:
      'A licensed law firm accredited by the relevant legal and professional authorities.',

    licenseNumber: 'Professional License No. 402008',
    licenseSub: 'Commercial & Advisory Registration No. 98402',

    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    copyright:
      '© 2026 Yazid Abdulrahman Al-Zahrani Law Firm & Legal Consultations. All rights reserved.',
  },
} as const

export default function Footer({ locale }: FooterProps) {
  const data = content[locale]

  return (
    <>
      <footer
        className="relative overflow-hidden bg-[#050D19] pt-16 sm:pt-20 lg:pt-24"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Main Footer Background */}
        <div className="pointer-events-none bg-primary absolute inset-x-0 top-[150px] bottom-0 bg-[#171C22] sm:top-[155px] lg:top-[165px]" />

        {/* subtle footer gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-[150px] bottom-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.018)_0%,transparent_45%,rgba(255,255,255,0.012)_100%)] sm:top-[155px] lg:top-[185px]" />

        <Container className="relative z-10">
          <div className="relative overflow-hidden rounded-[18px] border border-white/[0.07]  px-5 py-7 bg-primary sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            {/* CTA glow */}
            <div className="pointer-events-none absolute -end-24 -top-24 size-[320px] rounded-full bg-secondary/[0.08] blur-[100px]" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              {/* CTA Content */}
              <div className="max-w-[700px]">
                <div className="mb-3 inline-flex rounded-full border border-secondary/25 bg-secondary/[0.06] px-3.5 py-1.5 text-10 font-medium text-secondary sm:text-11">
                  {data.ctaBadge}
                </div>

                <h2 className="text-[27px] leading-[1.35] font-bold text-white sm:text-[32px] lg:text-[36px]">
                  {data.ctaTitle}
                </h2>

                <p className="mt-3 max-w-[650px] text-11 leading-6 text-white/45 sm:text-12 lg:text-13">
                  {data.ctaDescription}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="tel:+966512345678"
                  className="inline-flex h-11 min-w-[130px] items-center justify-center gap-2 rounded-[10px] bg-gold-gradient px-5 text-12 font-bold text-[#111820] transition-all duration-300 hover:brightness-110"
                >
                  <PhoneIcon size={15} duration={1} color="currentColor" />

                  {data.callNow}
                </a>

                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-11 min-w-[145px] items-center justify-center gap-2 rounded-[10px] border border-secondary/40 bg-transparent px-5 text-12 font-medium text-white transition-all duration-300 hover:bg-secondary/10"
                >
                  <MailIcon size={15} duration={1} color="currentColor" />

                  {data.contactNow}
                </Link>
              </div>
            </div>
          </div>

          {/* =========================
              Main Footer
          ========================= */}
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr] lg:gap-14 lg:py-14">
            {/* Brand */}
            <div>
              <Link href={`/${locale}`} className="inline-block">
                <Image
                  src="/images/logo.png"
                  alt="Yaz Law"
                  width={150}
                  height={58}
                  className="h-auto w-[140px] object-contain"
                />
              </Link>

              <p className="mt-4 max-w-[340px] text-11 leading-6 text-white/45 sm:text-12">
                {data.description}
              </p>

              {/* Social Links */}
              <div className="mt-5 flex items-center gap-2">
                <SocialButton href="#" label="Facebook">
                  <FacebookIcon size={18} duration={1} color="#ffffff" />
                </SocialButton>

                <SocialButton href="#" label="LinkedIn">
                  <LinkedinIcon size={18} duration={1} color="#ffffff" />
                </SocialButton>

                <SocialButton href="#" label="X">
                  <TwitterIcon size={18} duration={1} color="#ffffff" />
                </SocialButton>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-12 font-bold text-white sm:text-13">{data.quickLinksTitle}</h3>

              <ul className="mt-4 space-y-2.5">
                {data.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-11 text-white/40 transition-colors duration-300 hover:text-secondary sm:text-12"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practices */}
            <div>
              <h3 className="text-12 font-bold text-white sm:text-13">{data.practicesTitle}</h3>

              <ul className="mt-4 space-y-2.5">
                {data.practices.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-11 text-white/40 transition-colors duration-300 hover:text-secondary sm:text-12"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* License */}
            <div>
              <h3 className="text-12 font-bold text-white sm:text-13">{data.licenseTitle}</h3>

              <p className="mt-4 max-w-[270px] text-12 leading-6 text-white/40">
                {data.licenseDescription}
              </p>

              <div className="mt-4 rounded-lg border border-white/[0.06] bg-[#111820]/60 px-4 py-3">
                <p className="text-12 font-medium text-secondary">{data.licenseNumber}</p>

                <p className="mt-1.5 text-12 text-white/30">{data.licenseSub}</p>
              </div>
            </div>
          </div>

          {/* =========================
              Footer Bottom
          ========================= */}
          <div className="flex flex-col gap-3 border-t border-white/[0.07] py-4 text-9 text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-14 font-medium text-white">{data.copyright}</p>

            <div className="flex flex-wrap text-white text-14 items-center gap-3">
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors duration-300 hover:text-secondary"
              >
                {data.privacy}
              </Link>

              <span className="h-3 w-px bg-white/10" />

              <Link
                href={`/${locale}/terms`}
                className="transition-colors duration-300 hover:text-secondary"
              >
                {data.terms}
              </Link>
            </div>
          </div>
        </Container>
      </footer>

      {/* Fixed Contact Buttons */}
      <FloatingContactButtons locale={locale} />
    </>
  )
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-lg p-5 border border-white/[0.07] bg-white/[0.015] text-10 font-semibold text-white/50 transition-all duration-300 hover:border-secondary/40 hover:text-secondary"
    >
      {children}
    </a>
  )
}

function FloatingContactButtons({ locale }: { locale: Locale }) {
  return (
    <div className="fixed bottom-5 left-4 z-[100] flex flex-col gap-2.5 sm:bottom-8 sm:left-6">
      {/* WhatsApp */}
      <a
        href="https://wa.me/966512345678"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact us via WhatsApp'}
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#0BBF85] text-white shadow-[0_10px_30px_rgba(11,191,133,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:size-12"
      >
        <WhatsAppIcon />

        <span className="pointer-events-none absolute left-[58px] hidden whitespace-nowrap rounded-lg bg-[#111820] px-3 py-2 text-12 text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
          {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
        </span>
      </a>

      {/* Phone */}
      <a
        href="tel:+966512345678"
        aria-label={locale === 'ar' ? 'اتصل بنا' : 'Call us'}
        className="group relative flex size-11 items-center justify-center rounded-full bg-[#2F6FE4] text-white shadow-[0_10px_30px_rgba(47,111,228,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:size-12"
      >
        <PhoneIcon size={19} duration={1} color="currentColor" />

        <span className="pointer-events-none absolute left-[58px] hidden whitespace-nowrap rounded-lg bg-[#111820] px-3 py-2 text-10 text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
          {locale === 'ar' ? 'اتصل بنا' : 'Call Us'}
        </span>
      </a>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.52 2 2.05 6.45 2.05 11.94c0 1.75.46 3.46 1.33 4.96L2 22l5.23-1.37a10.08 10.08 0 0 0 4.8 1.22h.01c5.51 0 9.99-4.45 9.99-9.94C22.03 6.45 17.55 2 12.04 2Zm0 18.17h-.01a8.36 8.36 0 0 1-4.25-1.16l-.3-.18-3.1.81.83-3.02-.2-.31a8.2 8.2 0 0 1-1.28-4.37c0-4.56 3.73-8.27 8.32-8.27 4.58 0 8.31 3.71 8.31 8.27 0 4.56-3.73 8.23-8.32 8.23Zm4.56-6.19c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8.98-.15.16-.3.18-.55.06-.25-.12-1.06-.39-2.02-1.24a7.48 7.48 0 0 1-1.4-1.73c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.21-.49-.42-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.58c.13.16 1.76 2.68 4.27 3.76.6.26 1.06.41 1.43.52.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

function WhatsAppMiniIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.52 2 2.05 6.45 2.05 11.94c0 1.75.46 3.46 1.33 4.96L2 22l5.23-1.37a10.08 10.08 0 0 0 4.8 1.22h.01c5.51 0 9.99-4.45 9.99-9.94C22.03 6.45 17.55 2 12.04 2Z" />
    </svg>
  )
}
