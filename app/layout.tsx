import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shield Africa — Sustainable Development Across Africa',
  description: 'Shield Africa is a non-profit advancing sustainable development, humanitarian aid, agriculture, education and women\'s empowerment across Nigeria and Africa.',
  keywords: ['NGO', 'Africa', 'sustainable development', 'humanitarian aid', 'agriculture', 'education', 'women empowerment', 'community development', 'Nigeria'],
  authors: [{ name: 'Shield Africa' }],
  openGraph: {
    title: 'Shield Africa — Sustainable Development Across Africa',
    description: 'Empowering communities through sustainable development, humanitarian aid and capacity building across Africa.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shield Africa — Sustainable Development Across Africa',
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
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
