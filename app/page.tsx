import { CartProvider } from '@/lib/cart-context'
import { CartBar } from '@/components/layout/CartBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { Navbar } from '@/components/layout/Navbar'
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
      <Navbar />
      <div
        id="app"
        className="w-full max-w-[430px] md:max-w-none mx-auto relative"
        style={{
          background: '#ffffff',
          minHeight: '100svh',
          borderTop: '3px solid #ab2b02',
        }}
      >
        <main className="pb-[88px] md:pb-0">
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
