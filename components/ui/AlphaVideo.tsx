'use client'

import { useEffect, useRef } from 'react'

type Props = {
  src: string
  className?: string
  style?: React.CSSProperties
}

export function AlphaVideo({ src, className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true })
    if (!offCtx) return

    const tick = () => {
      const fw = video.videoWidth
      const totalH = video.videoHeight
      const fh = Math.floor(totalH / 2)

      if (fw > 0 && fh > 0) {
        if (offscreen.width !== fw || offscreen.height !== totalH) {
          offscreen.width = fw
          offscreen.height = totalH
          canvas.width = fw
          canvas.height = fh
        }

        offCtx.drawImage(video, 0, 0)

        const all = offCtx.getImageData(0, 0, fw, totalH).data
        const out = ctx.createImageData(fw, fh)

        for (let i = 0; i < fw * fh; i++) {
          const ri = i * 4
          const mi = (fw * fh + i) * 4
          out.data[ri]     = all[ri]
          out.data[ri + 1] = all[ri + 1]
          out.data[ri + 2] = all[ri + 2]
          out.data[ri + 3] = all[mi] // red channel of mask = alpha
        }

        ctx.putImageData(out, 0, 0)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    video.play().catch(() => {})
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {/* video positioned off-screen — display:none blocks autoplay */}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        preload="auto"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}
