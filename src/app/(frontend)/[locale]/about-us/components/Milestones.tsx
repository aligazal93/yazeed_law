import Container from '@/components/layouts/Container'

type MilestoneItem = {
  year: string
  title: string
  description: string
}

type MilestonesProps = {
  locale?: 'ar' | 'en'
  badge?: string
  title?: string
  items?: MilestoneItem[]
}

const defaultMilestones: MilestoneItem[] = [
  {
    year: '1998',
    title: 'التأسيس',
    description: 'انطلاق المكتب في القاهرة كمكتب متخصص في القانون التجاري.',
  },
  {
    year: '2005',
    title: 'التوسع الإقليمي',
    description: 'افتتاح فروع في دبي والرياض لخدمة العملاء الإقليميين.',
  },
  {
    year: '2012',
    title: 'قسم التحكيم',
    description: 'إطلاق قسم متخصص في التحكيم التجاري الدولي.',
  },
  {
    year: '2018',
    title: 'الجوائز الدولية',
    description: 'حصد جائزة أفضل مكتب محاماة متخصص في المنطقة.',
  },
  {
    year: '2025',
    title: 'الابتكار',
    description: 'نهج حلول قانونية قائمة على التكنولوجيا والذكاء الاصطناعي.',
  },
]

export default function Milestones({
  locale = 'ar',
  badge = 'مسيرتنا',
  title = 'محطات في رحلة ربع قرن',
  items = defaultMilestones,
}: MilestonesProps) {
  return (
    <section
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden bg-[#050C17] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(201,169,110,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_110px] opacity-[0.04]" />

      <Container>
        <div className="relative z-10">
          {/* Heading */}
          <div className="mx-auto mb-14 max-w-[680px] text-center lg:mb-16">
            <span className="mb-3 inline-block text-xs font-medium text-[#C9A96E]">{badge}</span>

            <h2 className="text-[28px] font-bold leading-relaxed sm:text-3xl lg:text-[36px]">
              {title}
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line - Desktop */}
            <div className="absolute top-[23px] right-0 left-0 hidden h-px bg-gradient-to-l from-[#C9A96E]/30 via-white/15 to-white/5 lg:block" />

            {/* Vertical line - Mobile / Tablet */}
            <div className="absolute top-5 right-[22px] bottom-6 w-px bg-gradient-to-b from-[#C9A96E]/40 via-white/15 to-transparent lg:hidden" />

            <div className="grid grid-cols-1 gap-9 lg:grid-cols-5 lg:gap-6">
              {items.map((item, index) => (
                <article
                  key={`${item.year}-${index}`}
                  className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  {/* Timeline circle */}
                  <div
                    className={`relative z-10 flex size-[46px] shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold transition-all duration-300 lg:mb-5 ${
                      index === 0
                        ? 'border-[#C9A96E] bg-[#B18B47] text-white shadow-[0_0_0_5px_rgba(201,169,110,0.12)]'
                        : 'border-white/20 bg-[#101723] text-white/60 group-hover:border-[#C9A96E]/70'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5 lg:pt-0">
                    <span className="mb-3 block text-xs font-semibold tracking-wide text-[#C9A96E]">
                      {item.year}
                    </span>

                    <h3 className="mb-3 text-[16px] font-bold text-white transition-colors duration-300 group-hover:text-[#E4C78F]">
                      {item.title}
                    </h3>

                    <p className="max-w-[270px] text-[13px] leading-[1.9] text-white/55 lg:mx-auto">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
