import { adminsOrContentEditors } from '@/access/permissions'
import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'من نحن',

  admin: {
    group: 'صفحات الموقع',
  },

  access: {
    read: () => true,
    update: adminsOrContentEditors,
  },

  fields: [
    {
      name: 'title',
      label: 'عنوان الصفحة',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      label: 'وصف الصفحة',
      type: 'textarea',
      localized: true,
    },

    {
      type: 'tabs',
      tabs: [
        // ==================== Our Story ====================
        {
          label: 'قصتنا',
          fields: [
            {
              name: 'ourStory',
              type: 'group',
              label: 'محتوى قصتنا',
              fields: [
                {
                  name: 'title',
                  label: 'العنوان',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'content',
                  label: 'المحتوى',
                  type: 'textarea',
                  localized: true,
                  required: true,
                },
                {
                  name: 'image',
                  label: 'صورة قصتنا',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  admin: {
                    description: 'ارفع الصورة التي ستظهر بجانب محتوى قسم قصتنا',
                  },
                },

                {
                  name: 'items',
                  label: 'مكونات قصتنا',
                  type: 'array',
                  minRows: 0,
                  maxRows: 4,
                  labels: {
                    singular: 'عنصر',
                    plural: 'العناصر',
                  },
                  fields: [
                    {
                      name: 'title',
                      label: 'اسم العنصر',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ==================== Our Values ====================
        {
          label: 'قيمنا',
          fields: [
            {
              name: 'ourValues',
              type: 'group',
              label: 'محتوى قيمنا',
              fields: [
                {
                  name: 'title',
                  label: 'العنوان',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'content',
                  label: 'المحتوى',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'cards',
                  label: 'كروت القيم',
                  type: 'array',
                  minRows: 0,
                  maxRows: 4,
                  labels: {
                    singular: 'قيمة',
                    plural: 'القيم',
                  },
                  fields: [
                    {
                      name: 'name',
                      label: 'اسم القيمة',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'desc',
                      label: 'الوصف',
                      type: 'textarea',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ==================== Milestones ====================
        {
          label: 'مسيرتنا',
          fields: [
            {
              name: 'milestones',
              type: 'group',
              label: 'محتوى مسيرتنا',
              fields: [
                {
                  name: 'title',
                  label: 'العنوان',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'cards',
                  label: 'محطات مسيرتنا',
                  type: 'array',
                  minRows: 0,
                  labels: {
                    singular: 'محطة',
                    plural: 'المحطات',
                  },
                  fields: [
                    {
                      name: 'date',
                      label: 'التاريخ',
                      type: 'text',
                      required: true,
                      admin: {
                        placeholder: 'مثال: 1998',
                      },
                    },
                    {
                      name: 'name',
                      label: 'اسم المحطة',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'description',
                      label: 'الوصف',
                      type: 'textarea',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ==================== Our Words ====================
        {
          label: 'كلمتنا',
          fields: [
            {
              name: 'ourWords',
              type: 'group',
              label: 'محتوى كلمتنا',
              fields: [
                {
                  name: 'presidentWord',
                  label: 'كلمة الرئيس',
                  type: 'textarea',
                  localized: true,
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'presidentName',
                      label: 'اسم الرئيس',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'presidentPosition',
                      label: 'منصب الرئيس',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                  ],
                },
                {
                  name: 'cards',
                  label: 'مميزات المكتب',
                  type: 'array',
                  minRows: 0,
                  maxRows: 4,
                  labels: {
                    singular: 'ميزة',
                    plural: 'المميزات',
                  },
                  fields: [
                    {
                      name: 'icon',
                      label: 'الأيقونة',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'القفل - السرية', value: 'lock' },
                        { label: 'الساعة - الالتزام', value: 'timer' },
                        { label: 'الدرع - الحماية', value: 'shield' },
                        { label: 'الميزان - العدالة', value: 'scale' },
                      ],
                    },
                    {
                      name: 'title',
                      label: 'العنوان',
                      type: 'text',
                      localized: true,
                      required: true,
                    },
                    {
                      name: 'description',
                      label: 'الوصف',
                      type: 'textarea',
                      localized: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
