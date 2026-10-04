import type { ComponentType } from 'react'

import { BookOpenIcon, Briefcase, HammerIcon, ShieldCheckIcon } from '@animateicons/react/lucide'

import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'
import PartnersSlider from './features/PartnersSlider'

type PartnershipsProps = {
  locale: Locale
}

type AnimatedIconProps = {
  size?: number
  duration?: number
  color?: string
  className?: string
}

type Accreditation = {
  id: number
  title: string
  description: string
  icon: ComponentType<AnimatedIconProps>
}

type Partner = {
  id: number
  name: string
}

type PartnershipsContent = {
  title: string
  description: string

  accreditations: Accreditation[]

  partnersBadge: string
  partnersTitle: string
  partnersDescription: string
  partners: Partner[]
}

const content: Record<Locale, PartnershipsContent> = {
  ar: {
    title: 'اعتمادات وشراكات تضمن ثقتك',

    description: 'مرخصون ومعتمدون من أرفع الهيئات القضائية والتحكيمية في المنطقة والعالم',

    accreditations: [
      {
        id: 1,
        title: 'اتحاد المحامين العرب',
        description: 'عضوية نقابية معتمدة',
        icon: HammerIcon,
      },
      {
        id: 2,
        title: 'مركز التحكيم الدولي (ICC)',
        description: 'محكمون مسجلون رسمياً',
        icon: Briefcase,
      },
      {
        id: 3,
        title: 'وزارة العدل',
        description: 'ترخيص مزاولة رقم 402008',
        icon: BookOpenIcon,
      },
      {
        id: 4,
        title: 'معيار الخبرة القانوني',
        description: 'لسرية وضبط البيانات ISO 9001',
        icon: ShieldCheckIcon,
      },
    ],

    partnersBadge: 'علاقات مبنية على الثقة',
    partnersTitle: 'شركاء النجاح',
    partnersDescription:
      'نفخر بشراكاتنا وعلاقاتنا المهنية التي تعكس الثقة المتبادلة، وتمنح عملاءنا حلولاً قانونية أكثر تكاملاً وفعالية.',

    partners: [
      { id: 1, name: 'Startups.' },
      { id: 2, name: 'Startups.' },
      { id: 3, name: 'Startups.' },
      { id: 4, name: 'Startups.' },
      { id: 5, name: 'Startups.' },
      { id: 6, name: 'Startups.' },
      { id: 7, name: 'Startups.' },
    ],
  },

  en: {
    title: 'Accreditations & Partnerships You Can Trust',

    description:
      'Licensed and accredited by leading judicial and arbitration institutions regionally and internationally.',

    accreditations: [
      {
        id: 1,
        title: 'Arab Lawyers Union',
        description: 'Certified professional membership',
        icon: HammerIcon,
      },
      {
        id: 2,
        title: 'International Arbitration Centre (ICC)',
        description: 'Officially registered arbitrators',
        icon: Briefcase,
      },
      {
        id: 3,
        title: 'Ministry of Justice',
        description: 'Professional license No. 402008',
        icon: BookOpenIcon,
      },
      {
        id: 4,
        title: 'Legal Excellence Standard',
        description: 'ISO 9001 data and quality standards',
        icon: ShieldCheckIcon,
      },
    ],

    partnersBadge: 'Relationships Built on Trust',
    partnersTitle: 'Success Partners',
    partnersDescription:
      'We are proud of professional partnerships built on mutual trust, enabling us to provide more integrated and effective legal solutions.',

    partners: [
      { id: 1, name: 'Startups.' },
      { id: 2, name: 'Startups.' },
      { id: 3, name: 'Startups.' },
      { id: 4, name: 'Startups.' },
      { id: 5, name: 'Startups.' },
      { id: 6, name: 'Startups.' },
      { id: 7, name: 'Startups.' },
    ],
  },
}

export default function Partnerships({ locale }: PartnershipsProps) {
  const data = content[locale]

  return (
    <section
      className="relative overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background Decorations */}
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
        {/* ==========================================
            Accreditations Heading
        ========================================== */}
        <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[650px] text-[28px] leading-[1.35] font-bold text-white sm:text-[34px] lg:text-[40px] xl:text-[44px]">
            {data.title}
          </h2>

          <p className="max-w-[500px] text-12 leading-6 text-white/45 sm:text-13 lg:text-14">
            {data.description}
          </p>
        </div>

        {/* ==========================================
            Accreditations Cards
        ========================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {data.accreditations.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.id}
                className="group flex min-h-[135px] flex-col items-center justify-center rounded-[14px] border border-secondary/20 bg-white/[0.015] px-5 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/45 hover:bg-secondary/[0.035]"
              >
                <div className="mb-4 flex size-9 items-center justify-center text-secondary">
                  <Icon size={24} duration={1} color="currentColor" />
                </div>

                <h3 className="text-14 font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-15">
                  {item.title}
                </h3>

                <p className="mt-2 text-11 leading-5 text-white/40 sm:text-12">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>

        {/* ==========================================
            Partners
        ========================================== */}
        <div className="pt-24 sm:pt-28 lg:pt-36">
          {/* Partners Heading */}
          <div className="mx-auto mb-10 flex max-w-[720px] flex-col items-center text-center sm:mb-12">
            <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
              {data.partnersBadge}
            </div>

            <h2 className="text-[28px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[40px]">
              {data.partnersTitle}
            </h2>

            <p className="mt-3 max-w-[650px] text-12 leading-6 text-white/45 sm:text-13 lg:text-14">
              {data.partnersDescription}
            </p>
          </div>

          {/* Partners Logos */}
          <PartnersSlider locale={locale} partners={data.partners} />
        </div>
      </Container>
    </section>
  )
}
