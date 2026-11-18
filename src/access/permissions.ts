import type { Access } from 'payload'

export const USER_ROLES = {
  ADMIN: 'admin',
  CONTENT_EDITOR: 'content-editor',
  REQUESTS_MANAGER: 'requests-manager',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

type UserWithRole = {
  id?: number | string
  role?: UserRole | null
}

export const hasRole = (user: unknown, ...roles: UserRole[]): boolean => {
  const role = (user as UserWithRole | null | undefined)?.role

  return Boolean(role && roles.includes(role))
}

export const admins: Access = ({ req }) => hasRole(req.user, USER_ROLES.ADMIN)

export const adminsOrContentEditors: Access = ({ req }) =>
  hasRole(req.user, USER_ROLES.ADMIN, USER_ROLES.CONTENT_EDITOR)

export const adminsOrRequestsManagers: Access = ({ req }) =>
  hasRole(req.user, USER_ROLES.ADMIN, USER_ROLES.REQUESTS_MANAGER)

export const adminsOrSelf: Access = ({ req }) => {
  if (hasRole(req.user, USER_ROLES.ADMIN)) return true
  if (!req.user?.id) return false

  return {
    id: {
      equals: req.user.id,
    },
  }
}
