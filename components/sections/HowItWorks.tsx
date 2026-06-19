'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

const steps = [
  { num: '01', title: 'Заявка', desc: 'Выберите позиции в каталоге и оставьте контакты — менеджер подтвердит заказ.' },
  { num: '02', title: 'Доставка', desc: 'Привозим замороженное тесто на следующий день с холодовой цепочкой.' },
  { num: '03', title: 'Выпечка', desc: 'Выпекаете ровно столько, сколько нужно гостям — без списаний.' },
  { num: '04', title: 'Подача', desc: 'Свежая выпечка с хрустящей корочкой к каждому открытию.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-ink-text)] py-24 md:py-32">
      <div aria-hidden className="lamination absolute inset-0 opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-gold)] font-medium">
            02 — Процесс
          </span>
          <h2
            className="mt-3 font-light"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2rem, 1rem + 3vw, 3.5rem)',
            }}
          >
            Как заказать
          </h2>
        </motion.div>

        <motion.ol
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12"
        >
          {/* Horizontal connecting rail (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[2.4rem] left-[12%] right-[12%] h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-gold) 55%, transparent) 12%, color-mix(in srgb, var(--color-gold) 55%, transparent) 88%, transparent)',
            }}
          />
          {/* Vertical rail (mobile) */}
          <div
            aria-hidden
            className="md:hidden absolute top-4 bottom-4 left-[1.6rem] w-px"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--color-gold) 50%, transparent), transparent)',
            }}
          />

          {steps.map(step => (
            <motion.li
              key={step.num}
              variants={fadeUp}
              className="relative flex md:flex-col gap-5 md:gap-0 md:text-center md:items-center"
            >
              <span
                className="relative z-10 shrink-0 inline-flex items-center justify-center text-[var(--color-gold)] font-light bg-[var(--color-ink)] md:mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 1.5rem + 2vw, 3.75rem)',
                  lineHeight: 1,
                  minWidth: '3.25rem',
                }}
              >
                {step.num}
              </span>
              <div className="md:max-w-[15rem]">
                <h3
                  className="text-xl mb-2 font-light"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-text)]/70">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 md:mt-20 md:text-center"
        >
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-[var(--color-ink)] px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#d8ba60] transition-colors duration-150"
          >
            Начать заказ →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
