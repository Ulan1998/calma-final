'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const BAKERS = [
  {
    name: 'Лео',
    role: 'Главный пекарь',
    desc: 'Знает все секреты идеального теста.',
    src: '/bakers/leo.jpg',
    delay: 0.1,
  },
  {
    name: 'Миа',
    role: 'Мастер слоёв',
    desc: 'Следит за качеством и любит порядок.',
    src: '/bakers/mia.jpg',
    delay: 0.22,
  },
  {
    name: 'Нико',
    role: 'Быстрый курьер',
    desc: 'Доставляет свежесть каждое утро.',
    src: '/bakers/niko.jpg',
    delay: 0.34,
  },
]

const PROCESS = [
  { label: 'Замес теста',      src: '/bakers/pose-knead.jpg' },
  { label: 'Раскатка слоёв',   src: '/bakers/pose-roll.jpg' },
  { label: 'Заморозка',        src: '/bakers/pose-freeze.jpg' },
  { label: 'Доставка',         src: '/bakers/pose-delivery.jpg' },
  { label: 'Контроль',         src: '/bakers/pose-quality.jpg' },
  { label: 'Выпечка',          src: '/bakers/pose-bake.jpg' },
  { label: 'Готово!',          src: '/bakers/pose-croissant.jpg' },
  { label: 'Отдыхаем 😴',      src: '/bakers/pose-sleep.jpg' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

export function Bakers() {
  return (
    <section
      id="bakers"
      style={{ background: 'var(--color-bg)' }}
      className="py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.25em] mb-3"
             style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>
            Команда
          </p>
          <h2
            className="font-light"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 1.5rem + 4vw, 5rem)',
              color: 'var(--color-ink)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Наши пекари
          </h2>
          <p className="mt-4 text-sm md:text-base" style={{ color: 'var(--color-ink)', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
            Всегда рядом, чтобы создать идеальный круассан
          </p>
        </motion.div>

        {/* Baker cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-20">
          {BAKERS.map((baker) => (
            <motion.div
              key={baker.name}
              custom={baker.delay}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative flex flex-col items-center rounded-2xl p-6 pt-0 text-center cursor-default"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              {/* Character image */}
              <motion.div
                className="relative -mt-2 mb-4 w-40 h-40"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: baker.delay * 3 }}
              >
                <Image
                  src={baker.src}
                  alt={baker.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="160px"
                />
              </motion.div>

              <h3
                className="text-xl font-medium mb-0.5"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {baker.name}
              </h3>
              <p
                className="text-xs font-medium uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
              >
                {baker.role}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.6, fontFamily: 'var(--font-body)' }}>
                {baker.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-10"
        >
          <p
            className="text-sm font-medium uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-ink)', opacity: 0.4, fontFamily: 'var(--font-body)' }}
          >
            Один рабочий день
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.label}
              custom={0.05 * i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex flex-col items-center gap-2 cursor-default"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden"
                   style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <Image
                  src={step.src}
                  alt={step.label}
                  fill
                  className="object-contain p-2"
                  sizes="120px"
                />
              </div>
              <span
                className="text-[0.65rem] text-center font-medium uppercase tracking-wide"
                style={{ color: 'var(--color-ink)', opacity: 0.5, fontFamily: 'var(--font-body)' }}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
