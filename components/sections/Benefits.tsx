'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

const benefits = [
  { icon: '🏭', title: 'Собственное производство', description: 'Производим в Бишкеке. Контролируем каждый этап — от теста до заморозки. Стабильное качество без посредников.' },
  { icon: '🚚', title: 'Доставка по Бишкеку', description: 'Доставляем заказ на следующий день. Поддерживаем холодовую цепочку при перевозке.' },
  { icon: '📦', title: 'Гибкие объёмы', description: 'Подбираем объём под ваш трафик. Работаем с кофейнями, ресторанами и отелями любого масштаба.' },
  { icon: '💳', title: 'Быстрая оплата', description: 'QR-оплата через mBank и O!Банк прямо на сайте. Без поездок в офис и банковских переводов.' },
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#8B4513] font-medium">Почему CALMA</span>
            <h2
              className="mt-3 text-[#1C1412] font-light"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 1rem + 3vw, 3.5rem)' }}
            >
              Для тех, кто ценит<br />
              <em className="not-italic text-[#8B4513]">надёжность</em>
            </h2>
          </div>
          <p className="text-[#7A6B5D] leading-relaxed">
            Мы не просто поставщик. Мы партнёр вашего заведения — помогаем стабильно подавать качественную выпечку без лишних хлопот.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#FFFDF8] border border-[#E8DDD0] rounded-2xl p-8"
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(139,69,19,0.09)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-3xl mb-5 block">{b.icon}</span>
              <h3 className="text-xl text-[#1C1412] mb-3 font-light" style={{ fontFamily: 'var(--font-display)' }}>
                {b.title}
              </h3>
              <p className="text-sm text-[#7A6B5D] leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
