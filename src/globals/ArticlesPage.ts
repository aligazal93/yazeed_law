import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { adminsOrContentEditors } from '@/access/permissions'
import type { GlobalConfig } from 'payload'

export const ArticlesPage: GlobalConfig = {
  slug: 'articles-page',
  label: 'صفحة المقالات',

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
    description: 'إعدادات صفحة المقالات وصفحة تفاصيل المقال بالعربية والإنجليزية.',
  },

  access: {
    read: () => true,
    update: adminsOrContentEditors,
  },

  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'الشارة واسم التصنيف',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'عنوان صفحة المقالات',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'وصف صفحة المقالات',
      localized: true,
      required: true,
    },
    {
      name: 'readMoreLabel',
      type: 'text',
      label: 'نص قراءة المقال',
      localized: true,
      required: true,
    },
    {
      name: 'recentArticlesTitle',
      type: 'text',
      label: 'عنوان أحدث المقالات',
      localized: true,
      required: true,
    },
    {
      name: 'consultationTitle',
      type: 'text',
      label: 'عنوان صندوق الاستشارة',
      localized: true,
      required: true,
    },
    {
      name: 'consultationDescription',
      type: 'textarea',
      label: 'وصف صندوق الاستشارة',
      localized: true,
      required: true,
    },
    {
      name: 'consultationButtonLabel',
      type: 'text',
      label: 'نص زر الاستشارة',
      localized: true,
      required: true,
    },
  ],
}
