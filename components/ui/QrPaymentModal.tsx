'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '@/lib/config'

type Status = 'loading' | 'qr' | 'paid' | 'error'

type Props = {
  orderId: string
  totalTypyn: number
  orderNumber: string
  onClose: () => void
  onPaid: () => void
}

export function QrPaymentModal({ orderId, totalTypyn, orderNumber, onClose, onPaid }: Props) {
  const [status, setStatus] = useState<Status>('loading')
  const [qrCode, setQrCode] = useState<string>('')
  const [deeplink, setDeeplink] = useState<string>('')
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
    const createQr = async () => {
      try {
        const res = await fetch(`${CONFIG.PAYMENTS_URL}/qr/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, amount: totalTypyn }),
        })
        if (!res.ok) throw new Error('Ошибка создания QR')
        const data = await res.json()
        setQrCode(data.qrCode)
        setDeeplink(data.deeplink ?? '')
        setQrTransactionId(data.qrTransactionId)
        setStatus('qr')
      } catch {
        setError('Не удалось создать QR-код. Попробуйте снова.')
        setStatus('error')
      }
    }
    createQr()
    return stopPolling
  }, [orderId, totalTypyn])

  useEffect(() => {
    if (status !== 'qr' || !qrTransactionId) return
    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${CONFIG.PAYMENTS_URL}/status/${qrTransactionId}`)
        if (!res.ok) return
        const data = await res.json()
        if (data.status === 'PAID') {
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

  const openDeeplink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          className="relative bg-[#FFFDF8] rounded-3xl p-8 w-full max-w-sm shadow-2xl flex flex-col items-center gap-6"
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-[#7A6B5D] hover:text-[#1C1412] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F0E6] transition-colors"
          >
            ✕
          </button>

          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-[#E8DDD0] border-t-[#8B4513]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              />
              <p className="text-[#7A6B5D] text-sm">Создаём QR-код...</p>
            </div>
          )}

          {status === 'qr' && (
            <>
              <div className="text-center">
                <h3
                  className="text-2xl text-[#1C1412] mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Оплата заказа
                </h3>
                <p className="text-sm text-[#7A6B5D]">#{orderNumber}</p>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-[#E8DDD0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCode}
                  alt="QR для оплаты"
                  className="w-48 h-48 object-contain"
                />
              </div>

              <p className="text-sm text-[#7A6B5D] text-center">
                Отсканируйте QR через мобильное приложение вашего банка
              </p>

              <div className="w-full flex gap-3">
                <button
                  onClick={() => openDeeplink(deeplink.replace('mbank://', 'mbank://'))}
                  className="flex-1 bg-[#F5F0E6] border border-[#E8DDD0] text-[#1C1412] text-sm py-3 rounded-xl font-medium hover:bg-[#E8DDD0] transition-colors"
                >
                  mBank
                </button>
                <button
                  onClick={() => openDeeplink(deeplink.replace('mbank://', 'obank://'))}
                  className="flex-1 bg-[#F5F0E6] border border-[#E8DDD0] text-[#1C1412] text-sm py-3 rounded-xl font-medium hover:bg-[#E8DDD0] transition-colors"
                >
                  O!Банк
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#7A6B5D]">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500 inline-block"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                Ожидаем оплату...
              </div>
            </>
          )}

          {status === 'paid' && (
            <motion.div
              className="flex flex-col items-center gap-4 py-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center text-2xl">
                ✓
              </div>
              <h3
                className="text-2xl text-[#1C1412]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Оплата прошла!
              </h3>
              <p className="text-sm text-[#7A6B5D]">
                Ваш заказ #{orderNumber} принят. Свяжемся для уточнения деталей доставки.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 bg-[#8B4513] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#C49A6C] transition-colors"
              >
                Готово
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-2xl">
                ✕
              </div>
              <p className="text-[#1C1412] font-medium">Что-то пошло не так</p>
              <p className="text-sm text-[#7A6B5D]">{error}</p>
              <button
                onClick={handleClose}
                className="text-[#8B4513] text-sm underline underline-offset-2"
              >
                Закрыть
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
