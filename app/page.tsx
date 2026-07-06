import { CartProvider } from '@/lib/cart-context'
import { CartBar } from '@/components/layout/CartBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { Catalog } from '@/components/sections/Catalog'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { FAQ } from '@/components/sections/FAQ'
import { Clients } from '@/components/sections/Clients'

export default function Home() {
  return (
    <CartProvider>
      <div
        id="app"
        style={{
          width: '100%',
          maxWidth: 430,
          margin: '0 auto',
          background: '#ffffff',
          minHeight: '100svh',
          borderTop: '3px solid #ab2b02',
          position: 'relative',
        }}
      >
        <main style={{ paddingBottom: 88 }}>
          <Hero />
          <Benefits />
          <Catalog />
          <HowItWorks />
          <FAQ />
          <Clients />
        </main>
        <Footer />
        <CartBar />
        <BottomNav />
      </div>
    </CartProvider>
  )
}
