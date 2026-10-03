import type { Metadata } from 'next'
import React from 'react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import '../styles.css'
import UpBar from '@/components/layouts/UpBar'

const metadataByLocale = {
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={ibmPlex.variable + ' bg-primary text-white'}>{children}</body>
    </html>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const data = metadataByLocale[locale as keyof typeof metadataByLocale] ?? metadataByLocale.ar

  return {
    title: data.title,
    description: data.description,
  }
}
