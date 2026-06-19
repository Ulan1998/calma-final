'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  children: ReactNode
  variant?: Variant
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  href?: string
}

const styles: Record<Variant, string> = {
  primary:
    'bg-[#8B4513] text-white hover:bg-[#C49A6C] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-150',
  secondary:
    'border border-[#8B4513] text-[#8B4513] hover:bg-[#F5F0E6] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-150',
  ghost:
    'text-[#7A6B5D] hover:text-[#1C1412] text-sm font-medium transition-colors duration-150',
}

export function Button({ children, variant = 'primary', onClick, type = 'button', disabled, className = '', href }: Props) {
  const cls = `${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
