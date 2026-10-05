import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',

  label: 'من نحن',

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
  },

  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'الصورة',
      required: true,
    },

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
      name: 'featuredItems',
      type: 'array',
      label: 'النقاط المميزة',
      minRows: 4,
      maxRows: 4,
      required: true,

      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'النص',
          localized: true,
          required: true,
        },
      ],
    },

    {
      name: 'profile',
      type: 'group',
      label: 'الملف التعريفي',

      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'نص زر التحميل',
          localized: true,
          required: true,
          defaultValue: 'تحميل الملف التعريفي',
        },

        {
          name: 'file',
          type: 'upload',
          relationTo: 'documents',
          label: 'ملف PDF',
          required: true,
        },
      ],
    },

    {
      name: 'foundation',
      type: 'group',
      label: 'سنة التأسيس',

      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'السنة',
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
          name: 'description',
          type: 'textarea',
          label: 'نص التأسيس',
          localized: true,
          required: true,
        },
      ],
    },

    {
      name: 'experienceStat',
      type: 'group',
      label: 'سنوات الخبرة',

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

    {
      name: 'casesStat',
      type: 'group',
      label: 'القضايا الناجحة',

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
