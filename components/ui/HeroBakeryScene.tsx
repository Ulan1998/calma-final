'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Stage = 0 | 1 | 2
const STAGE_MS = 2000

export function HeroBakeryScene() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState<Stage>(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setStage(s => ((s + 1) % 3) as Stage), STAGE_MS)
    return () => clearInterval(id)
  }, [reduced])

  const T = (d = 0.8) => ({ duration: d, ease: 'easeInOut' as const })

  const frames = [
    { src: '/mascots/characters/leo/box.png',   alt: 'Лео открывает коробку', anim: reduced ? {} : { y: [0, -8, 0] },        t: { duration: 3,   repeat: Infinity, ease: 'easeInOut' as const } },
    { src: '/mascots/characters/leo/knead.png', alt: 'Лео месит тесто',       anim: reduced ? {} : { x: [0, 6, 0], rotate: [0, -1.5, 0] }, t: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const } },
    { src: '/mascots/scenes/hero.png',          alt: 'Лео Макс Луна вместе',  anim: reduced ? {} : { scale: [1, 1.015, 1] },  t: { duration: 5,   repeat: Infinity, ease: 'easeInOut' as const } },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden' }}>

      {frames.map((f, i) => (
        <motion.div
          key={f.src}
          style={{ position: 'absolute', inset: 0 }}
          animate={{ opacity: stage === i ? 1 : 0, scale: stage === i ? 1 : 0.93 }}
          transition={T()}
        >
          <motion.div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            animate={f.anim}
            transition={f.t}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
              priority={i === 0}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Stage labels */}
      <div style={{
        position: 'absolute', bottom: 12, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 12, pointerEvents: 'none',
      }}>
        {(['Открыл', 'Печёшь', 'Готово'] as const).map((lbl, i) => (
          <motion.span key={lbl}
            animate={{ opacity: stage === i ? 1 : 0.25, scale: stage === i ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 2,
              color: stage === i ? '#C9A84C' : '#8B6030',
              textTransform: 'uppercase',
            }}
          >
            {lbl}
          </motion.span>
        ))}
      </div>

    </div>
  )
}
