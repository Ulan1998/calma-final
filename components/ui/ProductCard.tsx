'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/config'

type Props = {
  product: Product
  image: string
  /** Wide featured layout (image left, details right). */
  featured?: boolean
}

export function ProductCard({ product, image, featured = false }: Props) {
  const { items, add, setQty, remove } = useCart()
  const inCart = items.find((i) => i.product.id === product.id)

  const decrement = () => {
    if (!inCart) return
    const next = inCart.qty - product.minQty
    if (next < product.minQty) {
      remove(product.id)
    } else {
      setQty(product.id, next)
    }
  }

  const increment = () => {
    if (inCart) {
      setQty(product.id, inCart.qty + product.minQty)
    } else {
      add(product)
    }
  }

  return (
    <motion.article
      className={[
        'group relative flex bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden h-full',
        featured ? 'flex-col md:flex-row' : 'flex-col',
      ].join(' ')}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Photo */}
      <div
        className={[
          'relative overflow-hidden bg-[var(--color-border)]',
          featured ? 'md:w-[55%] aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]',
        ].join(' ')}
      >
        <Image
          src={image}
          alt={product.name}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 55vw' : '(max-width: 640px) 100vw, 33vw'}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[var(--color-ink)] text-[var(--color-ink-text)] text-[10px] uppercase tracking-[0.18em] px-3 py-1.5">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className={['flex flex-col flex-1', featured ? 'p-7 md:p-10 justify-center' : 'p-6'].join(' ')}>
        <h3
          className="text-[var(--color-text)] leading-tight font-light"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: featured ? 'clamp(1.75rem, 1rem + 2vw, 2.75rem)' : '1.5rem',
          }}
        >
          {product.name}
        </h3>

        <p className={['text-[var(--color-muted)] leading-relaxed mt-2', featured ? 'text-base max-w-md' : 'text-sm'].join(' ')}>
          {product.description}
        </p>

        <p className="text-xs text-[var(--color-muted)] mt-3 uppercase tracking-[0.12em]">
          Упаковка от {product.minQty} {product.unit}
        </p>

        <div className="mt-auto pt-6 flex items-end justify-between gap-4">
          <p className="flex items-baseline gap-1">
            <span
              className="text-[var(--color-gold)] font-medium leading-none"
              style={{ fontFamily: 'var(--font-display)', fontSize: featured ? '2.5rem' : '2rem' }}
            >
              {product.price}
            </span>
            <span className="text-sm text-[var(--color-muted)]">с / {product.unit}</span>
          </p>

          {inCart ? (
            <div className="flex items-center border border-[var(--color-accent)] text-[var(--color-accent)]">
              <button
                type="button"
                onClick={decrement}
                aria-label={`Убрать ${product.minQty} ${product.unit}`}
                className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <svg width="14" height="2" viewBox="0 0 14 2" aria-hidden><rect width="14" height="2" fill="currentColor" /></svg>
              </button>
              <span className="min-w-12 text-center text-sm font-medium tabular-nums text-[var(--color-text)]">
                {inCart.qty}
              </span>
              <button
                type="button"
                onClick={increment}
                aria-label={`Добавить ${product.minQty} ${product.unit}`}
                className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <rect x="6" width="2" height="14" fill="currentColor" />
                  <rect y="6" width="14" height="2" fill="currentColor" />
                </svg>
              </button>
            </div>
          ) : (
            <motion.button
              type="button"
              onClick={increment}
              whileTap={{ scale: 0.96 }}
              className="bg-[var(--color-accent)] text-white text-sm px-5 py-2.5 font-medium hover:bg-[var(--color-accent-lt)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              В корзину
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
