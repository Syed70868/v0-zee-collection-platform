'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useCart } from '@/lib/contexts/CartContext'
import { useStore, storeThemes } from '@/lib/contexts/StoreContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface StoreHeaderProps {
  variant?: 'interior' | 'exterior'
}

export function StoreHeader({ variant }: StoreHeaderProps) {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const { store } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentStore = variant || store || 'interior'
  const theme = storeThemes[currentStore]
  const isInterior = currentStore === 'interior'

  const navLinks = [
    { href: `/${currentStore}`, label: 'Home' },
    { href: `/${currentStore}/products`, label: 'Shop All' },
    { href: `/${currentStore}/collections`, label: 'Collections' },
    { href: `/${currentStore}/about`, label: 'About' },
    { href: `/${currentStore}/contact`, label: 'Contact' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur-md',
        isInterior
          ? 'border-[#E8E4DD] bg-[#FAF8F5]/95'
          : 'border-[#D4D2CF] bg-[#E8E6E3]/95'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              'text-xl font-semibold tracking-tight lg:text-2xl',
              isInterior
                ? 'font-[family-name:var(--font-playfair)] text-[#2D2A26]'
                : 'font-[family-name:var(--font-archivo)] text-[#1C1C1C] uppercase tracking-wider text-lg'
            )}
          >
            Zee Collection
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'link-underline text-sm font-medium transition-colors',
                isInterior
                  ? 'text-[#2D2A26]/80 hover:text-[#2D2A26]'
                  : 'text-[#1C1C1C]/80 hover:text-[#1C1C1C] uppercase tracking-wide text-xs'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden lg:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Wishlist */}
          {user && (
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
          )}

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span
                  className={cn(
                    'absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium',
                    isInterior
                      ? 'bg-[#C9B99A] text-[#2D2A26]'
                      : 'bg-[#1A3A2F] text-white'
                  )}
                >
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/inquiries">My Inquiries</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className={cn(
                  'hidden text-sm font-medium lg:inline-flex',
                  isInterior ? '' : 'uppercase tracking-wide text-xs'
                )}
              >
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={cn(
            'border-t lg:hidden',
            isInterior
              ? 'border-[#E8E4DD] bg-[#FAF8F5]'
              : 'border-[#D4D2CF] bg-[#E8E6E3]'
          )}
        >
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'py-3 text-base font-medium',
                  isInterior
                    ? 'text-[#2D2A26]'
                    : 'text-[#1C1C1C] uppercase tracking-wide text-sm'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                className={cn(
                  'mt-2 py-3 text-base font-medium',
                  isInterior
                    ? 'text-[#C9B99A]'
                    : 'text-[#1A3A2F] uppercase tracking-wide text-sm'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
