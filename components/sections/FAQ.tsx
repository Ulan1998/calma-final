'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { InstructionModal } from '@/components/ui/InstructionModal'
import { AnimatedAsset } from '@/components/ui/AnimatedAsset'

const FAQS: Array<{ q: string; a: string; instruction?: true; video?: string }> = [
  {
    q: 'Можно ли заказать пробную партию?',
    a: 'Да, для первого знакомства делаем пробный заказ от 1 кг — без минимума. Привезём ассорти, вы попробуете выпечь и оцените качество. Свяжитесь с менеджером.',
  },
  {
    q: 'Какое оборудование нужно?',
    a: 'Обычная конвекционная или подовая духовка. Специального оборудования не нужно — подойдёт то, что уже есть на вашей кухне. Температура 180°C, время 18–22 минуты.',
  },
  {
    q: 'Как правильно хранить?',
    a: 'В морозильной камере при −18°C до 3 месяцев. После расстойки (извлечения из морозилки) хранить в холодильнике нельзя — нужно сразу выпекать.',
  },
  {
    q: 'Как часто вы доставляете?',
    a: 'По Бишкеку — ежедневно, при заказе до 18:00 доставим на следующий день. По регионам (Ош, Каракол) — 2–3 раза в неделю рефрижератором.',
  },
  {
    q: 'Есть ли минимальная сумма заказа?',
    a: 'Минимальный объём — 3 кг. Позиции можно миксовать как угодно: например, 1 кг шоколадных + 1 кг хот-дог + 1 кг классических.',
  },
  {
    q: 'Вы обучаете персонал?',
    a: 'Да, бесплатно. Приезжаем к вам, показываем весь процесс: расстойка, выпечка, подача. Сопровождаем до стабильного результата.',
  },
  {
    q: 'Как правильно приготовить круассаны?',
    a: 'Мы подготовили пошаговую инструкцию по приготовлению круассанов с температурой, временем выпечки и основными рекомендациями.',
    instruction: true,
  },
]

const LIST_STAGGER = stagger(0.05)

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-8 px-5 bg-[var(--color-bg)]"
    >
      <div className="relative mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="font-script text-center mb-3"
          style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02' }}
        >
          Вопросы и ответы
        </motion.p>


      </div>

      <div style={{ marginBottom: 16, overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          style={{ width: '110%', marginLeft: '-5%', height: 'auto', display: 'block' }}
        >
          <source src="/animations/faq-canva.mp4" type="video/mp4" />
        </video>
      </div>

      <motion.div
        variants={LIST_STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-3"
      >
        {FAQS.map((item, i) => (
          <motion.div
            key={item.q}
            variants={fadeUp}
            className="bg-[var(--color-bg)] rounded-[18px] border border-[var(--color-border)] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between gap-3 text-left px-5 py-[18px] font-body font-bold text-[var(--color-text)]"
              style={{ fontSize: '0.95rem', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <span
                className="shrink-0 font-light transition-transform duration-200"
                style={{
                  fontSize: '1.4rem',
                  color: '#ab2b02',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  display: 'inline-block',
                }}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  {item.video && (
                    /* slot: public/animations/verified.mp4 */
                    <div className="px-5 pt-2">
                      <AnimatedAsset src={item.video} className="w-full rounded-[14px]" />
                    </div>
                  )}
                  <p
                    className="font-body text-[var(--color-muted)] px-5 pb-4 pt-2"
                    style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
                  >
                    {item.a}
                  </p>
                  {item.instruction && (
                    <div className="px-5 pb-5">
                      <button
                        onClick={() => setModalOpen(true)}
                        className="font-body font-bold"
                        style={{
                          background: 'var(--color-accent)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '10px 20px',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        Открыть инструкцию
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <InstructionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
