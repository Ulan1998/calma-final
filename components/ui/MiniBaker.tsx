'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export type MascotChar = 'leo' | 'max' | 'luna'

// Props are baked INTO the character images — no separate prop layer needed
export type LeoAction  = 'idle' | 'open-box' | 'carry-tray' | 'inspect' | 'knead'
export type MaxAction  = 'walk' | 'push' | 'pull-rope' | 'carry-box'
export type LunaAction = 'idle' | 'point' | 'tag' | 'qr-stand'
export type MascotAction = LeoAction | MaxAction | LunaAction

export type MascotPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'top-left'
  | 'top-right'
  | 'center-left'
  | 'center-right'

export type MascotTrigger = 'scroll' | 'mount' | 'manual'

// All values on 8px grid
export const POSITION_STYLES: Record<MascotPosition, React.CSSProperties> = {
  'bottom-left':   { bottom: 0,   left: 16 },
  'bottom-right':  { bottom: 0,   right: 16 },
  'bottom-center': { bottom: 0,   left: '50%', transform: 'translateX(-50%)' },
  'top-left':      { top: 32,     left: 16 },
  'top-right':     { top: 32,     right: 16 },
  'center-left':   { top: '50%',  left: 16,    transform: 'translateY(-50%)' },
  'center-right':  { top: '50%',  right: 16,   transform: 'translateY(-50%)' },
}

type Props = {
  char: MascotChar
  action: MascotAction
  size?: number
  position?: MascotPosition
  className?: string
  parallax?: number
  breathe?: boolean
  /** Override src completely */
  src?: string
  /** scroll = whileInView, mount = on load, manual = only when show===true */
  trigger?: MascotTrigger
  /** Used only when trigger='manual' */
  show?: boolean
}

export function MiniBaker({
  char,
  action,
  size = 40,
  position = 'bottom-right',
  className,
  parallax = 0,
  breathe = true,
  src,
  trigger = 'scroll',
  show,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  const resolvedSrc = src ?? `/mascots/characters/${char}/${action}.webp`
  const fallback    = `/mascots/_placeholder/${char}-${action}.svg`
  const posStyle    = POSITION_STYLES[position]

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    // extra height for ground shadow ellipse
    height: size + 8,
    pointerEvents: 'none',
    zIndex: 10,
    ...posStyle,
  }

  // Shadow stays on floor while character breathes above it
  const groundShadow = (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: Math.round(size * 0.55 / 8) * 8,
        height: 6,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.18)',
        filter: 'blur(4px)',
      }}
    />
  )

  const imgNode = (
    <motion.img
      src={resolvedSrc}
      alt=""
      loading="lazy"
      width={size}
      height={size}
      style={{
        display: 'block',
        width: size,
        height: size,
        objectFit: 'contain',
        // subtle ambient drop-shadow on the character itself
        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.12))',
      }}
      animate={breathe ? { y: [0, -12, 0] } : undefined}
      transition={breathe ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      onError={(e) => {
        const img = e.currentTarget
        if (img.src !== window.location.origin + fallback) img.src = fallback
      }}
    />
  )

  const inner = (
    <div style={{ position: 'relative', width: size, height: size + 8 }}>
      {groundShadow}
      {imgNode}
    </div>
  )

  if (trigger === 'manual') {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            ref={ref}
            className={className}
            style={{ ...baseStyle, y: parallaxY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {inner}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (trigger === 'mount') {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ ...baseStyle, y: parallaxY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {inner}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...baseStyle, y: parallaxY }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {inner}
    </motion.div>
  )
}
