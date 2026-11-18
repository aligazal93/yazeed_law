import type { Locale } from '@/lib/getDictionary'
import { QuoteIcon, StarIcon } from '@/components/ui/Icons'
import type { Testimonial } from '../Testimonials'

type TestimonialsSliderProps = { locale: Locale; testimonials: Testimonial[] }

export default function TestimonialsSlider({ locale, testimonials }: TestimonialsSliderProps) {
  return (
    <div className="relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 hidden w-12 bg-gradient-to-e from-transparent to-[#030C19] lg:block" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-20 hidden w-12 bg-gradient-to-s from-transparent to-transparent lg:block" />
      <div
        className="performance-scroll grid snap-x snap-mandatory auto-cols-[92%] grid-flow-col gap-3 overflow-x-auto px-1 pb-3 sm:auto-cols-[64%] md:auto-cols-[48%] lg:auto-cols-[32%] lg:gap-5"
        tabIndex={0}
        aria-label={locale === 'ar' ? 'آراء العملاء' : 'Client testimonials'}
      >
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="group relative flex min-h-[285px] snap-start flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-5 transition-colors duration-300 hover:border-secondary/35 sm:p-6"
          >
            <div className="relative z-10 flex size-10 items-center justify-center rounded-full bg-secondary/20 text-secondary">
              <QuoteIcon size={16} />
            </div>
            <div className="relative z-10 mt-4 flex items-center gap-1 text-secondary">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <StarIcon key={index} size={20} className="[&_path]:fill-current" />
              ))}
            </div>
            <blockquote className="relative z-10 mt-4 flex-1 text-12 leading-7 font-medium text-white/80">
              “{testimonial.text}”
            </blockquote>
            <div className="relative z-10 mt-6 border-t border-white/[0.07] pt-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D8B86F_0%,#A27B32_100%)] text-12 font-bold text-[#07101D]">
                  {getInitials(testimonial.name)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-13 font-bold text-white sm:text-14">
                    {testimonial.name}
                  </h3>
                  <p className="mt-1 truncate text-10 text-white/35 sm:text-11">
                    {testimonial.position}
                    {testimonial.company ? ` · ${testimonial.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function getInitials(name: string) {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
}
