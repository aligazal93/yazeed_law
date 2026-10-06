import type { Locale } from '@/lib/getDictionary'
import type { Testimonial as TestimonialsData } from '@/payload-types'
import Container from './layouts/Container'
import TestimonialsSlider from './features/TestimonialsSlider'

type TestimonialsProps = {
  locale: Locale
  data: TestimonialsData
}

export type Testimonial = {
  id: number
  name: string
  position: string
  company?: string
  text: string
  rating: number
}

const labels = {
  ar: {
    badge: 'شهادات نفتخر بها',
    title: 'ماذا يقول عملاؤنا؟',
    description: 'ثقة الشركات الكبرى ورواد الأعمال هي أثمن ما بنيناه عبر أكثر من 25 عاماً',
  },
  en: {
    badge: 'Testimonials We Value',
    title: 'What Do Our Clients Say?',
    description:
      'The trust of leading companies and entrepreneurs is our greatest achievement over more than 25 years.',
  },
} as const

export default function Testimonials({ locale, data }: TestimonialsProps) {
  const text = labels[locale]
  const testimonials = data.items.map((item, index) => ({
    id: index + 1,
    name: item.name,
    position: item.position,
    text: item.content,
    rating: item.rate,
  }))

  if (!testimonials.length) return null

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute start-0 top-0 -z-10 h-[55%] w-[45%] opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute bottom-[-200px] start-[10%] -z-10 size-[500px] rounded-full bg-secondary/[0.035] blur-[120px]" />

      <Container className="relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-10 flex max-w-[730px] flex-col items-center text-center sm:mb-12 lg:mb-14">
          <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
            {text.badge}
          </div>

          <h2 className="text-[28px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[40px]">
            {text.title}
          </h2>

          <p className="mt-3 max-w-[620px] text-12 leading-6 text-white/45 sm:text-13 lg:text-14">
            {text.description}
          </p>
        </div>

        <TestimonialsSlider locale={locale} testimonials={testimonials} />
      </Container>
    </section>
  )
}
