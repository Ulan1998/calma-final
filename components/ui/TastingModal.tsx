'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '@/lib/config'
import { isValidKGPhone } from '@/lib/validate-phone'
import { useTasting } from '@/lib/tasting-context'

type FormState = 'idle' | 'submitting' | 'success'

const ROLES = ['Шеф-повар', 'Владелец', 'Администратор', 'Другое'] as const

const inputCls =
  'w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--color-text)] placeholder-[var(--color-border)] focus:outline-none focus:border-[#ab2b02] transition'
const labelCls =
  'font-body font-semibold text-[var(--color-muted)] uppercase tracking-widest'

export function TastingModal() {
  const { isOpen, close } = useTasting()
  const [businessName, setBusinessName] = useState('')
  const [role, setRole] = useState<string>('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  const phoneValid = isValidKGPhone(phone)
  const canSubmit = businessName.trim().length > 1 && phoneValid && formState !== 'submitting'

  const reset = () => {
    setBusinessName(''); setRole(''); setName(''); setPhone(''); setCity(''); setAddress('')
    setFormState('idle'); setError('')
  }

  const handleClose = () => { close(); setTimeout(reset, 300) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setFormState('submitting')
    setError('')
    try {
      const res = await fetch(`${CONFIG.ERP_API_ROOT}/site/tasting-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-calma-secret': CONFIG.ERP_SECRET },
        body: JSON.stringify({
          businessName: businessName.trim(),
          address: address.trim(),
          name: name.trim(),
          phone: phone.trim(),
          role: role.trim(),
          city: city.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `Ошибка сервера (${res.status})`)
      }
      setFormState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте снова.')
      setFormState('idle')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-t-3xl md:rounded-3xl p-6 max-h-[92vh] overflow-y-auto"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {formState === 'success' ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.2rem' }}>Заявка отправлена!</h3>
                <p className="font-body text-[var(--color-muted)] mt-2" style={{ fontSize: '0.85rem' }}>
                  Мы свяжемся с вами и согласуем бесплатную дегустацию.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full text-white py-3.5 rounded-full font-body font-bold text-sm active:scale-95 transition-transform"
                  style={{ background: '#ab2b02' }}
                >
                  Готово
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.15rem' }}>Бесплатная дегустация</h3>
                    <p className="font-body text-[var(--color-muted)] mt-1" style={{ fontSize: '0.8rem' }}>Оставьте контакты — привезём образцы к вам</p>
                  </div>
                  <button type="button" onClick={handleClose} aria-label="Закрыть" className="shrink-0 text-[var(--color-muted)] text-2xl leading-none">×</button>
                </div>

                <div className="space-y-1">
                  <label className={labelCls} style={{ fontSize: '0.65rem' }}>Название заведения *</label>
                  <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Coffee House, Lune Cafe..." required className={inputCls} />
                </div>

                <div className="space-y-1">
                  <label className={labelCls} style={{ fontSize: '0.65rem' }}>Ваша роль</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map(r => (
                      <button
                        key={r} type="button" onClick={() => setRole(r)}
                        className="rounded-xl px-3 py-2.5 font-body text-sm border transition"
                        style={{
                          borderColor: role === r ? '#ab2b02' : 'var(--color-border)',
                          background: role === r ? 'rgba(171,43,2,0.07)' : 'var(--color-bg)',
                          color: role === r ? '#ab2b02' : 'var(--color-text)',
                          fontWeight: role === r ? 700 : 500,
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={labelCls} style={{ fontSize: '0.65rem' }}>Имя</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Айбек" className={inputCls} />
                </div>

                <div className="space-y-1">
                  <label className={labelCls} style={{ fontSize: '0.65rem' }}>Телефон *</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+996 700 000 000" required aria-invalid={phone.trim().length > 0 && !phoneValid} className={inputCls} />
                  {phone.trim().length > 0 && !phoneValid && (
                    <p className="font-body text-xs text-red-500">Формат: +996 5XX XXXXXX</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className={labelCls} style={{ fontSize: '0.65rem' }}>Город</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Бишкек" className={inputCls} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelCls} style={{ fontSize: '0.65rem' }}>Адрес</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="ул. Манаса 45" className={inputCls} />
                  </div>
                </div>

                {error && <p className="font-body text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

                <button
                  type="submit" disabled={!canSubmit}
                  className="w-full text-white py-4 rounded-full font-body font-bold text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#ab2b02', boxShadow: '0 4px 14px rgba(171,43,2,0.33)' }}
                >
                  {formState === 'submitting' ? 'Отправляем...' : 'Оставить заявку'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
