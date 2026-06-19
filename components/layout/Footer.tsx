import { CONFIG } from '@/lib/config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[var(--color-ink)] text-[var(--color-ink-text)]">
      {/* Gold hairline on top */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-gold) 70%, transparent) 30%, color-mix(in srgb, var(--color-gold) 70%, transparent) 70%, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Wordmark */}
        <p
          className="font-light leading-none text-[var(--color-ink-text)]"
          style={{
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.04em',
            fontSize: 'clamp(3.5rem, 1rem + 14vw, 11rem)',
          }}
        >
          CALMA
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12">
          <div className="sm:col-span-1">
            <p className="text-sm leading-relaxed text-[var(--color-ink-text)]/70 max-w-xs">
              Производство и продажа замороженных круассанов для кафе, ресторанов и
              отелей Бишкека.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-4 font-medium">
              Контакты
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${CONFIG.PHONE.replace(/\s/g, '')}`}
                  className="text-[var(--color-ink-text)] hover:text-[var(--color-gold)] transition-colors"
                >
                  {CONFIG.PHONE}
                </a>
              </li>
              <li>
                <a
                  href={CONFIG.WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-ink-text)] hover:text-[var(--color-gold)] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-[var(--color-ink-text)]/60">{CONFIG.ADDRESS}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-4 font-medium">
              Навигация
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#catalog" className="text-[var(--color-ink-text)] hover:text-[var(--color-gold)] transition-colors">
                  Каталог продукции
                </a>
              </li>
              <li>
                <a href="#how" className="text-[var(--color-ink-text)] hover:text-[var(--color-gold)] transition-colors">
                  Как заказать
                </a>
              </li>
              <li>
                <a href="#order" className="text-[var(--color-ink-text)] hover:text-[var(--color-gold)] transition-colors">
                  Оформить заказ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-[var(--color-ink-text)]/45">
          <p>© {year} CALMA. Все права защищены.</p>
          <p>Бишкек, Кыргызстан</p>
        </div>
      </div>
    </footer>
  )
}
