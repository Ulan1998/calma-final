'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { waLink } from '@/lib/config'
import { CartIcon } from '@/components/ui/icons'

const links = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Почему с Calma выгодно', href: '#about' },
  { label: 'Партнёрство', href: '#how' },
  { label: 'Как заказать', href: '#faq' },
]

export function Navbar() {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-40 transition-colors duration-300"
      style={{
        background: scrolled ? 'rgba(255,253,248,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E8DDD0' : '1px solid transparent',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-[#1C1412] tracking-[0.15em] text-sm font-medium uppercase"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.12em' }}
        >
          CALMA
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#7A6B5D] hover:text-[#1C1412] transition-colors duration-150 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart badge */}
          {count > 0 && (
            <motion.a
              href="#order"
              className="flex items-center gap-2 bg-[#8B4513] text-white text-sm px-4 py-2 rounded-full font-medium"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <CartIcon />
              <span>{count} шт</span>
            </motion.a>
          )}

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 border border-[#E8DDD0] text-[#7A6B5D] text-sm px-4 py-2 rounded-full hover:border-[#8B4513] hover:text-[#8B4513] transition-colors duration-150"
          >
            WhatsApp
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Меню"
          >
            <span className={`block w-5 h-0.5 bg-[#1C1412] transition-transform duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#1C1412] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#1C1412] transition-transform duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-[#E8DDD0] bg-[#FFFDF8]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="px-4 py-4 flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[#1C1412] font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B4513] font-medium"
              >
                WhatsApp →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
