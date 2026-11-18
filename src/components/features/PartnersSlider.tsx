import Image from 'next/image'
import type { Locale } from '@/lib/getDictionary'

type Partner = { id: number; name: string; logo?: string }
type PartnersSliderProps = { locale: Locale; partners: Partner[] }

export default function PartnersSlider({ locale, partners }: PartnersSliderProps) {
  return (
    <div className="relative overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 w-12 bg-gradient-to-e from-transparent to-[#030C19] sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-20 w-12 bg-gradient-to-s from-transparent to-transparent" />
      <div
        className="performance-scroll grid snap-x snap-mandatory auto-cols-[62%] grid-flow-col gap-3 overflow-x-auto px-1 sm:auto-cols-[42%] md:auto-cols-[30%] lg:auto-cols-[22%] xl:auto-cols-[17%]"
        tabIndex={0}
        aria-label={locale === 'ar' ? 'شركاؤنا' : 'Our partners'}
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="group flex h-[78px] snap-start items-center justify-center rounded-lg border border-secondary/20 bg-white/[0.015] px-5 transition-colors duration-300 hover:border-secondary/40"
          >
            {partner.logo ? (
              <div className="relative h-9 w-full max-w-[120px]">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="120px"
                  className="object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ) : (
              <span dir="ltr" className="text-[17px] font-semibold text-white/55">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
