'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/config'

type Props = {
  product: Product
  image: string
}

export function ProductRow({ product, image }: Props) {
  const { items, add, setQty, remove } = useCart()
  const inCart = items.find((i) => i.product.id === product.id)

  const decrement = () => {
    if (!inCart) return
    const next = inCart.qty - product.minQty
    if (next <= 0) remove(product.id)
    else setQty(product.id, next)
  }

  const increment = () => {
    if (inCart) setQty(product.id, inCart.qty + product.minQty)
    else add(product)
  }

  return (
    <article className="flex items-start gap-4 py-5 border-b border-[var(--color-border)] last:border-0">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-[88px] h-[88px] overflow-hidden bg-[var(--color-surface)]">
        {product.badge && (
          <span className="absolute top-1 left-1 z-10 bg-[var(--color-ink)] text-[var(--color-ink-text)] text-[8px] uppercase tracking-[0.15em] px-1.5 py-[3px] leading-none">
            {product.badge}
          </span>
        )}
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="88px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-light text-xl leading-tight text-[var(--color-text)]">
          {product.name}
        </h3>
        <p className="mt-0.5 font-body text-[0.7rem] text-[var(--color-muted)] leading-snug line-clamp-2">
          {product.description}
        </p>
        <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.15em] text-[var(--color-muted)]">
          от {product.minQty} {product.unit}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-display font-light text-2xl leading-none text-[var(--color-gold)]">
            {product.price}
            <span className="font-body text-[0.62rem] text-[var(--color-muted)] ml-1">
              с/{product.unit}
            </span>
          </span>

          {inCart ? (
            <div className="flex items-center border border-[var(--color-accent)] text-[var(--color-accent)] shrink-0">
              <button
                type="button"
                onClick={decrement}
                aria-label={`Убрать ${product.minQty} ${product.unit}`}
                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <svg width="12" height="2" viewBox="0 0 12 2" aria-hidden>
                  <rect width="12" height="2" fill="currentColor" />
                </svg>
              </button>
              <span className="min-w-9 text-center text-xs font-medium tabular-nums text-[var(--color-text)] font-body">
                {inCart.qty}
              </span>
              <button
                type="button"
                onClick={increment}
                aria-label={`Добавить ${product.minQty} ${product.unit}`}
                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <rect x="5" width="2" height="12" fill="currentColor" />
                  <rect y="5" width="12" height="2" fill="currentColor" />
                </svg>
              </button>
            </div>
          ) : (
            <motion.button
              type="button"
              onClick={increment}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 bg-[var(--color-accent)] text-white font-body text-xs px-4 py-2 font-medium hover:bg-[var(--color-accent-lt)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              В корзину
            </motion.button>
          )}
        </div>
      </div>
    </article>
  )
}
