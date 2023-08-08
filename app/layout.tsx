import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Nfts App',
  description: 'Nfts App'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  )
}
