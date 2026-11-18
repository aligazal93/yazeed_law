import {
  ChartSplineIcon,
  ClockIcon,
  QuoteIcon,
  ShieldCheckIcon,
  UserIcon,
  UserRoundCogIcon,
  UsersRoundIcon,
} from '@/components/ui/Icons'

import type { Locale } from '@/lib/getDictionary'
import type { WhyUs as WhyUsData } from '@/payload-types'
import Container from './layouts/Container'

type WhyUsProps = {
  locale: Locale
  data: WhyUsData
}

const labels = {
  ar: {
    badge: 'لماذا نحن',
    title: 'ما يجعلنا الخيار الأول لعملائنا',
    description: 'لا نبيع وعوداً، بل نقدم منهجية عمل واضحة ونتائج قابلة للقياس في كل ملف نتولاه.',
  },
  en: {
    badge: 'Why Us',
    title: 'Why Clients Choose Us First',
    description:
      'We do not sell promises. We provide a clear methodology and measurable legal results in every case we handle.',
  },
} as const

const iconMap = {
  shield: ShieldCheckIcon,
  clock: ClockIcon,
  chart: ChartSplineIcon,
  users: UserRoundCogIcon,
} as const

export default function WhyUs({ locale, data }: WhyUsProps) {
  const text = labels[locale]
  const benefits = (data.items ?? []).map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.content,
    icon: iconMap[item.icon],
  }))

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Grid decoration */}
      <div
        className="pointer-events-none absolute inset-y-0 end-0 -z-10 w-[55%] opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_35%,rgba(255,255,255,0.035)_0%,transparent_38%)] rtl:bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.035)_0%,transparent_38%)]" />

      <Container>
        {/* Heading */}
        <div className="mx-auto mb-12 flex max-w-[760px] flex-col items-center text-center lg:mb-14">
          <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
            {text.badge}
          </div>

          <h2 className="text-[28px] leading-[1.35] font-bold text-white sm:text-[34px] lg:text-[40px]">
            {text.title}
          </h2>

          <p className="mt-3 max-w-[650px] text-13 leading-6 text-white/45 sm:text-14">
            {text.description}
          </p>
        </div>

        {/* Content */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.95fr] lg:gap-10 xl:gap-14">
          {/* Benefits */}
          <div className="flex flex-col gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <article
                  key={benefit.id}
                  className="group flex min-h-[92px] items-center gap-4 rounded-[14px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-white/[0.045] sm:p-5"
                >
                  {/* Icon */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-secondary/25 bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary/15">
                    <Icon size={21} duration={1} color="currentColor" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-15 font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-16">
                      {benefit.title}
                    </h3>

                    <p className="mt-1.5 text-11 leading-5 text-white/45 sm:text-12 sm:leading-6">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Quote Card */}
          <article className="relative flex min-h-[340px] flex-col justify-center overflow-hidden rounded-[20px] border border-secondary/25 bg-[linear-gradient(135deg,rgba(201,169,110,0.12)_0%,rgba(255,255,255,0.025)_45%,rgba(255,255,255,0.01)_100%)] p-6 sm:p-8 lg:p-9">
            {/* Glow */}
            <div className="pointer-events-none absolute -start-20 -top-20 size-64 rounded-full bg-secondary/[0.08] blur-[80px]" />

            {/* Quote Icon */}
            <div className="relative z-10 flex justify-center items-center block mx-auto size-14 items-center justify-center rounded-full bg-secondary/20 text-[36px] leading-none font-bold text-secondary sm:size-16">
              <QuoteIcon size={32} duration={1} color="currentColor" className="text-priamry" />
            </div>

            {/* Quote */}
            <blockquote className="relative z-10 mt-6 text-center text-[14px] leading-[1.9] font-bold text-white sm:text-[16px] lg:text-[18px]">
              {data.managerQuote}
            </blockquote>

            {/* Author */}
            <div className="relative z-10 mt-8 flex items-center justify-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E2C178_0%,#A27B32_100%)] text-13 font-bold text-[#10151E]">
                <UserIcon size={22} duration={1} color="currentColor" />
              </div>

              <div>
                <h4 className="text-14 font-bold text-white sm:text-14">{data.managerName}</h4>

                <p className="mt-1 text-10 text-white/40 sm:text-12">{data.managerPosition}</p>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
