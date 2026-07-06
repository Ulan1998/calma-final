'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { POSITION_STYLES } from './MiniBaker'
import type { MascotChar, MascotAction, MascotPosition, MascotTrigger } from './MiniBaker'

export type PropItem = 'box' | 'cart' | 'flour-bag' | 'ladder' | 'rope' | 'qr-stand' | 'wood-sign'

type Props = {
  character: MascotChar
  action: MascotAction
  prop?: PropItem
  /** Position of prop relative to the character container in px */
  propOffset?: { x: number; y: number }
  /** Prop image size (defaults to 60% of size) */
  propSize?: number
  size?: number
  position?: MascotPosition
  className?: string
  parallax?: number
  breathe?: boolean
  trigger?: MascotTrigger
  show?: boolean
}

export function MascotWithProp({
  character,
  action,
  prop,
  propOffset = { x: 0, y: 0 },
  propSize,
  size = 40,
  position = 'bottom-right',
  className,
  parallax = 0,
  breathe = true,
  trigger = 'scroll',
  show,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  const charSrc     = `/mascots/characters/${character}/${action}.webp`
  const charFb      = `/mascots/_placeholder/${character}-${action}.svg`
  const propSrc     = prop ? `/mascots/props/${prop}.webp` : null
  const propFb      = prop ? `/mascots/_placeholder/prop-${prop}.svg` : null
  const resolvedPropSize = propSize ?? Math.round(size * 0.6)

  const posStyle = POSITION_STYLES[position]

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 10,
    ...posStyle,
  }

  const inner = (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Character layer */}
      <motion.img
        src={charSrc}
        alt=""
        loading="lazy"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
        animate={breathe ? { y: [0, -2, 0] } : undefined}
        transition={breathe ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
        onError={(e) => {
          const img = e.currentTarget
          if (img.src !== window.location.origin + charFb) img.src = charFb
        }}
      />

      {/* Prop layer — positioned relative to character container */}
      {propSrc && (
        <motion.img
          src={propSrc}
          alt=""
          loading="lazy"
          width={resolvedPropSize}
          height={resolvedPropSize}
          style={{
            position: 'absolute',
            left: propOffset.x,
            top: propOffset.y,
            width: resolvedPropSize,
            height: resolvedPropSize,
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
          onError={(e) => {
            const img = e.currentTarget
            if (propFb && img.src !== window.location.origin + propFb) img.src = propFb
          }}
        />
      )}
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
