import HeaderClient from './HeaderClient'
import { getDictionary, type Locale } from '@/lib/getDictionary'

type HeaderProps = {
  locale: Locale
}

export default async function Header({ locale }: HeaderProps) {
  const dictionary = await getDictionary(locale)

  return (
    <HeaderClient
      locale={locale}
      labels={dictionary.header}
      appointmentTimes={dictionary.appointmentTimes}
    />
  )
}
