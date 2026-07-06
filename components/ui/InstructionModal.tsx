'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function InstructionModal({ isOpen, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'rgba(0,0,0,0.6)',
          }}
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Инструкция по приготовлению"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '420px',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            }}
          >
            {/* Sticky header с кнопкой закрытия */}
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '10px 10px 0',
              background: 'transparent',
              pointerEvents: 'none',
            }}>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Закрыть"
                style={{
                  pointerEvents: 'auto',
                  width: 36,
                  height: 36,
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  color: '#fff',
                  backdropFilter: 'blur(4px)',
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            <img
              src="/instruction.jpg"
              alt="Инструкция по приготовлению круассанов"
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '0 0 20px 20px', marginTop: -46 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
