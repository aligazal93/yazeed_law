import { ADMIN_GROUPS } from '@/constants/adminGroups'
import { admins, adminsOrContentEditors } from '@/access/permissions'
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
    create: adminsOrContentEditors,
    update: adminsOrContentEditors,
    delete: admins,
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
    {
      name: 'details',
      type: 'group',
      label: 'تفاصيل صفحة الخدمة',
      admin: {
        description: 'المحتوى التفصيلي الذي يظهر داخل صفحة الخدمة.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'الصورة الرئيسية',
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'النص البديل للصورة',
          localized: true,
        },
        {
          name: 'intro',
          type: 'textarea',
          label: 'مقدمة تفاصيل الخدمة',
          localized: true,
        },
        {
          name: 'servicesTitle',
          type: 'text',
          label: 'عنوان قائمة الخدمات',
          localized: true,
        },
        {
          name: 'serviceItems',
          type: 'array',
          label: 'الخدمات المقدمة في هذا المجال',
          labels: {
            singular: 'خدمة فرعية',
            plural: 'الخدمات الفرعية',
          },
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
          name: 'whyTitle',
          type: 'text',
          label: 'عنوان لماذا تختارنا',
          localized: true,
        },
        {
          name: 'whyDescription',
          type: 'textarea',
          label: 'وصف لماذا تختارنا',
          localized: true,
        },
        {
          name: 'highlightText',
          type: 'textarea',
          label: 'النص المميز',
          localized: true,
        },
      ],
    },
  ],
}
