'use client'

import { useEffect } from 'react'
import { getLegalDoc } from '@/lib/legal'
import { LegalRender } from '@/components/ui/LegalRender'

type Props = {
  slug: string | null
  onClose: () => void
}

// Полноэкранная модальная шторка (modal sheet) для юридических документов:
// заголовок + дата редакции, закреплённый крестик, прокрутка, закрытие по фону.
export function LegalSheet({ slug, onClose }: Props) {
  const doc = slug ? getLegalDoc(slug) : null

  // Блокируем прокрутку страницы под шторкой
  useEffect(() => {
    if (!doc) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [doc])

  if (!doc) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 80 }}>
      {/* Фон — закрывает по клику */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
      />

      {/* Почти полноэкранная шторка */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={doc.title}
        style={{
          position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)',
          width: '100%', maxWidth: 760, height: '94svh',
          background: 'var(--color-bg)', borderRadius: '20px 20px 0 0',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Закреплённая шапка с крестиком */}
        <div
          style={{
            flexShrink: 0, display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '18px 20px 14px', borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.15rem', lineHeight: 1.25 }}>
              {doc.title}
            </p>
            <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.78rem', marginTop: 3 }}>
              Редакция от {doc.updated}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть документ"
            style={{
              flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1C1412" strokeWidth={2.2} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Прокручиваемый текст */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '18px 20px 40px' }}>
          <LegalRender body={doc.body} />

          <button
            onClick={onClose}
            className="font-body font-bold"
            style={{
              marginTop: 32, width: '100%', padding: '15px', borderRadius: 50, border: 'none',
              background: '#ab2b02', color: '#fff', fontSize: '0.95rem', cursor: 'pointer',
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
