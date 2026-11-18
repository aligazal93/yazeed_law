import Link from 'next/link'
import type { ReactNode } from 'react'
import Container from './Container'

type BreadcrumbItem = {
  label: string
  href?: string
}

type PageHeroProps = {
  breadcrumbs: BreadcrumbItem[]
  title: ReactNode
  content: string
}

export default function BreadcrumbCrumb({ breadcrumbs, title, content }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-12 bg-[#020B18]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(162,123,50,0.12),transparent_45%)]" />

      <Container>
        <div className="relative flex min-h-[228px] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[280px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 rounded-full border border-[#A27B32]/20 bg-white/[0.02] px-4 py-1.5 text-[11px] text-white/50"
          >
            <ol className="flex items-center justify-center gap-2">
              {breadcrumbs.map((item, index) => (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <span className="text-[#A27B32]/60">›</span>}

                  {item.href ? (
                    <Link href={item.href} className="transition-colors hover:text-[#C9A96E]">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[#C9A96E]" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="mb-4 text-[26px] font-bold leading-[1.5] text-white md:text-[34px] lg:text-[38px]">
            {title}
          </h1>

          <p className="max-w-[760px] text-[13px] leading-7 text-white md:text-[14px]">{content}</p>
        </div>
      </Container>
    </section>
  )
}
