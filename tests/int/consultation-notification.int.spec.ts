import { sendConsultationNotification } from '@/hooks/sendConsultationNotification'
import type { ConsultationRequest } from '@/payload-types'
import { afterEach, describe, expect, it, vi } from 'vitest'

const consultation = {
  id: 15,
  fullName: 'عميل تجريبي',
  phone: '0500000000',
  email: 'client@example.com',
  city: 'الرياض',
  specialization: 'commercial',
  consultationType: 'online',
  preferredDate: '2026-10-20T00:00:00.000Z',
  preferredTime: '10:00',
  summary: 'ملخص الطلب',
  locale: 'ar',
  status: 'new',
  filename: 'case.pdf',
} as ConsultationRequest

const hookArgs = ({ sendEmail = vi.fn() } = {}) => {
  const logger = {
    error: vi.fn(),
    warn: vi.fn(),
  }

  return {
    args: {
      doc: consultation,
      operation: 'create',
      req: {
        user: null,
        payload: {
          logger,
          sendEmail,
        },
      },
    } as unknown as Parameters<typeof sendConsultationNotification>[0],
    logger,
    sendEmail,
  }
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('consultation email notification', () => {
  it('sends new public requests to the configured YAZ Law address', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('RESEND_FROM_EMAIL', 'notifications@yazlaw.com.sa')
    vi.stubEnv('NOTIFICATION_EMAIL', 'Info@yazlaw.com.sa')
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://yazlaw.com.sa')
    const { args, sendEmail } = hookArgs()

    await sendConsultationNotification(args)

    expect(sendEmail).toHaveBeenCalledOnce()
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'notifications@yazlaw.com.sa',
        to: 'Info@yazlaw.com.sa',
        replyTo: 'client@example.com',
        subject: 'طلب استشارة جديد من عميل تجريبي',
      }),
    )
  })

  it('keeps the request successful if email delivery fails', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('RESEND_FROM_EMAIL', 'notifications@yazlaw.com.sa')
    vi.stubEnv('NOTIFICATION_EMAIL', 'Info@yazlaw.com.sa')
    const { args, logger } = hookArgs({
      sendEmail: vi.fn().mockRejectedValue(new Error('email unavailable')),
    })

    await expect(sendConsultationNotification(args)).resolves.toBe(consultation)
    expect(logger.error).toHaveBeenCalledOnce()
  })

  it('skips delivery cleanly until Resend is configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    vi.stubEnv('RESEND_FROM_EMAIL', '')
    vi.stubEnv('NOTIFICATION_EMAIL', '')
    const { args, logger, sendEmail } = hookArgs()

    await sendConsultationNotification(args)

    expect(sendEmail).not.toHaveBeenCalled()
    expect(logger.warn).toHaveBeenCalledOnce()
  })

  it('does not send another notification when a request is edited', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('RESEND_FROM_EMAIL', 'notifications@yazlaw.com.sa')
    vi.stubEnv('NOTIFICATION_EMAIL', 'Info@yazlaw.com.sa')
    const { args, sendEmail } = hookArgs()

    await sendConsultationNotification({
      ...args,
      operation: 'update',
    })

    expect(sendEmail).not.toHaveBeenCalled()
  })
})
