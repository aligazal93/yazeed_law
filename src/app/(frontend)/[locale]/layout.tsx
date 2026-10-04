import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'

import UpBar from '@/components/layouts/UpBar'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

import { isLocale, locales, type Locale } from '@/lib/getDictionary'

import '../styles.css'

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
  weight: ['300', '400', '500', '600', '700'],
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
    title: metadata.title,
    description: metadata.description,
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${ibmPlex.variable} bg-primary text-white`}>
        <UpBar locale={locale} />

        <Header locale={locale} />

        <main>{children}</main>

        <Footer locale={locale} />
      </body>
    </html>
  )
}
