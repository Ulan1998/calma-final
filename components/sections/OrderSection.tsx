'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { QrPaymentModal } from '@/components/ui/QrPaymentModal'
import { CONFIG } from '@/lib/config'
import { fadeUp } from '@/lib/motion'
import { isValidKGPhone } from '@/lib/validate-phone'
import { CloseIcon, CroissantIcon } from '@/components/ui/icons'

type FormState = 'idle' | 'submitting' | 'qr' | 'success'

export function OrderSection() {
  const { items, total, totalTypyn, count, setQty, remove, clear } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [orderId, setOrderId] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState('')

  const phoneValid = isValidKGPhone(phone)
  const canSubmit = items.length > 0 && name.trim().length > 1 && phoneValid

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
          name: name.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
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
    setName('')
    setPhone('')
    setNotes('')
  }

  const handleModalClose = () => {
    setFormState('idle')
  }

  return (
    <>
      <section id="order" className="py-24 md:py-32 bg-[#F5F0E6]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B4513] font-medium">Оформление</span>
            <h2
              className="mt-3 leading-tight text-[#1C1412] font-light"
              style={{ fontSize: 'clamp(2rem, 1rem + 3vw, 3.5rem)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              Ваш заказ
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Корзина */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {items.length === 0 ? (
                <div className="bg-[#FFFDF8] border border-[#E8DDD0] rounded-2xl p-10 text-center">
                  <div className="flex justify-center mb-4 text-[#C49A6C]">
                    <CroissantIcon width={48} height={48} />
                  </div>
                  <p className="text-[#7A6B5D]">Корзина пуста</p>
                  <a
                    href="#catalog"
                    className="mt-4 inline-block text-[#8B4513] text-sm font-medium underline underline-offset-2"
                  >
                    Перейти в каталог
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <div
                      key={item.product.id}
                      className="bg-[#FFFDF8] border border-[#E8DDD0] rounded-xl p-4 flex items-center gap-4"
                    >
                      <span className="shrink-0 text-[#C49A6C]">
                        <CroissantIcon width={28} height={28} />
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1C1412] truncate">{item.product.name}</p>
                        <p className="text-xs text-[#7A6B5D]">{item.product.price} с / шт</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const newQty = item.qty - item.product.minQty
                            newQty > 0 ? setQty(item.product.id, newQty) : remove(item.product.id)
                          }}
                          className="w-7 h-7 rounded-full border border-[#E8DDD0] text-[#7A6B5D] hover:border-[#8B4513] hover:text-[#8B4513] transition-colors flex items-center justify-center text-sm"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.product.id, item.qty + item.product.minQty)}
                          className="w-7 h-7 rounded-full border border-[#E8DDD0] text-[#7A6B5D] hover:border-[#8B4513] hover:text-[#8B4513] transition-colors flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>

                      <p
                        className="text-base text-[#C9A84C] font-light w-20 text-right shrink-0"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {(item.product.price * item.qty).toLocaleString('ru')} с
                      </p>

                      <button
                        onClick={() => remove(item.product.id)}
                        className="text-[#C9BDB5] hover:text-red-400 transition-colors shrink-0 ml-1"
                        aria-label="Удалить позицию"
                      >
                        <CloseIcon width={16} height={16} />
                      </button>
                    </div>
                  ))}

                  <div className="bg-[#FFFDF8] border border-[#E8DDD0] rounded-xl p-4 flex justify-between items-center">
                    <p className="text-[#7A6B5D] text-sm">
                      Итого · {count} {count === 1 ? 'шт' : 'шт'}
                    </p>
                    <p
                      className="text-2xl text-[#1C1412] font-light"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {total.toLocaleString('ru')} с
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Форма */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-[#FFFDF8] border border-[#E8DDD0] rounded-2xl p-6 space-y-5"
              >
                <h3
                  className="text-xl text-[#1C1412] font-light"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Контактные данные
                </h3>

                <div className="space-y-1">
                  <label className="text-xs text-[#7A6B5D] font-medium">Имя или название заведения</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Кофейня «Aromatny»"
                    required
                    className="w-full bg-white border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#1C1412] placeholder-[#C9BDB5] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#7A6B5D] font-medium">Телефон</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+996 500 000 000"
                    required
                    aria-invalid={phone.trim().length > 0 && !phoneValid}
                    className="w-full bg-white border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#1C1412] placeholder-[#C9BDB5] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition"
                  />
                  {phone.trim().length > 0 && !phoneValid && (
                    <p className="text-xs text-red-500">Введите номер в формате +996 5XX XXXXXX</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#7A6B5D] font-medium">Комментарий (не обязательно)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Удобное время доставки, адрес..."
                    rows={3}
                    className="w-full bg-white border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#1C1412] placeholder-[#C9BDB5] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={!canSubmit || formState === 'submitting'}
                  className="w-full bg-[#8B4513] text-white py-3.5 rounded-xl font-medium text-sm hover:bg-[#C49A6C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={canSubmit ? { scale: 1.01 } : {}}
                  whileTap={canSubmit ? { scale: 0.98 } : {}}
                >
                  {formState === 'submitting' ? 'Оформляем...' : 'Оформить и оплатить →'}
                </motion.button>

                <p className="text-xs text-[#7A6B5D] text-center">
                  После оформления откроется QR для оплаты через mBank / O!Банк
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {formState === 'qr' && (
        <QrPaymentModal
          orderId={orderId}
          totalTypyn={totalTypyn}
          orderNumber={orderNumber}
          onClose={handleModalClose}
          onPaid={handlePaid}
        />
      )}
    </>
  )
}
