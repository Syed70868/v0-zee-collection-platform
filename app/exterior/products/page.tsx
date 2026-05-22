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
  'Outdoor Living',
  'Dining',
  'Lounging',
  'Planters',
  'Fire Features',
  'Lighting',
  'Accessories',
]

// Mock products for initial display
const mockProducts = [
  {
    _id: '1',
    name: 'Monolith Outdoor Sofa',
    slug: 'monolith-outdoor-sofa',
    shortDescription: 'Modular concrete and steel sectional',
    basePrice: 6850,
    images: [{ url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop', alt: 'Monolith Outdoor Sofa' }],
    category: 'Outdoor Living',
  },
  {
    _id: '2',
    name: 'Granite Dining Table',
    slug: 'granite-dining-table',
    shortDescription: 'Solid granite top with steel frame',
    basePrice: 4200,
    images: [{ url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop', alt: 'Granite Dining Table' }],
    category: 'Dining',
  },
  {
    _id: '3',
    name: 'Steel Frame Lounger',
    slug: 'steel-frame-lounger',
    shortDescription: 'Adjustable weathered steel chaise',
    basePrice: 1890,
    images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', alt: 'Steel Frame Lounger' }],
    category: 'Lounging',
  },
  {
    _id: '4',
    name: 'Concrete Planter Box',
    slug: 'concrete-planter-box',
    shortDescription: 'Hand-cast architectural planter',
    basePrice: 780,
    images: [{ url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop', alt: 'Concrete Planter Box' }],
    category: 'Planters',
  },
  {
    _id: '5',
    name: 'Fire Pit Table',
    slug: 'fire-pit-table',
    shortDescription: 'Gas-powered concrete fire feature',
    basePrice: 3450,
    images: [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', alt: 'Fire Pit Table' }],
    category: 'Fire Features',
  },
  {
    _id: '6',
    name: 'Pathway Bollard Light',
    slug: 'pathway-bollard-light',
    shortDescription: 'Architectural steel path lighting',
    basePrice: 420,
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop', alt: 'Pathway Bollard Light' }],
    category: 'Lighting',
  },
]

export default function ExteriorProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('')
  const [sort, setSort] = useState('-createdAt')
  const [gridCols, setGridCols] = useState<2 | 3>(3)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const queryParams = new URLSearchParams()
  queryParams.set('store', 'exterior')
  if (search) queryParams.set('search', search)
  if (category) queryParams.set('category', category)
  queryParams.set('sort', sort)

  const { data, isLoading } = useSWR(
    `/api/products?${queryParams.toString()}`,
    fetcher
  )

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
              'url(https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[#1C1C1C]/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7A6F5D]">
            Exterior Collection
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-archivo)] text-3xl font-bold uppercase tracking-wide text-white lg:text-5xl">
            All Products
          </h1>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4D2CF] pb-6">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1C1C1C]/40" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-none border-[#D4D2CF] bg-white pl-10 focus:border-[#1A3A2F] focus:ring-[#1A3A2F]"
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
                    className="rounded-none border-[#D4D2CF] lg:hidden"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-[family-name:var(--font-archivo)] uppercase tracking-wide">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#1C1C1C]">
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
                            <span className="text-sm text-[#1C1C1C]/70">
                              {cat}
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
                <SelectTrigger className="hidden w-44 rounded-none border-[#D4D2CF] lg:flex">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 rounded-none border-[#D4D2CF]">
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
              <div className="hidden items-center gap-1 border border-[#D4D2CF] p-1 lg:flex">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1.5 ${
                    gridCols === 2
                      ? 'bg-[#1C1C1C] text-white'
                      : 'text-[#1C1C1C]/50 hover:text-[#1C1C1C]'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 ${
                    gridCols === 3
                      ? 'bg-[#1C1C1C] text-white'
                      : 'text-[#1C1C1C]/50 hover:text-[#1C1C1C]'
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
                  className="inline-flex items-center gap-1 bg-[#1A3A2F]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#1C1C1C]"
                >
                  {cat}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs font-bold uppercase tracking-wide text-[#1C1C1C]/60 hover:text-[#1C1C1C]"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div
            className={`mt-8 grid gap-4 lg:gap-6 ${
              gridCols === 2
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : products.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/exterior/products/${product.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#D4D2CF]">
                      <Image
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.images?.[0]?.alt || product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.featured && (
                        <span className="absolute left-0 top-4 bg-[#1A3A2F] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#7A6F5D]">
                        {product.category}
                      </p>
                      <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-[#1C1C1C] transition-colors group-hover:text-[#1A3A2F]">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#1C1C1C]/60">
                        {product.shortDescription}
                      </p>
                      <p className="mt-2 font-bold text-[#1C1C1C]">
                        ${product.basePrice?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>

          {/* Empty State */}
          {!isLoading && products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-[#1C1C1C]/60">No products found</p>
              <Button
                variant="outline"
                className="mt-4 rounded-none"
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
