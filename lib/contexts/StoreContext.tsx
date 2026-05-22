'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export type StoreType = 'interior' | 'exterior' | null

interface StoreContextType {
  store: StoreType
  setStore: (store: StoreType) => void
  isInterior: boolean
  isExterior: boolean
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Design tokens for each store
export const storeThemes = {
  interior: {
    name: 'Interior',
    colors: {
      primary: '#C9B99A',
      background: '#FAF8F5',
      text: '#2D2A26',
      accent: '#B8A076',
      muted: '#E8E4DD',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
  },
  exterior: {
    name: 'Exterior',
    colors: {
      primary: '#1A3A2F',
      background: '#E8E6E3',
      text: '#1C1C1C',
      accent: '#7A6F5D',
      muted: '#D4D2CF',
    },
    fonts: {
      heading: 'Archivo Black',
      body: 'Inter',
    },
  },
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStoreState] = useState<StoreType>(null)
  const pathname = usePathname()

  // Detect store from URL
  useEffect(() => {
    if (pathname.startsWith('/interior')) {
      setStoreState('interior')
    } else if (pathname.startsWith('/exterior')) {
      setStoreState('exterior')
    }
  }, [pathname])

  const setStore = (newStore: StoreType) => {
    setStoreState(newStore)
  }

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
        isInterior: store === 'interior',
        isExterior: store === 'exterior',
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
