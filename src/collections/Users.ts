import { admins, adminsOrSelf, hasRole, USER_ROLES } from '@/access/permissions'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => !hasRole(user, USER_ROLES.ADMIN),
  },
  auth: true,
  access: {
    // Every defined role needs the admin panel; collection permissions below
    // determine which areas and operations each role can use.
    admin: ({ req }) => Boolean(req.user),
    create: async ({ req }) => {
      if (hasRole(req.user, USER_ROLES.ADMIN)) return true

      const { totalDocs } = await req.payload.count({
        collection: 'users',
        overrideAccess: true,
      })

      return totalDocs === 0
    },
    read: adminsOrSelf,
    update: adminsOrSelf,
    delete: admins,
    unlock: admins,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data

        const { totalDocs } = await req.payload.count({
          collection: 'users',
          overrideAccess: true,
        })

        if (totalDocs === 0) {
          data.role = USER_ROLES.ADMIN
        } else if (!hasRole(req.user, USER_ROLES.ADMIN)) {
          data.role = USER_ROLES.CONTENT_EDITOR
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'الدور والصلاحيات',
      required: true,
      defaultValue: USER_ROLES.CONTENT_EDITOR,
      saveToJWT: true,
      options: [
        { label: 'مدير النظام', value: USER_ROLES.ADMIN },
        { label: 'محرر محتوى', value: USER_ROLES.CONTENT_EDITOR },
        { label: 'مسؤول طلبات الاستشارة', value: USER_ROLES.REQUESTS_MANAGER },
      ],
      access: {
        create: ({ req }) => !req.user || hasRole(req.user, USER_ROLES.ADMIN),
        update: ({ req }) => hasRole(req.user, USER_ROLES.ADMIN),
      },
      admin: {
        description:
          'محرر المحتوى يدير محتوى الموقع دون الحذف، ومسؤول الطلبات يتابع طلبات الاستشارة، ومدير النظام يمتلك كل الصلاحيات.',
      },
    },
  ],
}
