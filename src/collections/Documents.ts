import { admins, adminsOrContentEditors } from '@/access/permissions'
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
    create: adminsOrContentEditors,
    update: adminsOrContentEditors,
    delete: admins,
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
