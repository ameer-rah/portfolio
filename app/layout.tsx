import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ameer Rahman - Architectural Designer',
  description: 'Portfolio of Ameer Rahman, Architectural Designer and Creative Professional specializing in innovative design solutions.',
  keywords: 'architecture, design, portfolio, ameer rahman, architectural designer',
  authors: [{ name: 'Ameer Rahman' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Ameer Rahman - Architectural Designer',
    description: 'Portfolio of Ameer Rahman, Architectural Designer and Creative Professional',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ameer Rahman - Architectural Designer',
    description: 'Portfolio of Ameer Rahman, Architectural Designer and Creative Professional',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}