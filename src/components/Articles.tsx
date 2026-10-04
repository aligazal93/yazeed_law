import Image from 'next/image'
import Link from 'next/link'

import { MoveLeftIcon, MoveRightIcon } from '@animateicons/react/lucide'

import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'
import ArticleCard from './features/ArticleCard'

type ArticlesProps = {
  locale: Locale
}

type Article = {
  id: number
  title: string
  description: string
  category: string
  date: string
  image: string
  href: string
}

type ArticlesContent = {
  badge: string
  title: string
  viewAll: string
  readMore: string
  articles: Article[]
}

const content: Record<Locale, ArticlesContent> = {
  ar: {
    badge: 'المعرفة القانونية',
    title: 'أحدث المقالات والرؤى',
    viewAll: 'تصفح كافة المقالات',
    readMore: 'قراءة المقال',

    articles: [
      {
        id: 1,
        title: 'التعديلات الجوهرية في أنظمة الشركات وآثارها على الشركات والمستثمرين',
        description:
          'تحليل لأبرز التعديلات النظامية الحديثة وانعكاساتها على الحوكمة وبيئة الأعمال والاستثمار.',
        category: 'قانون الشركات',
        date: '12 مارس 2026',
        image: '/images/post-1.png',
        href: '/articles/company-law-updates',
      },
      {
        id: 2,
        title: 'التحولات الرقمية في بيئة الأعمال وأثرها على الالتزامات القانونية',
        description:
          'نظرة قانونية حول التحول الرقمي، حماية البيانات والالتزامات الجديدة على المنشآت والشركات.',
        category: 'تقنية وقانون',
        date: '8 مارس 2026',
        image: '/images/post-2.png',
        href: '/articles/digital-business-law',
      },
      {
        id: 3,
        title: 'أهم التغيرات القانونية التي يجب على الشركات معرفتها خلال الفترة القادمة',
        description:
          'استعراض لأهم المستجدات التشريعية والتنظيمية التي تؤثر على العمليات التجارية واتخاذ القرار.',
        category: 'تحديثات قانونية',
        date: '2 مارس 2026',
        image: '/images/post-3.png',
        href: '/articles/legal-changes',
      },
    ],
  },

  en: {
    badge: 'Legal Knowledge',
    title: 'Latest Articles & Insights',
    viewAll: 'View All Articles',
    readMore: 'Read Article',

    articles: [
      {
        id: 1,
        title: 'Key Corporate Law Updates and Their Impact on Businesses and Investors',
        description:
          'An analysis of recent regulatory developments and their impact on corporate governance and investment.',
        category: 'Corporate Law',
        date: '12 March 2026',
        image: '/images/post-1.png',
        href: '/',
      },
      {
        id: 2,
        title: 'Digital Transformation in Business and Its Legal Implications',
        description:
          'A legal perspective on digital transformation, data protection and emerging corporate obligations.',
        category: 'Technology & Law',
        date: '8 March 2026',
        image: '/images/post-2.png',
        href: '/',
      },
      {
        id: 3,
        title: 'Legal Changes Businesses Should Prepare for in the Coming Period',
        description:
          'An overview of important legislative and regulatory developments affecting business operations.',
        category: 'Legal Updates',
        date: '2 March 2026',
        image: '/images/post-3.png',
        href: '',
      },
    ],
  },
}

export default function Articles({ locale }: ArticlesProps) {
  const data = content[locale]

  return (
    <section
      className="relative overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-20"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Container>
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
              {data.badge}
            </div>

            <h2 className="text-[22px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[30px]">
              {data.title}
            </h2>
          </div>

          <Link
            href={`/${locale}/articles`}
            className="group inline-flex items-center gap-2 self-start text-12 font-medium text-secondary transition-colors duration-300 hover:text-white lg:self-auto"
          >
            <span>{data.viewAll}</span>

            {locale === 'ar' ? (
              <MoveLeftIcon
                size={17}
                duration={1}
                color="currentColor"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            ) : (
              <MoveRightIcon
                size={17}
                duration={1}
                color="currentColor"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </Link>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.articles.map((article) => (
            <ArticleCard
              key={article.id}
              locale={locale}
              article={article}
              readMore={data.readMore}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
