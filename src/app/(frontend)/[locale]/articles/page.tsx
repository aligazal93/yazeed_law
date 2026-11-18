import ArticleCard from '@/components/features/ArticleCard'
import PageHero from '@/components/layouts/BreadCrumb'
import Container from '@/components/layouts/Container'
import { getArticlesPageData, getAssetUrl, lexicalToPlainText } from '@/lib/api'
import { createPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

type Locale = 'ar' | 'en'

const fallback = {
  ar: {
    home: 'الرئيسية',
    page: 'المقالات',
    badge: 'رؤى قانونية',
    title: 'رؤى قانونية بقلم خبرائنا',
    description:
      'نشارك خلاصة خبراتنا في أهم التشريعات والمستجدات القانونية ونقدم تحليلات عملية تساعدك على فهم حقوقك والتزاماتك.',
    readMore: 'قراءة المقال',
    empty: 'لا توجد مقالات منشورة حاليًا.',
  },
  en: {
    home: 'Home',
    page: 'Articles',
    badge: 'Legal Insights',
    title: 'Legal Insights from Our Experts',
    description:
      'We share practical analysis of important legislation and legal developments to help you understand your rights and obligations.',
    readMore: 'Read Article',
    empty: 'No articles have been published yet.',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const data = await getArticlesPageData(locale)
  const text = fallback[locale]

  return createPageMetadata({
    locale,
    path: '/articles',
    title: data.settings.title || text.title,
    description: data.settings.description || text.description,
  })
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const data = await getArticlesPageData(locale)
  const text = fallback[locale]

  const cards = data.articles.map((article) => {
    const plainText = lexicalToPlainText(article.content)

    return {
      id: article.id,
      title: article.title,
      description: plainText.length > 145 ? `${plainText.slice(0, 145).trim()}…` : plainText,
      category: data.settings.badge || text.badge,
      date: new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(article.date)),
      image: getAssetUrl(article.image) || '/images/post-1.png',
      href: `/articles/${article.id}`,
    }
  })

  return (
    <main className="bg-[#020B18] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PageHero
        breadcrumbs={[{ label: text.home, href: `/${locale}` }, { label: text.page }]}
        title={data.settings.title || text.title}
        content={data.settings.description || text.description}
      />

      <section className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_85%,rgba(201,169,110,0.07),transparent_32%)]" />
        <Container>
          {cards.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {cards.map((article) => (
                <ArticleCard
                  key={article.id}
                  locale={locale}
                  article={article}
                  readMore={data.settings.readMoreLabel || text.readMore}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center text-sm text-white/50">
              {text.empty}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
