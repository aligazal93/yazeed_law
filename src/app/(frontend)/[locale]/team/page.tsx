import Image from 'next/image'
import type { Metadata } from 'next'

import PageHero from '@/components/layouts/BreadCrumb'
import Container from '@/components/layouts/Container'
import { getAssetUrl, getTeamPage } from '@/lib/api'
import { createPageMetadata, serializeJsonLd } from '@/lib/seo'

type Locale = 'ar' | 'en'

const copy = {
  ar: {
    home: 'الرئيسية',
    page: 'فريق العمل',
    sectionBadge: 'كوادرنا',
    title: 'كوادر قانونية تقودها الخبرة والرؤية',
    description:
      'نعتز بفريق عمل يجمع بين الخبرة القانونية والرؤية الإدارية، ويعمل بتكامل لتقديم خدمات قانونية موثوقة.',
    empty: 'سيتم إضافة أعضاء فريق العمل قريبًا.',
  },
  en: {
    home: 'Home',
    page: 'Our Team',
    sectionBadge: 'Our Professionals',
    title: 'Legal professionals led by experience and vision',
    description:
      'Our team brings together legal expertise and administrative vision to deliver trusted, integrated legal services.',
    empty: 'Our team members will be added soon.',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const team = await getTeamPage(locale)
  const text = copy[locale]

  return createPageMetadata({
    locale,
    path: '/team',
    title: team.title || text.title,
    description: team.description || text.description,
  })
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const team = await getTeamPage(locale)
  const text = copy[locale]
  const members = (team.members || []).filter((member) => member.isActive !== false)
  const peopleSchema = members.map((member) => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.jobTitle,
    image: getAssetUrl(member.image) || undefined,
  }))

  return (
    <main className="bg-[#020B18] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {peopleSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: peopleSchema.map((person, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: person,
              })),
            }),
          }}
        />
      )}

      <PageHero
        breadcrumbs={[{ label: text.home, href: `/${locale}` }, { label: text.page }]}
        title={team.title || text.title}
        content={team.description || text.description}
      />

      <section className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(201,169,110,0.08),transparent_32%)]" />
        <Container>
          <div className="my-8 flex items-center justify-center gap-3 sm:mb-10">
            <span className="h-px w-10 bg-secondary/60" />
            <span className="text-[16px] font-bold tracking-[0.18em] text-secondary sm:text-[26px]">
              {text.sectionBadge}
            </span>
            <span className="h-px w-10 bg-secondary/60" />
          </div>

          {members.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {members.map((member) => {
                const imageUrl = getAssetUrl(member.image)

                return (
                  <article
                    key={member.id}
                    className="group overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025] transition duration-500 hover:-translate-y-1.5 hover:border-secondary/35 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,110,0.2),rgba(13,19,27,0.96)_64%)]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            viewBox="0 0 160 190"
                            className="h-[58%] w-auto text-secondary/30"
                            fill="none"
                          >
                            <circle cx="80" cy="52" r="34" fill="currentColor" />
                            <path d="M20 176c4-54 24-80 60-80s56 26 60 80" fill="currentColor" />
                            <path d="M38 176h84" stroke="currentColor" strokeWidth="6" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D131B] to-transparent" />
                    </div>

                    <div className="relative px-6 py-6 text-center">
                      <span className="absolute start-1/2 top-0 h-px w-16 -translate-x-1/2 bg-secondary rtl:translate-x-1/2" />
                      <h2 className="text-18 font-bold leading-8 text-white sm:text-20">
                        {member.name}
                      </h2>
                      <p className="mt-2 text-13 font-medium leading-6 text-secondary sm:text-14">
                        {member.jobTitle}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center text-sm text-white/50">
              {text.empty}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
