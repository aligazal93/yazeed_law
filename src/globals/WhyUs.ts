import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { adminsOrContentEditors } from '@/access/permissions'
import type { GlobalConfig } from 'payload'

export const WhyUs: GlobalConfig = {
  slug: 'why-us',
  label: 'لماذا نحن',

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
      label: 'المميزات',
      maxRows: 4,

      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'الأيقونة',
          required: true,

          options: [
            {
              label: 'السرية',
              value: 'shield',
            },
            {
              label: 'الوقت والالتزام',
              value: 'clock',
            },
            {
              label: 'الشفافية',
              value: 'chart',
            },
            {
              label: 'الفريق',
              value: 'users',
            },
          ],
        },

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

    {
      name: 'managerQuote',
      type: 'textarea',
      label: 'كلمة المدير',
      localized: true,
      required: true,
    },

    {
      name: 'managerName',
      type: 'text',
      label: 'اسم المدير',
      localized: true,
      required: true,
    },

    {
      name: 'managerPosition',
      type: 'text',
      label: 'المنصب',
      localized: true,
      required: true,
    },
  ],
}
