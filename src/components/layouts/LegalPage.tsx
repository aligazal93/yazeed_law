import Link from 'next/link'

import Container from './Container'
import PageHero from './BreadCrumb'

export type LegalSection = {
  id: string
  title: string
  paragraphs?: string[]
  items?: string[]
}

type LegalPageProps = {
  locale: 'ar' | 'en'
  pageLabel: string
  title: string
  description: string
  lastUpdatedLabel: string
  lastUpdated: string
  contentsLabel: string
  sections: LegalSection[]
}

export default function LegalPage({
  locale,
  pageLabel,
  title,
  description,
  lastUpdatedLabel,
  lastUpdated,
  contentsLabel,
  sections,
}: LegalPageProps) {
  return (
    <main className="bg-[#020B18] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PageHero
        breadcrumbs={[
          { label: locale === 'ar' ? 'الرئيسية' : 'Home', href: `/${locale}` },
          { label: pageLabel },
        ]}
        title={title}
        content={description}
      />

      <section className="relative isolate overflow-hidden pb-20 sm:pb-24 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(201,169,110,0.07),transparent_30%)]" />
        <Container>
          <div className="grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
            <aside className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 lg:sticky lg:top-6">
              <p className="text-12 font-bold tracking-wide text-secondary">{contentsLabel}</p>
              <nav className="mt-4" aria-label={contentsLabel}>
                <ol className="space-y-1.5">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="flex gap-2 rounded-lg px-2 py-2 text-12 leading-5 text-white/55 transition hover:bg-white/[0.04] hover:text-secondary"
                      >
                        <span className="shrink-0 text-secondary/70">{index + 1}.</span>
                        <span>{section.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025]">
              <div className="border-b border-white/[0.07] px-6 py-5 sm:px-8">
                <p className="text-12 text-white/45">
                  {lastUpdatedLabel}: <time dateTime="2026-10-14">{lastUpdated}</time>
                </p>
              </div>

              <div className="divide-y divide-white/[0.07] px-6 sm:px-8">
                {sections.map((section, index) => (
                  <section
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-8 py-7 sm:py-9"
                    aria-labelledby={`${section.id}-title`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/[0.08] text-11 font-bold text-secondary">
                        {index + 1}
                      </span>
                      <h2
                        id={`${section.id}-title`}
                        className="text-18 font-bold leading-8 text-white sm:text-20"
                      >
                        {section.title}
                      </h2>
                    </div>

                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-4 text-14 leading-8 text-white/65 sm:text-15"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.items && (
                      <ul className="mt-4 space-y-3 text-14 leading-7 text-white/65 sm:text-15">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-secondary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>
    </main>
  )
}
