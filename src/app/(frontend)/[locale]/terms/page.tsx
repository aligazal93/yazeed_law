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
    pageLabel: 'الشروط والأحكام',
    title: 'الشروط والأحكام',
    description:
      'تنظم هذه الشروط استخدام موقع شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية والخدمات الإلكترونية المتاحة من خلاله.',
    lastUpdatedLabel: 'آخر تحديث',
    lastUpdated: '14 أكتوبر 2026',
    contentsLabel: 'محتويات الشروط',
    sections: [
      {
        id: 'acceptance',
        title: 'قبول الشروط',
        paragraphs: [
          'باستخدامك هذا الموقع فإنك تقر بقراءة هذه الشروط والأحكام وفهمها والموافقة عليها. إذا لم توافق على أي جزء منها، فيرجى التوقف عن استخدام الموقع. يخضع استخدام الموقع كذلك للأنظمة السارية في المملكة العربية السعودية ولسياسة الخصوصية المنشورة فيه.',
        ],
      },
      {
        id: 'website-purpose',
        title: 'غرض الموقع',
        paragraphs: [
          'يقدم الموقع معلومات عامة عن الشركة ومجالات عملها ومحتوى تثقيفيًا قانونيًا، كما يتيح إرسال طلبات الاستشارة والتواصل. لا يمثل المحتوى المنشور رأيًا قانونيًا مخصصًا لحالة بعينها، ولا ينبغي اتخاذ قرار قانوني اعتمادًا عليه وحده.',
        ],
      },
      {
        id: 'professional-relationship',
        title: 'طلبات الاستشارة والعلاقة المهنية',
        paragraphs: [
          'إرسال طلب استشارة أو رسالة عبر الموقع لا يعني قبول القضية ولا ينشئ بمفرده علاقة محامٍ وعميل أو التزامًا بتقديم الخدمة. تبدأ العلاقة المهنية فقط بعد مراجعة الطلب، والتحقق من تعارض المصالح عند الاقتضاء، والاتفاق الكتابي على نطاق العمل والأتعاب والشروط ذات الصلة.',
          'لا ترسل عبر الموقع معلومات شديدة الحساسية أو عاجلة قبل تأكيد قبول التمثيل أو الاستشارة، ولا تعتمد على إرسال النموذج لحفظ أي مدة نظامية أو موعد إجرائي.',
        ],
      },
      {
        id: 'user-obligations',
        title: 'التزامات المستخدم',
        items: [
          'تقديم معلومات صحيحة وحديثة وعدم انتحال صفة أي شخص أو جهة.',
          'عدم استخدام الموقع في غرض غير مشروع أو للإضرار بالموقع أو مستخدميه.',
          'عدم رفع ملفات تحتوي على برمجيات ضارة أو محتوى مخالف للأنظمة أو حقوق الآخرين.',
          'عدم محاولة الوصول غير المصرح به إلى الأنظمة أو البيانات أو تعطيل وظائف الموقع.',
        ],
      },
      {
        id: 'intellectual-property',
        title: 'حقوق الملكية الفكرية',
        paragraphs: [
          'المحتوى والتصميم والعلامات والشعارات والنصوص والمواد المنشورة في الموقع مملوكة للشركة أو مستخدمة بترخيص، وتحميها الأنظمة ذات الصلة. يجوز الاطلاع على المحتوى للاستخدام الشخصي غير التجاري، ولا يجوز نسخه أو إعادة نشره أو تعديله أو استغلاله تجاريًا دون إذن كتابي مسبق، إلا في الحدود التي يسمح بها النظام.',
        ],
      },
      {
        id: 'accuracy',
        title: 'دقة المحتوى وتحديثه',
        paragraphs: [
          'نبذل عناية معقولة لتقديم معلومات دقيقة ومحدثة، إلا أن الأنظمة والتفسيرات والظروف قد تتغير. لا نضمن اكتمال جميع المواد أو ملاءمتها لكل حالة، ويجوز تعديل محتوى الموقع أو إيقاف أي جزء منه في أي وقت.',
        ],
      },
      {
        id: 'third-party-links',
        title: 'روابط وخدمات الأطراف الأخرى',
        paragraphs: [
          'قد يحتوي الموقع على روابط أو خدمات تقدمها جهات أخرى لتسهيل الاستخدام. لا تعني هذه الروابط اعتماد محتواها، وتخضع المواقع والخدمات الخارجية لشروطها وسياسات الخصوصية الخاصة بها. لسنا مسؤولين عن محتواها أو ممارساتها بالقدر الذي يسمح به النظام.',
        ],
      },
      {
        id: 'privacy',
        title: 'الخصوصية وحماية البيانات',
        paragraphs: [
          'يخضع جمع البيانات الشخصية واستخدامها وحمايتها لسياسة الخصوصية الخاصة بالموقع، والتي تعد جزءًا مكملًا لهذه الشروط. يرجى مراجعتها قبل إرسال بياناتك أو مرفقاتك.',
        ],
      },
      {
        id: 'availability',
        title: 'إتاحة الموقع وحدود المسؤولية',
        paragraphs: [
          'نسعى إلى إتاحة الموقع بصورة آمنة ومستقرة، لكننا لا نضمن عمله دون انقطاع أو خلوه التام من الأخطاء. وفي الحدود التي يسمح بها النظام، لا تتحمل الشركة المسؤولية عن الأضرار غير المباشرة الناتجة عن استخدام الموقع أو تعذر استخدامه أو الاعتماد على محتواه العام. ولا يستبعد أي نص هنا مسؤولية لا يجوز استبعادها بموجب النظام.',
        ],
      },
      {
        id: 'governing-law',
        title: 'النظام الواجب التطبيق والاختصاص',
        paragraphs: [
          'تخضع هذه الشروط لأنظمة المملكة العربية السعودية. وتسوى النزاعات وديًا متى أمكن، وإلا فتكون من اختصاص الجهات القضائية المختصة في المملكة، مع مراعاة أي قواعد اختصاص إلزامية واجبة التطبيق.',
        ],
      },
      {
        id: 'changes',
        title: 'تعديل الشروط',
        paragraphs: [
          'يجوز تحديث هذه الشروط لتعكس تغير الخدمات أو المتطلبات النظامية. تنشر النسخة المحدثة في هذه الصفحة ويظهر تاريخ آخر تحديث أعلاها، ويعد استمرار استخدام الموقع بعد النشر قبولًا بالشروط السارية.',
        ],
      },
      {
        id: 'contact',
        title: 'التواصل معنا',
        paragraphs: [
          'لأي استفسار يتعلق بهذه الشروط، يمكن التواصل مع شركة يزيد عبدالرحمن الزهراني للمحاماة والاستشارات القانونية عبر البريد الإلكتروني Info@yazlaw.com.sa أو من خلال صفحة اتصل بنا.',
        ],
      },
    ],
  },
  en: {
    pageLabel: 'Terms and Conditions',
    title: 'Terms and Conditions',
    description:
      'These terms govern the use of Yazid Abdulrahman Al-Zahrani Law Firm’s website and the online services available through it.',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: '14 October 2026',
    contentsLabel: 'Terms contents',
    sections: [
      {
        id: 'acceptance',
        title: 'Acceptance of terms',
        paragraphs: [
          'By using this website, you confirm that you have read, understood, and accepted these terms. If you do not agree with any part, please stop using the website. Use is also subject to the laws of the Kingdom of Saudi Arabia and the published Privacy Policy.',
        ],
      },
      {
        id: 'website-purpose',
        title: 'Purpose of the website',
        paragraphs: [
          'The website provides general information about the firm, its practice areas, and legal educational content, and enables consultation requests and contact. Published content is not legal advice tailored to a particular matter and should not be the sole basis for a legal decision.',
        ],
      },
      {
        id: 'professional-relationship',
        title: 'Consultation requests and professional relationship',
        paragraphs: [
          'Submitting a consultation request or message does not mean that the matter has been accepted and does not by itself create a lawyer-client relationship or an obligation to provide services. A professional relationship begins only after review, any required conflict check, and written agreement on scope, fees, and related terms.',
          'Do not submit highly sensitive or urgent information before engagement is confirmed, and do not rely on a website submission to preserve a statutory deadline or procedural date.',
        ],
      },
      {
        id: 'user-obligations',
        title: 'User responsibilities',
        items: [
          'Provide accurate, current information and do not impersonate another person or organization.',
          'Do not use the website unlawfully or in a way that harms the website or its users.',
          'Do not upload malicious files or content that violates laws or third-party rights.',
          'Do not attempt unauthorized access to systems or data or interfere with website operation.',
        ],
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual property',
        paragraphs: [
          'The website design, marks, logos, texts, and published materials are owned by the firm or used under license and are protected by applicable law. Content may be viewed for personal, non-commercial use but may not be copied, republished, modified, or commercially exploited without prior written permission, except where permitted by law.',
        ],
      },
      {
        id: 'accuracy',
        title: 'Accuracy and updates',
        paragraphs: [
          'We take reasonable care to provide accurate and current information, but laws, interpretations, and circumstances may change. We do not guarantee that every item is complete or suitable for every matter, and website content or functionality may be changed or discontinued at any time.',
        ],
      },
      {
        id: 'third-party-links',
        title: 'Third-party links and services',
        paragraphs: [
          'The website may include links or services provided by others for convenience. A link does not imply endorsement, and external sites and services are governed by their own terms and privacy policies. To the extent permitted by law, we are not responsible for their content or practices.',
        ],
      },
      {
        id: 'privacy',
        title: 'Privacy and data protection',
        paragraphs: [
          'The collection, use, and protection of personal data are governed by the website Privacy Policy, which forms part of these terms. Please review it before submitting personal data or attachments.',
        ],
      },
      {
        id: 'availability',
        title: 'Website availability and liability',
        paragraphs: [
          'We aim to keep the website secure and available but do not guarantee uninterrupted or error-free operation. To the extent permitted by law, the firm is not liable for indirect loss arising from use, inability to use, or reliance on general website content. Nothing here excludes liability that cannot legally be excluded.',
        ],
      },
      {
        id: 'governing-law',
        title: 'Governing law and jurisdiction',
        paragraphs: [
          'These terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes should be resolved amicably where possible; otherwise, they fall within the jurisdiction of the competent Saudi courts, subject to any mandatory jurisdiction rules.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        paragraphs: [
          'We may update these terms to reflect changes to services or legal requirements. The revised version and update date will be published here, and continued use after publication constitutes acceptance of the current terms.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact us',
        paragraphs: [
          'For questions about these terms, contact Yazid Abdulrahman Al-Zahrani Law Firm at Info@yazlaw.com.sa or through the Contact Us page.',
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
    path: '/terms',
    title: page.title,
    description: page.description,
  })
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params
  const locale: Locale = requestedLocale === 'en' ? 'en' : 'ar'
  const page = content[locale]
  const pageUrl = new URL(`/${locale}/terms`, siteUrl).toString()

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
