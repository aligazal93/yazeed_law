import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',

  labels: {
    singular: 'مقال',
    plural: 'المقالات',
  },

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,

    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'updatedAt'],
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.date = new Date().toISOString()
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'صورة المقال',
      required: true,
    },

    {
      name: 'title',
      type: 'text',
      label: 'عنوان المقال',
      localized: true,
      required: true,
    },

    {
      name: 'content',
      type: 'richText',
      label: 'محتوى المقال',
      localized: true,
      required: true,
    },

    {
      name: 'date',
      type: 'date',
      label: 'تاريخ النشر',
      required: true,

      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
  ],
}
