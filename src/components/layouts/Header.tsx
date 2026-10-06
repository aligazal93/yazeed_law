import HeaderClient from './HeaderClient'
import { getDictionary, type Locale } from '@/lib/getDictionary'
import { getAssetUrl } from '@/lib/api'
import type { SiteSetting } from '@/payload-types'

type HeaderProps = {
  locale: Locale
  settings: SiteSetting
}

export default async function Header({ locale, settings }: HeaderProps) {
  const dictionary = await getDictionary(locale)

  return (
    <HeaderClient
      locale={locale}
      labels={dictionary.header}
      appointmentTimes={dictionary.appointmentTimes}
      settings={{
        logoUrl:
          getAssetUrl(locale === 'en' ? settings.logoEnglish : settings.logo) ??
          getAssetUrl(settings.logo) ??
          '/images/logo.png',
        workingHours: settings.workingHours,
        address: settings.address,
        email: settings.email,
        phone: settings.phone,
      }}
    />
  )
}
