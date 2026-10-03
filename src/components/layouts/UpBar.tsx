import {
  CircleDotIcon,
  ClockIcon,
  MailIcon,
  MapPinCheckIcon,
  PhoneIcon,
} from '@animateicons/react/lucide'

import Container from './Container'
import { getDictionary, Locale } from '@/lib/getDictionary'

type UpBarProps = {
  locale: Locale
}

export default async function UpBar({ locale }: UpBarProps) {
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
                الأحد – الخميس · 9:00 ص – 6:00 م
              </li>
              <li className="flex gap-2 items-center border-s-2 border-secondary px-2 text-10 lg:text-12 text-grey font-medium">
                <MapPinCheckIcon size={14} duration={1} color="#C9A96E" />
                الرياض , شارع الملك فيصل 4567
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="flex items-center gap-4">
              <li className="flex gap-2 items-center  px-2 text-10 lg:text-12 text-grey font-medium">
                <MailIcon size={16} duration={1} color="#C9A96E" />
                info@almizan-law.com
              </li>
              <li className="flex gap-2  items-center border-s-2 border-secondary px-2 text-10 lg:text-12 text-grey font-medium">
                <PhoneIcon size={16} duration={1} color="#C9A96E" />
                +966512345678
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}
