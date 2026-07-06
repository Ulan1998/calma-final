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

/** Croissant — used in empty cart / cart items */
export function CroissantIcon({ width = 40, height = 40, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} {...base} {...rest}>
      {/* outer arc */}
      <path d="M4 17.5 C2.5 13.5 3.5 8 7 5.5 C10 3.5 14 3.5 17 5.5 C20.5 8 21.5 13.5 20 17.5" />
      {/* bottom arc closing the crescent */}
      <path d="M4 17.5 C5.5 19.5 8.5 21 12 21 C15.5 21 18.5 19.5 20 17.5" />
      {/* left tip */}
      <path d="M4 17.5 C3 18.5 1.5 19 2 20.5" />
      {/* right tip */}
      <path d="M20 17.5 C21 18.5 22.5 19 22 20.5" />
      {/* score marks */}
      <line x1="10" y1="6.5" x2="8.5" y2="16" strokeWidth="1" />
      <line x1="14" y1="6.5" x2="15.5" y2="16" strokeWidth="1" />
    </svg>
  )
}
