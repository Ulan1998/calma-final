'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { bakeryImage } from '@/lib/images'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Background image moves up slower than scroll → classic parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.06, 1.12])

  // Numbers pop in with scale on scroll
  const numberScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink-text)]"
    >
      {/* Parallax background photo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src={bakeryImage.src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-[0.14]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[var(--color-ink)]/55 pointer-events-none" />

      {/* Lamination texture */}
      <div aria-hidden className="lamination absolute inset-0 opacity-[0.06] pointer-events-none" />

      {/* Floating grain decoration — scroll-driven */}
      <motion.div
        className="absolute right-[8%] top-[15%] pointer-events-none opacity-[0.15] text-[var(--color-gold)]"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['-20px', '40px']) }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="4" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-[5%] bottom-[20%] pointer-events-none opacity-[0.12] text-[var(--color-gold)]"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['30px', '-30px']) }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 4 L32 27 L55 30 L32 33 L30 56 L28 33 L5 30 L28 27 Z" fill="currentColor" />
        </svg>
      </motion.div>

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
            Настоящая ламинация.{' '}
            <motion.span className="text-[var(--color-gold)]" style={{ scale: numberScale, display: 'inline-block' }}>
              27
            </motion.span>{' '}
            слоёв теста и{' '}
            <motion.span className="text-[var(--color-gold)]" style={{ scale: numberScale, display: 'inline-block' }}>
              72
            </motion.span>{' '}
            часа расстойки — для вкуса, который нельзя ускорить.
          </motion.blockquote>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-3xl">
            <motion.p variants={fadeUp} className="text-[var(--color-ink-text)]/75 leading-relaxed">
              Мы замораживаем тесто на пике свежести при{' '}
              <span className="text-[var(--color-gold)]">−18°C</span>,
              сохраняя структуру слоёв. Вы выпекаете ровно столько, сколько нужно гостям — без списаний и потерь.
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
