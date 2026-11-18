import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'

import UpBar from '@/components/layouts/UpBar'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

import { isLocale, locales, type Locale } from '@/lib/getDictionary'
import { getSiteSettings } from '@/lib/api'
import { getBrandName, serializeJsonLd, siteUrl } from '@/lib/seo'

import '../styles.css'

// Fast ISR pages while still picking up CMS changes regularly.
export const revalidate = 300

const metadataByLocale: Record<
  Locale,
  {
    title: string
    description: string
  }
> = {
  ar: {
    title: 'شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية',
    description:
      'شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية، نقدم خدمات قانونية واستشارات متخصصة للأفراد والشركات.',
  },

  en: {
    title: 'Yazid Abdulrahman Al-Zahrani Law Firm & Legal Consultations',
    description:
      'Yazid Abdulrahman Al-Zahrani Law Firm provides professional legal services and consultations for individuals and businesses.',
  },
}

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const metadata = metadataByLocale[locale]

  return {
    metadataBase: siteUrl,
    applicationName: getBrandName(locale),
    title: {
      default: metadata.title,
      template: `%s | ${locale === 'ar' ? 'يزيد الزهراني للمحاماة' : 'YAZ Law'}`,
    },
    description: metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: '/ar', en: '/en', 'x-default': '/ar' },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: getBrandName(locale),
      title: metadata.title,
      description: metadata.description,
      images: [{ url: '/images/og-image.jpg', alt: metadata.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/images/og-image.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const siteSettings = await getSiteSettings(locale)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: getBrandName(locale),
    url: new URL(`/${locale}`, siteUrl).toString(),
    email: siteSettings.email,
    telephone: siteSettings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings.address,
    },
    sameAs: [siteSettings.facebook, siteSettings.linkedin, siteSettings.twitter].filter(Boolean),
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${ibmPlex.variable} bg-primary text-white`}>
        <a
          href="#main-content"
          className="fixed start-4 top-4 z-[10000] -translate-y-24 rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-primary transition-transform focus:translate-y-0"
        >
          {locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
        />
        <UpBar locale={locale} settings={siteSettings} />

        <Header locale={locale} settings={siteSettings} />

        <div id="main-content">{children}</div>

        <Footer locale={locale} settings={siteSettings} />
      </body>
    </html>
  )
}
