'use client'

import { XIcon } from '@/components/ui/Icons'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ConsultationForm, {
  consultationTranslations,
  type ConsultationLocale,
} from './ConsultationForm'

type ConsultationModalProps = { locale: ConsultationLocale; label?: string; className?: string }

export default function ConsultationModal({ locale, label, className }: ConsultationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()
  const t = consultationTranslations[locale]

  const closeModal = () => {
    if (!isSubmitting) setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isSubmitting) setIsOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      trigger?.focus()
    }
  }, [isOpen, isSubmitting])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          'mt-0 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-gold-gradient px-10 text-14 font-bold text-primary transition-all duration-300 hover:brightness-125 lg:mt-0'
        }
      >
        {label || t.trigger}
      </button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020611]/85 p-2 backdrop-blur-md sm:p-5"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal()
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-title`}
              aria-describedby={`${id}-description`}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              className="relative flex max-h-[96dvh] w-full max-w-[840px] flex-col overflow-hidden rounded-[22px] border border-[#C9A96E]/25 bg-[#0D1522] text-white shadow-[0_35px_120px_rgba(0,0,0,0.8)] sm:max-h-[92dvh] sm:rounded-[28px]"
            >
              <div className="pointer-events-none absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#E0C38E] to-transparent" />
              <header className="relative shrink-0 overflow-hidden border-b border-white/[0.07] px-6 py-6 text-center sm:px-12 sm:py-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,110,0.13),transparent_75%)]" />
                <button
                  ref={closeRef}
                  type="button"
                  aria-label={t.close}
                  disabled={isSubmitting}
                  onClick={closeModal}
                  className="absolute end-4 top-4 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:rotate-90 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] disabled:opacity-40 sm:end-6 sm:top-6"
                >
                  <XIcon size={18} />
                </button>
                <div className="relative mx-auto max-w-[610px]">
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/10 px-4 py-1.5 text-[11px] font-semibold text-[#D7B475]">
                    <span className="size-1.5 rounded-full bg-[#D7B475]" />
                    {t.badge}
                  </span>
                  <h2
                    id={`${id}-title`}
                    className="mb-3 text-[25px] font-bold leading-[1.5] sm:text-[34px]"
                  >
                    {t.title}{' '}
                    <span className="bg-gradient-to-l from-[#F0D7A1] via-[#C9A96E] to-[#A27B32] bg-clip-text text-transparent">
                      {t.highlight}
                    </span>
                  </h2>
                  <p
                    id={`${id}-description`}
                    className="mx-auto max-w-[560px] text-[12px] leading-[1.9] text-white/55 sm:text-sm"
                  >
                    {t.description}
                  </p>
                </div>
              </header>
              <ConsultationForm
                locale={locale}
                variant="modal"
                onSubmittingChange={setIsSubmitting}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
