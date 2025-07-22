import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pratyush Yadav - Full-Stack Developer',
  description: 'Full-Stack Developer & CS Student at IIIT Jabalpur. Passionate about building innovative web applications with modern technologies.',
  keywords: 'Full-Stack Developer, Next.js, React, Node.js, TypeScript, AI, Web Development',
  authors: [{ name: 'Pratyush Yadav' }],
  openGraph: {
    title: 'Pratyush Yadav - Full-Stack Developer',
    description: 'Full-Stack Developer & CS Student at IIIT Jabalpur',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}