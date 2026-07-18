'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { CONFIG } from '@/lib/config'
import { isValidKGPhone } from '@/lib/validate-phone'

const fmt = (n: number) => n.toLocaleString('ru-RU')

const CROISSANT_IDS = new Set([
  'plain-micro', 'plain-mini', 'plain-mid', 'plain-big', 'plain-xl',
  'chocolate', 'hotdog', 'curd-berry', 'vanilla', 'curd', 'curd-orange',
])

const WARN_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={15} height={15} style={{ flexShrink: 0 }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

type FormState = 'cart' | 'idle' | 'confirm' | 'submitting'

export function CartBar() {
  const { items, setQty, remove, total, clear, cartOpen, openCart, closeCart } = useCart()
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [phone, setPhone] = useState('')
  const [formState, setFormState] = useState<FormState>('cart')
  const [error, setError] = useState('')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const phoneValid = isValidKGPhone(phone)
  const canSubmit = businessName.trim().length > 1 && phoneValid

  const croissantKg = items
    .filter(i => CROISSANT_IDS.has(i.product.id))
    .reduce((s, i) => s + i.qty, 0)
  const hasCroissants = items.some(i => CROISSANT_IDS.has(i.product.id))
  const belowMin = hasCroissants && croissantKg < 3

  const handleToConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setFormState('confirm')
  }

  const handleSubmit = async () => {
    setFormState('submitting')
    setError('')
    try {
      // 1. Create order via server proxy (secret stays on server)
      const erpRes = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim(),
          name: businessName.trim() || recipientName.trim() || phone.trim(),
          notes: address.trim() || undefined,
          items: items.map(i => ({ productId: i.product.id, qty: i.qty })),
        }),
      })
      if (!erpRes.ok) {
        const data = await erpRes.json().catch(() => ({}))
        throw new Error(data.error ?? `Ошибка сервера (${erpRes.status})`)
      }
      const erpData = await erpRes.json()
      const num = erpData.orderNumber ?? erpData.number ?? ''

      // 2. Create xPay payment and redirect
      const payRes = await fetch(`${CONFIG.PAYMENTS_URL}/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: num, amount: total }),
      })
      if (!payRes.ok) throw new Error('Не удалось создать платёж')
      const payData = await payRes.json()
      const xpayUrl = payData.qr_code ?? payData.url ?? ''
      if (!xpayUrl) throw new Error('Не получена ссылка на оплату')

      clear()
      window.open(xpayUrl, '_blank')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить заказ.')
      setFormState('idle')
    }
  }

  const closeForm = () => {
    if (formState === 'submitting') return
    closeCart()
    setFormState('cart')
    setError('')
  }

  if (items.length === 0) {
    if (!cartOpen) return null
    return (
      <>
        <div onClick={closeCart} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} />
        <div style={{
          position: 'fixed',
          bottom: isDesktop ? 'auto' : 0,
          top: isDesktop ? '50%' : 'auto',
          left: '50%',
          transform: isDesktop ? 'translate(-50%, -50%)' : 'translateX(-50%)',
          width: '100%', maxWidth: 430, zIndex: 61,
          background: '#fff',
          borderRadius: isDesktop ? '24px' : '24px 24px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          padding: '28px 24px 48px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: '#e0dede', marginBottom: 8 }} />
          <svg viewBox="0 0 24 24" fill="none" stroke="#e0dede" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 56, height: 56 }}>
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19a2 2 0 001.99-1.77L22 5H6"/>
          </svg>
          <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.05rem' }}>Корзина пуста</p>
          <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.84rem', textAlign: 'center' }}>Выберите товары из каталога</p>
          <button
            onClick={() => { closeCart(); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              marginTop: 8, padding: '13px 28px', borderRadius: 50, border: 'none',
              background: '#ab2b02', color: '#fff',
              fontSize: '0.88rem', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(171,43,2,0.3)',
            }}
          >
            Перейти в каталог
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ height: 160 }} aria-hidden="true" />

      {/* CartBar strip */}
      <div
        className="fixed bottom-0 left-1/2 z-50 w-full"
        style={{
          transform: 'translateX(-50%)',
          maxWidth: isDesktop ? 680 : 430,
          padding: isDesktop
            ? '0 16px 16px'
            : '0 12px calc(64px + 8px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div
          className="rounded-[22px] border border-[var(--color-border)]"
          style={{
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
            padding: '14px 16px',
          }}
        >
          <div style={{ maxHeight: 140, overflowY: 'auto', marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-2">
                <span className="font-body font-semibold text-[var(--color-text)] flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '0.74rem' }}>
                  {product.name}
                </span>
                <span className="font-body text-[var(--color-muted)] whitespace-nowrap" style={{ fontSize: '0.72rem' }}>
                  {fmt(qty * product.price)} с
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => qty <= 1 ? remove(product.id) : setQty(product.id, qty - 1)}
                    className="flex items-center justify-center rounded-full font-body font-bold transition-transform active:scale-75"
                    style={{ width: 26, height: 26, background: 'var(--color-bg)', color: 'var(--color-text)', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    aria-label="Убрать"
                  >−</button>
                  <span className="font-body font-bold text-center" style={{ minWidth: 28, fontSize: '0.78rem' }}>{qty} {product.unit}</span>
                  <button
                    onClick={() => setQty(product.id, qty + 1)}
                    className="flex items-center justify-center rounded-full font-body font-bold transition-transform active:scale-75"
                    style={{ width: 26, height: 26, background: '#ab2b02', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    aria-label="Добавить"
                  >+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)]">
            <div>
              <p className="font-body text-[var(--color-muted)] font-medium" style={{ fontSize: '0.76rem' }}>{items.length} позиц.</p>
              <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.12rem' }}>{fmt(total)} сом</p>
            </div>
            {belowMin ? (
              <div className="flex items-center gap-2 rounded-xl font-body font-semibold" style={{ background: 'rgba(171,43,2,0.08)', color: '#ab2b02', padding: '10px 12px', fontSize: '0.72rem', flexShrink: 0 }}>
                {WARN_ICON} Минимум 3 кг
              </div>
            ) : (
              <button
                onClick={() => { setFormState('cart'); openCart() }}
                className="rounded-full font-body font-bold whitespace-nowrap shrink-0 transition-transform active:scale-95"
                style={{ padding: '12px 20px', background: '#25d366', color: '#fff', fontSize: '0.84rem', boxShadow: '0 4px 14px rgba(37,211,102,0.33)', border: 'none', cursor: 'pointer' }}
              >
                Заказать
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      {cartOpen && (
        <>
          <div
            onClick={closeForm}
            style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }}
          />
          <div
            style={{
              position: 'fixed',
              bottom: isDesktop ? 'auto' : 0,
              top: isDesktop ? '50%' : 'auto',
              left: '50%',
              transform: isDesktop ? 'translate(-50%, -50%)' : 'translateX(-50%)',
              width: '100%', maxWidth: 480, zIndex: 61,
              background: '#fff',
              borderRadius: isDesktop ? '24px' : '24px 24px 0 0',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
              overflow: 'hidden',
              maxHeight: isDesktop ? '85vh' : '92svh',
              overflowY: 'auto',
            }}
          >
            {/* drag handle — поверх анимации если confirm, иначе обычный */}
            {formState === 'confirm' || formState === 'submitting' ? (
              <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.5)', zIndex: 2 }} />
            ) : (
              <div style={{ width: 40, height: 4, borderRadius: 2, background: '#e0dede', margin: '12px auto 16px' }} />
            )}

            {/* ── CART ── */}
            {formState === 'cart' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px 40px' }}>
                <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.1rem' }}>Ваш заказ</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(({ product, qty }) => (
                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="font-body font-semibold text-[var(--color-text)]" style={{ fontSize: '0.88rem', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.name}
                      </span>
                      <span className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {fmt(qty * product.price)} с
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        <button
                          onClick={() => qty <= product.minQty ? remove(product.id) : setQty(product.id, qty - product.minQty)}
                          style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--color-bg)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Убрать"
                        >−</button>
                        <span className="font-body font-bold" style={{ minWidth: 32, textAlign: 'center', fontSize: '0.82rem' }}>{qty} {product.unit}</span>
                        <button
                          onClick={() => setQty(product.id, qty + product.minQty)}
                          style={{ width: 30, height: 30, borderRadius: '50%', background: '#ab2b02', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Добавить"
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.82rem' }}>{items.length} позиц.</span>
                  <span className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.1rem' }}>{fmt(total)} сом</span>
                </div>

                {belowMin && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(171,43,2,0.07)', borderRadius: 12, padding: '10px 14px', color: '#ab2b02' }}>
                    {WARN_ICON}
                    <span className="font-body font-semibold" style={{ fontSize: '0.8rem' }}>Минимум 3 кг круассанов</span>
                  </div>
                )}

                <button
                  onClick={() => setFormState('idle')}
                  disabled={belowMin}
                  style={{
                    width: '100%', padding: '15px', borderRadius: 50, border: 'none',
                    background: belowMin ? '#e0dede' : '#25d366',
                    color: belowMin ? '#aaa' : '#fff',
                    fontSize: '0.92rem', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700,
                    cursor: belowMin ? 'not-allowed' : 'pointer',
                    boxShadow: belowMin ? 'none' : '0 4px 14px rgba(37,211,102,0.33)',
                    marginTop: 4,
                  }}
                >
                  Оформить заказ
                </button>

                <button
                  onClick={closeForm}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.85rem', textAlign: 'center' }}
                >
                  Закрыть
                </button>
              </div>
            )}

            {/* ── FORM ── */}
            {formState === 'idle' && (
            <form onSubmit={handleToConfirm} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 20px 40px' }}>
                <div>
                  <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.1rem' }}>Оформление заказа</p>
                  <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.78rem', marginTop: 2 }}>Укажите адрес и контакт</p>
                </div>

                {[
                  { label: 'НАЗВАНИЕ ЗАВЕДЕНИЯ', value: businessName, onChange: setBusinessName, placeholder: 'Coffee House, Lune Cafe...', type: 'text', required: true },
                  { label: 'АДРЕС ДОСТАВКИ',     value: address,      onChange: setAddress,      placeholder: 'ул. Манаса 45, офис 3',      type: 'text', required: false },
                  { label: 'ИМЯ ПОЛУЧАТЕЛЯ',     value: recipientName,onChange: setRecipientName,placeholder: 'Айбек',                      type: 'text', required: false },
                  { label: 'НОМЕР ПОЛУЧАТЕЛЯ',   value: phone,        onChange: setPhone,        placeholder: '+996 700 000 000',           type: 'tel',  required: true },
                ].map(f => (
                  <div key={f.label}>
                    <label className="font-body font-semibold text-[var(--color-muted)]" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={e => f.onChange(e.target.value)}
                      placeholder={f.placeholder}
                      required={f.required}
                      style={{
                        width: '100%', border: '1.5px solid #e0dede', borderRadius: 14,
                        padding: '13px 16px', fontSize: '0.9rem', fontFamily: 'var(--font-body, sans-serif)',
                        color: 'var(--color-text)', background: '#f9f8f6', outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#ab2b02')}
                      onBlur={e => (e.target.style.borderColor = '#e0dede')}
                    />
                    {f.label === 'НОМЕР ПОЛУЧАТЕЛЯ' && phone.trim().length > 0 && !phoneValid && (
                      <p className="font-body" style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>Формат: +996 5XX XXXXXX</p>
                    )}
                  </div>
                ))}

                {error && (
                  <p className="font-body" style={{ fontSize: '0.8rem', color: '#ef4444', background: '#fef2f2', borderRadius: 10, padding: '10px 14px' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    width: '100%', padding: '15px', borderRadius: 50, border: 'none',
                    background: canSubmit ? '#C9A84C' : '#e0dede',
                    color: canSubmit ? '#fff' : '#aaa',
                    fontSize: '0.92rem', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700,
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    boxShadow: canSubmit ? '0 4px 16px rgba(201,168,76,0.4)' : 'none',
                    transition: 'all 0.2s', marginTop: 4,
                  }}
                >
                  Перейти к оплате
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.85rem', textAlign: 'center' }}
                >
                  Отмена
                </button>
            </form>
            )}

            {/* ── CONFIRM ── */}
            {(formState === 'confirm' || formState === 'submitting') && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Full-width animation header */}
                <div style={{ position: 'relative', width: '100%', background: '#1C1412', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <video
                    src="/animations/qrcalma.mp4"
                    autoPlay loop muted playsInline preload="auto"
                    style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                    aria-hidden="true"
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px 16px', background: 'linear-gradient(to top, rgba(28,20,18,0.85) 0%, transparent 100%)' }}>
                    <p className="font-body font-bold" style={{ fontSize: '1.15rem', color: '#fff' }}>Проверьте заказ</p>
                    <p className="font-body" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Убедитесь, что всё верно</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 20px 40px' }}>

                {/* Items */}
                <div style={{ background: '#f9f8f6', borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(({ product, qty }) => (
                    <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p className="font-body font-semibold text-[var(--color-text)]" style={{ fontSize: '0.84rem' }}>{product.name}</p>
                        <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.74rem' }}>{qty} {product.unit}</p>
                      </div>
                      <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '0.84rem', flexShrink: 0 }}>{fmt(qty * product.price)} с</p>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #e0dede', marginTop: 4, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <p className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '0.92rem' }}>Итого</p>
                    <p className="font-body font-bold" style={{ fontSize: '0.92rem', color: '#C9A84C' }}>{fmt(total)} сом</p>
                  </div>
                </div>

                {/* Delivery details */}
                <div style={{ background: '#f9f8f6', borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { label: 'Заведение', value: businessName.trim() },
                    { label: 'Адрес', value: address.trim() },
                    { label: 'Получатель', value: recipientName.trim() },
                    { label: 'Телефон', value: phone.trim() },
                  ].filter(r => r.value).map(r => (
                    <div key={r.label} style={{ display: 'flex', gap: 8 }}>
                      <p className="font-body text-[var(--color-muted)]" style={{ fontSize: '0.78rem', minWidth: 76, flexShrink: 0 }}>{r.label}</p>
                      <p className="font-body text-[var(--color-text)]" style={{ fontSize: '0.78rem', fontWeight: 600 }}>{r.value}</p>
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="font-body" style={{ fontSize: '0.8rem', color: '#ef4444', background: '#fef2f2', borderRadius: 10, padding: '10px 14px' }}>{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={formState === 'submitting'}
                  style={{
                    width: '100%', padding: '15px', borderRadius: 50, border: 'none',
                    background: '#C9A84C', color: '#fff',
                    fontSize: '0.92rem', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700,
                    cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: formState === 'submitting' ? 0.7 : 1,
                    boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
                    transition: 'opacity 0.2s', marginTop: 4,
                  }}
                >
                  {formState === 'submitting' ? 'Оформляем...' : 'Подтвердить и оплатить'}
                </button>

                {formState === 'confirm' && (
                  <button
                    onClick={closeForm}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.85rem', textAlign: 'center' }}
                  >
                    Изменить заказ
                  </button>
                )}
                </div>
              </div>
            )}

          </div>
        </>
      )}
    </>
  )
}
