import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { GlobalConfig } from 'payload'

export const HowWorking: GlobalConfig = {
  slug: 'how-working',

  label: 'كيف نعمل معك',

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
  },

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'خطوات العمل',
      maxRows: 5,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'العنوان',
          localized: true,
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'المحتوى',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
