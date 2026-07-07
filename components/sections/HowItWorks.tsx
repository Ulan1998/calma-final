'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

const TERMS = [
  {
    label: 'Минимальный заказ',
    val: 'От 3 кг. Можно смешивать разные позиции.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    label: 'Доставка',
    val: 'Рефрижератором по Бишкеку. Ош, Каракол.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Оплата',
    val: 'Наличными или безналом. Предоставляем ЭСФ.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Качество',
    val: 'Сертификат ЕАЭС. Рекламации решаем лично.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
      className="py-8 px-5 bg-[var(--color-bg)]"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="font-script text-center mb-3"
        style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02', fontFamily: 'var(--font-script)' }}
      >
        Условия работы
      </motion.p>



      <motion.div
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-3"
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
    </section>
  )
}
