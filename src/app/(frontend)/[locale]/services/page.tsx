import FAQ from '@/components/FAQ'
import HowWorking from '@/components/HowWorking'
import PageHero from '@/components/layouts/BreadCrumb'
import Services from '@/components/Services'
import { getFAQ, getHomePageData } from '@/lib/api'
import { createPageMetadata, serializeJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
type Locale = 'ar' | 'en'
type ServicesProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: ServicesProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  return createPageMetadata({
    locale,
    path: '/services',
    title: locale === 'ar' ? 'خدماتنا القانونية' : 'Our Legal Services',
    description:
      locale === 'ar'
        ? 'خدمات قانونية متكاملة للأفراد والشركات تشمل الاستشارات والعقود والتقاضي والتحكيم.'
        : 'Comprehensive legal services for individuals and businesses, including consultations, contracts, litigation, and arbitration.',
  })
}
export default async function ServicesPage({ params }: ServicesProps) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const [data, faq] = await Promise.all([getHomePageData(locale), getFAQ(locale)])
  const faqSchema = faq.items?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  //   const [aboutPage, homeData] = await Promise.all([getAboutPage(locale), getHomePageData(locale)])
  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
        />
      )}
      <PageHero
        breadcrumbs={[
          {
            label: locale === 'ar' ? 'الرئيسية' : 'Home',
            href: `/${locale}`,
          },
          {
            label: locale === 'ar' ? '  خدماتنا  ' : 'Services',
          },
        ]}
        title={(() => {
          const title =
            locale === 'ar'
              ? 'ريادة قانونية بلا حدود برؤية استراتيجية معاصرة'
              : 'Legal Excellence with a Modern Vision'

          const words = title.trim().split(/\s+/)

          return (
            <>
              {words.slice(0, -2).join(' ')}{' '}
              <span className="text-secondary">{words.slice(-2).join(' ')}</span>
            </>
          )
        })()}
        content={
          locale === 'ar'
            ? 'منذ عام 1998 ونحن نبني ثقة عملائنا خطوة بخطوة، من خلال خبرة قانونية راسخة والتزام لا يتزعزع بالمعايير المهنية والأخلاقية.'
            : 'Since 1998, we have been building our clients trust step by step through extensive legal expertise and an unwavering commitment to professional and ethical standards.'
        }
      />

      <Services locale={locale} services={data.services} />
      <HowWorking locale={locale} data={data.howWorking} />
      <FAQ
        locale={locale}
        badge={faq.badge || undefined}
        title={faq.title || undefined}
        items={faq.items?.length ? faq.items : undefined}
      />
    </>
  )
}
