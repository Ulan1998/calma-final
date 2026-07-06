'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

type Props = {
  index: string
  title: string
  body: string
  leoSrc?: string
}

export function BenefitRow({ index, title, body, leoSrc }: Props) {
  return (
    <motion.article
      variants={fadeUp}
      className="flex gap-5 py-8 border-t border-[var(--color-border)]"
    >
      <span
        className="font-display font-light text-xl text-[var(--color-gold)] shrink-0 w-9 pt-0.5"
        aria-hidden
      >
        {index}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-light text-2xl leading-tight text-[var(--color-text)]">
            {title}
          </h3>
          {leoSrc && (
            <div className="relative shrink-0 w-14 h-14" aria-hidden>
              <Image
                src={leoSrc}
                alt=""
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
          )}
        </div>
        <p className="font-body text-sm text-[var(--color-muted)] mt-2 leading-relaxed">
          {body}
        </p>
      </div>
    </motion.article>
  )
}
