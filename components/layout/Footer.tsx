'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { useTasting } from '@/lib/tasting-context'
import { LegalSheet } from '@/components/ui/LegalSheet'

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="#fff" width={20} height={20} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export function Footer() {
  const [legalOpen, setLegalOpen] = useState<string | null>(null)
  const { open: openTasting } = useTasting()

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      // нижний отступ с запасом под мобильную навигацию — последняя ссылка кликается
      style={{ padding: '56px 20px calc(96px + env(safe-area-inset-bottom, 0px))' }}
    >

      {/* Background photo */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/footer-bakery.png"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.8)' }} />
      </div>

      {/* Content — mobile: centered column, desktop: two columns */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:max-w-5xl md:mx-auto md:text-left md:gap-12"
      >
        {/* Left: heading block */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p
            className="font-script"
            style={{ fontSize: '1.7rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}
          >
            Готовы начать?
          </p>
          <h2
            className="font-body font-bold text-white"
            style={{ fontSize: 'clamp(1.55rem, 3vw, 2rem)', lineHeight: 1.22, maxWidth: 420, letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            Получите бесплатный пробный набор и оцените качество продукции CALMA в своём заведении
          </h2>
        </div>

        {/* Right: CTA + contacts */}
        <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
          <button
            type="button"
            onClick={openTasting}
            className="inline-flex items-center gap-2 rounded-full font-body font-bold transition-transform duration-150 active:scale-95 hover:scale-105"
            style={{
              padding: '16px 28px',
              background: '#25d366',
              color: '#fff',
              fontSize: '0.93rem',
              boxShadow: '0 6px 20px rgba(37,211,102,0.33)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {WA_ICON}
            Получить образцы продукции
          </button>

          <p className="font-body" style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.6)' }}>
            Доставка оплачивается отдельно
          </p>
        </div>
      </motion.div>

      {/* Юридические документы */}
      <nav
        aria-label="Юридические документы"
        className="relative z-10 flex flex-col items-center mt-10"
        style={{ gap: 10, padding: '0 12px' }}
      >
        <p
          className="font-body font-semibold"
          style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}
        >
          Юридические документы
        </p>
        {[
          { slug: 'oferta', label: 'Публичная оферта' },
          { slug: 'dostavka', label: 'Условия оплаты и доставки' },
          { slug: 'privacy', label: 'Политика конфиденциальности' },
          { slug: 'personal-data', label: 'Согласие на обработку персональных данных' },
        ].map(d => (
          <a
            key={d.slug}
            href={`/docs/${d.slug}`}
            onClick={e => { e.preventDefault(); setLegalOpen(d.slug) }}
            className="font-body transition-opacity hover:opacity-60"
            style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'underline', textUnderlineOffset: 3, padding: '2px 6px' }}
          >
            {d.label}
          </a>
        ))}
      </nav>

      <LegalSheet slug={legalOpen} onClose={() => setLegalOpen(null)} />

      {/* Copyright */}
      <p
        className="relative z-10 font-body uppercase tracking-[0.22em] text-center mt-5"
        style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.6)' }}
      >
        CALMA · Продукция для HoReCa и ритейла · Бишкек · ИП Матыева
      </p>
    </footer>
  )
}
