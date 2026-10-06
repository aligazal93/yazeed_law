import 'server-only'

import { cache } from 'react'

import type {
  AboutUs,
  AccreditationsTrust,
  Article,
  Document,
  Hero,
  HowWorking,
  Media,
  Partner,
  Service,
  SiteSetting,
  Stat,
  Testimonial,
  WhyUs,
} from '@/payload-types'
import type { Locale } from './getDictionary'

const DEFAULT_API_BASE_URL = 'https://yazeed-law.vercel.app/api'

export const API_BASE_URL = (process.env.API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '')

type PayloadCollection<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

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

async function apiFetch<T>(path: string, locale: Locale): Promise<T> {
  const url = new URL(`${API_BASE_URL}/${path.replace(/^\/+/, '')}`)
  url.searchParams.set('locale', locale)
  url.searchParams.set('depth', '1')

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(`Payload request failed (${response.status}) for ${url.pathname}`)
  }

  return (await response.json()) as T
}

async function getCollection<T>(slug: string, locale: Locale, limit = 100, sort?: string) {
  const path = new URLSearchParams({ limit: String(limit) })
  if (sort) path.set('sort', sort)

  return apiFetch<PayloadCollection<T>>(`${slug}?${path}`, locale)
}

export const getSiteSettings = cache((locale: Locale) =>
  apiFetch<SiteSetting>('globals/site-settings', locale),
)

export const getHomePageData = cache(async (locale: Locale): Promise<HomePageData> => {
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
    apiFetch<Hero>('globals/hero', locale),
    apiFetch<Stat>('globals/stats', locale),
    apiFetch<AboutUs>('globals/about-us', locale),
    getCollection<Service>('services', locale),
    apiFetch<HowWorking>('globals/how-working', locale),
    apiFetch<WhyUs>('globals/why-us', locale),
    getCollection<AccreditationsTrust>('accreditations-trust', locale),
    getCollection<Partner>('partners', locale),
    apiFetch<Testimonial>('globals/testimonials', locale),
    getCollection<Article>('articles', locale, 3, '-date'),
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

  return `${new URL(API_BASE_URL).origin}/${asset.url.replace(/^\/+/, '')}`
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
