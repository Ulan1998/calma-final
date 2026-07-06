'use client'

import { useState } from 'react'

type Props = {
  src: string
  poster?: string
  className?: string
  loop?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  style?: React.CSSProperties
}

export function AnimatedAsset({
  src,
  poster,
  className,
  loop = true,
  preload = 'none',
  style,
}: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <video
      src={src}
      autoPlay
      muted
      playsInline
      loop={loop}
      preload={preload}
      poster={poster}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
