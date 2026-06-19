'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { FactoryIcon, TruckIcon, BoxIcon, CardIcon } from '@/components/ui/icons'

type Benefit = {
  icon: ReactNode
  title: string
  description: string
  /** bento span + visual emphasis */
  span: string
  feature?: boolean
  accent?: boolean
}

const benefits: Benefit[] = [
  {
    icon: <FactoryIcon width={36} height={36} />,
    title: 'Собственное производство',
    description:
      'Производим в Бишкеке и контролируем каждый этап — от замеса теста до шоковой заморозки. Стабильное качество без посредников и наценок.',
    span: 'sm:col-span-2 sm:row-span-2',
    feature: true,
  },
  {
    icon: <TruckIcon width={28} height={28} />,
    title: 'Доставка по Бишкеку',
    description: 'Привозим заказ на следующий день, сохраняя холодовую цепочку.',
    span: 'sm:col-span-2',
  },
  {
    icon: <BoxIcon width={28} height={28} />,
    title: 'Гибкие объёмы',
    description: 'Подбираем объём под ваш трафик — от кофейни до отеля.',
    span: '',
  },
  {
    icon: <CardIcon width={28} height={28} />,
    title: 'Оплата за секунды',
    description: 'QR-оплата через mBank и O!Банк прямо на сайте. Без переводов и поездок в офис.',
    span: '',
    accent: true,
  },
]

export function Benefits() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F5F0E6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-end"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B4513] font-medium">
              Почему CALMA
            </span>
            <h2
              className="mt-3 text-[#1C1412] font-light"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(2rem, 1rem + 3vw, 3.5rem)',
              }}
            >
              Для тех, кто ценит
              <br />
              <em className="not-italic text-[#8B4513]">надёжность</em>
            </h2>
          </div>
          <p className="text-[#7A6B5D] leading-relaxed">
            Мы не просто поставщик. Мы партнёр вашего заведения — помогаем стабильно
            подавать качественную выпечку без лишних хлопот.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-4 sm:auto-rows-[minmax(180px,auto)] gap-4 md:gap-5"
        >
          {benefits.map((b, i) => (
            <BenefitTile key={i} {...b} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BenefitTile({ icon, title, description, span, feature, accent }: Benefit) {
  const surface = accent
    ? 'bg-[var(--color-accent)] text-white border-transparent'
    : 'bg-[#FFFDF8] text-[#1C1412] border-[#E8DDD0]'

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`${span} ${surface} border rounded-2xl p-7 md:p-8 flex flex-col`}
    >
      <span
        className={`block ${accent ? 'text-white/90' : 'text-[#8B4513]'} ${feature ? 'mb-6' : 'mb-5'}`}
      >
        {icon}
      </span>
      <h3
        className={`font-light ${feature ? 'text-2xl md:text-3xl mb-3' : 'text-lg mb-2'}`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          accent ? 'text-white/80' : 'text-[#7A6B5D]'
        } ${feature ? 'max-w-md' : ''}`}
      >
        {description}
      </p>
    </motion.article>
  )
}
