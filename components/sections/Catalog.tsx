'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { PRODUCTS } from '@/lib/config'
import { CONFIG } from '@/lib/config'
import { productImage } from '@/lib/images'
import { fadeUp, stagger } from '@/lib/motion'

export function Catalog() {
  const [featured, ...rest] = PRODUCTS

  return (
    <section id="catalog" className="py-24 md:py-36 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Section head: numeral + gold hairline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-baseline gap-5">
            <span
              className="text-[var(--color-gold)] font-light shrink-0"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 1rem + 2vw, 2.5rem)' }}
            >
              02
            </span>
            <span className="lamination-rule flex-1 translate-y-[-0.3em]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)] shrink-0">
              Каталог
            </span>
          </div>
          <h2
            className="mt-6 text-[var(--color-text)] font-light max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 1rem + 4vw, 4rem)', lineHeight: 1.05 }}
          >
            Замороженная выпечка, готовая к вашей печи
          </h2>
        </motion.div>

        {/* Featured wide card */}
        {featured && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-6"
          >
            <ProductCard product={featured} image={productImage(0)} featured />
          </motion.div>
        )}

        {/* Remaining products in a tighter grid */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rest.map((product, i) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} image={productImage(i + 1)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Custom-volume CTA strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 p-7 md:p-9 border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
        >
          <div>
            <p className="text-[var(--color-text)] text-lg" style={{ fontFamily: 'var(--font-display)' }}>
              Нестандартный объём или формат?
            </p>
            <p className="text-sm text-[var(--color-muted)] mt-1">Обсудим условия поставки индивидуально.</p>
          </div>
          <a
            href={CONFIG.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[var(--color-accent)] text-white text-sm px-7 py-3.5 font-medium hover:bg-[var(--color-accent-lt)] transition-colors duration-150"
          >
            Написать в WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  )
}
