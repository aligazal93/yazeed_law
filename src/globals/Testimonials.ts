import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { adminsOrContentEditors } from '@/access/permissions'
import type { GlobalConfig } from 'payload'

export const Testimonials: GlobalConfig = {
  slug: 'testimonials',

  label: 'آراء العملاء',

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
  },

  access: {
    read: () => true,
    update: adminsOrContentEditors,
  },

  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'آراء العملاء',
      required: true,

      fields: [
        {
          name: 'rate',
          type: 'number',
          label: 'التقييم',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
        },

        {
          name: 'content',
          type: 'textarea',
          label: 'الرأي',
          localized: true,
          required: true,
        },

        {
          name: 'name',
          type: 'text',
          label: 'الاسم',
          localized: true,
          required: true,
        },

        {
          name: 'position',
          type: 'text',
          label: 'المنصب',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
