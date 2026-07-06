'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '@/lib/config'
import { CloseIcon, CheckIcon } from '@/components/ui/icons'

type Status = 'loading' | 'qr' | 'paid' | 'error'

type Props = {
  orderId: string
  totalSom: number
  orderNumber: string
  onClose: () => void
  onPaid: () => void
  onNotifyWhatsApp?: () => void
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export function QrPaymentModal({ orderId, totalSom, orderNumber, onClose, onPaid, onNotifyWhatsApp }: Props) {
  const [status, setStatus] = useState<Status>('loading')
  const [qrImage, setQrImage] = useState<string>('')
  const [qrCode, setQrCode] = useState<string>('')
  const [qrTransactionId, setQrTransactionId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await fetch(`${CONFIG.PAYMENTS_URL}/create-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderNumber, amount: totalSom }),
        })
        if (!res.ok) throw new Error('Ошибка создания оплаты')
        const data = await res.json()
        setQrImage(data.qr_image ?? '')
        setQrCode(data.qr_code ?? '')
        setQrTransactionId(data.qr_transaction_id ?? '')
        setStatus('qr')
      } catch {
        setError('Не удалось создать платёж. Попробуйте снова.')
        setStatus('error')
      }
    }
    createPayment()
    return stopPolling
  }, [orderNumber, totalSom])

  useEffect(() => {
    if (status !== 'qr' || !qrTransactionId) return
    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${CONFIG.PAYMENTS_URL}/status/${qrTransactionId}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.pay_status === 'COMPLETED') {
          stopPolling()
          setStatus('paid')
          onPaid()
        }
      } catch {
        // silent — продолжаем polling
      }
    }, 4000)
    return stopPolling
  }, [status, qrTransactionId, onPaid])

  const handleClose = () => {
    stopPolling()
    onClose()
  }

  const openBank = (prefix: string) => {
    if (qrCode) {
      window.open(qrCode, '_blank', 'noopener,noreferrer')
      return
    }
    if (prefix) window.open(prefix, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          className="relative bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center gap-5"
          style={{ maxHeight: '90svh', overflowY: 'auto' }}
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-[var(--color-muted)] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Закрыть"
          >
            <CloseIcon />
          </button>

          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] border-t-[#ab2b02]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              />
              <p className="font-body text-[var(--color-muted)] text-sm">Создаём платёж...</p>
            </div>
          )}

          {status === 'qr' && (
            <>
              <div className="text-center">
                <h3 className="font-display text-xl text-[var(--color-text)] mb-1">Оплата заказа</h3>
                <p className="font-body text-sm text-[var(--color-muted)]">#{orderNumber}</p>
              </div>

              {/* qrcalma animation */}
              <video
                src="/animations/qrcalma.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{ width: 88, height: 88, objectFit: 'contain', pointerEvents: 'none', marginBottom: -8 }}
                aria-hidden="true"
              />

              {/* QR image if available */}
              {qrImage && (
                <div className="bg-white rounded-2xl p-3 border border-[var(--color-border)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrImage} alt="QR для оплаты" className="w-44 h-44 object-contain" />
                </div>
              )}

              <p className="font-body text-sm text-[var(--color-muted)] text-center">
                Отсканируйте QR или откройте в приложении банка
              </p>

              <div className="w-full flex gap-3">
                <button
                  onClick={() => openBank('mbank://')}
                  className="flex-1 font-body text-sm py-3 rounded-xl font-medium transition-colors"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                >
                  mBank
                </button>
                <button
                  onClick={() => openBank('obank://')}
                  className="flex-1 font-body text-sm py-3 rounded-xl font-medium transition-colors"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                >
                  O!Банк
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-body">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500 inline-block"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                Ожидаем подтверждение оплаты...
              </div>

              {onNotifyWhatsApp && (
                <button
                  onClick={onNotifyWhatsApp}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-body font-medium text-sm"
                  style={{ padding: '13px 20px', background: '#25d366', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,211,102,0.33)' }}
                >
                  {WA_ICON}
                  Оплатил — уведомить в WhatsApp
                </button>
              )}
            </>
          )}

          {status === 'paid' && (
            <motion.div
              className="flex flex-col items-center gap-4 py-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center text-green-600">
                <CheckIcon width={30} height={30} />
              </div>
              <h3 className="font-display text-2xl text-[var(--color-text)]">Оплата прошла!</h3>
              <p className="font-body text-sm text-[var(--color-muted)]">
                Заказ #{orderNumber} принят. Свяжемся для уточнения доставки.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 font-body text-white px-8 py-3 rounded-full text-sm font-medium transition-colors"
                style={{ background: '#ab2b02' }}
              >
                Готово
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500">
                <CloseIcon width={24} height={24} />
              </div>
              <p className="font-body text-[var(--color-text)] font-medium">Что-то пошло не так</p>
              <p className="font-body text-sm text-[var(--color-muted)]">{error}</p>
              <button onClick={handleClose} className="font-body text-sm underline underline-offset-2" style={{ color: '#ab2b02' }}>
                Закрыть
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
