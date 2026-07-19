import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Caveat } from 'next/font/google'
import ReactDOM from 'react-dom'
import './globals.css'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { SchemaOrg } from './schema'

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
  title: 'CALMA — Круассаны и выпечка для HoReCa | Бишкек',
  description: 'Замороженные круассаны, слоёное тесто, булочки для бургеров и чизкейки для HoReCa и ритейла. Собственное производство в Бишкеке, онлайн-заказ и оплата по QR, бесплатная доставка от 7 кг.',
  keywords: ['круассаны Бишкек', 'самсы оптом', 'замороженная выпечка', 'чизкейк оптом', 'выпечка для кафе', 'HoReCa Бишкек', 'поставщик выпечки', 'круассаны оптом КР'],
  metadataBase: new URL('https://calma.kg'),
  alternates: {
    canonical: 'https://calma.kg',
  },
  openGraph: {
    title: 'CALMA — Круассаны и выпечка для HoReCa | Бишкек',
    description: 'Замороженные круассаны, слоёное тесто, булочки и чизкейки для HoReCa. Онлайн-заказ, оплата по QR, доставка автоморозилкой.',
    url: 'https://calma.kg',
    siteName: 'CALMA',
    locale: 'ru_KG',
    type: 'website',
    images: [{ url: 'https://calma.kg/hero-poster.jpg', width: 1200, height: 630, alt: 'CALMA — замороженная выпечка для кафе Бишкека' }],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: '#F0EBE3', color: '#222' }}>
        <SchemaOrg />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
