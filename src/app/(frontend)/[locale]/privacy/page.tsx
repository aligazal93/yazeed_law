import type { Metadata } from 'next'

import LegalPage, { type LegalSection } from '@/components/layouts/LegalPage'
import { createPageMetadata, getBrandName, serializeJsonLd, siteUrl } from '@/lib/seo'

type Locale = 'ar' | 'en'

export const dynamic = 'force-static'

const content: Record<
  Locale,
  {
    pageLabel: string
    title: string
    description: string
    lastUpdatedLabel: string
    lastUpdated: string
    contentsLabel: string
    sections: LegalSection[]
  }
> = {
  ar: {
    pageLabel: 'سياسة الخصوصية',
    title: 'سياسة الخصوصية وحماية البيانات',
    description:
      'توضح هذه السياسة كيفية جمع واستخدام وحماية البيانات الشخصية عند استخدام موقع شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية.',
    lastUpdatedLabel: 'آخر تحديث',
    lastUpdated: '14 أكتوبر 2026',
    contentsLabel: 'محتويات السياسة',
    sections: [
      {
        id: 'introduction',
        title: 'مقدمة ونطاق السياسة',
        paragraphs: [
          'نحترم خصوصيتك ونلتزم بالتعامل مع بياناتك الشخصية بمسؤولية وشفافية وفق الأنظمة المعمول بها في المملكة العربية السعودية، بما في ذلك نظام حماية البيانات الشخصية ولوائحه التنفيذية. تسري هذه السياسة على البيانات التي تُجمع من خلال هذا الموقع ونماذجه الإلكترونية.',
        ],
      },
      {
        id: 'data-collected',
        title: 'البيانات التي نجمعها',
        items: [
          'بيانات التعريف والتواصل، مثل الاسم ورقم الهاتف والبريد الإلكتروني والمدينة.',
          'المعلومات التي تقدمها في طلب الاستشارة، مثل نوع الاستشارة والتخصص والموعد المفضل وملخص الموضوع.',
          'الملفات أو الصور التي تختار إرفاقها بطلب الاستشارة.',
          'بيانات تقنية أساسية قد تنتج عن استخدام الموقع، مثل عنوان بروتوكول الإنترنت ونوع المتصفح وسجلات الأمان والأداء.',
        ],
      },
      {
        id: 'purposes',
        title: 'أغراض استخدام البيانات',
        items: [
          'استلام طلبات الاستشارة ومراجعتها والتواصل مع أصحابها.',
          'تقديم الخدمات المطلوبة وإدارة العلاقة المهنية عند الاتفاق عليها.',
          'حماية الموقع ومنع إساءة الاستخدام وتحسين الأداء وتجربة المستخدم.',
          'الوفاء بالالتزامات النظامية والتنظيمية والمهنية وحفظ السجلات اللازمة.',
          'إرسال رسائل مرتبطة بطلبك، ولن نستخدم بياناتك للتسويق المباشر إلا عند وجود أساس نظامي أو موافقة مطلوبة.',
        ],
      },
      {
        id: 'legal-basis',
        title: 'الأساس النظامي للمعالجة',
        paragraphs: [
          'نعالج البيانات عند موافقتك أو بناءً على طلبك لاتخاذ خطوات قبل تقديم خدمة، أو لتنفيذ التزام تعاقدي أو نظامي، أو لتحقيق مصلحة مشروعة لا تتعارض مع حقوقك ومصالحك، وذلك وفق ما تسمح به الأنظمة السارية.',
        ],
      },
      {
        id: 'sharing',
        title: 'مشاركة البيانات ومقدمو الخدمات',
        paragraphs: [
          'لا نبيع بياناتك الشخصية. وقد نشارك القدر اللازم منها مع مقدمي خدمات موثوقين يدعمون تشغيل الموقع والاستضافة والتخزين وإرسال البريد الإلكتروني، أو مع الجهات المختصة عندما يكون الإفصاح مطلوبًا نظامًا. ويلتزم مقدمو الخدمات بمعالجة البيانات للغرض المحدد وبمستوى حماية مناسب.',
        ],
      },
      {
        id: 'transfers',
        title: 'نقل البيانات خارج المملكة',
        paragraphs: [
          'قد تتطلب بعض الخدمات التقنية معالجة البيانات أو تخزينها خارج المملكة. وفي هذه الحالات نتخذ الإجراءات والضمانات اللازمة وفق نظام حماية البيانات الشخصية واللوائح المنظمة لنقل البيانات الشخصية خارج المملكة.',
        ],
      },
      {
        id: 'retention',
        title: 'مدة الاحتفاظ بالبيانات',
        paragraphs: [
          'نحتفظ بالبيانات للمدة اللازمة لتحقيق الأغراض الموضحة في هذه السياسة أو للمدة التي تفرضها المتطلبات النظامية والمهنية. وبعد انتهاء الحاجة إليها تُحذف أو تُتلف بطريقة آمنة، ما لم يوجد مسوغ نظامي للاحتفاظ بها مدة أطول.',
        ],
      },
      {
        id: 'security',
        title: 'أمن البيانات',
        paragraphs: [
          'نطبق تدابير تنظيمية وتقنية مناسبة لحماية البيانات من الوصول غير المصرح به أو الفقد أو التغيير أو الإفصاح. ومع ذلك، لا توجد وسيلة نقل أو تخزين إلكترونية تضمن حماية مطلقة، لذلك نوصي بعدم إرسال معلومات حساسة غير لازمة عبر نموذج الموقع.',
        ],
      },
      {
        id: 'rights',
        title: 'حقوقك المتعلقة ببياناتك',
        paragraphs: [
          'وفقًا للأنظمة السارية، قد يكون لك الحق في العلم والوصول إلى بياناتك والحصول على نسخة منها وطلب تصحيحها أو إكمالها أو تحديثها، وطلب إتلافها عند توافر الشروط النظامية، وسحب الموافقة عندما تكون هي أساس المعالجة. قد نطلب التحقق من هويتك قبل تنفيذ الطلب.',
        ],
      },
      {
        id: 'cookies',
        title: 'ملفات تعريف الارتباط',
        paragraphs: [
          'قد يستخدم الموقع ملفات تعريف ارتباط وتقنيات مشابهة لازمة للتشغيل والأمان وتحسين الأداء. يمكنك التحكم في هذه الملفات من إعدادات المتصفح، وقد يؤثر تعطيل الملفات الضرورية في بعض وظائف الموقع.',
        ],
      },
      {
        id: 'updates',
        title: 'تحديثات السياسة',
        paragraphs: [
          'قد نحدّث هذه السياسة عند تغير ممارساتنا أو المتطلبات النظامية. سيُنشر الإصدار المحدث في هذه الصفحة مع توضيح تاريخ آخر تحديث، ويُعد استمرار استخدام الموقع بعد نشر التحديث خاضعًا للنسخة السارية.',
        ],
      },
      {
        id: 'contact',
        title: 'التواصل معنا',
        paragraphs: [
          'للاستفسار عن هذه السياسة أو ممارسة حقوقك المتعلقة بالبيانات الشخصية، يمكنك التواصل معنا عبر البريد الإلكتروني Info@yazlaw.com.sa. سنراجع الطلب ونستجيب له وفق المدد والإجراءات النظامية المعمول بها.',
        ],
      },
    ],
  },
  en: {
    pageLabel: 'Privacy Policy',
    title: 'Privacy and Data Protection Policy',
    description:
      'This policy explains how Yazid Abdulrahman Al-Zahrani Law Firm collects, uses, and protects personal data when you use this website.',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: '14 October 2026',
    contentsLabel: 'Policy contents',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction and scope',
        paragraphs: [
          'We respect your privacy and process personal data responsibly and transparently under the laws of the Kingdom of Saudi Arabia, including the Personal Data Protection Law and its implementing regulations. This policy applies to data collected through this website and its online forms.',
        ],
      },
      {
        id: 'data-collected',
        title: 'Data we collect',
        items: [
          'Identity and contact details, such as your name, telephone number, email address, and city.',
          'Information submitted with a consultation request, including the consultation type, legal area, preferred appointment, and matter summary.',
          'Files or images you choose to attach to a consultation request.',
          'Basic technical data generated when using the website, such as IP address, browser type, and security or performance logs.',
        ],
      },
      {
        id: 'purposes',
        title: 'How we use data',
        items: [
          'To receive, review, and respond to consultation requests.',
          'To provide requested services and manage a professional relationship once agreed.',
          'To secure the website, prevent misuse, and improve performance and user experience.',
          'To comply with legal, regulatory, and professional obligations and maintain required records.',
          'To send messages related to your request. Direct marketing will only be used where a lawful basis or required consent exists.',
        ],
      },
      {
        id: 'legal-basis',
        title: 'Legal basis for processing',
        paragraphs: [
          'We process data with your consent, at your request before providing a service, to perform contractual or legal obligations, or for a legitimate interest that does not override your rights and interests, as permitted by applicable law.',
        ],
      },
      {
        id: 'sharing',
        title: 'Data sharing and service providers',
        paragraphs: [
          'We do not sell personal data. We may share only the necessary data with trusted providers supporting website hosting, storage, and email delivery, or with competent authorities where disclosure is legally required. Providers must process data for the specified purpose and maintain appropriate protection.',
        ],
      },
      {
        id: 'transfers',
        title: 'International data transfers',
        paragraphs: [
          'Some technical services may process or store data outside Saudi Arabia. Where this occurs, we apply the measures and safeguards required by the Personal Data Protection Law and the rules governing transfers of personal data outside the Kingdom.',
        ],
      },
      {
        id: 'retention',
        title: 'Data retention',
        paragraphs: [
          'We retain data only for as long as necessary for the purposes described here or as required by legal and professional obligations. When no longer needed, it is securely deleted or destroyed unless a lawful reason requires longer retention.',
        ],
      },
      {
        id: 'security',
        title: 'Data security',
        paragraphs: [
          'We use appropriate organizational and technical measures to protect data from unauthorized access, loss, alteration, or disclosure. No electronic transmission or storage method is completely secure, so please avoid submitting unnecessary sensitive information through the website form.',
        ],
      },
      {
        id: 'rights',
        title: 'Your data rights',
        paragraphs: [
          'Subject to applicable law, you may have rights to be informed, access your data, obtain a copy, request correction or completion, request destruction where legally available, and withdraw consent where consent is the basis of processing. We may verify your identity before acting on a request.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies',
        paragraphs: [
          'The website may use cookies and similar technologies required for operation, security, and performance. You can manage cookies in your browser settings, although disabling essential cookies may affect website functionality.',
        ],
      },
      {
        id: 'updates',
        title: 'Policy updates',
        paragraphs: [
          'We may update this policy when our practices or legal requirements change. The updated version and revision date will be published on this page, and continued use of the website will be subject to the current version.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact us',
        paragraphs: [
          'For questions about this policy or to exercise a data right, contact us at Info@yazlaw.com.sa. We will review and respond in accordance with applicable legal procedures and timelines.',
        ],
      },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const page = content[locale]

  return createPageMetadata({
    locale,
    path: '/privacy',
    title: page.title,
    description: page.description,
  })
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const page = content[locale]
  const pageUrl = new URL(`/${locale}/privacy`, siteUrl).toString()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: page.title,
            description: page.description,
            url: pageUrl,
            inLanguage: locale,
            dateModified: '2026-10-14',
            isPartOf: {
              '@type': 'WebSite',
              name: getBrandName(locale),
              url: siteUrl.toString(),
            },
          }),
        }}
      />
      <LegalPage locale={locale} {...page} />
    </>
  )
}
