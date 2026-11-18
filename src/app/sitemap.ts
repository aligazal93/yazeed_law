import type { MetadataRoute } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'
import { siteUrl } from '@/lib/seo'

const locales = ['ar', 'en'] as const
const staticPaths = [
  '',
  '/about-us',
  '/team',
  '/services',
  '/articles',
  '/contact',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const [services, articles] = await Promise.all([
    payload.find({ collection: 'services', depth: 0, limit: 1000, select: { slug: true } }),
    payload.find({
      collection: 'articles',
      depth: 0,
      limit: 1000,
      select: { id: true, updatedAt: true },
    }),
  ])

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: new URL(`/${locale}${path}`, siteUrl).toString(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ar: new URL(`/ar${path}`, siteUrl).toString(),
            en: new URL(`/en${path}`, siteUrl).toString(),
          },
        },
      })
    }

    for (const service of services.docs) {
      const path = `/services/${service.slug}`
      entries.push({
        url: new URL(`/${locale}${path}`, siteUrl).toString(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            ar: new URL(`/ar${path}`, siteUrl).toString(),
            en: new URL(`/en${path}`, siteUrl).toString(),
          },
        },
      })
    }

    for (const article of articles.docs) {
      const path = `/articles/${article.id}`
      entries.push({
        url: new URL(`/${locale}${path}`, siteUrl).toString(),
        lastModified: article.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ar: new URL(`/ar${path}`, siteUrl).toString(),
            en: new URL(`/en${path}`, siteUrl).toString(),
          },
        },
      })
    }
  }

  return entries
}
