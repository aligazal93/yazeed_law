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
