import { adminsOrContentEditors } from '@/access/permissions'
import type { GlobalConfig } from 'payload'

export const TeamPage: GlobalConfig = {
  slug: 'team-page',
  label: 'فريق العمل',

  admin: {
    group: 'صفحات الموقع',
    description: 'إدارة محتوى صفحة فريق العمل وترتيب ظهور أعضاء الفريق.',
  },

  access: {
    read: () => true,
    update: adminsOrContentEditors,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان الصفحة',
      localized: true,
      required: true,
      defaultValue: 'كوادر قانونية تقودها الخبرة والرؤية',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'وصف الصفحة',
      localized: true,
      required: true,
      defaultValue:
        'نعتز بفريق عمل يجمع بين الخبرة القانونية والرؤية الإدارية، ويعمل بتكامل لتقديم خدمات قانونية موثوقة.',
    },
    {
      name: 'members',
      type: 'array',
      label: 'كوادرنا',
      labels: {
        singular: 'عضو فريق',
        plural: 'أعضاء الفريق',
      },
      admin: {
        description: 'اسحب العناصر لتغيير ترتيب ظهور أعضاء الفريق في الصفحة.',
      },
      defaultValue: [
        {
          name: 'المحامي/ يزيد الزهراني',
          jobTitle: 'المؤسس والمدير التنفيذي',
          isActive: true,
        },
        {
          name: 'المستشار/ عبدالله المسلط',
          jobTitle: 'النائب والمدير العام',
          isActive: true,
        },
        {
          name: 'الأستاذ/ فيصل المحمود',
          jobTitle: 'مدير الشؤون الداخلية',
          isActive: true,
        },
      ],
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'الصورة الشخصية',
          admin: {
            description: 'يفضل استخدام صورة شخصية رأسية وبجودة عالية.',
          },
        },
        {
          name: 'name',
          type: 'text',
          label: 'الاسم',
          localized: true,
          required: true,
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: 'المسمى الوظيفي',
          localized: true,
          required: true,
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'إظهار في الموقع',
          defaultValue: true,
        },
      ],
    },
  ],
}
