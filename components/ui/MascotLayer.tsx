import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Wraps a section in a relative-positioned container so MiniBaker
 * absolute positioning stays within the section bounds.
 *
 * Usage:
 *   <MascotLayer>
 *     <YourSection />
 *     <MiniBaker char="helper" action="carry" size={36} position="bottom-left" />
 *   </MascotLayer>
 */
export function MascotLayer({ children, className }: Props) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      {children}
    </div>
  )
}
