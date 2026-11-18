import Container from '@/components/layouts/Container'
import { CheckIcon } from '@/components/ui/Icons'
import Image from 'next/image'

type OurStoryProps = {
  locale?: 'ar' | 'en'
  badge?: string
  title?: string
  highlightedTitle?: string
  paragraphs?: string[]
  features?: string[]
  image?: string
}

export default function OurStory({
  locale = 'ar',
  badge = 'قصتنا',
  title = 'مكتب قانوني عريق',
  highlightedTitle = 'برؤية معاصرة',
  paragraphs = [
    'تأسس مكتب يزيد عبد الرحمن الزهراني للمحاماة عام 1998 ليكون بيتاً للخبرة القانونية الراسخة، نجمع بين عمق المعرفة القانونية وأحدث منهجيات العمل القانوني.',
    'نؤمن أن العلاقة مع العميل شراكة حقيقية، تبدأ بالاستماع الجيد وتنتهي بتحقيق أفضل نتيجة ممكنة، بشرط الشفافية الكاملة في الأسباب وفي توقعات النتائج.',
  ],
  features = ['فريق متخصص لكل مجال', 'سرية تامة', 'تقارير دورية', 'شبكة تعاون دولية'],
  image = '/images/about-1.png',
}: OurStoryProps) {
  return (
    <section
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden bg-[#050C17] py-16 text-white sm:py-20 lg:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_50%,rgba(201,169,110,0.09),transparent_55%)]" />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:100%_110px]" />

      <Container>
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          {/* Content */}
          <div className="">
            <span className="mb-5 inline-flex items-center rounded-md border border-[#C9A96E]/20 bg-[#C9A96E]/10 px-3 py-1.5 text-xs font-medium text-[#C9A96E]">
              {badge}
            </span>

            <h2 className="mb-6 text-3xl font-bold leading-[1.5] tracking-tight sm:text-4xl lg:text-[42px]">
              {title}{' '}
              <span className="bg-gradient-to-l from-[#E4C78F] via-[#C9A96E] to-[#9E762B] bg-clip-text text-transparent">
                {highlightedTitle}
              </span>
            </h2>

            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-[620px] text-sm leading-[2.1] text-white/65 sm:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Features */}
            <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                    <CheckIcon size={15} />
                  </span>

                  <span className="text-xs font-medium text-white/85 sm:text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full flex-1">
            <div className="relative mx-auto w-full max-w-[570px] px-5 py-8 sm:px-10 lg:px-12">
              <div className="pointer-events-none absolute -start-[-50%] top-1/2 z-0 h-[100%] w-full -translate-y-1/2 ">
                <Image
                  src="/images/layer.png"
                  alt=""
                  fill
                  sizes="450px"
                  className="object-contain object-center"
                />
              </div>

              <div className="relative z-10 mx-auto w-full max-w-[440px]">
                <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#081221] shadow-[0_25px_80px_rgba(0,0,0,0.40)]">
                  <Image
                    src={image}
                    alt={'About Yaz Law'}
                    width={700}
                    height={820}
                    sizes="(max-width: 768px) 90vw, 440px"
                    className="h-auto w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#020B18]/90 via-[#020B18]/35 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
