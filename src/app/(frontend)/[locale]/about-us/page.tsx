import PageHero from '@/components/layouts/BreadCrumb'
import OurStory from './components/OurStory'
import OurValues from './components/OurValues'
import Milestones from './components/Milestones'
import OurWords from './components/OurWords'
import Partnerships from '@/components/Partnerships'
import Testimonials from '@/components/Testimonials'
import { getAboutPage, getAssetUrl, getHomePageData } from '@/lib/api'
import { createPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

type Locale = 'ar' | 'en'

type AboutUsProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: AboutUsProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const page = await getAboutPage(locale)

  return createPageMetadata({
    locale,
    path: '/about-us',
    title: page.title || (locale === 'ar' ? 'من نحن' : 'About Us'),
    description:
      page.description ||
      (locale === 'ar'
        ? 'تعرف على خبرتنا ورؤيتنا وقيمنا في تقديم الخدمات والاستشارات القانونية.'
        : 'Discover our experience, vision, and values in delivering professional legal services.'),
    image: getAssetUrl(page.ourStory?.image),
  })
}

export default async function AboutUs({ params }: AboutUsProps) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'

  const [aboutPage, homeData] = await Promise.all([getAboutPage(locale), getHomePageData(locale)])

  const storyParagraphs = aboutPage.ourStory?.content
    ?.split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const values = aboutPage.ourValues?.cards?.map((card) => ({
    title: card.name,
    description: card.desc,
  }))

  const milestones = aboutPage.milestones?.cards?.map((card) => ({
    year: card.date,
    title: card.name,
    description: card.description,
  }))

  return (
    <>
      <PageHero
        breadcrumbs={[
          {
            label: locale === 'ar' ? 'الرئيسية' : 'Home',
            href: `/${locale}`,
          },
          {
            label: locale === 'ar' ? 'من نحن' : 'About Us',
          },
        ]}
        title={(() => {
          const title =
            aboutPage.title ||
            (locale === 'ar'
              ? 'ريادة قانونية بلا حدود برؤية استراتيجية معاصرة'
              : 'Legal Excellence with a Modern Vision')

          const words = title.trim().split(/\s+/)

          return (
            <>
              {words.slice(0, -2).join(' ')}{' '}
              <span className="text-secondary">{words.slice(-2).join(' ')}</span>
            </>
          )
        })()}
        content={
          aboutPage.description ||
          (locale === 'ar'
            ? 'منذ عام 1998 ونحن نبني ثقة عملائنا خطوة بخطوة، من خلال خبرة قانونية راسخة والتزام لا يتزعزع بالمعايير المهنية والأخلاقية.'
            : 'Since 1998, we have been building our clients trust step by step through extensive legal expertise and an unwavering commitment to professional and ethical standards.')
        }
      />

      <OurStory
        locale={locale}
        badge={locale === 'ar' ? 'قصتنا' : 'Our Story'}
        title={aboutPage.ourStory?.title || undefined}
        highlightedTitle={aboutPage.ourStory?.title ? '' : undefined}
        paragraphs={storyParagraphs?.length ? storyParagraphs : undefined}
        features={
          aboutPage.ourStory?.items?.length
            ? aboutPage.ourStory.items.map((item) => item.title)
            : undefined
        }
        image={getAssetUrl(aboutPage.ourStory?.image) || undefined}
      />

      <OurValues
        locale={locale}
        badge={locale === 'ar' ? 'قيمنا' : 'Our Values'}
        title={aboutPage.ourValues?.title || undefined}
        description={aboutPage.ourValues?.content || undefined}
        items={values?.length ? values : undefined}
      />

      <Milestones
        locale={locale}
        badge={locale === 'ar' ? 'مسيرتنا' : 'Our Journey'}
        title={aboutPage.milestones?.title || undefined}
        items={milestones?.length ? milestones : undefined}
      />

      <OurWords
        locale={locale}
        quote={aboutPage.ourWords?.presidentWord || undefined}
        name={aboutPage.ourWords?.presidentName || undefined}
        position={aboutPage.ourWords?.presidentPosition || undefined}
        experience={locale === 'ar' ? 'خبرة 28 عاماً' : '28 years of experience'}
        principles={aboutPage.ourWords?.cards?.length ? aboutPage.ourWords.cards : undefined}
      />

      <Partnerships
        locale={locale}
        accreditations={homeData.accreditations}
        partners={homeData.partners}
      />

      <Testimonials locale={locale} data={homeData.testimonials} />
    </>
  )
}
