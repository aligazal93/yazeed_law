import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  label: 'إعدادات الموقع',

  admin: {
    group: 'إعدادات الموقع',
  },

  access: {
    read: () => true,

    update: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'اللوجو',
      required: true,
    },

    {
      name: 'address',
      type: 'text',
      label: 'عنوان الشركة',
      localized: true,
      required: true,
    },

    {
      name: 'phone',
      type: 'text',
      label: 'رقم الهاتف',
      required: true,
    },

    {
      name: 'workingHours',
      type: 'text',
      label: 'مواعيد العمل',
      localized: true,
      required: true,
    },

    {
      name: 'email',
      type: 'email',
      label: 'البريد الإلكتروني',
      required: true,
    },

    {
      name: 'whatsapp',
      type: 'text',
      label: 'رقم الواتساب',
    },

    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook',
    },

    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn',
    },

    {
      name: 'twitter',
      type: 'text',
      label: 'X / Twitter',
    },

    {
      name: 'commercialRegistrationNumber',
      type: 'text',
      label: 'رقم السجل التجاري والاستشاري',
    },

    {
      name: 'professionalLicenseNumber',
      type: 'text',
      label: 'رقم الترخيص المهني',
    },

    {
      name: 'copyright',
      type: 'text',
      label: 'حقوق النشر',
      localized: true,
      required: true,
    },
  ],
}
