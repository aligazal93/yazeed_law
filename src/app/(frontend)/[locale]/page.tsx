import AboutUs from '@/components/AboutUs'
import Articles from '@/components/Articles'
import Hero from '@/components/Hero'
import HowWorking from '@/components/HowWorking'
import Header from '@/components/layouts/Header'
import UpBar from '@/components/layouts/UpBar'
import Partnerships from '@/components/Partnerships'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import WhyUs from '@/components/WhyUs'
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
      <Hero locale={locale} />
      <AboutUs locale={locale} />
      <Services locale={locale} />
      <HowWorking locale={locale} />
      <WhyUs locale={locale} />
      <Partnerships locale={locale} />
      <Testimonials locale={locale} />
      <Articles locale={locale} />
    </>
  )
}
