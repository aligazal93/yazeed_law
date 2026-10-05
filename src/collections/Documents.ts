import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',

  labels: {
    singular: 'ملف',
    plural: 'الملفات',
  },

  admin: {
    useAsTitle: 'title',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'اسم الملف',
      localized: true,
      required: true,
    },
  ],

  upload: {
    mimeTypes: ['application/pdf'],
  },
}
