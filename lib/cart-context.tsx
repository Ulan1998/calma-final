'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from './config'

export type CartItem = {
  product: Product
  qty: number
}

type CartContextType = {
  items: CartItem[]
  add: (product: Product) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
  total: number
  totalTypyn: number
  count: number
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const add = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + product.minQty } : i
        )
      }
      return [...prev, { product, qty: product.minQty }]
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    setItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, qty } : i))
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)
  const totalTypyn = items.reduce((s, i) => s + i.product.priceTypyn * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, total, totalTypyn, count, cartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
