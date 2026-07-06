'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { QrPaymentModal } from '@/components/ui/QrPaymentModal'
import { CONFIG } from '@/lib/config'
import { fadeUp } from '@/lib/motion'
import { isValidKGPhone } from '@/lib/validate-phone'

type FormState = 'idle' | 'submitting' | 'qr' | 'success'

export function OrderSection() {
  const { items, total, totalTypyn, clear } = useCart()
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [phone, setPhone] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [orderId, setOrderId] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState('')

  const phoneValid = isValidKGPhone(phone)
  const canSubmit = items.length > 0 && businessName.trim().length > 1 && phoneValid

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setFormState('submitting')
    setError('')

    try {
      const res = await fetch(CONFIG.ERP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-calma-secret': CONFIG.ERP_SECRET,
        },
        body: JSON.stringify({
          name: businessName.trim(),
          phone: phone.trim(),
          notes: [
            address.trim() ? `Адрес: ${address.trim()}` : '',
            recipientName.trim() ? `Получатель: ${recipientName.trim()}` : '',
          ].filter(Boolean).join('. '),
          items: items.map(i => ({ productId: i.product.id, qty: i.qty })),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `Ошибка сервера (${res.status})`)
      }

      const data = await res.json()
      setOrderId(data.orderId ?? data.id ?? '')
      setOrderNumber(data.orderNumber ?? data.number ?? '—')
      setFormState('qr')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить заказ. Попробуйте снова.')
      setFormState('idle')
    }
  }

  const handlePaid = () => {
    clear()
    setBusinessName('')
    setAddress('')
    setRecipientName('')
    setPhone('')
  }

  const handleModalClose = () => {
    setFormState('idle')
  }

  return (
    <>
      <section id="order" className="py-8 px-5 bg-[var(--color-bg)]">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 space-y-4"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
              >
                <div>
                  <h3 className="font-body font-bold text-[var(--color-text)]" style={{ fontSize: '1.15rem' }}>
                    Оформление заказа
                  </h3>
                  <p className="font-body text-[var(--color-muted)] mt-1" style={{ fontSize: '0.8rem' }}>
                    Укажите адрес и контакт для доставки
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-body font-semibold text-[var(--color-muted)] uppercase tracking-widest" style={{ fontSize: '0.65rem' }}>Название заведения</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="Coffee House, Lune Cafe..."
                    required
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--color-text)] placeholder-[var(--color-border)] focus:outline-none focus:border-[#ab2b02] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body font-semibold text-[var(--color-muted)] uppercase tracking-widest" style={{ fontSize: '0.65rem' }}>Адрес доставки</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="ул. Манаса 45, офис 3"
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--color-text)] placeholder-[var(--color-border)] focus:outline-none focus:border-[#ab2b02] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body font-semibold text-[var(--color-muted)] uppercase tracking-widest" style={{ fontSize: '0.65rem' }}>Имя получателя</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    placeholder="Айбек"
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--color-text)] placeholder-[var(--color-border)] focus:outline-none focus:border-[#ab2b02] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body font-semibold text-[var(--color-muted)] uppercase tracking-widest" style={{ fontSize: '0.65rem' }}>Номер получателя</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+996 700 000 000"
                    required
                    aria-invalid={phone.trim().length > 0 && !phoneValid}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--color-text)] placeholder-[var(--color-border)] focus:outline-none focus:border-[#ab2b02] transition"
                  />
                  {phone.trim().length > 0 && !phoneValid && (
                    <p className="font-body text-xs text-red-500">Формат: +996 5XX XXXXXX</p>
                  )}
                </div>

                {error && (
                  <p className="font-body text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit || formState === 'submitting'}
                  className="w-full text-white py-4 rounded-full font-body font-bold text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#C9A84C', boxShadow: '0 4px 14px rgba(201,168,76,0.35)' }}
                >
                  {formState === 'submitting' ? 'Оформляем...' : 'Перейти к оплате'}
                </button>
              </form>
        </motion.div>
      </section>

      {formState === 'qr' && (
        <QrPaymentModal
          orderId={orderId}
          totalSom={total}
          orderNumber={orderNumber}
          onClose={handleModalClose}
          onPaid={handlePaid}
        />
      )}
    </>
  )
}
