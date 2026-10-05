import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',

  label: 'واجهة الموقع',

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
  },

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      localized: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'العنوان الرئيسي',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'الوصف',
      localized: true,
      required: true,
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'الزر الأول',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'نص الزر',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'الرابط',
          required: true,
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'الزر الثاني',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'نص الزر',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'الرابط',
          required: true,
        },
      ],
    },
  ],
}
