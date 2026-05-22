'use client'

import { createContext, useContext, ReactNode, useCallback } from 'react'
import useSWR from 'swr'
import { useAuth } from './AuthContext'

interface CartItem {
  _id: string
  product: {
    _id: string
    name: string
    slug: string
    images: { url: string; alt: string }[]
    basePrice: number
    store: 'interior' | 'exterior'
  }
  quantity: number
  customizations: {
    material?: string
    color?: string
    size?: string
    addons?: string[]
  }
  unitPrice: number
  totalPrice: number
}

interface Cart {
  _id: string
  items: CartItem[]
  subtotal: number
}

interface CartContextType {
  cart: Cart | null
  isLoading: boolean
  addToCart: (
    productId: string,
    quantity: number,
    customizations?: CartItem['customizations'],
    unitPrice?: number
  ) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 401) return null
    throw new Error('Failed to fetch cart')
  }
  return res.json()
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  
  const { data, mutate, isLoading } = useSWR(
    user ? '/api/cart' : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const cart = data?.cart || null
  const itemCount = cart?.items?.reduce((acc: number, item: CartItem) => acc + item.quantity, 0) || 0

  const addToCart = useCallback(async (
    productId: string,
    quantity: number,
    customizations?: CartItem['customizations'],
    unitPrice?: number
  ) => {
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, customizations, unitPrice }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to add to cart')
    }

    mutate()
  }, [mutate])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    const res = await fetch('/api/cart/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, quantity }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to update cart')
    }

    mutate()
  }, [mutate])

  const removeFromCart = useCallback(async (itemId: string) => {
    const res = await fetch(`/api/cart/remove/${itemId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to remove from cart')
    }

    mutate()
  }, [mutate])

  const clearCart = useCallback(async () => {
    const res = await fetch('/api/cart', {
      method: 'DELETE',
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to clear cart')
    }

    mutate()
  }, [mutate])

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
