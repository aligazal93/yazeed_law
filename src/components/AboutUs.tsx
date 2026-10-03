import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'
import { CheckIcon, ClockIcon, DownloadIcon } from '@animateicons/react/lucide'
import { CheckListIcon } from '@animateicons/react/huge'

type AboutFeature = {
  id: number
  text: string
}

type AboutUsProps = {
  locale: Locale
}

const content = {
  ar: {
    badge: 'عن المكتب',
    title: 'ريادة قانونية بلا حدود',
    highlightedTitle: 'برؤية استراتيجية معاصرة',

    paragraphOne:
      'تأسس مكتب الميزان للمحاماة والاستشارات القانونية عام 1998، بهدف تقديم خدمات قانونية متكاملة تواكب أحدث المعايير المهنية العالمية، ليصبح اليوم كيانًا قانونيًا بارزًا يجمع بين كبار المحامين والمستشارين ذوي الخبرات الأكاديمية.',

    paragraphTwo:
      'نؤمن أن العدالة والوقاية القانونية تمثلان الركيزة لكل منشأة ناجحة، ونسعى جاهدين لتقديم حلول مبتكرة واستشارات استباقية تحمي العملاء من النزاعات قبل وقوعها، وتمكنهم من مواجهة تحديات البيئة القانونية بكفاءة.',

    buttonLabel: 'تحميل الملف التعريفي',
    buttonHref: '/about',

    year: '1998',
    yearLabel: 'سنة التأسيس',
    yearDescription: 'رحلة في ترسيخ العدالة وترسيخ الحقوق أمام المحاكم وهيئات التحكيم.',

    casesValue: '1,200+',
    casesLabel: 'قضية ناجحة',

    yearsValue: '+25',
    yearsLabel: 'عاماً من الخبرة',

    features: [
      {
        id: 1,
        text: 'خبرة قانونية راسخة في شتى فروع القانون',
      },
      {
        id: 2,
        text: 'شبكة تعاون استشارية إقليمية ودولية',
      },
      {
        id: 3,
        text: 'نخبة من المحامين والمستشارين المتخصصين',
      },
      {
        id: 4,
        text: 'تقارير دورية ورؤية شاملة للملف القانوني',
      },
    ] as AboutFeature[],
  },

  en: {
    badge: 'About Us',
    title: 'Legal Leadership Without Limits',
    highlightedTitle: 'With a Contemporary Strategic Vision',

    paragraphOne:
      'Al Mizan Law Firm was established in 1998 with the goal of delivering integrated legal services that align with the latest international professional standards, becoming a distinguished legal entity bringing together senior lawyers and consultants with strong academic expertise.',

    paragraphTwo:
      'We believe that justice and legal protection are the foundation of every successful organization. We work diligently to provide innovative legal solutions and proactive consultations that protect clients before disputes arise and empower them to face legal challenges efficiently.',

    buttonLabel: 'Download Company Profile',
    buttonHref: '/about',

    year: '1998',
    yearLabel: 'Year of Establishment',
    yearDescription:
      'A journey dedicated to advancing justice and safeguarding rights before courts and arbitration bodies.',

    casesValue: '1,200+',
    casesLabel: 'Successful Cases',

    yearsValue: '+25',
    yearsLabel: 'Years of Experience',

    features: [
      {
        id: 1,
        text: 'Solid legal expertise across multiple practice areas',
      },
      {
        id: 2,
        text: 'Regional and international advisory cooperation network',
      },
      {
        id: 3,
        text: 'A distinguished team of specialized lawyers and consultants',
      },
      {
        id: 4,
        text: 'Periodic reports and a comprehensive legal case vision',
      },
    ] as AboutFeature[],
  },
} as const

export default function AboutUs({ locale }: AboutUsProps) {
  const data = content[locale]

  return (
    <section
      className="relative isolate overflow-hidden bg-[#020B18] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* ==========================================
          Full Section Lines Background
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/lines.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center "
        />
      </div>

      {/* ==========================================
          Background dark overlay
          مهم يكون أخف من النسخة القديمة
          عشان lines.png تفضل ظاهرة
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,11,24,0.80)_0%,rgba(2,11,24,0.60)_50%,rgba(2,11,24,0.80)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(16,32,53,0.20)_0%,rgba(2,11,24,0.30)_55%,rgba(2,11,24,0.70)_100%)]" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-16 xl:gap-24">
          {/* ==========================================
              Content
          ========================================== */}
          <div className="w-full flex-1">
            {/* Badge */}
            <div className="mb-5 inline-flex min-h-8 items-center justify-center rounded-full border border-secondary/30 bg-secondary/[0.04] px-4 py-1.5 text-12 font-medium text-secondary backdrop-blur-sm">
              {data.badge}
            </div>

            {/* Heading */}
            <h2 className="max-w-[650px] text-[30px] leading-[1.35] font-bold text-white sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px]">
              <span className="block">{data.title}</span>

              <span className="mt-1 block bg-[linear-gradient(109deg,#E6C47D_0%,#A27B32_100%)] bg-clip-text text-transparent">
                {data.highlightedTitle}
              </span>
            </h2>

            {/* Description */}
            <div className="mt-6 max-w-[700px] space-y-5 text-14 leading-7 font-normal text-white/70 sm:text-15 lg:text-16 lg:leading-8">
              <p>{data.paragraphOne}</p>

              <p>{data.paragraphTwo}</p>
            </div>

            {/* Features */}
            <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {data.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/40 text-secondary">
                    <CheckIcon size={16} duration={2} color="#E6C47D" />
                  </div>

                  <p className="text-13 leading-6 font-medium text-white/80 sm:text-14">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-8">
              <Link
                href={`/${locale}${data.buttonHref}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-secondary/50 bg-secondary/[0.03] px-7 text-14 font-medium text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/10 hover:text-white"
              >
                <DownloadIcon size={20} duration={2} color="#E6C47D" />

                {data.buttonLabel}
              </Link>
            </div>
          </div>

          {/* ==========================================
              Image Side
          ========================================== */}
          <div className="relative w-full flex-1">
            <div className="relative mx-auto w-full max-w-[570px] px-5 py-8 sm:px-10 lg:px-12">
              {/* ==========================================
                  Decorative Layer Behind Image
              ========================================== */}
              <div className="pointer-events-none absolute -start-[-20%] top-1/2 z-0 h-[90%] w-full -translate-y-1/2 ">
                <Image
                  src="/images/layer.png"
                  alt=""
                  fill
                  sizes="450px"
                  className="object-contain object-center"
                />
              </div>

              {/* Additional glow behind image */}
              <div className="pointer-events-none absolute start-[10%] top-1/2 z-[1] h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-secondary/[0.04] blur-[70px]" />

              {/* ==========================================
                  Main About Image
              ========================================== */}
              <div className="relative z-10 mx-auto w-full max-w-[440px]">
                <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#081221] shadow-[0_25px_80px_rgba(0,0,0,0.40)]">
                  <Image
                    src="/images/about.png"
                    alt={locale === 'ar' ? 'عن مكتب المحاماة' : 'About Yaz Law'}
                    width={700}
                    height={820}
                    sizes="(max-width: 768px) 90vw, 440px"
                    className="h-auto w-full object-cover"
                  />

                  {/* Image dark bottom overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#020B18]/90 via-[#020B18]/35 to-transparent" />

                  {/* ==========================================
                      Foundation Year Glass Card
                  ========================================== */}
                  <div className="absolute inset-x-4 bottom-6 text-start z-20 rounded-[18px]  p-4 text-center shadow-[0_15px_40px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:inset-x-6 sm:bottom-4 sm:p-4">
                    <div className="text-[38px] leading-none font-bold tracking-[0.08em] text-secondary  sm:text-[38px]">
                      {data.year}
                    </div>

                    <div className="mt-2 text-13 font-semibold text-white sm:text-14">
                      {data.yearLabel}
                    </div>

                    <p className="mx-auto mt-2  text-10 leading-5 text-white/50 sm:text-11">
                      {data.yearDescription}
                    </p>
                  </div>
                </div>

                {/* ==========================================
                    Top Floating Card
                ========================================== */}
                <div className="absolute top-[14%] -start-3 z-30 rounded-xl border border-white/10 bg-[#071324]/95 px-3 py-2.5 shadow-[0_15px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:-start-10 sm:px-4 sm:py-3 lg:-start-14">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary/25 bg-secondary/10 text-secondary">
                      <CheckIcon size={20} duration={2} color="#E6C47D" />
                    </div>
                    <div>
                      <div className="text-14 leading-none font-bold text-white sm:text-16">
                        {data.casesValue}
                      </div>

                      <div className="mt-1 text-9 font-medium text-secondary sm:text-10">
                        {data.casesLabel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[34%] -end-3 z-30 rounded-xl border border-white/10 bg-[#071324]/95 px-3 py-2.5 shadow-[0_15px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:-end-10 sm:px-4 sm:py-3 lg:-end-14">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-secondary/25 bg-secondary/10 text-secondary">
                      <ClockIcon size={20} duration={2} color="#E6C47D" />
                    </div>
                    <div>
                      <div className="text-14 leading-none font-bold text-white sm:text-16">
                        {data.yearsValue}
                      </div>

                      <div className="mt-1 text-9 font-medium text-secondary sm:text-10">
                        {data.yearsLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
