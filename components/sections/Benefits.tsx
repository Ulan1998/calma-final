'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

const GAP = 14
const TOTAL = 6
const START = TOTAL

const BENEFITS = [
  {
    title: 'Снижаете затраты на персонал',
    text: 'Не требуется профессиональный пекарь — процесс освоит любой сотрудник за один день.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    title: 'Забудьте про списания',
    text: 'Храните до 3 месяцев. Берёте ровно столько, сколько нужно — без лишних потерь.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    title: 'Расширяете меню без крупных затрат',
    text: 'Круассаны, супы, тесто, мороженое, самсы, киш — широкий ассортимент замороженных позиций.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Удобная логистика',
    text: 'Доставляем на авто-морозилках по Бишкеку и в регионы. Бесплатная доставка от 7 кг.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: 'Работаем официально',
    text: 'Предоставляем действующие декларации соответствия ЕАЭС и все документы о качестве.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Полный пакет документов',
    text: 'Счета на оплату, ЭСФ и вся необходимая бухгалтерская документация для юрлиц и ИП.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
]

const EXTENDED = [...BENEFITS, ...BENEFITS, ...BENEFITS]
const DESKTOP_STAGGER = stagger(0.07)

export function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cw, setCw] = useState(340)
  const [idx, setIdx] = useState(START)
  const x = useMotionValue(0)
  const hasMeasured = useRef(false)
  const teleportTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      if (!hasMeasured.current) {
        const cardW0 = w * 0.82
        x.set(-(START * (cardW0 + GAP)))
        hasMeasured.current = true
      }
      setCw(w)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [x])

  const cardW = cw * 0.82
  const step = cardW + GAP
  const sidepad = (cw - cardW) / 2

  const clearTeleport = useCallback(() => {
    if (teleportTimer.current) {
      clearTimeout(teleportTimer.current)
      teleportTimer.current = null
    }
  }, [])

  const snapTo = useCallback((targetIdx: number) => {
    clearTeleport()
    const clamped = Math.min(Math.max(targetIdx, 0), EXTENDED.length - 1)
    animate(x, -(clamped * step), { type: 'spring', stiffness: 260, damping: 26, mass: 0.85 })
    setIdx(clamped)
    const visualIdx = ((clamped - START) % TOTAL + TOTAL) % TOTAL
    const middleIdx = START + visualIdx
    if (clamped !== middleIdx) {
      teleportTimer.current = setTimeout(() => {
        x.set(-(middleIdx * step))
        setIdx(middleIdx)
        teleportTimer.current = null
      }, 660)
    }
  }, [x, step, clearTeleport])

  const onDragStart = useCallback(() => { clearTeleport() }, [clearTeleport])

  const onDragEnd = useCallback((_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    if (velocity.x < -300 || offset.x < -(cardW * 0.28)) snapTo(idx + 1)
    else if (velocity.x > 300 || offset.x > cardW * 0.28) snapTo(idx - 1)
    else snapTo(idx)
  }, [idx, cardW, snapTo])

  const activeVisual = ((idx - START) % TOTAL + TOTAL) % TOTAL

  return (
    <section
      aria-labelledby="benefits-heading"
      className="bg-[var(--color-bg)] pt-4 pb-7 md:py-14"
    >
      {/* Heading */}
      <motion.h2
        id="benefits-heading"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="font-script text-center mb-0"
        style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02', margin: 0, padding: '0 20px', fontFamily: 'var(--font-script)' }}
      >
        Почему выбирают нас
      </motion.h2>

      {/* Decorative video — mobile only */}
      <div className="md:hidden" style={{ marginTop: 16, marginBottom: 24, overflow: 'hidden' }}>
        <video autoPlay muted playsInline loop preload="auto"
          style={{ width: '480%', height: 'auto', display: 'block' }}>
          <source src="/animations/test50.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─── MOBILE: Drag carousel ─── */}
      <div className="md:hidden" ref={containerRef} style={{ overflow: 'hidden' }}>
        <motion.div
          drag="x"
          style={{ x, display: 'flex', gap: GAP, paddingLeft: sidepad, paddingRight: sidepad }}
          dragConstraints={{ right: 0, left: -((EXTENDED.length - 1) * step) }}
          dragElastic={0.06}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {EXTENDED.map((b, i) => {
            const dist = Math.abs(i - idx)
            const isActive = dist === 0
            const isAdjacent = dist === 1
            return (
              <motion.div
                key={`${i}`}
                animate={{
                  scale: isActive ? 1 : isAdjacent ? 0.93 : 0.86,
                  opacity: isActive ? 1 : isAdjacent ? 0.68 : 0.35,
                  y: isActive ? 0 : isAdjacent ? 6 : 14,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  width: cardW, flexShrink: 0, background: '#fff',
                  borderRadius: 22, padding: '0 20px 24px',
                  border: `1px solid ${isActive ? 'rgba(171,43,2,0.22)' : 'var(--color-border)'}`,
                  boxShadow: isActive
                    ? '0 12px 40px rgba(171,43,2,0.13), 0 2px 8px rgba(0,0,0,0.05)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'hidden', cursor: 'grab',
                }}
              >
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.28 }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: 'linear-gradient(90deg, #ab2b02 0%, rgba(171,43,2,0.3) 100%)',
                    borderRadius: '22px 22px 0 0', transformOrigin: 'left',
                  }}
                />
                <span aria-hidden="true" style={{
                  position: 'absolute', top: 10, right: 14,
                  fontSize: '5.5rem', fontWeight: 800, lineHeight: 1,
                  color: 'rgba(171,43,2,0.07)', fontFamily: 'var(--font-body)',
                  pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
                }}>
                  {String((i % TOTAL) + 1).padStart(2, '0')}
                </span>
                <div style={{ paddingTop: 22, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, color: '#ab2b02' }}>{b.icon}</div>
                </div>
                <p className="font-body" style={{
                  fontSize: '1.08rem', fontWeight: 700, lineHeight: 1.28,
                  color: 'var(--color-text)', margin: '0 0 10px', letterSpacing: '-0.01em',
                }}>
                  {b.title}
                </p>
                <p className="font-body" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0 }}>
                  {b.text}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Mobile dots counter */}
      <div className="flex items-center justify-center md:hidden" style={{ gap: 12, marginTop: 18 }}>
        <span className="font-body" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(171,43,2,0.5)', letterSpacing: '0.06em', minWidth: 32, textAlign: 'right' }}>
          {String(activeVisual + 1).padStart(2, '0')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {BENEFITS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => snapTo(START + i)}
              aria-label={`Перейти к слайду ${i + 1}`}
              animate={{
                width: i === activeVisual ? 22 : 5,
                backgroundColor: i === activeVisual ? '#ab2b02' : 'rgba(171,43,2,0.2)',
              }}
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              style={{ height: 5, borderRadius: 99, border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
            />
          ))}
        </div>
        <span className="font-body" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(171,43,2,0.3)', letterSpacing: '0.06em', minWidth: 32 }}>
          {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      {/* ─── DESKTOP: Grid ─── */}
      <div className="hidden md:block px-8 mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={DESKTOP_STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-3 gap-5"
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="bg-white rounded-[22px] p-6 border border-[var(--color-border)] relative overflow-hidden flex flex-col"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(90deg, #ab2b02 0%, rgba(171,43,2,0.3) 100%)',
                  borderRadius: '22px 22px 0 0',
                }} />

                {/* Ghost number */}
                <span aria-hidden="true" style={{
                  position: 'absolute', top: 10, right: 14,
                  fontSize: '5.5rem', fontWeight: 800, lineHeight: 1,
                  color: 'rgba(171,43,2,0.06)', fontFamily: 'var(--font-body)',
                  pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div style={{ paddingTop: 20, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, color: '#ab2b02' }}>{b.icon}</div>
                </div>

                <p className="font-body font-bold text-[var(--color-text)] mb-2" style={{ fontSize: '1.05rem', lineHeight: 1.28, letterSpacing: '-0.01em' }}>
                  {b.title}
                </p>
                <p className="font-body text-[var(--color-muted)] mt-auto" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                  {b.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
