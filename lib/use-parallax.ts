'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

export function useMouseParallax(stiffness = 55, damping = 22) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness, damping, restDelta: 0.001 })
  const y = useSpring(rawY, { stiffness, damping, restDelta: 0.001 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return { x, y }
}

export function layer(mx: MotionValue<number>, my: MotionValue<number>, px: number, py = px) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return {
    x: useTransform(mx, v => v * px),
    y: useTransform(my, v => v * py),
  }
}
