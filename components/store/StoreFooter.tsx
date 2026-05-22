import Link from 'next/link'
import { cn } from '@/lib/utils'

interface StoreFooterProps {
  variant?: 'interior' | 'exterior'
}

export function StoreFooter({ variant = 'interior' }: StoreFooterProps) {
  const isInterior = variant === 'interior'

  const footerLinks = {
    shop: [
      { href: `/${variant}/products`, label: 'All Products' },
      { href: `/${variant}/collections`, label: 'Collections' },
      { href: `/${variant}/products?featured=true`, label: 'Featured' },
      { href: `/${variant}/products?bestseller=true`, label: 'Bestsellers' },
    ],
    company: [
      { href: `/${variant}/about`, label: 'About Us' },
      { href: `/${variant}/contact`, label: 'Contact' },
      { href: '/careers', label: 'Careers' },
      { href: '/press', label: 'Press' },
    ],
    support: [
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping & Delivery' },
      { href: '/returns', label: 'Returns' },
      { href: '/customization', label: 'Customization' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
    ],
  }

  return (
    <footer
      className={cn(
        'border-t',
        isInterior
          ? 'border-[#E8E4DD] bg-[#FAF8F5]'
          : 'border-[#D4D2CF] bg-[#E8E6E3]'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span
                className={cn(
                  'text-xl font-semibold tracking-tight',
                  isInterior
                    ? 'font-[family-name:var(--font-playfair)] text-[#2D2A26]'
                    : 'font-[family-name:var(--font-archivo)] text-[#1C1C1C] uppercase tracking-wider text-lg'
                )}
              >
                Zee Collection
              </span>
            </Link>
            <p
              className={cn(
                'mt-4 max-w-xs text-sm leading-relaxed',
                isInterior ? 'text-[#2D2A26]/70' : 'text-[#1C1C1C]/70'
              )}
            >
              {isInterior
                ? 'Crafting timeless interior pieces that bring warmth and elegance to your living spaces.'
                : 'Bold architectural furniture designed to transform your outdoor spaces into extraordinary environments.'}
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p
                className={cn(
                  'text-sm font-medium',
                  isInterior ? 'text-[#2D2A26]' : 'text-[#1C1C1C] uppercase tracking-wide text-xs'
                )}
              >
                Subscribe to our newsletter
              </p>
              <form className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    'flex-1 rounded-md border px-3 py-2 text-sm outline-none transition-colors',
                    isInterior
                      ? 'border-[#E8E4DD] bg-white placeholder:text-[#2D2A26]/40 focus:border-[#C9B99A]'
                      : 'border-[#D4D2CF] bg-white placeholder:text-[#1C1C1C]/40 focus:border-[#1A3A2F]'
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    isInterior
                      ? 'bg-[#2D2A26] text-white hover:bg-[#2D2A26]/90'
                      : 'bg-[#1A3A2F] text-white hover:bg-[#1A3A2F]/90 uppercase tracking-wide text-xs'
                  )}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3
              className={cn(
                'text-sm font-semibold',
                isInterior ? 'text-[#2D2A26]' : 'text-[#1C1C1C] uppercase tracking-wide text-xs'
              )}
            >
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors',
                      isInterior
                        ? 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
                        : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={cn(
                'text-sm font-semibold',
                isInterior ? 'text-[#2D2A26]' : 'text-[#1C1C1C] uppercase tracking-wide text-xs'
              )}
            >
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors',
                      isInterior
                        ? 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
                        : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={cn(
                'text-sm font-semibold',
                isInterior ? 'text-[#2D2A26]' : 'text-[#1C1C1C] uppercase tracking-wide text-xs'
              )}
            >
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors',
                      isInterior
                        ? 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
                        : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={cn(
            'mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row',
            isInterior ? 'border-[#E8E4DD]' : 'border-[#D4D2CF]'
          )}
        >
          <p
            className={cn(
              'text-sm',
              isInterior ? 'text-[#2D2A26]/60' : 'text-[#1C1C1C]/60'
            )}
          >
            &copy; {new Date().getFullYear()} Zee Collection. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm transition-colors',
                  isInterior
                    ? 'text-[#2D2A26]/60 hover:text-[#2D2A26]'
                    : 'text-[#1C1C1C]/60 hover:text-[#1C1C1C]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
