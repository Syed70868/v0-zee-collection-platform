'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const categories = [
  'Living Room',
  'Bedroom',
  'Dining',
  'Office',
  'Storage',
  'Lighting',
  'Decor',
]

const priceRanges = [
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: '$1,000 - $2,500', min: 1000, max: 2500 },
  { label: '$2,500 - $5,000', min: 2500, max: 5000 },
  { label: 'Over $5,000', min: 5000, max: Infinity },
]

// Mock products for initial display
const mockProducts = [
  {
    _id: '1',
    name: 'Oslo Lounge Chair',
    slug: 'oslo-lounge-chair',
    shortDescription: 'Elegant curved armchair with oak frame',
    basePrice: 2450,
    images: [{ url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop', alt: 'Oslo Lounge Chair' }],
    category: 'Living Room',
  },
  {
    _id: '2',
    name: 'Copenhagen Sofa',
    slug: 'copenhagen-sofa',
    shortDescription: 'Three-seater sofa in premium bouclé fabric',
    basePrice: 4850,
    images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', alt: 'Copenhagen Sofa' }],
    category: 'Living Room',
  },
  {
    _id: '3',
    name: 'Stockholm Coffee Table',
    slug: 'stockholm-coffee-table',
    shortDescription: 'Minimalist oak coffee table with brass details',
    basePrice: 1280,
    images: [{ url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop', alt: 'Stockholm Coffee Table' }],
    category: 'Living Room',
  },
  {
    _id: '4',
    name: 'Bergen Dining Chair',
    slug: 'bergen-dining-chair',
    shortDescription: 'Sculptural dining chair in solid walnut',
    basePrice: 890,
    images: [{ url: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop', alt: 'Bergen Dining Chair' }],
    category: 'Dining',
  },
  {
    _id: '5',
    name: 'Malmö Bed Frame',
    slug: 'malmo-bed-frame',
    shortDescription: 'Platform bed with upholstered headboard',
    basePrice: 3200,
    images: [{ url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop', alt: 'Malmö Bed Frame' }],
    category: 'Bedroom',
  },
  {
    _id: '6',
    name: 'Helsinki Sideboard',
    slug: 'helsinki-sideboard',
    shortDescription: 'Mid-century credenza with sliding doors',
    basePrice: 2890,
    images: [{ url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop', alt: 'Helsinki Sideboard' }],
    category: 'Storage',
  },
]

export default function InteriorProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('')
  const [sort, setSort] = useState('-createdAt')
  const [gridCols, setGridCols] = useState<2 | 3>(3)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Build query string
  const queryParams = new URLSearchParams()
  queryParams.set('store', 'interior')
  if (search) queryParams.set('search', search)
  if (category) queryParams.set('category', category)
  queryParams.set('sort', sort)

  const { data, isLoading } = useSWR(
    `/api/products?${queryParams.toString()}`,
    fetcher
  )

  // Use mock data if no API data
  const products = data?.products?.length > 0 ? data.products : mockProducts

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-64 overflow-hidden lg:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[#2D2A26]/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9B99A]">
            Interior Collection
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white lg:text-5xl">
            Shop All Products
          </h1>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DD] pb-6">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D2A26]/40" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[#E8E4DD] bg-white pl-10 focus:border-[#C9B99A] focus:ring-[#C9B99A]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Filters */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#E8E4DD] lg:hidden"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-[family-name:var(--font-playfair)]">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-[#2D2A26]">
                        Categories
                      </h4>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <label
                            key={cat}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <Checkbox
                              checked={selectedCategories.includes(cat)}
                              onCheckedChange={() => toggleCategory(cat)}
                            />
                            <span className="text-sm text-[#2D2A26]/70">
                              {cat}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-[#2D2A26]">
                        Price Range
                      </h4>
                      <div className="space-y-2">
                        {priceRanges.map((range) => (
                          <label
                            key={range.label}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <Checkbox />
                            <span className="text-sm text-[#2D2A26]/70">
                              {range.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="hidden w-40 border-[#E8E4DD] lg:flex">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40 border-[#E8E4DD]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-createdAt">Newest</SelectItem>
                  <SelectItem value="basePrice">Price: Low to High</SelectItem>
                  <SelectItem value="-basePrice">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid Toggle */}
              <div className="hidden items-center gap-1 rounded-md border border-[#E8E4DD] p-1 lg:flex">
                <button
                  onClick={() => setGridCols(2)}
                  className={`rounded p-1.5 ${
                    gridCols === 2
                      ? 'bg-[#2D2A26] text-white'
                      : 'text-[#2D2A26]/50 hover:text-[#2D2A26]'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`rounded p-1.5 ${
                    gridCols === 3
                      ? 'bg-[#2D2A26] text-white'
                      : 'text-[#2D2A26]/50 hover:text-[#2D2A26]'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {selectedCategories.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="inline-flex items-center gap-1 rounded-full bg-[#C9B99A]/20 px-3 py-1 text-sm text-[#2D2A26]"
                >
                  {cat}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-[#2D2A26]/60 hover:text-[#2D2A26]"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div
            className={`mt-8 grid gap-6 ${
              gridCols === 2
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : products.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/interior/products/${product.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F2EE]">
                      <Image
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.images?.[0]?.alt || product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.featured && (
                        <span className="absolute left-3 top-3 rounded-full bg-[#C9B99A] px-3 py-1 text-xs font-medium text-[#2D2A26]">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-[#B8A076]">
                        {product.category}
                      </p>
                      <h3 className="mt-1 font-medium text-[#2D2A26] transition-colors group-hover:text-[#B8A076]">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#2D2A26]/60">
                        {product.shortDescription}
                      </p>
                      <p className="mt-2 font-medium text-[#2D2A26]">
                        ${product.basePrice?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>

          {/* Empty State */}
          {!isLoading && products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-[#2D2A26]/60">No products found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch('')
                  setCategory('')
                  setSelectedCategories([])
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
