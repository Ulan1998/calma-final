'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { bakeryImage } from '@/lib/images'

export function Manifesto() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink-text)]"
    >
      {/* Background bakery photo, duotone-dimmed */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={bakeryImage.src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-[var(--color-ink)]/55" />
      </div>

      {/* Lamination texture overlay */}
      <div aria-hidden className="lamination absolute inset-0 opacity-[0.06] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-40">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.22em] text-[var(--color-gold)] font-medium"
          >
            01 — Манифест
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            className="mt-8 max-w-4xl font-light"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 1rem + 4.4vw, 4.75rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
            }}
          >
            Настоящая ламинация. <span className="text-[var(--color-gold)]">27</span> слоёв
            теста и <span className="text-[var(--color-gold)]">72</span> часа
            расстойки — для вкуса, который нельзя ускорить.
          </motion.blockquote>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-3xl">
            <motion.p variants={fadeUp} className="text-[var(--color-ink-text)]/75 leading-relaxed">
              Мы замораживаем тесто на пике свежести при <span className="text-[var(--color-gold)]">−18°C</span>,
              сохраняя структуру слоёв. Вы выпекаете ровно столько, сколько нужно гостям —
              без списаний и потерь.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[var(--color-ink-text)]/75 leading-relaxed">
              Один рецепт, одна температура, один результат — партия за партией.
              Это и есть стабильность, на которую закупщик может положиться.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
