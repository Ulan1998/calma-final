import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function CartIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

export function CloseIcon({ width = 18, height = 18, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  )
}

export function CheckIcon({ width = 28, height = 28, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

/** Factory / own production */
export function FactoryIcon({ width = 28, height = 28, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <path d="M3 21V10l6 4V10l6 4V6l3-2v17z" />
      <line x1="3" y1="21" x2="22" y2="21" />
      <line x1="7" y1="17" x2="7" y2="17.5" />
      <line x1="12" y1="17" x2="12" y2="17.5" />
      <line x1="17" y1="17" x2="17" y2="17.5" />
    </svg>
  )
}

/** Delivery truck */
export function TruckIcon({ width = 28, height = 28, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <path d="M1 6h12v9H1z" />
      <path d="M13 9h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  )
}

/** Box / flexible volumes */
export function BoxIcon({ width = 28, height = 28, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  )
}

/** Card / fast payment */
export function CardIcon({ width = 28, height = 28, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  )
}

/** Croissant — used in empty cart */
export function CroissantIcon({ width = 40, height = 40, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      <path d="M4 16c2-1 4-1 6 0M14 16c2-1 4-1 6 0" />
      <path d="M3 17c3-6 5-8 9-8s6 2 9 8c-3-1-6-1-9 0s-6 1-9 0z" />
      <path d="M12 9V5" />
    </svg>
  )
}
