import {
  CircleDotIcon,
  ClockIcon,
  MailIcon,
  MapPinCheckIcon,
  PhoneIcon,
} from '@/components/ui/Icons'

import Container from './Container'
import { getDictionary, Locale } from '@/lib/getDictionary'
import type { SiteSetting } from '@/payload-types'

type UpBarProps = {
  locale: Locale
  settings: SiteSetting
}

export default async function UpBar({ locale, settings }: UpBarProps) {
  const dictionary = await getDictionary(locale)
  return (
    <div className="hidden bg-primary p-3 lg:block">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex">
            <ul className="flex items-center gap-4">
              <li className="flex gap-2 items-center text-10 lg:text-12 text-white font-medium">
                <CircleDotIcon size={10} duration={1} color="#2CAF4F" />{' '}
                {dictionary.appointmentTimes}
              </li>
              <li className="flex gap-2 items-center border-s-2 px-2 border-secondary text-10 lg:text-12 text-grey font-medium">
                <ClockIcon size={14} duration={1} color="#C9A96E" />
                {settings.workingHours}
              </li>
              <li className="flex gap-2 items-center border-s-2 border-secondary px-2 text-10 lg:text-12 text-grey font-medium">
                <MapPinCheckIcon size={14} duration={1} color="#C9A96E" />
                {settings.address}
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="flex items-center gap-4">
              <li className="flex gap-2 items-center  px-2 text-10 lg:text-12 text-grey font-medium">
                <MailIcon size={16} duration={1} color="#C9A96E" />
                {settings.email}
              </li>
              <li className="flex gap-2  items-center border-s-2 border-secondary px-2 text-10 lg:text-12 text-grey font-medium">
                <PhoneIcon size={16} duration={1} color="#C9A96E" />
                {settings.phone}
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}
