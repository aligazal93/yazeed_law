import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { adminsOrContentEditors } from '@/access/permissions'
import type { GlobalConfig } from 'payload'

export const FAQ: GlobalConfig = {
  slug: 'faq',

  label: 'الأسئلة الشائعة',

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
    description: 'إدارة عنوان وأسئلة وأجوبة قسم الأسئلة الشائعة بالعربية والإنجليزية.',
  },

  access: {
    read: () => true,
    update: adminsOrContentEditors,
  },

  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'الشارة',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'العنوان',
      localized: true,
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'الأسئلة والأجوبة',
      labels: {
        singular: 'سؤال',
        plural: 'الأسئلة',
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'السؤال',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'الإجابة',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
