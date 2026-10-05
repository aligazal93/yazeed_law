import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',

  label: 'الإحصائيات',

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
      label: 'الإحصائيات',
      minRows: 4,
      maxRows: 4,
      required: true,

      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'القيمة',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'العنوان',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
