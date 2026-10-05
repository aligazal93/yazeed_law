import { ADMIN_GROUPS } from '@/constants/adminGroups'
import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',

  labels: {
    singular: 'شريك',
    plural: 'شركاء النجاح',
  },

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,

    defaultColumns: ['image', 'updatedAt'],
  },

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'شعار الشريك',
      required: true,
    },
  ],
}
