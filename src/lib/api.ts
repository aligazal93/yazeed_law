import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type {
  AboutPage,
  AboutUs,
  AccreditationsTrust,
  Article,
  ArticlesPage,
  Document,
  Faq,
  Hero,
  HowWorking,
  Media,
  Partner,
  Service,
  SiteSetting,
  Stat,
  TeamPage,
  Testimonial,
  WhyUs,
} from '@/payload-types'
import type { Locale } from './getDictionary'

type PayloadAsset = Media | Document | number | null | undefined

export type HomePageData = {
  hero: Hero
  stats: Stat
  about: AboutUs
  services: Service[]
  howWorking: HowWorking
  whyUs: WhyUs
  accreditations: AccreditationsTrust[]
  partners: Partner[]
  testimonials: Testimonial
  articles: Article[]
}

export type ServicePageData = {
  service: Service | null
  services: Service[]
}

export type ArticlesPageData = {
  settings: ArticlesPage
  articles: Article[]
}

export type ArticleDetailsData = {
  settings: ArticlesPage
  article: Article | null
  recentArticles: Article[]
}

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSetting> => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'site-settings',
    locale,
    depth: 1,
  })
})

export const getAboutPage = cache(async (locale: Locale): Promise<AboutPage> => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'about-page',
    locale,
    depth: 1,
  })
})

export const getFAQ = cache(async (locale: Locale): Promise<Faq> => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'faq',
    locale,
    depth: 0,
  })
})

export const getTeamPage = cache(async (locale: Locale): Promise<TeamPage> => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'team-page',
    locale,
    depth: 1,
  })
})

export const getServicePageData = cache(
  async (locale: Locale, slug: string): Promise<ServicePageData> => {
    const payload = await getPayload({ config })

    const [serviceResult, servicesResult] = await Promise.all([
      payload.find({
        collection: 'services',
        locale,
        depth: 1,
        limit: 1,
        where: {
          slug: {
            equals: slug,
          },
        },
      }),
      payload.find({
        collection: 'services',
        locale,
        depth: 0,
        limit: 100,
        sort: 'createdAt',
      }),
    ])

    return {
      service: serviceResult.docs[0] ?? null,
      services: servicesResult.docs,
    }
  },
)

export const getArticlesPageData = cache(async (locale: Locale): Promise<ArticlesPageData> => {
  const payload = await getPayload({ config })

  const [settings, articles] = await Promise.all([
    payload.findGlobal({ slug: 'articles-page', locale, depth: 0 }),
    payload.find({ collection: 'articles', locale, depth: 1, limit: 100, sort: '-date' }),
  ])

  return {
    settings,
    articles: articles.docs,
  }
})

export const getArticleDetailsData = cache(
  async (locale: Locale, id: number): Promise<ArticleDetailsData> => {
    const payload = await getPayload({ config })

    const [settings, articleResult, recentResult] = await Promise.all([
      payload.findGlobal({ slug: 'articles-page', locale, depth: 0 }),
      payload.find({
        collection: 'articles',
        locale,
        depth: 1,
        limit: 1,
        where: {
          id: {
            equals: id,
          },
        },
      }),
      payload.find({ collection: 'articles', locale, depth: 1, limit: 5, sort: '-date' }),
    ])

    return {
      settings,
      article: articleResult.docs[0] ?? null,
      recentArticles: recentResult.docs.filter((article) => article.id !== id).slice(0, 4),
    }
  },
)

export const getHomePageData = cache(async (locale: Locale): Promise<HomePageData> => {
  const payload = await getPayload({ config })
  const [
    hero,
    stats,
    about,
    services,
    howWorking,
    whyUs,
    accreditations,
    partners,
    testimonials,
    articles,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'hero', locale, depth: 1 }),
    payload.findGlobal({ slug: 'stats', locale, depth: 1 }),
    payload.findGlobal({ slug: 'about-us', locale, depth: 1 }),
    payload.find({ collection: 'services', locale, depth: 1, limit: 100 }),
    payload.findGlobal({ slug: 'how-working', locale, depth: 1 }),
    payload.findGlobal({ slug: 'why-us', locale, depth: 1 }),
    payload.find({ collection: 'accreditations-trust', locale, depth: 1, limit: 100 }),
    payload.find({ collection: 'partners', locale, depth: 1, limit: 100 }),
    payload.findGlobal({ slug: 'testimonials', locale, depth: 1 }),
    payload.find({ collection: 'articles', locale, depth: 1, limit: 3, sort: '-date' }),
  ])

  return {
    hero,
    stats,
    about,
    services: services.docs,
    howWorking,
    whyUs,
    accreditations: accreditations.docs,
    partners: partners.docs,
    testimonials,
    articles: articles.docs,
  }
})

export function getAssetUrl(asset: PayloadAsset): string | null {
  if (!asset || typeof asset === 'number' || !asset.url) return null

  if (/^https?:\/\//i.test(asset.url)) return asset.url

  return asset.url.startsWith('/') ? asset.url : `/${asset.url}`
}

export function lexicalToPlainText(content: Article['content']): string {
  const text: string[] = []

  function visit(value: unknown) {
    if (!value || typeof value !== 'object') return

    const node = value as { text?: unknown; children?: unknown[] }
    if (typeof node.text === 'string') text.push(node.text)
    node.children?.forEach(visit)
  }

  visit(content.root)
  return text.join(' ').replace(/\s+/g, ' ').trim()
}
