import AboutUs from '@/components/AboutUs'
import Articles from '@/components/Articles'
import Hero from '@/components/Hero'
import HowWorking from '@/components/HowWorking'
import Partnerships from '@/components/Partnerships'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import WhyUs from '@/components/WhyUs'
import { getHomePageData } from '@/lib/api'
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

  const data = await getHomePageData(locale)

  return (
    <>
      <Hero locale={locale} data={data.hero} stats={data.stats} />
      <AboutUs locale={locale} data={data.about} />
      <Services locale={locale} services={data.services} />
      <HowWorking locale={locale} data={data.howWorking} />
      <WhyUs locale={locale} data={data.whyUs} />
      <Partnerships locale={locale} accreditations={data.accreditations} partners={data.partners} />
      <Testimonials locale={locale} data={data.testimonials} />
      <Articles locale={locale} articles={data.articles} />
    </>
  )
}
