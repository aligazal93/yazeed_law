import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { admins, adminsOrContentEditors } from '@/access/permissions'
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
    create: adminsOrContentEditors,
    update: adminsOrContentEditors,
    delete: admins,
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
