'use client'

import { motion } from 'framer-motion'
import { CONFIG } from '@/lib/config'
import { EASE } from '@/lib/motion'

const STATS = [
  { value: '75%',   label: 'расстойка' },
  { value: '−40°C', label: 'шоковая заморозка' },
  { value: 'от 3 кг', label: 'мин. заказ' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="flex flex-col bg-[var(--color-bg)]">

      {/* Video */}
      <div className="w-full overflow-hidden" style={{ maxHeight: 386 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="w-full block object-cover object-bottom"
          style={{ maxHeight: 386 }}
          aria-label="Производство замороженных круассанов CALMA"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-0 px-6 pt-1 pb-3 text-center">

        {/* H1 */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          className="font-body font-bold text-[var(--color-text)] mb-2"
          style={{ fontSize: 'clamp(1.5rem, 6.5vw, 2rem)', lineHeight: 1.18, letterSpacing: '-0.025em', textWrap: 'balance' }}
        >
          Замороженные круассаны для{' '}
          <span style={{ color: '#ab2b02' }}>HoReCa</span>
        </motion.h1>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
          className="flex w-full rounded-2xl overflow-hidden mb-3 bg-white border border-[var(--color-border)]"
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
          className="flex flex-col gap-3 w-full"
        >
          <button
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="block w-full text-center rounded-full py-4 text-sm font-semibold text-white font-body transition-transform duration-150 active:scale-95"
            style={{
              background: '#ab2b02',
              boxShadow: '0 6px 20px rgba(171,43,2,0.38)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Выбрать продукцию
          </button>
          <a
            href={CONFIG.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-center font-body hover:opacity-70 transition-opacity underline underline-offset-6"
            style={{ color: 'var(--color-muted)' }}
          >
            Написать в WhatsApp
          </a>
        </motion.div>

      </div>

      <style>{`
        @keyframes heroPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(.7); }
        }
      `}</style>
    </section>
  )
}
