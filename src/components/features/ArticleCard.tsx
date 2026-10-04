import Image from 'next/image'
import Link from 'next/link'

import { MoveLeftIcon, MoveRightIcon } from '@animateicons/react/lucide'

import type { Locale } from '@/lib/getDictionary'

export type ArticleCardData = {
  id: number
  title: string
  description: string
  category: string
  date: string
  image: string
  href: string
}

type ArticleCardProps = {
  locale: Locale
  article: ArticleCardData
  readMore: string
}

export default function ArticleCard({ locale, article, readMore }: ArticleCardProps) {
  const href = `/${locale}${article.href}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.015)_100%)] transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30">
      {/* Image */}
      <Link href={href} className="relative block h-[220px] overflow-hidden sm:h-[240px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030C19]/60 via-transparent to-transparent" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Meta */}
        <div className="flex items-center justify-between gap-3 text-10 sm:text-11">
          <span className="font-medium text-secondary">{article.category}</span>

          <time className="text-white/35">{article.date}</time>
        </div>

        {/* Title */}
        <Link href={href}>
          <h3 className="mt-4 text-16 leading-7 font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-17">
            {article.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-3 flex-1 text-12 leading-6 text-white/50 sm:text-13">
          {article.description}
        </p>

        {/* Footer */}
        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <Link
            href={href}
            className="group/link inline-flex items-center gap-2 text-12 font-medium text-secondary transition-colors duration-300 hover:text-white"
          >
            <span>{readMore}</span>

            {locale === 'ar' ? (
              <MoveLeftIcon
                size={16}
                duration={1}
                color="currentColor"
                className="transition-transform duration-300 group-hover/link:-translate-x-1"
              />
            ) : (
              <MoveRightIcon
                size={16}
                duration={1}
                color="currentColor"
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            )}
          </Link>
        </div>
      </div>
    </article>
  )
}
