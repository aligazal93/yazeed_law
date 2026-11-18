import type { ReactNode } from 'react'
import Container from '@/components/layouts/Container'
import { ClockIcon, ScanLineIcon, ShieldCheck, UsersRoundIcon } from '@/components/ui/Icons'

type ValueItem = {
  icon?: ReactNode
  title: string
  description: string
}

type OurValuesProps = {
  locale?: 'ar' | 'en'
  badge?: string
  title?: string
  description?: string
  items?: ValueItem[]
}

const defaultValues: ValueItem[] = [
  {
    icon: <ShieldCheck size={23} />,
    title: 'النزاهة',
    description: 'نلتزم بالشفافية والمهنية في كل خطوة، حتى نكون دائماً على مستوى ثقة عملائنا.',
  },
  {
    icon: <ScanLineIcon size={23} />,
    title: 'العدالة',
    description: 'ندافع عن حقوق عملائنا بكل الوسائل القانونية المشروعة، دون تنازل أو تهاون.',
  },
  {
    icon: <ClockIcon size={23} />,
    title: 'الالتزام',
    description: 'نحترم المواعيد والجلسات، ونحيط العميل بكل مستجد فور حدوثه دون تأخير.',
  },
  {
    icon: <UsersRoundIcon size={23} />,
    title: 'الشراكة',
    description: 'نبني لعملائنا شراكة في القرار، نشرح ونوضح ونستمع قبل أن نتحرك.',
  },
]

export default function OurValues({
  locale = 'ar',
  badge = 'قيمنا',
  title = 'المبادئ التي تحكم عملنا',
  description = 'نطبق كافة قيمنا القانونية على أسس تخصصية يقودها نخبة من المحامين المتميزين',
  items = defaultValues,
}: OurValuesProps) {
  return (
    <section
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden bg-[#050C17] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(201,169,110,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_110px] opacity-[0.04]" />

      <Container>
        <div className="relative z-10">
          {/* Section heading */}
          <div className="mx-auto mb-12 max-w-[680px] text-center sm:mb-14">
            <span className="mb-4 inline-flex items-center rounded-md border border-[#C9A96E]/20 bg-[#C9A96E]/10 px-3 py-1.5 text-xs font-medium text-[#C9A96E]">
              {badge}
            </span>

            <h2 className="mb-4 text-[28px] font-bold leading-relaxed sm:text-3xl lg:text-[36px]">
              {title}
            </h2>

            <p className="text-sm leading-7 text-white/50 sm:text-[15px]">{description}</p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {items.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07]  p-6 transition-all duration-500 hover:border-[#C9A96E]/40  sm:p-7"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-right scale-x-0 bg-gradient-to-l from-[#C9A96E] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {/* Icon */}
                <div className="mb-7 flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#C9A96E]/15 bg-[#C9A96E]/10 text-[#C9A96E] transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A96E]/30 group-hover:bg-[#C9A96E]/20">
                  {item.icon ?? defaultValues[index % defaultValues.length].icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#E4C78F]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-[2] text-white/55">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
