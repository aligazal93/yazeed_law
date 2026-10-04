import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'

type HowWorkingProps = {
  locale: Locale
}

type Step = {
  id: number
  number: string
  title: string
  description: string
}

type WorkingContent = {
  badge: string
  title: string
  description: string
  steps: Step[]
}

const content: Record<Locale, WorkingContent> = {
  ar: {
    badge: 'إجراءات منهجية',
    title: 'كيف نعمل معك؟',
    description: 'خطوات واضحة ومدروسة تضمن أعلى معدلات النجاح القانوني وتمنحك راحة البال',
    steps: [
      {
        id: 1,
        number: '01',
        title: 'استشارة أولية',
        description: 'جلسة استماع وتدقيق معمّق للوقائع والمستندات القانونية للقضية.',
      },
      {
        id: 2,
        number: '02',
        title: 'تحليل القضية',
        description: 'دراسة السوابق والوقوف الإجرائي وتحديد نقاط القوة والمخاطر.',
      },
      {
        id: 3,
        number: '03',
        title: 'وضع الاستراتيجية',
        description: 'صياغة خطة عمل محكمة تشمل الدفوع وجدول المواعيد والبدائل المتاحة.',
      },
      {
        id: 4,
        number: '04',
        title: 'التمثيل القضائي',
        description: 'المرافعة الرسمية وصياغة المذكرات وحضور جلسات التحكيم والتقاضي.',
      },
      {
        id: 5,
        number: '05',
        title: 'المتابعة والتنفيذ',
        description: 'تنفيذ الأحكام ومتابعة تحصيل الحقوق وإصدار تقرير ختامي شامل.',
      },
    ],
  },

  en: {
    badge: 'Structured Process',
    title: 'How Do We Work With You?',
    description:
      'A clear and carefully structured process designed to achieve strong legal outcomes and give you peace of mind.',
    steps: [
      {
        id: 1,
        number: '01',
        title: 'Initial Consultation',
        description:
          'A detailed consultation to understand the facts, documents and legal circumstances of your case.',
      },
      {
        id: 2,
        number: '02',
        title: 'Case Analysis',
        description:
          'Reviewing precedents, procedural status, strengths, risks and possible legal outcomes.',
      },
      {
        id: 3,
        number: '03',
        title: 'Strategy Development',
        description:
          'Developing a comprehensive legal strategy covering arguments, timelines and available alternatives.',
      },
      {
        id: 4,
        number: '04',
        title: 'Legal Representation',
        description:
          'Professional advocacy, preparation of legal submissions and representation before courts and tribunals.',
      },
      {
        id: 5,
        number: '05',
        title: 'Follow-up & Execution',
        description:
          'Following through on judgments, enforcing rights and providing a comprehensive final report.',
      },
    ],
  },
}

export default function HowWorking({ locale }: HowWorkingProps) {
  const data = content[locale]

  return (
    <section
      className="relative overflow-hidden bg-[#030C19] py-12 sm:py-20 lg:py-16 xl:py-20"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(201,169,110,0.05)_0%,transparent_45%)]" />

      <Container className="relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-14 flex max-w-[720px] flex-col items-center text-center lg:mb-16">
          <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.06] px-4 py-1.5 text-12 font-medium text-secondary">
            {data.badge}
          </div>

          <h2 className="text-[28px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[40px]">
            {data.title}
          </h2>

          <p className="mt-3 max-w-[620px] text-13 leading-6 text-white/45 sm:text-14">
            {data.description}
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="relative hidden lg:block">
          {/* Main Line */}
          <div className="absolute start-[10%] end-[10%] top-[31px] h-px bg-[linear-gradient(90deg,rgba(201,169,110,0.12),rgba(201,169,110,0.5),rgba(201,169,110,0.12))]" />

          <ol className="relative z-10 grid grid-cols-5 gap-5">
            {data.steps.map((step) => {
              const isActive = step.id === 3

              return (
                <li key={step.id} className="group flex flex-col items-center text-center">
                  {/* Circle */}
                  <div
                    className={`flex size-[62px] items-center justify-center rounded-full border text-16 font-bold transition-all duration-500 ${
                      isActive
                        ? 'scale-110 border-secondary bg-[linear-gradient(135deg,#D7B66F_0%,#A27B32_100%)] text-white shadow-[0_0_35px_rgba(201,169,110,0.25)]'
                        : 'border-secondary/35 bg-[#0B1421] text-secondary group-hover:border-secondary/70 group-hover:bg-secondary/10'
                    }`}
                  >
                    <span dir="ltr">{step.number}</span>
                  </div>

                  {/* Text */}
                  <div className="mt-5 max-w-[230px]">
                    <h3
                      className={`text-15 font-bold transition-colors duration-300 ${
                        isActive ? 'text-secondary' : 'text-white group-hover:text-secondary'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-2 text-12 leading-6 text-white/45">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Mobile + Tablet Timeline */}
        <ol className="relative mx-auto flex max-w-[650px] flex-col lg:hidden">
          {/* Vertical line */}
          <div className="absolute bottom-8 top-8 start-[27px] w-px bg-[linear-gradient(180deg,rgba(201,169,110,0.45),rgba(201,169,110,0.08))]" />

          {data.steps.map((step, index) => {
            const isActive = step.id === 3

            return (
              <li
                key={step.id}
                className={`relative flex gap-5 ${index !== data.steps.length - 1 ? 'pb-8' : ''}`}
              >
                {/* Circle */}
                <div
                  className={`relative z-10 flex size-[56px] shrink-0 items-center justify-center rounded-full border text-14 font-bold transition-all duration-300 ${
                    isActive
                      ? 'border-secondary bg-[linear-gradient(135deg,#D7B66F_0%,#A27B32_100%)] text-white shadow-[0_0_30px_rgba(201,169,110,0.22)]'
                      : 'border-secondary/35 bg-[#07111E] text-secondary'
                  }`}
                >
                  <span dir="ltr">{step.number}</span>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3
                    className={`text-15 font-bold sm:text-16 ${
                      isActive ? 'text-secondary' : 'text-white'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[480px] text-12 leading-6 text-white/45 sm:text-13">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
