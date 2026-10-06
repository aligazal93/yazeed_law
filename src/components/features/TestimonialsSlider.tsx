'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import type { Locale } from '@/lib/getDictionary'
import type { Testimonial } from '../Testimonials'
import { QuoteIcon, StarIcon } from '@animateicons/react/lucide'

type TestimonialsSliderProps = {
  locale: Locale
  testimonials: Testimonial[]
}

export default function TestimonialsSlider({ locale, testimonials }: TestimonialsSliderProps) {
  return (
    <div className="relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Side fades */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 hidden w-12 bg-gradient-to-e from-transparent to-[#030C19] lg:block" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-20 hidden w-12 bg-gradient-to-s from-transparent to-transparent lg:block" />

      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        grabCursor
        watchSlidesProgress
        spaceBetween={16}
        speed={700}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.08,
            spaceBetween: 12,
          },
          560: {
            slidesPerView: 1.5,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
        }}
        className="testimonials-slider !pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="!h-auto">
            <article className="group relative flex h-full min-h-[285px] flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-secondary/35 hover:bg-white/[0.05] sm:p-6">
              {/* Glow */}
              <div className="pointer-events-none absolute -end-16 -top-16 size-40 rounded-full bg-secondary/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Quote */}
              <div className="relative z-10 flex size-10 items-center justify-center  rounded-full bg-secondary/20 text-[27px] leading-none font-bold text-secondary">
                <QuoteIcon size={16} />
              </div>

              {/* Stars */}
              <div className="relative z-10 mt-4 flex items-center gap-1 text-secondary">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} className="text-[15px] leading-none">
                    <StarIcon
                      size={22}
                      color="currentColor"
                      className="text-secondary [&_path]:fill-current"
                    />
                  </span>
                ))}
              </div>

              {/* Review */}
              <blockquote className="relative z-10 mt-4 flex-1 text-12 leading-7 font-medium text-white/80">
                “{testimonial.text}”
              </blockquote>

              {/* Author */}
              <div className="relative z-10 mt-6 border-t border-white/[0.07] pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
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
          </SwiperSlide>
        ))}
      </Swiper>
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
