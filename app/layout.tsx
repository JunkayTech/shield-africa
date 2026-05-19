import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shield Africa | Sustainable Development Across Africa',
  description: 'Shield Africa is a global African development organization focused on sustainability, humanitarian aid, agriculture, education, women empowerment, and community development across Nigeria and Africa.',
  keywords: ['NGO', 'Africa', 'sustainable development', 'humanitarian aid', 'agriculture', 'education', 'women empowerment', 'community development', 'Nigeria'],
  authors: [{ name: 'Shield Africa' }],
  openGraph: {
    title: 'Shield Africa | Sustainable Development Across Africa',
    description: 'Empowering communities through sustainable development initiatives, humanitarian aid, and capacity building programs across Nigeria and Africa.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shield Africa | Sustainable Development Across Africa',
    description: 'Empowering communities through sustainable development initiatives across Africa.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
