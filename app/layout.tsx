import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'First Issue Sorting Agent',
  description: 'Find good first issues based on your skills and interests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
