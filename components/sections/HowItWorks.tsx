'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

const TERMS = [
  {
    label: 'Гибкие форматы поставки',
    val: 'Поставляем продукцию в фирменной упаковке CALMA с маркировкой и штрих-кодом либо в оптовом формате для фасовки и продажи под брендом партнёра.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    label: 'Индивидуальные условия',
    val: 'Для постоянных партнёров и крупных объёмов предлагаем специальные цены и индивидуальные условия сотрудничества.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Приоритетное производство',
    val: 'Постоянные партнёры получают приоритет при планировании производства и поставок — особенно важно в периоды высокого спроса.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    label: 'Поддержка запуска продаж',
    val: 'Помогаем подобрать ассортимент, предоставляем фотографии и описания продукции, при необходимости проводим дегустации.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
  },
]

const STAGGER = stagger(0.07)

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="py-8 px-5 bg-[var(--color-bg)] md:py-14 md:px-8"
    >
      <div className="md:max-w-5xl md:mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="font-script text-center mb-5"
        style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02', fontFamily: 'var(--font-script)' }}
      >
        Для магазинов и гастромаркетов
      </motion.p>

      <motion.div
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4"
      >
        {TERMS.map((t) => (
          <motion.div
            key={t.label}
            variants={fadeUp}
            className="flex items-start gap-4 bg-white rounded-[20px] px-5 py-5 border border-[var(--color-border)]"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div
              className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(171,43,2,0.10)', color: '#ab2b02' }}
            >
              <span className="block w-[18px] h-[18px]">{t.icon}</span>
            </div>
            <div>
              <p className="font-body font-bold text-[var(--color-text)] mb-1" style={{ fontSize: '0.95rem' }}>
                {t.label}
              </p>
              <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
                {t.val}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  )
}
