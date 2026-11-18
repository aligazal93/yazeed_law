'use client'

import { useId, useState } from 'react'
import { ChevronDownIcon } from '@/components/ui/Icons'
import Container from '@/components/layouts/Container'

type FAQItem = {
  question: string
  answer: string
}

type FAQProps = {
  badge?: string
  title?: string
  items?: FAQItem[]
  locale?: 'ar' | 'en'
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'كيف يتم تحديد الأتعاب؟',
    answer:
      'تعتمد على طبيعة القضية وحجم العمل المطلوب. نقدم لك عرضاً مكتوباً وواضحاً منذ البداية، دون أي مصاريف مفاجئة، مع إمكانية الاتفاق على أتعاب ثابتة أو نسبية حسب القضية.',
  },
  {
    question: 'هل يمكنني الحصول على استشارة عن بُعد؟',
    answer:
      'نعم، نوفر إمكانية الحصول على الاستشارات القانونية عن بُعد من خلال الهاتف أو الاجتماعات المرئية، بما يناسب احتياجاتك وموقعك.',
  },
  {
    question: 'ما هي سرية المعلومات التي أشاركها؟',
    answer:
      'نتعامل مع جميع المعلومات والمستندات التي يشاركها العملاء بسرية تامة، مع الالتزام بالمعايير المهنية والإجراءات اللازمة لحماية بياناتهم.',
  },
  {
    question: 'هل تتعاملون مع قضايا خارج مصر؟',
    answer:
      'يمكننا دراسة القضايا ذات الطابع الدولي وتحديد نطاق المساعدة القانونية المتاح وفقاً لطبيعة القضية والاختصاص القضائي.',
  },
  {
    question: 'كم تستغرق القضية عادة؟',
    answer:
      'تختلف المدة حسب نوع القضية وتعقيدها والإجراءات القانونية المتعلقة بها. نوضح لك المدة التقديرية بعد دراسة التفاصيل، مع متابعة المستجدات باستمرار.',
  },
]

export default function FAQ({
  badge = 'الأسئلة الشائعة',
  title = 'إجابات لأكثر ما يشغلك',
  items = defaultFAQs,
  locale = 'ar',
}: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(items.length ? 0 : null)

  const id = useId()

  return (
    <section
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden bg-[#050C17] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(201,169,110,0.06),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_110px] opacity-[0.035]" />

      <Container>
        <div className="relative z-10 mx-auto max-w-[1100px]">
          {/* Heading */}
          <div className="mb-10 text-center sm:mb-12">
            <span className="mb-3 inline-block text-xs font-medium text-[#C9A96E]">{badge}</span>

            <h2 className="text-[26px] font-bold leading-relaxed sm:text-[32px] lg:text-[36px]">
              {title}
            </h2>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {items.map((item, index) => {
              const isActive = activeIndex === index

              return (
                <div
                  key={`${item.question}-${index}`}
                  className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-[#C9A96E]/35 bg-[#1A1D21] shadow-[0_8px_35px_rgba(0,0,0,0.12)]'
                      : 'border-white/[0.07] bg-[#0D1522] hover:border-[#C9A96E]/25 hover:bg-[#111A27]'
                  }`}
                >
                  <h3>
                    <button
                      id={`${id}-trigger-${index}`}
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`${id}-panel-${index}`}
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-start sm:px-6"
                    >
                      <span
                        className={`text-[13px] font-semibold leading-6 transition-colors duration-300 sm:text-sm ${
                          isActive ? 'text-white' : 'text-white/85'
                        }`}
                      >
                        {item.question}
                      </span>

                      <ChevronDownIcon
                        size={17}
                        className={`shrink-0 text-[#C9A96E] transition-transform duration-300 ${
                          isActive ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  {/* Answer */}
                  <div
                    id={`${id}-panel-${index}`}
                    role="region"
                    aria-labelledby={`${id}-trigger-${index}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 text-[12px] leading-[2] text-white/50 sm:px-6 sm:pb-6 sm:text-[13px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
