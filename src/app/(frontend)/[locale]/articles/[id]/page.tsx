import {
  CalendarDaysIcon,
  ClockIcon,
  MoveLeftIcon,
  MoveRightIcon,
} from '@/components/ui/Icons'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ConsultationModal from '@/components/ConsultationModal'
import PageHero from '@/components/layouts/BreadCrumb'
import Container from '@/components/layouts/Container'
import { getArticleDetailsData, getAssetUrl, lexicalToPlainText } from '@/lib/api'
import { createPageMetadata, getAbsoluteUrl, serializeJsonLd, siteUrl } from '@/lib/seo'
import type { Metadata } from 'next'

type Locale = 'ar' | 'en'

const fallback = {
  ar: {
    home: 'الرئيسية',
    articles: 'المقالات',
    badge: 'رؤى قانونية',
    recent: 'أحدث المقالات',
    consultationTitle: 'هل تحتاج مساعدة؟',
    consultationDescription: 'احجز استشارتك الآن وتحدث مع أحد محامينا المتخصصين.',
    consultationButton: 'تواصل معنا',
    minute: 'دقائق قراءة',
  },
  en: {
    home: 'Home',
    articles: 'Articles',
    badge: 'Legal Insights',
    recent: 'Recent Articles',
    consultationTitle: 'Need Legal Support?',
    consultationDescription: 'Book a consultation and speak with one of our specialist lawyers.',
    consultationButton: 'Contact Us',
    minute: 'min read',
  },
} as const

type ArticleDetailsPageProps = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: ArticleDetailsPageProps): Promise<Metadata> {
  const { locale: requestedLocale, id: rawID } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const id = Number(rawID)
  if (!Number.isInteger(id) || id < 1) return { robots: { index: false, follow: false } }

  const { article } = await getArticleDetailsData(locale, id)
  if (!article) return { robots: { index: false, follow: false } }
  const plainText = lexicalToPlainText(article.content)

  return createPageMetadata({
    locale,
    path: `/articles/${article.id}`,
    title: article.title,
    description: plainText.length > 160 ? `${plainText.slice(0, 157).trim()}…` : plainText,
    image: getAssetUrl(article.image),
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.updatedAt,
  })
}

export default async function ArticleDetailsPage({ params }: ArticleDetailsPageProps) {
  const { locale: requestedLocale, id: rawID } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const id = Number(rawID)

  if (!Number.isInteger(id) || id < 1) notFound()

  const data = await getArticleDetailsData(locale, id)
  if (!data.article) notFound()

  const article = data.article
  const text = fallback[locale]
  const plainText = lexicalToPlainText(article.content)
  const excerpt = plainText.length > 180 ? `${plainText.slice(0, 180).trim()}…` : plainText
  const readingTime = Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 180))
  const formattedDate = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.date))
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: excerpt,
    image: getAbsoluteUrl(getAssetUrl(article.image) || '/images/post-1.png'),
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    mainEntityOfPage: new URL(`/${locale}/articles/${article.id}`, siteUrl).toString(),
    publisher: { '@type': 'Organization', name: 'YAZ Law' },
  }

  return (
    <main className="bg-[#020B18] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
      />
      <PageHero
        breadcrumbs={[
          { label: text.home, href: `/${locale}` },
          { label: text.articles, href: `/${locale}/articles` },
          { label: article.title },
        ]}
        title={article.title}
        content={excerpt}
      />

      <section className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_6%_88%,rgba(201,169,110,0.08),transparent_30%)]" />
        <Container>
          <div className="grid items-start gap-6 grid-cols-12 xl:gap-8">
            <div className="col-span-12 lg:col-span-9">
              <article className="min-w-0 ">
                <div className="relative aspect-[16/8.7] min-h-[240px] overflow-hidden rounded-2xl border border-white/[0.08] sm:min-h-[360px]">
                  <Image
                    src={getAssetUrl(article.image) || '/images/post-1.png'}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020B18]/30 via-transparent to-transparent" />
                </div>

                <div className="px-1 pt-8 sm:px-3 sm:pt-10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="rounded-full bg-secondary/10 px-4 py-2 text-[11px] font-medium text-secondary">
                      {data.settings.badge || text.badge}
                    </span>
                    <div className="flex items-center gap-4 text-[11px] text-white/40">
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon size={14} className="text-secondary" />
                        {readingTime} {text.minute}
                      </span>
                      <time className="inline-flex items-center gap-1.5" dateTime={article.date}>
                        <CalendarDaysIcon size={14} className="text-secondary" />
                        {formattedDate}
                      </time>
                    </div>
                  </div>

                  <h2 className="mt-7 text-2xl font-bold leading-[1.55] sm:text-3xl">
                    {article.title}
                  </h2>

                  <RichText
                    data={article.content}
                    className="mt-6 text-[13px] leading-8 text-white/65 sm:text-sm [&_a]:text-secondary [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:rounded-e-xl [&_blockquote]:border-s-2 [&_blockquote]:border-secondary [&_blockquote]:bg-secondary/[0.06] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-secondary [&_h1]:mb-5 [&_h1]:mt-9 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mb-4 [&_h2]:mt-9 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:ps-6 [&_p]:mb-5 [&_strong]:font-bold [&_strong]:text-white/90 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-6"
                  />
                </div>
              </article>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <aside className="space-y-4 lg:sticky lg:top-24">
                {data.recentArticles.length ? (
                  <nav className="rounded-2xl border border-white/[0.08] bg-[#0A1320] p-4">
                    <h2 className="border-b border-white/[0.08] px-2 pb-4 text-sm font-bold">
                      {data.settings.recentArticlesTitle || text.recent}
                    </h2>
                    <ul className="mt-3 space-y-1">
                      {data.recentArticles.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={`/${locale}/articles/${item.id}`}
                            className="group flex items-start justify-between gap-3 rounded-xl px-3 py-3 text-[11px] leading-5 text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                          >
                            <span className="line-clamp-2">{item.title}</span>
                            {locale === 'ar' ? (
                              <MoveLeftIcon size={13} className="mt-1 shrink-0 text-secondary" />
                            ) : (
                              <MoveRightIcon size={13} className="mt-1 shrink-0 text-secondary" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}

                <div className="rounded-2xl border border-secondary/25 bg-[linear-gradient(145deg,rgba(201,169,110,0.07),rgba(255,255,255,0.015))] p-5">
                  <h2 className="text-sm font-bold">
                    {data.settings.consultationTitle || text.consultationTitle}
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-white/50">
                    {data.settings.consultationDescription || text.consultationDescription}
                  </p>
                  <ConsultationModal
                    locale={locale}
                    label={data.settings.consultationButtonLabel || text.consultationButton}
                    className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-gold-gradient px-5 text-xs font-bold text-primary transition hover:brightness-110"
                  />
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
