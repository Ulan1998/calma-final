'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const STATS = [
  { value: '7 кг',     label: 'бесплатная доставка' },
  { value: '25 минут', label: 'выпечка до готовности' },
  { value: 'от 3 кг',  label: 'минимальный заказ' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-[var(--color-bg)] md:pt-16">

      {/* Mobile: stacked. Desktop: side-by-side */}
      <div className="flex flex-col md:flex-row md:min-h-[560px]">

        {/* Video */}
        <div className="w-full md:w-1/2 overflow-hidden max-h-[386px] md:max-h-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
            className="w-full h-full block object-cover object-bottom max-h-[386px] md:max-h-full"
            aria-label="Производство замороженных круассанов CALMA"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center md:items-start md:justify-center gap-0 px-6 pt-1 pb-3 md:pt-12 md:pb-12 md:px-12 text-center md:text-left md:w-1/2">

          {/* H1 */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="font-body font-bold text-[var(--color-text)] mb-2 md:mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)', lineHeight: 1.18, letterSpacing: '-0.025em', textWrap: 'balance' }}
          >
            Всё для свежей выпечки{' '}
            <span style={{ color: '#ab2b02' }}>без лишних затрат</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="font-body text-[var(--color-muted)] mb-3 md:mb-6"
            style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', lineHeight: 1.55, textWrap: 'balance' }}
          >
            Замороженные круассаны, слоёное тесто, булочки для бургеров и чизкейки для HoReCa
          </motion.p>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
            className="flex w-full rounded-2xl overflow-hidden mb-3 md:mb-6 bg-white border border-[var(--color-border)]"
          >
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className="flex-1 flex flex-col items-center py-3 px-2 text-center"
                style={{ borderRight: i < STATS.length - 1 ? '1px solid var(--color-border)' : 'none' }}
              >
                <span
                  className="font-body font-extrabold text-[var(--color-text)] mb-1"
                  style={{ fontSize: '1.15rem', lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </span>
                <span className="font-body text-[var(--color-muted)] font-medium" style={{ fontSize: '0.65rem', lineHeight: 1.35 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.56 }}
            className="flex flex-col md:flex-row gap-3 w-full"
          >
            <button
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="block w-full md:w-auto md:px-8 text-center rounded-full py-4 text-sm font-semibold text-white font-body transition-transform duration-150 active:scale-95"
              style={{
                background: '#ab2b02',
                boxShadow: '0 6px 20px rgba(171,43,2,0.38)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Выбрать продукцию
            </button>
            <p
              className="text-center font-body font-medium py-3 md:py-0 md:flex md:items-center whitespace-nowrap"
              style={{ color: 'var(--color-muted)', fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)' }}
            >
              Круассаны&nbsp;•&nbsp;Слоёное тесто&nbsp;•&nbsp;Булочки&nbsp;•&nbsp;Чизкейки
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
