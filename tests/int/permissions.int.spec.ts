import {
  admins,
  adminsOrContentEditors,
  adminsOrRequestsManagers,
  adminsOrSelf,
  USER_ROLES,
} from '@/access/permissions'
import { Articles } from '@/collections/Articles'
import {
  CONSULTATION_ATTACHMENT_MAX_SIZE,
  CONSULTATION_ATTACHMENT_MIME_TYPES,
  ConsultationRequests,
} from '@/collections/ConsultationRequests'
import { Users } from '@/collections/Users'
import { SiteSettings } from '@/globals/SiteSettings'
import { TeamPage } from '@/globals/TeamPage'
import { describe, expect, it } from 'vitest'

const accessArgs = (role?: (typeof USER_ROLES)[keyof typeof USER_ROLES]) =>
  ({
    req: {
      user: role
        ? {
            id: 42,
            collection: 'users',
            role,
          }
        : null,
    },
  }) as unknown as Parameters<typeof admins>[0]

describe('role permissions', () => {
  it('grants admins every role-level permission', async () => {
    const args = accessArgs(USER_ROLES.ADMIN)

    expect(await admins(args)).toBe(true)
    expect(await adminsOrContentEditors(args)).toBe(true)
    expect(await adminsOrRequestsManagers(args)).toBe(true)
  })

  it('limits content editors to content management', async () => {
    const args = accessArgs(USER_ROLES.CONTENT_EDITOR)

    expect(await admins(args)).toBe(false)
    expect(await adminsOrContentEditors(args)).toBe(true)
    expect(await adminsOrRequestsManagers(args)).toBe(false)
  })

  it('limits requests managers to consultation requests', async () => {
    const args = accessArgs(USER_ROLES.REQUESTS_MANAGER)

    expect(await admins(args)).toBe(false)
    expect(await adminsOrContentEditors(args)).toBe(false)
    expect(await adminsOrRequestsManagers(args)).toBe(true)
  })

  it('allows non-admin users to access only their own user record', async () => {
    expect(await adminsOrSelf(accessArgs())).toBe(false)
    expect(await adminsOrSelf(accessArgs(USER_ROLES.CONTENT_EDITOR))).toEqual({
      id: { equals: 42 },
    })
    expect(await adminsOrSelf(accessArgs(USER_ROLES.ADMIN))).toBe(true)
  })
})

describe('permission wiring', () => {
  it('uses the content role for content creation and reserves deletion for admins', () => {
    expect(Articles.access?.create).toBe(adminsOrContentEditors)
    expect(Articles.access?.update).toBe(adminsOrContentEditors)
    expect(Articles.access?.delete).toBe(admins)
  })

  it('reserves consultation management for the matching role', () => {
    expect(ConsultationRequests.access?.read).toBe(adminsOrRequestsManagers)
    expect(ConsultationRequests.access?.update).toBe(adminsOrRequestsManagers)
    expect(ConsultationRequests.access?.delete).toBe(admins)
  })

  it('accepts an optional, restricted consultation attachment', () => {
    expect(ConsultationRequests.upload).toMatchObject({
      filesRequiredOnCreate: false,
      mimeTypes: CONSULTATION_ATTACHMENT_MIME_TYPES,
    })
    expect(CONSULTATION_ATTACHMENT_MAX_SIZE).toBe(4 * 1024 * 1024)
  })

  it('keeps site settings and user deletion admin-only', () => {
    expect(SiteSettings.access?.update).toBe(admins)
    expect(Users.access?.delete).toBe(admins)
  })

  it('allows content editors to manage the team page', () => {
    expect(TeamPage.access?.read).toBeTypeOf('function')
    expect(TeamPage.access?.update).toBe(adminsOrContentEditors)
  })
})
