import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'QueueCare - Smart Patient Management for PHC Clinics',
  description: 'Offline-first patient and queue management system designed for South African primary healthcare clinics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}