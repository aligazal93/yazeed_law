import type { Metadata } from 'next'

export type SeoLocale = 'ar' | 'en'

const fallbackOrigin = 'https://yazeed-law.vercel.app'

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || fallbackOrigin,
)

const brandName = {
  ar: 'شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية',
  en: 'Yazid Abdulrahman Al-Zahrani Law Firm',
} as const

type PageMetadataInput = {
  locale: SeoLocale
  title: string
  description: string
  path?: string
  image?: string | null
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string | null
}

function localizedPath(locale: SeoLocale, path = '') {
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path
  return `/${locale}${normalizedPath}`
}

export function createPageMetadata({
  locale,
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const canonical = localizedPath(locale, path)
  const socialImage = image || '/images/og-image.jpg'
  const openGraph: Metadata['openGraph'] = {
    type,
    locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_SA'],
    url: canonical,
    siteName: brandName[locale],
    title,
    description,
    images: [{ url: socialImage, alt: title }],
    ...(type === 'article' ? { publishedTime, modifiedTime: modifiedTime || undefined } : {}),
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: localizedPath('ar', path),
        en: localizedPath('en', path),
        'x-default': localizedPath('ar', path),
      },
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function getAbsoluteUrl(pathOrUrl: string) {
  return /^https?:\/\//i.test(pathOrUrl)
    ? pathOrUrl
    : new URL(pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`, siteUrl).toString()
}

export function getBrandName(locale: SeoLocale) {
  return brandName[locale]
}
