import Image from 'next/image'
import Link from 'next/link'

import { MoveLeftIcon, MoveRightIcon } from '@animateicons/react/lucide'

import { getAssetUrl } from '@/lib/api'
import type { Locale } from '@/lib/getDictionary'
import type { Service } from '@/payload-types'
import Container from './layouts/Container'

type ServicesProps = {
  locale: Locale
  services: Service[]
}

const labels = {
  ar: {
    badge: 'خدماتنا',
    title: 'مجالاتنا القانونية والممارسات',
    description: 'نغطي كافة فروع القانون عبر أقسام تخصصية يقودها نخبة من المحامين المعتمدين',
    action: 'استشر الآن',
  },
  en: {
    badge: 'Our Services',
    title: 'Our Legal Practices',
    description:
      'We cover a wide range of legal disciplines through specialized departments led by experienced and licensed lawyers.',
    action: 'Consult Now',
  },
} as const

export default function Services({ locale, services }: ServicesProps) {
  const text = labels[locale]

  if (!services.length) return null

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Image
        src="/images/bg.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#030C19]/72" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#030C19_0%,rgba(3,12,25,0.65)_28%,rgba(3,12,25,0.68)_65%,#030C19_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(23,35,52,0.10)_0%,rgba(3,12,25,0.45)_68%,#030C19_100%)]" />

      <Container className="relative z-10">
        <div className="mx-auto mb-10 flex max-w-[760px] flex-col items-center text-center sm:mb-12 lg:mb-14">
          <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-full border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary backdrop-blur-sm">
            {text.badge}
          </div>
          <h2 className="text-[28px] leading-[1.35] font-bold text-white sm:text-[34px] lg:text-[40px] xl:text-[44px]">
            {text.title}
          </h2>
          <p className="mt-3 max-w-[650px] text-13 leading-6 font-normal text-white/55 sm:text-14 lg:text-15">
            {text.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((service) => {
            const iconUrl = getAssetUrl(service.icon)

            return (
              <article
                key={service.id}
                className="group relative flex min-h-[235px] flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30 hover:bg-white/[0.055] sm:p-6"
              >
                <div className="pointer-events-none absolute -top-16 end-[-70px] size-40 rounded-full bg-secondary/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 mb-6 flex size-14 items-center justify-center rounded-[10px] border border-secondary/20 bg-[linear-gradient(145deg,rgba(201,169,110,0.20),rgba(162,123,50,0.12))]">
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 object-contain"
                    />
                  )}
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className="text-17 leading-7 font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-18">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-12 leading-6 font-normal text-white/65 sm:text-13">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-2 text-13 font-medium text-secondary transition-colors duration-300 hover:text-white sm:text-14"
                    >
                      <span>{text.action}</span>
                      {locale === 'ar' ? (
                        <MoveLeftIcon size={18} duration={1} color="currentColor" />
                      ) : (
                        <MoveRightIcon size={18} duration={1} color="currentColor" />
                      )}
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
