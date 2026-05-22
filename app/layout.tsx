import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Archivo_Black } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { StoreProvider } from '@/lib/contexts/StoreContext'
import { CartProvider } from '@/lib/contexts/CartContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Zee Collection | Luxury Furniture for Interior & Exterior',
    template: '%s | Zee Collection',
  },
  description:
    'Discover exquisite handcrafted furniture for your interior and exterior spaces. Zee Collection brings European luxury design to discerning homeowners worldwide.',
  keywords: [
    'luxury furniture',
    'interior design',
    'exterior furniture',
    'handcrafted',
    'European design',
    'premium furniture',
    'custom furniture',
  ],
  authors: [{ name: 'Zee Collection' }],
  creator: 'Zee Collection',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Zee Collection',
    title: 'Zee Collection | Luxury Furniture for Interior & Exterior',
    description:
      'Discover exquisite handcrafted furniture for your interior and exterior spaces.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zee Collection',
    description:
      'Discover exquisite handcrafted furniture for your interior and exterior spaces.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1C1C' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${archivo.variable} bg-background`}
    >
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          <StoreProvider>
            <CartProvider>
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  className: 'font-sans',
                  duration: 4000,
                }}
              />
            </CartProvider>
          </StoreProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
