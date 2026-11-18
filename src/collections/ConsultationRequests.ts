import {
  admins,
  adminsOrRequestsManagers,
  hasRole,
  USER_ROLES,
} from '@/access/permissions'
import { sendConsultationNotification } from '@/hooks/sendConsultationNotification'
import { APIError, type CollectionConfig } from 'payload'

export const CONSULTATION_ATTACHMENT_MAX_SIZE = 4 * 1024 * 1024

export const CONSULTATION_ATTACHMENT_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const ConsultationRequests: CollectionConfig = {
  slug: 'consultation-requests',

  labels: {
    singular: 'طلب استشارة',
    plural: 'طلبات الاستشارة',
  },

  admin: {
    group: 'طلبات العملاء',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'filename', 'specialization', 'status', 'createdAt'],
  },

  upload: {
    filesRequiredOnCreate: false,
    displayPreview: true,
    mimeTypes: CONSULTATION_ATTACHMENT_MIME_TYPES,
  },

  access: {
    create: () => true,
    read: adminsOrRequestsManagers,
    update: adminsOrRequestsManagers,
    delete: admins,
  },

  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.file?.size) {
          if (req.file.size > CONSULTATION_ATTACHMENT_MAX_SIZE) {
            throw new APIError('الحد الأقصى لحجم المرفق هو 4 ميجابايت.', 400)
          }
        }

        if (operation === 'create' && !req.user && data) {
          data.status = 'new'
        }

        return data
      },
    ],
    afterChange: [sendConsultationNotification],
  },

  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'الاسم الكامل',
      required: true,
      maxLength: 120,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'رقم الهاتف',
      required: true,
      minLength: 8,
      maxLength: 20,
    },
    {
      name: 'email',
      type: 'email',
      label: 'البريد الإلكتروني',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      label: 'المدينة',
      maxLength: 100,
    },
    {
      name: 'specialization',
      type: 'select',
      label: 'التخصص المطلوب',
      required: true,
      options: [
        { label: 'القضايا التجارية', value: 'commercial' },
        { label: 'الشركات والعقود', value: 'corporate' },
        { label: 'القضايا العقارية', value: 'real-estate' },
        { label: 'القضايا العمالية', value: 'labor' },
        { label: 'الأحوال الشخصية', value: 'family' },
        { label: 'التحكيم', value: 'arbitration' },
        { label: 'تخصص آخر', value: 'other' },
      ],
    },
    {
      name: 'consultationType',
      type: 'select',
      label: 'نوع الاستشارة',
      required: true,
      options: [
        { label: 'استشارة هاتفية', value: 'phone' },
        { label: 'استشارة أونلاين', value: 'online' },
        { label: 'زيارة المكتب', value: 'office' },
      ],
    },
    {
      name: 'preferredDate',
      type: 'date',
      label: 'التاريخ المفضل',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'preferredTime',
      type: 'select',
      label: 'الوقت المفضل',
      required: true,
      options: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'ملخص القضية',
      required: true,
      maxLength: 3000,
    },
    {
      name: 'locale',
      type: 'select',
      label: 'لغة الطلب',
      required: true,
      defaultValue: 'ar',
      options: [
        { label: 'العربية', value: 'ar' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'حالة الطلب',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'جديد', value: 'new' },
        { label: 'تم التواصل', value: 'contacted' },
        { label: 'تم تأكيد الموعد', value: 'confirmed' },
        { label: 'مكتمل', value: 'completed' },
        { label: 'ملغي', value: 'cancelled' },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'ملاحظات الإدارة',
      access: {
        create: ({ req }) =>
          hasRole(req.user, USER_ROLES.ADMIN, USER_ROLES.REQUESTS_MANAGER),
        read: ({ req }) =>
          hasRole(req.user, USER_ROLES.ADMIN, USER_ROLES.REQUESTS_MANAGER),
        update: ({ req }) =>
          hasRole(req.user, USER_ROLES.ADMIN, USER_ROLES.REQUESTS_MANAGER),
      },
    },
  ],
}
