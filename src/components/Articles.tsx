import Link from 'next/link'

import { MoveLeftIcon, MoveRightIcon } from '@/components/ui/Icons'

import type { Locale } from '@/lib/getDictionary'
import { getAssetUrl, lexicalToPlainText } from '@/lib/api'
import type { Article as PayloadArticle } from '@/payload-types'
import Container from './layouts/Container'
import ArticleCard from './features/ArticleCard'

type ArticlesProps = {
  locale: Locale
  articles: PayloadArticle[]
}

const labels = {
  ar: {
    badge: 'المعرفة القانونية',
    title: 'أحدث المقالات والرؤى',
    viewAll: 'تصفح كافة المقالات',
    readMore: 'قراءة المقال',
  },
  en: {
    badge: 'Legal Knowledge',
    title: 'Latest Articles & Insights',
    viewAll: 'View All Articles',
    readMore: 'Read Article',
  },
} as const

export default function Articles({ locale, articles }: ArticlesProps) {
  const text = labels[locale]
  const cards = articles.map((article) => ({
    id: article.id,
    title: article.title,
    description: lexicalToPlainText(article.content),
    category: text.badge,
    date: new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(article.date)),
    image: getAssetUrl(article.image) ?? '/images/post-1.png',
    href: `/articles/${article.id}`,
  }))

  if (!cards.length) return null

  return (
    <section
      className="relative overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-20"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Container>
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
              {text.badge}
            </div>

            <h2 className="text-[22px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[30px]">
              {text.title}
            </h2>
          </div>

          <Link
            href={`/${locale}/articles`}
            className="group inline-flex items-center gap-2 self-start text-12 font-medium text-secondary transition-colors duration-300 hover:text-white lg:self-auto"
          >
            <span>{text.viewAll}</span>

            {locale === 'ar' ? (
              <MoveLeftIcon
                size={17}
                duration={1}
                color="currentColor"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            ) : (
              <MoveRightIcon
                size={17}
                duration={1}
                color="currentColor"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </Link>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((article) => (
            <ArticleCard
              key={article.id}
              locale={locale}
              article={article}
              readMore={text.readMore}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
