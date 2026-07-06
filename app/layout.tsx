import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Caveat } from 'next/font/google'
import ReactDOM from 'react-dom'
import './globals.css'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
})

const montserrat = Montserrat({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
})

const caveat = Caveat({
  variable: '--font-script',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'CALMA — Замороженные круассаны для HoReCa в Бишкеке',
  description: 'B2B поставщик замороженных круассанов для кафе, ресторанов и отелей Бишкека. Собственное производство, доставка на следующий день, QR-оплата.',
  metadataBase: new URL('https://calma.kg'),
  alternates: {
    canonical: 'https://calma.kg',
  },
  openGraph: {
    title: 'CALMA — Замороженные круассаны для HoReCa в Бишкеке',
    description: 'B2B поставщик замороженных круассанов для кафе, ресторанов и отелей Бишкека. Доставка на следующий день.',
    url: 'https://calma.kg',
    siteName: 'CALMA',
    locale: 'ru_KG',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'd47bdb3482eccc6e',
  },
}

export function generateStaticParams() {
  return []
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  ReactDOM.preload('/hero-poster.jpg', { as: 'image', fetchPriority: 'high' })
  ReactDOM.preload('/hero.mp4', { as: 'video', fetchPriority: 'high' })
  return (
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: '#111', color: '#222' }}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
