import { CheckIcon, MoveLeftIcon, MoveRightIcon } from '@/components/ui/Icons'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ConsultationModal from '@/components/ConsultationModal'
import PageHero from '@/components/layouts/BreadCrumb'
import Container from '@/components/layouts/Container'
import { getAssetUrl, getServicePageData } from '@/lib/api'
import { createPageMetadata, getAbsoluteUrl, serializeJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'

type Locale = 'ar' | 'en'

type ServiceDetailsPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({ params }: ServiceDetailsPageProps): Promise<Metadata> {
  const { locale: requestedLocale, slug } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const { service } = await getServicePageData(locale, slug)

  if (!service) return { robots: { index: false, follow: false } }

  return createPageMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.description,
    image: getAssetUrl(service.details?.image),
  })
}

const labels = {
  ar: {
    home: 'الرئيسية',
    services: 'خدماتنا',
    allServices: 'كل التخصصات',
    servicesTitle: 'خدماتنا في هذا المجال',
    whyTitle: 'لماذا تختارنا؟',
    whyDescription:
      'نقدم الخدمة القانونية بخبرة عملية واهتمام كامل بالتفاصيل، مع تواصل واضح في كل مرحلة.',
    sidebarTitle: 'هل تحتاج مساعدة؟',
    sidebarDescription: 'احجز استشارتك الآن وتحدث مع أحد محامينا المتخصصين.',
    cta: 'احجز استشارة',
  },
  en: {
    home: 'Home',
    services: 'Services',
    allServices: 'All Practices',
    servicesTitle: 'Our Services in This Practice',
    whyTitle: 'Why Choose Us?',
    whyDescription:
      'We deliver practical legal support with close attention to detail and clear communication at every stage.',
    sidebarTitle: 'Need Legal Support?',
    sidebarDescription: 'Book a consultation and speak with one of our specialist lawyers.',
    cta: 'Book a Consultation',
  },
} as const

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  const { locale: requestedLocale, slug } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const data = await getServicePageData(locale, slug)

  if (!data.service) notFound()

  const service = data.service
  const details = service.details
  const text = labels[locale]
  const imageUrl = getAssetUrl(details?.image) || '/images/about-bk.png'
  const intro = details?.intro || service.description
  const paragraphs = intro
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    image: getAbsoluteUrl(imageUrl),
    provider: { '@type': 'LegalService', name: 'YAZ Law' },
    areaServed: 'Saudi Arabia',
  }

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} className="bg-[#020B18] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <PageHero
        breadcrumbs={[
          { label: text.home, href: `/${locale}` },
          { label: text.services, href: `/${locale}/services` },
          { label: service.title },
        ]}
        title={service.title}
        content={service.description}
      />

      <section className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_85%,rgba(201,169,110,0.07),transparent_32%)]" />

        <Container>
          <div className="grid grid-cols-12 gap-6  xl:gap-8">
            <div className="col-span-12 lg:col-span-9">
              <article className=" overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07111E]/75 shadow-[0_25px_90px_rgba(0,0,0,0.18)] ">
                <div className="relative aspect-[16/8.5] min-h-[230px] overflow-hidden sm:min-h-[330px]">
                  <Image
                    src={imageUrl}
                    alt={details?.imageAlt || service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06101D]/45 via-transparent to-transparent" />
                </div>

                <div className="space-y-8 p-5 sm:p-8 lg:p-10">
                  <div className="space-y-4 text-[13px] leading-8 text-white/65 sm:text-sm">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {details?.serviceItems?.length ? (
                    <section>
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        {details.servicesTitle || text.servicesTitle}
                      </h2>
                      <ul className="mt-5 grid gap-3">
                        {details.serviceItems.map((item, index) => (
                          <li
                            key={item.id || index}
                            className="flex items-start gap-3 text-[13px] leading-7 text-white/70"
                          >
                            <span className="mt-1.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                              <CheckIcon size={10} />
                            </span>
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section>
                    <h2 className="text-lg font-bold text-white sm:text-xl">
                      {details?.whyTitle || text.whyTitle}
                    </h2>
                    <p className="mt-4 text-[13px] leading-8 text-white/65 sm:text-sm">
                      {details?.whyDescription || text.whyDescription}
                    </p>
                  </section>

                  {details?.highlightText ? (
                    <div className="border-s-2 border-secondary rounded-e-xl bg-[linear-gradient(90deg,rgba(201,169,110,0.02),rgba(201,169,110,0.11))] px-5 py-4 text-[13px] leading-7 text-secondary rtl:bg-[linear-gradient(270deg,rgba(201,169,110,0.02),rgba(201,169,110,0.11))]">
                      {details.highlightText}
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <aside className=" space-y-4  lg:sticky">
                <nav
                  aria-label={text.allServices}
                  className="rounded-2xl border border-white/[0.08] bg-[#0A1320] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.16)]"
                >
                  <h2 className="border-b border-white/[0.08] px-2 pb-4 text-sm font-bold text-white">
                    {text.allServices}
                  </h2>

                  <ul className="mt-3 space-y-1.5">
                    {data.services.map((item) => {
                      const active = item.slug === service.slug

                      return (
                        <li key={item.id}>
                          <Link
                            href={`/${locale}/services/${item.slug}`}
                            aria-current={active ? 'page' : undefined}
                            className={`flex min-h-10 items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs transition-colors ${
                              active
                                ? 'bg-secondary/15 font-semibold text-secondary'
                                : 'text-white/65 hover:bg-white/[0.04] hover:text-white'
                            }`}
                          >
                            <span>{item.title}</span>
                            {locale === 'ar' ? (
                              <MoveLeftIcon size={14} className="shrink-0" />
                            ) : (
                              <MoveRightIcon size={14} className="shrink-0" />
                            )}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>

                <div className="rounded-2xl border border-secondary/25 bg-[linear-gradient(145deg,rgba(201,169,110,0.07),rgba(255,255,255,0.015))] p-5">
                  <h2 className="text-sm font-bold text-white">{text.sidebarTitle}</h2>
                  <p className="mt-3 text-xs leading-6 text-white/50">{text.sidebarDescription}</p>
                  <ConsultationModal
                    locale={locale}
                    label={text.cta}
                    className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-gold-gradient px-5 text-xs font-bold text-primary transition hover:brightness-110"
                  />
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
