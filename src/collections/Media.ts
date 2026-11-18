import { admins, adminsOrContentEditors } from '@/access/permissions'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  labels: {
    singular: 'صورة',
    plural: 'الصور',
  },

  admin: {
    useAsTitle: 'alt',
  },

  access: {
    read: () => true,
    create: adminsOrContentEditors,
    update: adminsOrContentEditors,
    delete: admins,
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'النص البديل',
      localized: true,
      required: true,
    },
  ],

  upload: {
    mimeTypes: ['image/*'],

    displayPreview: true,

    adminThumbnail: ({ doc }) => {
      if (typeof doc.url === 'string') {
        return doc.url
      }

      return null
    },
  },
}
