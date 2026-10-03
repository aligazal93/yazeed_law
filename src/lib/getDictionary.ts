import 'server-only'

const dictionaries = {
  ar: () => import('@/locales/ar.json').then((module) => module.default),
  en: () => import('@/locales/en.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const locales = Object.keys(dictionaries) as Locale[]

export function isLocale(locale: string): locale is Locale {
  return locale in dictionaries
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
