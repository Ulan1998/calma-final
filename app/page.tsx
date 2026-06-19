import { CartProvider } from '@/lib/cart-context'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Catalog } from '@/components/sections/Catalog'
import { Benefits } from '@/components/sections/Benefits'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { OrderSection } from '@/components/sections/OrderSection'

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Catalog />
        <Benefits />
        <HowItWorks />
        <OrderSection />
      </main>
      <Footer />
    </CartProvider>
  )
}
