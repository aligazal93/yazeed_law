import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { admins, adminsOrContentEditors } from '@/access/permissions'
import type { CollectionConfig } from 'payload'

export const AccreditationsTrust: CollectionConfig = {
  slug: 'accreditations-trust',

  labels: {
    singular: 'اعتماد',
    plural: 'الاعتمادات والشراكات',
  },

  admin: {
    group: ADMIN_GROUPS.SITE_CONTENT,
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
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
      label: 'الصورة / الأيقونة',
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
      name: 'content',
      type: 'textarea',
      label: 'المحتوى',
      localized: true,
      required: true,
    },
  ],
}
