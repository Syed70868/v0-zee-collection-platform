'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5]">
      {/* Minimal Header */}
      <header className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 lg:px-12">
        <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2D2A26] lg:text-2xl">
          Zee Collection
        </span>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-[#2D2A26]/70 transition-colors hover:text-[#2D2A26]"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#2D2A26] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2D2A26]/90"
          >
            Create Account
          </Link>
        </nav>
      </header>

      {/* Split Hero */}
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Interior Section */}
        <Link
          href="/interior"
          className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-center overflow-hidden lg:min-h-screen"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-[#FAF8F5]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-50"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/60 to-[#FAF8F5]/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#B8A076]">
              Refined Comfort
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26] lg:text-6xl">
              Interior
            </h2>
            <p className="mt-4 max-w-md text-base text-[#2D2A26]/70 lg:text-lg">
              Timeless Scandinavian elegance for your living spaces. Warm tones,
              organic materials, and meticulous craftsmanship.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#2D2A26] transition-all group-hover:gap-4">
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#C9B99A]/20 blur-3xl transition-all duration-700 group-hover:bg-[#C9B99A]/30" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#C9B99A]/0 transition-colors duration-500 group-hover:bg-[#C9B99A]/5" />
        </Link>

        {/* Divider */}
        <div className="relative z-20 hidden w-px lg:block">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#2D2A26]/20 to-transparent" />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#2D2A26]/10 bg-white">
            <span className="font-[family-name:var(--font-playfair)] text-xs text-[#2D2A26]/50">
              or
            </span>
          </div>
        </div>

        {/* Exterior Section */}
        <Link
          href="/exterior"
          className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-center overflow-hidden lg:min-h-screen"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-[#E8E6E3]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-50"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2000&auto=format&fit=crop)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#E8E6E3] via-[#E8E6E3]/60 to-[#E8E6E3]/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#7A6F5D]">
              Bold Architecture
            </span>
            <h2 className="font-[family-name:var(--font-archivo)] text-3xl font-bold uppercase tracking-wide text-[#1C1C1C] lg:text-5xl">
              Exterior
            </h2>
            <p className="mt-4 max-w-md text-base text-[#1C1C1C]/70 lg:text-lg">
              Architectural statement pieces for outdoor living. Stone, steel,
              and concrete converge in bold design.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[#1C1C1C] transition-all group-hover:gap-4">
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#1A3A2F]/10 blur-3xl transition-all duration-700 group-hover:bg-[#1A3A2F]/20" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#1A3A2F]/0 transition-colors duration-500 group-hover:bg-[#1A3A2F]/5" />
        </Link>
      </div>

      {/* Mobile Divider */}
      <div className="absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#2D2A26]/10 bg-white lg:hidden">
        <span className="font-[family-name:var(--font-playfair)] text-xs text-[#2D2A26]/50">
          or
        </span>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-6 left-0 right-0 z-20 text-center lg:bottom-8">
        <p className="text-xs tracking-[0.2em] text-[#2D2A26]/40 lg:text-sm">
          CRAFTED WITH PASSION. DESIGNED FOR LIFE.
        </p>
      </div>
    </main>
  )
}
