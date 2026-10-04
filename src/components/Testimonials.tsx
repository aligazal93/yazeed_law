import type { Locale } from '@/lib/getDictionary'
import Container from './layouts/Container'
import TestimonialsSlider from './features/TestimonialsSlider'

type TestimonialsProps = {
  locale: Locale
}

export type Testimonial = {
  id: number
  name: string
  position: string
  company: string
  text: string
  rating: number
}

type TestimonialsContent = {
  badge: string
  title: string
  description: string
  testimonials: Testimonial[]
}

const content: Record<Locale, TestimonialsContent> = {
  ar: {
    badge: 'شهادات نفتخر بها',
    title: 'ماذا يقول عملاؤنا؟',
    description: 'ثقة الشركات الكبرى ورواد الأعمال هي أثمن ما بنيناه عبر أكثر من 25 عاماً',

    testimonials: [
      {
        id: 1,
        name: 'المهندس وليد المنصور',
        position: 'الرئيس التنفيذي',
        company: 'شركة الشرق القابضة',
        text: 'ثقة كاملة في فريق العمل. تعاملنا معهم في عدد من القضايا التجارية المعقدة، وكان مستوى التدقيق والاحترافية مميزاً، وحصلنا على نتائج فاقت توقعاتنا.',
        rating: 5,
      },
      {
        id: 2,
        name: 'د. طارق الجبري',
        position: 'رئيس مجلس الإدارة',
        company: 'شركة الجبري للتطوير',
        text: 'خبرة حقيقية وفهم عميق للأنظمة. حصلنا على استشارات قانونية ساعدتنا في اتخاذ قرارات استراتيجية مهمة بثقة ووضوح.',
        rating: 5,
      },
      {
        id: 3,
        name: 'أ. مريم الشريف',
        position: 'مؤسسة ومديرة تنفيذية',
        company: 'شركة سمو للاستثمار',
        text: 'لا أعتبرهم مجرد مستشارين قانونيين، بل شريكاً استراتيجياً حقيقياً. الالتزام والوضوح وسرعة الاستجابة كانت على أعلى مستوى.',
        rating: 5,
      },
      {
        id: 4,
        name: 'أ. خالد العتيبي',
        position: 'المدير العام',
        company: 'مجموعة العتيبي التجارية',
        text: 'تميز الفريق في معالجة ملف تجاري معقد باحترافية عالية، وكانت المتابعة مستمرة والتواصل واضحاً في جميع مراحل القضية.',
        rating: 5,
      },
      {
        id: 5,
        name: 'م. عبدالله القحطاني',
        position: 'الشريك المؤسس',
        company: 'شركة رؤية',
        text: 'من أكثر الفرق القانونية التي تعاملنا معها احترافية. يقدمون رؤية قانونية واضحة قبل اتخاذ أي خطوة ويهتمون بأدق التفاصيل.',
        rating: 5,
      },
      {
        id: 6,
        name: 'أ. فيصل الحربي',
        position: 'الرئيس التنفيذي',
        company: 'مجموعة أصول',
        text: 'كان لهم دور أساسي في حماية مصالح الشركة وتطوير العديد من العقود والاتفاقيات. نقدر لهم المهنية والالتزام المستمر.',
        rating: 5,
      },
    ],
  },

  en: {
    badge: 'Testimonials We Value',
    title: 'What Do Our Clients Say?',
    description:
      'The trust of leading companies and entrepreneurs is our greatest achievement over more than 25 years.',

    testimonials: [
      {
        id: 1,
        name: 'Waleed Al Mansour',
        position: 'Chief Executive Officer',
        company: 'Al Sharq Holding',
        text: 'We have complete confidence in the team. Their professionalism, attention to detail and handling of complex commercial matters consistently exceeded our expectations.',
        rating: 5,
      },
      {
        id: 2,
        name: 'Dr. Tariq Al Jabri',
        position: 'Chairman',
        company: 'Al Jabri Development',
        text: 'Their deep legal knowledge and practical understanding helped us make important strategic decisions with confidence and clarity.',
        rating: 5,
      },
      {
        id: 3,
        name: 'Maryam Al Sharif',
        position: 'Founder & CEO',
        company: 'Sumou Investment',
        text: 'We see them as more than legal advisers. They are a genuine strategic partner with exceptional commitment, clarity and responsiveness.',
        rating: 5,
      },
    ],
  },
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const data = content[locale]

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030C19] py-16 sm:py-20 lg:py-24 xl:py-28"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute start-0 top-0 -z-10 h-[55%] w-[45%] opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute bottom-[-200px] start-[10%] -z-10 size-[500px] rounded-full bg-secondary/[0.035] blur-[120px]" />

      <Container className="relative z-10">
        {/* Heading */}
        <div className="mx-auto mb-10 flex max-w-[730px] flex-col items-center text-center sm:mb-12 lg:mb-14">
          <div className="mb-4 inline-flex min-h-8 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/[0.05] px-4 py-1.5 text-12 font-medium text-secondary">
            {data.badge}
          </div>

          <h2 className="text-[28px] leading-[1.3] font-bold text-white sm:text-[34px] lg:text-[40px]">
            {data.title}
          </h2>

          <p className="mt-3 max-w-[620px] text-12 leading-6 text-white/45 sm:text-13 lg:text-14">
            {data.description}
          </p>
        </div>

        <TestimonialsSlider locale={locale} testimonials={data.testimonials} />
      </Container>
    </section>
  )
}
