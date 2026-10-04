'use client'

import Image from 'next/image'

import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import type { Locale } from '@/lib/getDictionary'

type Partner = {
  id: number
  name: string
  logo?: string
}

type PartnersSliderProps = {
  locale: Locale
  partners: Partner[]
}

export default function PartnersSlider({ locale, partners }: PartnersSliderProps) {
  return (
    <div className="relative overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Side fades */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 w-12 bg-gradient-to-e from-transparent to-[#030C19] sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-20 w-12 bg-gradient-to-s from-transparent to-transparent" />

      <Swiper
        modules={[Autoplay]}
        loop
        grabCursor
        spaceBetween={12}
        speed={4500}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: locale === 'ar',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.6,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 2.2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        className="partners-slider"
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="group flex h-[78px] items-center justify-center rounded-lg border border-secondary/20 bg-white/[0.015] px-5 transition-all duration-300 ">
              {partner.logo ? (
                <div className="relative h-9 w-full max-w-[120px]">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="120px"
                    className="object-contain opacity-60 grayscale transition-all duration-300 "
                  />
                </div>
              ) : (
                <span
                  dir="ltr"
                  className="text-[17px] font-semibold text-white/55 transition-colors duration-300 "
                >
                  {partner.name}
                </span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
