import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',

  labels: {
    singular: 'خدمة',
    plural: 'الخدمات',
  },

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'الأيقونة',
      required: true,
    },

    {
      name: 'title',
      type: 'text',
      label: 'اسم الخدمة',
      localized: true,
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,

      admin: {
        description: 'مثال: corporate-law',
      },
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'وصف الخدمة',
      localized: true,
      required: true,
    },
  ],
}
