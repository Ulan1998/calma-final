'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CONFIG } from '@/lib/config'
import { fadeUp, stagger } from '@/lib/motion'
import { heroImage } from '@/lib/images'

const HEADLINE_WORDS = ['Круассаны,', 'готовые', 'к вашей', 'печи']

const TRUST_STATS = [
  '−18°C заморозка',
  '18 мин выпечка',
  'доставка по Бишкеку',
  'B2B с 2023',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-36 pb-0 md:pt-44">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">

          {/* Left — editorial text column */}
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent)] font-medium"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Производство · Бишкек
            </motion.p>

            <h1
              className="mt-6 text-[var(--color-text)] font-light"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    variants={fadeUp}
                    className="block"
                    style={i === 0 ? { color: 'var(--color-accent)' } : undefined}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg text-[var(--color-muted)] leading-relaxed max-w-md"
            >
              Замороженная виеннуазери для кафе, ресторанов и отелей.
              Стабильное качество, гибкие объёмы, выпечка на месте.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#catalog" variant="primary">Смотреть каталог</Button>
              <Button href={CONFIG.WHATSAPP} variant="secondary">Связаться в WhatsApp</Button>
            </motion.div>
          </motion.div>

          {/* Right — gold-framed photograph with magazine caption */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative ml-auto w-full max-w-md">
              <div className="relative overflow-hidden border border-[var(--color-gold)] bg-[var(--color-surface)]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Magazine caption chip */}
              <div className="absolute -bottom-4 -left-4 bg-[var(--color-bg)] border border-[var(--color-border)] px-4 py-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]"
                   style={{ fontFamily: 'var(--font-body)' }}>
                  № 01 · Surgelé
                </p>
                <p className="text-sm text-[var(--color-text)] mt-0.5"
                   style={{ fontFamily: 'var(--font-display)' }}>
                  Ламинация на 27 слоёв
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust-stat row, separated by gold hairlines */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        className="mt-16 md:mt-24 border-t border-[var(--color-border)]"
      >
        <ul className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          {TRUST_STATS.map((stat) => (
            <li
              key={stat}
              className="py-5 md:py-7 md:px-6 first:md:pl-0 text-sm text-[var(--color-muted)] flex items-center gap-2.5"
            >
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              {stat}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
