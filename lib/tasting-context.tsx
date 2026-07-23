'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type TastingContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const TastingContext = createContext<TastingContextValue | null>(null)

export function TastingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <TastingContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </TastingContext.Provider>
  )
}

export function useTasting(): TastingContextValue {
  const ctx = useContext(TastingContext)
  if (!ctx) throw new Error('useTasting must be used within TastingProvider')
  return ctx
}
