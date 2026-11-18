import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  size?: number
  color?: string
  duration?: number
}

function Icon({ size = 20, color = 'currentColor', children, ...props }: IconProps) {
  const { duration: _duration, ...svgProps } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...svgProps}
    >
      {children}
    </svg>
  )
}

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
)
export const ClockIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
)
export const DownloadIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
  </Icon>
)
export const MoveLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </Icon>
)
export const MoveRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </Icon>
)
export const ChevronDownIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
)
export const ChevronDown = ChevronDownIcon
export const XIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
)
export const SendIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Icon>
)
export const ShieldCheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
)
export const ShieldCheck = ShieldCheckIcon
export const QuoteIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10 11H5a5 5 0 0 1 5-5v11H4v-3m16-3h-5a5 5 0 0 1 5-5v11h-6v-3" />
  </Icon>
)
export const Quote = QuoteIcon
export const StarIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" />
  </Icon>
)
export const CalendarDaysIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 2v4m12-4v4M3 9h18M5 4h14a2 2 0 0 1 2 2v15H3V6a2 2 0 0 1 2-2Z" />
  </Icon>
)
export const MailIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
)
export const PhoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
  </Icon>
)
export const MapPinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
)
export const MapPinCheckIcon = MapPinIcon
export const MessageCircleIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9 9 0 0 1-4-.9L3 21l1.9-4.7A8.5 8.5 0 1 1 21 11.5Z" />
  </Icon>
)
export const CircleDotIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </Icon>
)
export const Globe02Icon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </Icon>
)
export const Menu01 = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)
export const ChartSplineIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 3v18h18" />
    <path d="m5 16 4-5 4 2 6-7" />
  </Icon>
)
export const UserRoundCogIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="10" cy="8" r="4" />
    <path d="M3 21a7 7 0 0 1 12-5m4-1v6m3-3h-6" />
  </Icon>
)
export const ScanLineIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4M7 12h10" />
  </Icon>
)
export const ScanLine = ScanLineIcon
export const UsersRoundIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9m-2-11.8a4 4 0 0 1 0 7.4" />
  </Icon>
)
export const UserIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
)
export const Timer = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="13" r="8" />
    <path d="M9 2h6m-3 3v3m6-1 2-2" />
  </Icon>
)
export const LockKeyhole = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
  </Icon>
)
export const FacebookIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 8h4V3h-4a6 6 0 0 0-6 6v3H4v5h4v5h5v-5h4l1-5h-5V9a1 1 0 0 1 1-1Z" />
  </Icon>
)
export const LinkedinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 9v12M6 5v.01M10 21V9h5a4 4 0 0 1 4 4v8M3 9h6" />
  </Icon>
)
export const TwitterIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m4 4 16 16M20 4 4 20" />
  </Icon>
)
