'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { InstructionModal } from '@/components/ui/InstructionModal'
import { AnimatedAsset } from '@/components/ui/AnimatedAsset'

const FAQS: Array<{ q: string; a: string; instruction?: true; video?: string }> = [
  {
    q: 'Нужно ли размораживать продукцию перед выпечкой?',
    a: 'Да. Перед выпечкой оставьте продукцию при комнатной температуре на 60–90 минут. Затем при желании смажьте желтком и выпекайте при 180 °C в течение 20–25 минут.',
  },
  {
    q: 'Можно ли заказать продукцию разных видов?',
    a: 'Да. Минимальный заказ — 3 кг, при этом вы можете собрать его из разных видов продукции.',
  },
  {
    q: 'Как происходит доставка?',
    a: 'По Бишкеку доставляем собственной автоморозилкой. В другие регионы Кыргызстана условия доставки согласовываются индивидуально, чтобы сохранить качество продукции.',
  },
  {
    q: 'Какие документы вы предоставляете?',
    a: 'Мы работаем официально, заключаем договоры и предоставляем все необходимые бухгалтерские документы. Основная линейка круассанов CALMA имеет декларацию соответствия требованиям ЕАЭС.',
  },
  {
    q: 'Можно ли сначала попробовать продукцию?',
    a: 'Да. Вы можете заказать пробный набор. Стоимость продукции не оплачивается — оплачивается только доставка.',
  },
  {
    q: 'Как оформить и оплатить заказ?',
    a: 'Выберите товары на сайте, заполните контактные данные и оплатите заказ через QR. После оформления мы свяжемся с вами для подтверждения доставки.',
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
      className="py-8 px-5 bg-[var(--color-bg)] md:py-14 md:px-8"
    >
      <div className="md:max-w-3xl md:mx-auto">
      <div className="relative mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="font-script text-center mb-3"
          style={{ fontSize: '2rem', fontStyle: 'italic', color: '#ab2b02', fontFamily: 'var(--font-script)' }}
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
      </div>
    </section>
  )
}
