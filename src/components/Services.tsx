import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'
import { Briefcase, MoveLeftIcon, MoveRightIcon } from '@animateicons/react/lucide'

type ServicesProps = {
  locale: Locale
}

type IconType = 'business' | 'gavel' | 'bank' | 'users' | 'idea' | 'shield'

type Service = {
  id: number
  title: string
  description: string
  category: string
  href: string
  icon: IconType
}

const content = {
  ar: {
    badge: 'خدماتنا',
    title: 'مجالاتنا القانونية والممارسات',
    description: 'نغطي كافة فروع القانون عبر أقسام تخصصية يقودها نخبة من المحامين المعتمدين',
    action: 'استشر الآن',

    services: [
      {
        id: 1,
        title: 'قانون الشركات والتجاري',
        description:
          'تأسيس الشركات، صياغة الاتفاقيات التجارية، الاستحواذ والاندماج، حوكمة مجالس الإدارة والامتثال للأنظمة التجارية المعاصرة.',
        category: 'تمثيل كامل',
        href: '/services/corporate-law',
        icon: 'business',
      },
      {
        id: 2,
        title: 'التحكيم وفض المنازعات',
        description:
          'تسوية النزاعات البديلة، التحكيم المحلي والدولي، المرافعة أمام هيئات التحكيم المعتمدة وتنفيذ أحكام المحكمين الوطنية والدولية.',
        category: 'محكمون معتمدون',
        href: '/services/arbitration',
        icon: 'gavel',
      },
      {
        id: 3,
        title: 'القانون المدني والعقاري',
        description:
          'منازعات الملكية العقارية، عقود التطوير الإنشائي، نزاعات الإيجارات، صياغة العقود المدنية المعقدة والتعويضات عن الأضرار.',
        category: 'حماية الأصول',
        href: '/services/real-estate',
        icon: 'bank',
      },
      {
        id: 4,
        title: 'قضايا العمل والعمال',
        description:
          'صياغة لوائح العمل الداخلية للمؤسسات، تسوية النزاعات العمالية، قضايا الفصل التعسفي ومكافآت نهاية الخدمة والتأمينات.',
        category: 'لجان العمل',
        href: '/services/labor-law',
        icon: 'users',
      },
      {
        id: 5,
        title: 'الملكية الفكرية وبراءات الاختراع',
        description:
          'تسجيل العلامات التجارية وحمايتها، براءات الاختراع وحقوق المؤلف، مكافحة التعدي على العلامات والملكية الفكرية ونقل التكنولوجيا.',
        category: 'حماية الابتكار',
        href: '/services/intellectual-property',
        icon: 'idea',
      },
      {
        id: 6,
        title: 'القانون الجنائي وقضايا المال',
        description:
          'الدفاع في قضايا الجرائم المالية والضريبية والجرائم الإلكترونية والمعلوماتية، الاحتيال التجاري والجرائم ذات الطابع الاقتصادي.',
        category: 'دفاع استراتيجي',
        href: '/services/criminal-law',
        icon: 'shield',
      },
    ] as Service[],
  },

  en: {
    badge: 'Our Services',
    title: 'Our Legal Practices',
    description:
      'We cover a wide range of legal disciplines through specialized departments led by experienced and licensed lawyers.',
    action: 'Consult Now',

    services: [
      {
        id: 1,
        title: 'Corporate & Commercial Law',
        description:
          'Company formation, commercial agreements, mergers and acquisitions, corporate governance and compliance with modern commercial regulations.',
        category: 'Full Representation',
        href: '/services/corporate-law',
        icon: 'business',
      },
      {
        id: 2,
        title: 'Arbitration & Dispute Resolution',
        description:
          'Alternative dispute resolution, local and international arbitration, representation before arbitration tribunals and enforcement of awards.',
        category: 'Certified Arbitrators',
        href: '/services/arbitration',
        icon: 'gavel',
      },
      {
        id: 3,
        title: 'Civil & Real Estate Law',
        description:
          'Property disputes, construction development agreements, lease disputes, complex civil contracts and compensation claims.',
        category: 'Asset Protection',
        href: '/services/real-estate',
        icon: 'bank',
      },
      {
        id: 4,
        title: 'Labor & Employment Law',
        description:
          'Internal employment regulations, labor dispute resolution, wrongful termination cases, end-of-service benefits and employment matters.',
        category: 'Employment Law',
        href: '/services/labor-law',
        icon: 'users',
      },
      {
        id: 5,
        title: 'Intellectual Property',
        description:
          'Trademark registration and protection, patents, copyrights, infringement disputes, intellectual property protection and technology transfer.',
        category: 'Innovation Protection',
        href: '/services/intellectual-property',
        icon: 'idea',
      },
      {
        id: 6,
        title: 'Criminal & Financial Law',
        description:
          'Defense in financial, tax and cybercrime cases, commercial fraud and complex economic crime matters.',
        category: 'Strategic Defense',
        href: '/services/criminal-law',
        icon: 'shield',
      },
    ] as Service[],
  },
} as const

export default function Services({ locale }: ServicesProps) {
  const data = content[locale]

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background Image */}
      <Image
        src="/images/bg.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />

      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#030C19]/72" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#030C19_0%,rgba(3,12,25,0.65)_28%,rgba(3,12,25,0.68)_65%,#030C19_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(23,35,52,0.10)_0%,rgba(3,12,25,0.45)_68%,#030C19_100%)]" />

      <Container className="relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-10 flex max-w-[760px] flex-col items-center text-center sm:mb-12 lg:mb-14">
          <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-full border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary backdrop-blur-sm">
            {data.badge}
          </div>

          <h2 className="text-[28px] leading-[1.35] font-bold text-white sm:text-[34px] lg:text-[40px] xl:text-[44px]">
            {data.title}
          </h2>

          <p className="mt-3 max-w-[650px] text-13 leading-6 font-normal text-white/55 sm:text-14 lg:text-15">
            {data.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {data.services.map((service) => (
            <article
              key={service.id}
              className="group relative flex min-h-[235px] flex-col overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30 hover:bg-white/[0.055] sm:p-6"
            >
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute -top-16 end-[-70px] size-40 rounded-full bg-secondary/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative z-10 mb-6 text-secondary flex size-14 items-center justify-center  rounded-[10px] border border-secondary/20 bg-[linear-gradient(145deg,rgba(201,169,110,0.20),rgba(162,123,50,0.12))] text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Briefcase size={20} duration={2} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className="text-17 leading-7 font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-18">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 text-12 leading-6 font-normal text-white/65 sm:text-13">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <Link
                    href={`/${locale}${service.href}`}
                    className="group/link inline-flex items-center gap-2 text-14 font-medium text-secondary transition-all duration-300 "
                  >
                    <span>{data.action}</span>
                    {locale === 'ar' ? (
                      <MoveLeftIcon size={18} duration={1} color="#ECD16E" />
                    ) : (
                      <MoveRightIcon size={18} duration={1} color="#ECD16E" />
                    )}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
