'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

const steps = [
  { num: '01', title: 'Выберите продукты', desc: 'Просмотрите каталог, добавьте нужные позиции в корзину.' },
  { num: '02', title: 'Оформите заказ', desc: 'Укажите имя и телефон — менеджер уточнит детали доставки.' },
  { num: '03', title: 'Оплатите QR-кодом', desc: 'Сканируйте QR через mBank или O!Банк. Оплата за секунды.' },
  { num: '04', title: 'Получите доставку', desc: 'Доставим на следующий день с соблюдением холодовой цепочки.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-[#FFFDF8]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#8B4513] font-medium">Процесс</span>
          <h2
            className="mt-3 text-[#1C1412] font-light"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 1rem + 3vw, 3.5rem)' }}
          >
            Как заказать
          </h2>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-full h-px border-t border-dashed border-[#E8DDD0] z-0 translate-x-3" />
              )}
              <div className="relative z-10 p-6 bg-[#F5F0E6] border border-[#E8DDD0] rounded-2xl h-full">
                <p className="text-4xl text-[#E8DDD0] mb-4 font-light select-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.num}
                </p>
                <h3 className="text-lg text-[#1C1412] mb-2 font-light" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#7A6B5D] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#C49A6C] transition-colors duration-150"
          >
            Начать заказ →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
