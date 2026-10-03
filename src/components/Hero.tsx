import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'

type HeroProps = {
  locale: Locale
}

const stats = [
  {
    value: '+25',
    label: 'عاماً من الريادة',
  },
  {
    value: '+1250',
    label: 'قضية ناجحة ومكتملة',
  },
  {
    value: '+250',
    label: 'محامياً ومستشاراً خبيراً',
  },
  {
    value: '95%',
    label: 'نسبة رضاء ونجاح العملاء',
  },
]

export default function Hero({ locale }: HeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#050C18]"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background */}
      <Image
        src="/images/intro.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center animate-hero-background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(67.7%_69.91%_at_50%_25%,rgba(30,32,35,0.82)_0%,rgba(5,12,24,0.92)_75%,#050C18_100%)]" />

      <Container className="relative flex min-h-[calc(100svh-110px)] flex-col justify-between">
        <div className="flex flex-1 items-center justify-center py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
            {/* Badge */}
            <div
              className="mb-5 inline-flex min-h-10 animate-hero-fade-down items-center gap-2 rounded-full border border-secondary/40 bg-white/[0.02] px-5 py-1.5 text-14 font-medium text-secondary backdrop-blur-sm sm:mb-6"
              style={{ animationDelay: '100ms' }}
            >
              <span className="size-1.5 rounded-full bg-secondary shadow-[0_0_10px_#C9A96E]" />

              <span>مكتب محاماة واستشارات قانونية معتمد · منذ 1998</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[850px] text-[30px] font-bold tracking-[-0.02em] text-white sm:text-[44px] lg:text-[48px] xl:text-[52px]">
              <span className="block animate-hero-fade-up" style={{ animationDelay: '220ms' }}>
                خبرة قانونية تحمي حقوقك
              </span>

              <span
                className="mt-1 block animate-hero-fade-up bg-[linear-gradient(109deg,#E6C47D_0%,#A27B32_100%)] bg-clip-text text-transparent"
                style={{ animationDelay: '340ms' }}
              >
                وتصون مصالحك الاستراتيجية
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-4 max-w-[720px] animate-hero-fade-up text-14 leading-6 font-normal text-white/65 sm:mt-6 sm:text-16 sm:leading-8 lg:text-18"
              style={{ animationDelay: '460ms' }}
            >
              أكثر من ربع قرن من التفوق القانوني والنزاهة المؤسسية. نكرس نخبة من ألمع المستشارين
              والمحامين لتقديم حلول قانونية استباقية رفيعة المستوى للأفراد والشركات.
            </p>

            {/* Actions */}
            <div
              className="mt-7 w-full flex  animate-hero-fade-up items-center justify-center gap-2 sm:mt-8 sm:w-auto sm:flex-row"
              style={{ animationDelay: '580ms' }}
            >
              <Link
                href="/"
                className="flex h-12 items-center justify-center rounded-xl bg-[linear-gradient(109deg,#C9A96E_0%,#9E762B_100%)] px-7 text-14 font-semibold text-white shadow-[0_8px_30px_rgba(201,169,110,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(201,169,110,0.22)] hover:brightness-110 sm:w-auto"
              >
                احجز استشارتك الأولى
              </Link>

              <Link
                href="/"
                className="flex h-12 items-center justify-center rounded-xl border border-secondary/70 bg-white/[0.01] px-7 text-14 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:bg-secondary/10 sm:w-auto"
              >
                تعرف على مجالاتنا
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 py-6 sm:py-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className="group flex min-h-[95px] animate-hero-scale-in flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.015] px-3 py-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white/[0.035] sm:min-h-[110px]"
                style={{
                  animationDelay: `${700 + index * 100}ms`,
                }}
              >
                <strong
                  dir="ltr"
                  className="text-24 leading-none font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-28 lg:text-[34px]"
                >
                  {stat.value}
                </strong>

                <span className="mt-2 text-12 leading-5 font-medium text-secondary sm:text-14">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
