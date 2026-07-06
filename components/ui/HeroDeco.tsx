'use client'

import { motion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type DecoProps = {
  x: MotionValue<number>
  y: MotionValue<number>
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate?: number
  scale?: number
  opacity?: number
  delay?: number
  shape: 'wheat' | 'sparkle' | 'grain' | 'ring'
}

const SHAPES = {
  wheat: (
    <svg width="40" height="72" viewBox="0 0 40 72" fill="none">
      <line x1="20" y1="72" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="20" cy="8" rx="5" ry="8" fill="currentColor" opacity="0.9" />
      <ellipse cx="11" cy="24" rx="4" ry="7" fill="currentColor" opacity="0.75" transform="rotate(-30 11 24)" />
      <ellipse cx="29" cy="24" rx="4" ry="7" fill="currentColor" opacity="0.75" transform="rotate(30 29 24)" />
      <ellipse cx="12" cy="40" rx="3.5" ry="6.5" fill="currentColor" opacity="0.55" transform="rotate(-25 12 40)" />
      <ellipse cx="28" cy="40" rx="3.5" ry="6.5" fill="currentColor" opacity="0.55" transform="rotate(25 28 40)" />
      <ellipse cx="14" cy="54" rx="3" ry="6" fill="currentColor" opacity="0.35" transform="rotate(-20 14 54)" />
      <ellipse cx="26" cy="54" rx="3" ry="6" fill="currentColor" opacity="0.35" transform="rotate(20 26 54)" />
    </svg>
  ),
  sparkle: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L17.5 14.5 L30 16 L17.5 17.5 L16 30 L14.5 17.5 L2 16 L14.5 14.5 Z" fill="currentColor" />
    </svg>
  ),
  grain: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="6" fill="currentColor" opacity="0.9" />
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="14" cy="14" r="13.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  ),
  ring: (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="26" cy="26" r="14" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="26" cy="26" r="4" fill="currentColor" opacity="0.5" />
    </svg>
  ),
}

export function HeroDeco({ x, y, top, left, right, bottom, rotate = 0, scale = 1, opacity = 0.55, delay = 0, shape }: DecoProps) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-[var(--color-gold)]"
      style={{ x, y, top, left, right, bottom }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity, scale }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <div style={{ transform: `rotate(${rotate}deg) scale(${scale})` }}>
        {SHAPES[shape]}
      </div>
    </motion.div>
  )
}
