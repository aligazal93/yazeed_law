import Image from 'next/image'
import { LockKeyhole, Quote, ScanLine, ShieldCheck, Timer, UserIcon } from '@/components/ui/Icons'
import Container from '@/components/layouts/Container'

type Principle = {
  icon: 'lock' | 'timer' | 'shield' | 'scale'
  title: string
  description: string
}

type OurWordsProps = {
  locale?: 'ar' | 'en'
  quote?: string
  name?: string
  position?: string
  experience?: string
  principles?: Principle[]
}

const iconMap = {
  lock: LockKeyhole,
  timer: Timer,
  shield: ShieldCheck,
  scale: ScanLine,
}

const defaultPrinciples: Principle[] = [
  {
    icon: 'lock',
    title: 'سرية مطلقة',
    description: 'نظام تقني متقدم لحماية بيانات العملاء والوثائق الحساسة.',
  },
  {
    icon: 'timer',
    title: 'الالتزام بالمواعيد',
    description: 'آلية دقيقة لمواعيد العقود والملفات والمتابعة دون تأخير.',
  },
  {
    icon: 'shield',
    title: 'شفافية في التعامل',
    description: 'عقود خدمات واضحة ورسوم محددة وتقارير عملاء منتظمة.',
  },
  {
    icon: 'scale',
    title: 'فرق متعددة التخصصات',
    description: 'دراسة القضايا المختلفة من زوايا متعددة قبل اتخاذ أي إجراء.',
  },
]

export default function OurWords({
  locale = 'ar',
  quote = 'في عالم الأعمال المعقد، لا تقتصر مهمة المحامي على كسب القضايا فحسب، بل على تمكين العميل من اتخاذ القرارات الصحيحة دون خشية المفاجآت القانونية.',
  name = 'المستشار  اسم المؤسس',
  position = 'المؤسس والرئيس الرئيسي',
  principles = defaultPrinciples,
}: OurWordsProps) {
  return (
    <section
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-[#050C17] py-16 text-white sm:py-20 lg:min-h-[600px] lg:py-24"
    >
      {/* Background image */}
      <Image
        src="/images/about-bk.png"
        alt="قاعة اجتماعات مكتب المحاماة"
        fill
        priority={false}
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-[#030B18]/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#030B18]/25 via-[#030B18]/15 to-[#030B18]/45" />

      <Container>
        <div className="relative z-10 flex w-full justify-start">
          {/* Main card */}
          <div className="w-full max-w-[560px] rounded-[20px] border border-[#C9A96E]/15 bg-[#050E1E]/95 px-5 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-9 sm:py-10 lg:px-12 lg:py-14">
            {/* Quote icon */}
            <div className="mb-5 flex size-10 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
              <Quote size={20} />
            </div>

            {/* Quote */}
            <blockquote className="mb-8 text-[16px] font-medium leading-[2] text-white sm:text-[18px]">
              {quote}
            </blockquote>

            {/* Principles */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {principles.map((item, index) => {
                const Icon = iconMap[item.icon]

                return (
                  <div key={`${item.title}-${index}`} className="group">
                    <div className="mb-1.5 flex items-center gap-2 text-[#C9A96E]">
                      <Icon size={14} />
                      <h3 className="text-[12px] font-semibold">{item.title}</h3>
                    </div>

                    <p className="text-[11px] leading-[1.9] text-white/55">{item.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Founder */}
            <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary border border-[#C9A96E]/60 text-primary">
                <UserIcon size={20} />
              </div>

              <div>
                <h4 className="text-[13px] font-semibold text-white">{name}</h4>

                <p className="mt-1 text-[11px] text-[#C9A96E]">{position}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
