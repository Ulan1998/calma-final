'use client'

import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { CONFIG } from '@/lib/config'

const ICON_HOME = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const ICON_CATALOG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
)
const ICON_CONTACT = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
)
const ICON_CART = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19a2 2 0 001.99-1.77L22 5H6"/>
  </svg>
)

type TabId = 'hero' | 'catalog' | 'contact' | 'order'

type Tab = { id: TabId; label: string; icon: ReactElement }

const TABS: Tab[] = [
  { id: 'hero',    label: 'Главная',   icon: ICON_HOME },
  { id: 'catalog', label: 'Каталог',   icon: ICON_CATALOG },
  { id: 'contact', label: 'Связаться', icon: ICON_CONTACT },
  { id: 'order',   label: 'Корзина',   icon: ICON_CART },
]

// Contact sheet icons
const WA_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IG_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const PHONE_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.16 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

const CONTACTS = [
  { label: 'WhatsApp',   sublabel: CONFIG.PHONE, icon: WA_ICON,    href: CONFIG.WHATSAPP,                         color: '#25d366' },
  { label: 'Instagram',  sublabel: '@calma.kg',   icon: IG_ICON,    href: CONFIG.INSTAGRAM,                        color: '#E1306C' },
  { label: 'Позвонить', sublabel: CONFIG.PHONE,  icon: PHONE_ICON, href: `tel:${CONFIG.PHONE.replace(/\s/g, '')}`, color: '#ab2b02' },
]

export function BottomNav() {
  const [active, setActive] = useState<TabId>('hero')
  const [contactOpen, setContactOpen] = useState(false)
  const { items, openCart } = useCart()
  const hasCart = items.length > 0

  useEffect(() => {
    const sectionMap: Record<string, TabId> = { catalog: 'catalog' }
    const observers: IntersectionObserver[] = []

    Object.keys(sectionMap).forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(sectionMap[id]) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const onScroll = () => {
      const el = document.getElementById('catalog')
      if (el && el.getBoundingClientRect().top > window.innerHeight * 0.6) {
        setActive('hero')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleTab = (tab: Tab) => {
    if (tab.id === 'contact') {
      setContactOpen(o => !o)
      return
    }
    setContactOpen(false)
    if (tab.id === 'order') {
      openCart()
      return
    }
    if (tab.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActive('hero')
    } else if (tab.id === 'catalog') {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
      setActive('catalog')
    }
  }

  return (
    <>
      {/* Contact sheet */}
      {contactOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setContactOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 48,
              background: 'rgba(0,0,0,0.25)',
              backdropFilter: 'blur(2px)',
            }}
          />
          {/* Sheet */}
          <div
            style={{
              position: 'fixed',
              bottom: 64,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 430,
              zIndex: 49,
              padding: '0 12px 8px',
            }}
          >
            <div style={{
              background: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 -4px 32px rgba(0,0,0,0.12)',
            }}>
              <p style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                color: '#9A8D82',
                padding: '14px 16px 10px',
                fontFamily: 'var(--font-body, sans-serif)',
                borderBottom: '1px solid rgba(43,33,29,0.06)',
              }}>
                Выберите способ связи
              </p>
              {CONTACTS.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 20px',
                    borderBottom: i < CONTACTS.length - 1 ? '1px solid rgba(43,33,29,0.06)' : 'none',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: `${c.color}15`,
                    color: c.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {c.icon}
                  </span>
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1C1412', fontFamily: 'var(--font-body, sans-serif)', lineHeight: 1.2 }}>
                      {c.label}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#9A8D82', fontFamily: 'var(--font-body, sans-serif)', marginTop: 2 }}>
                      {c.sublabel}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Nav bar */}
      <nav
        aria-label="Навигация"
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          height: 64,
          paddingBottom: 'env(safe-area-inset-bottom)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(43,33,29,0.08)',
          zIndex: 50,
        }}
      >
        {TABS.map(tab => {
          const isActive = active === tab.id || (tab.id === 'contact' && contactOpen)
          const color = isActive ? '#AB2B02' : '#9A8D82'

          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab)}
              aria-label={tab.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color,
                minWidth: 0,
                position: 'relative',
                padding: 0,
              }}
            >
              {tab.id === 'order' && hasCart && (
                <span style={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(6px)',
                  width: 7, height: 7,
                  background: '#AB2B02',
                  borderRadius: '50%',
                  border: '1.5px solid #fff',
                }} />
              )}
              {tab.icon}
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                fontFamily: 'var(--font-body, sans-serif)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
