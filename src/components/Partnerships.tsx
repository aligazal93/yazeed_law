import Image from 'next/image'

import { getAssetUrl } from '@/lib/api'
import type { Locale } from '@/lib/getDictionary'
import type {
  AccreditationsTrust as AccreditationData,
  Partner as PartnerData,
} from '@/payload-types'
import PartnersSlider from './features/PartnersSlider'
import Container from './layouts/Container'

type PartnershipsProps = {
  locale: Locale
  accreditations: AccreditationData[]
  partners: PartnerData[]
}

const labels = {
  ar: {
    title: 'اعتمادات وشراكات تضمن ثقتك',
    description: 'مرخصون ومعتمدون من أرفع الهيئات القضائية والتحكيمية في المنطقة والعالم',
    partnersBadge: 'علاقات مبنية على الثقة',
    partnersTitle: 'شركاء النجاح',
    partnersDescription:
      'نفخر بشراكاتنا وعلاقاتنا المهنية التي تعكس الثقة المتبادلة، وتمنح عملاءنا حلولاً قانونية أكثر تكاملاً وفعالية.',
  },
  en: {
    title: 'Accreditations & Partnerships You Can Trust',
    description:
      'Licensed and accredited by leading judicial and arbitration institutions regionally and internationally.',
    partnersBadge: 'Relationships Built on Trust',
    partnersTitle: 'Success Partners',
    partnersDescription:
      'We are proud of professional partnerships built on mutual trust, enabling us to provide more integrated and effective legal solutions.',
  },
} as const

export default function Partnerships({ locale, accreditations, partners }: PartnershipsProps) {
  const text = labels[locale]
  const partnerSlides = partners.map((partner) => ({
    id: partner.id,
    name: typeof partner.image === 'number' ? text.partnersTitle : partner.image.alt,
    logo: getAssetUrl(partner.image) ?? undefined,
  }))

  if (!accreditations.length && !partners.length) return null

  return (
    <section
      className="relative overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div
        className="pointer-events-none absolute end-0 top-0 h-[55%] w-[45%] opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute bottom-0 start-0 size-[450px] rounded-full bg-secondary/[0.035] blur-[100px]" />

      <Container className="relative z-10">
        {accreditations.length > 0 && (
          <>
            <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[650px] text-[28px] leading-[1.35] font-bold text-white sm:text-[34px] lg:text-[40px] xl:text-[44px]">
                {text.title}
              </h2>
              <p className="max-w-[500px] text-12 leading-6 text-white/45 sm:text-13 lg:text-14">
                {text.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {accreditations.map((item) => {
                const imageUrl = getAssetUrl(item.image)

                return (
                  <article
                    key={item.id}
                    className="group flex min-h-[135px] flex-col items-center justify-center rounded-[14px] border border-secondary/20 bg-white/[0.015] px-5 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/45 hover:bg-secondary/[0.035]"
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt=""
                        width={36}
                        height={36}
                        className="mb-4 size-9 object-contain"
                      />
                    )}
                    <h3 className="text-14 font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-15">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-11 leading-5 text-white/40 sm:text-12">
                      {item.content}
                    </p>
                  </article>
                )
              })}
            </div>
          </>
        )}

        {partnerSlides.length > 0 && (
          <div className="pt-24 sm:pt-28 lg:pt-36">
            <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center text-center sm:mb-12">
              <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
                {text.partnersBadge}
              </div>
              <h2 className="text-[28px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[40px]">
                {text.partnersTitle}
              </h2>
              <p className="mt-3 max-w-[650px] text-12 leading-6 text-white/45 sm:text-13 lg:text-14">
                {text.partnersDescription}
              </p>
            </div>
            <PartnersSlider locale={locale} partners={partnerSlides} />
          </div>
        )}
      </Container>
    </section>
  )
}
