import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'CyberClaw City',
  description: 'A 3D explorable visualization of an AI agent architecture. Powered by Deez.',
  openGraph: {
    title: 'CyberClaw City',
    description: 'Walk through the mind of an AI agent.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={mono.variable}>
      <body className={`${mono.className} bg-[#050508] text-white overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
