'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import Container from './Container'
import { Globe02Icon, Menu01 } from '@animateicons/react/huge'
import { ClockIcon, MailIcon, MapPinCheckIcon, PhoneIcon } from '@animateicons/react/lucide'

type Locale = 'ar' | 'en'

type HeaderLabels = {
  home: string
  about: string
  practiceAreas: string
  articles: string
  contact: string
  consultation: string
  changeLanguage: string
}

type HeaderClientProps = {
  locale: Locale
  labels: HeaderLabels
  appointmentTimes: string
  settings: {
    logoUrl: string
    workingHours: string
    address: string
    email: string
    phone: string
  }
}

export default function HeaderClient({ locale, labels, settings }: HeaderClientProps) {
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    {
      label: labels.home,
      href: `/${locale}`,
    },
    {
      label: labels.about,
      href: `/${locale}/about`,
    },
    {
      label: labels.practiceAreas,
      href: `/${locale}/practice-areas`,
    },
    {
      label: labels.articles,
      href: `/${locale}/articles`,
    },
    {
      label: labels.contact,
      href: `/${locale}/contact`,
    },
  ]

  const targetLocale: Locale = locale === 'ar' ? 'en' : 'ar'

  const pathnameParts = pathname.split('/')

  pathnameParts[1] = targetLocale

  const languageHref = pathnameParts.join('/') || `/${targetLocale}`

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href || pathname === `${href}/`
    }

    return pathname.startsWith(href)
  }

  return (
    <header
      className="relative z-50 border-b border-white/5 bg-white/[0.01] backdrop-blur-md"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Container>
        {/* Desktop */}
        <div className="hidden h-[78px] items-center lg:flex">
          {/* Logo */}
          <div className="flex w-[220px] items-center">
            <Link href={`/${locale}`}>
              <Image
                src={settings.logoUrl}
                alt="Yaz Law"
                width={155}
                height={55}
                priority
                className="h-auto w-[140px] object-contain xl:w-[155px]"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 items-center justify-center">
            <ul className="flex items-center gap-5 xl:gap-9">
              {navLinks.map((link) => {
                const active = isActive(link.href)

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative whitespace-nowrap text-14 font-bold transition-colors duration-300 ${
                        active ? 'text-secondary' : 'text-grey hover:text-secondary'
                      }`}
                    >
                      {link.label}

                      {active && (
                        <span className="absolute -bottom-2 start-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-secondary rtl:translate-x-1/2" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end gap-5">
            <Link
              href={languageHref}
              className="flex items-center gap-2 text-14 font-medium text-white transition hover:text-secondary"
            >
              <Globe02Icon size={22} duration={1} color="#ffffff" className="hover:text-primary" />
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="flex h-10  items-center justify-center rounded-xl bg-gold-gradient px-10 text-14 font-bold text-primary transition-all duration-300 hover:brightness-150"
            >
              {labels.consultation}
            </Link>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="flex h-[68px] items-center justify-between lg:hidden">
          <Link href={`/${locale}`}>
            <Image
              src={settings.logoUrl}
              alt="Yaz Law"
              width={130}
              height={50}
              priority
              className="h-auto w-[120px] object-contain sm:w-[135px]"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={languageHref}
              className="flex size-10 items-center cursor-pointer justify-center rounded-lg border border-secondary text-secondary transition  hover:text-secondary"
              aria-label={labels.changeLanguage}
            >
              <Globe02Icon size={18} duration={1} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex size-10 items-center cursor-pointer justify-center rounded-lg border border-secondary text-secondary transition hover:border-secondary hover:text-secondary"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon /> : <Menu01 />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-dark transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? 'max-h-auto opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <Container>
          <nav className="py-5">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(link.href)

                return (
                  <li key={link.href} className="border-b border-white/5 last:border-none">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex py-4 text-15 font-medium transition ${
                        active ? 'text-secondary' : 'text-grey hover:text-secondary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Mobile Contact Info */}
            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="grid gap-3">
                {/* Working Hours */}
                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <ClockIcon size={17} duration={1} color="currentColor" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-11 font-medium text-white/45">
                      {locale === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                    </span>

                    <span className="text-12 leading-5 font-medium text-grey">
                      {settings.workingHours}
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <MapPinCheckIcon size={17} duration={1} color="currentColor" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-11 font-medium text-white/45">
                      {locale === 'ar' ? 'العنوان' : 'Address'}
                    </span>

                    <span className="text-12 leading-5 font-medium text-grey">
                      {settings.address}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition duration-300 hover:border-secondary/30 hover:bg-secondary/5"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <MailIcon size={17} duration={1} color="currentColor" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-11 font-medium text-white/45">
                      {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </span>

                    <span dir="ltr" className="break-all text-12 font-medium text-grey">
                      {settings.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition duration-300 hover:border-secondary/30 hover:bg-secondary/5"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <PhoneIcon size={17} duration={1} color="currentColor" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-11 font-medium text-white/45">
                      {locale === 'ar' ? 'اتصل بنا' : 'Call Us'}
                    </span>

                    <span dir="ltr" className="text-12 font-medium text-grey">
                      {settings.phone}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <Link
              href={`/${locale}/contact`}
              className="mt-5 flex h-[48px] w-full items-center justify-center rounded-[10px] bg-primary px-5 text-14 font-semibold text-white transition hover:bg-secondary"
            >
              {labels.consultation}
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  )
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  )
}
