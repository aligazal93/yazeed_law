import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  description: 'Yaz Law bilingual website powered by Payload CMS.',
  title: 'Yaz Law | ياز للمحاماة',
}

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="rtl" lang="ar">
      <body>{children}</body>
    </html>
  )
}
