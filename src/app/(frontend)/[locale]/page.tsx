import AboutUs from '@/components/AboutUs'
import Hero from '@/components/Hero'
import Header from '@/components/layouts/Header'
import UpBar from '@/components/layouts/UpBar'
import Services from '@/components/Services'
import { getDictionary } from '@/lib/getDictionary'
import { notFound } from 'next/navigation'

const locales = ['ar', 'en'] as const
type Locale = (typeof locales)[number]

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <>
      <UpBar locale={locale} />
      <Header locale={locale} />
      <Hero locale={locale} />
      <AboutUs locale={locale} />
      <Services locale={locale} />
    </>
  )
}
