import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data for initial display (will be replaced with API data)
const featuredCollections = [
  {
    id: '1',
    name: 'Living Room',
    slug: 'living-room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    description: 'Sofas, armchairs, and accent pieces for your living space',
  },
  {
    id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
    description: 'Beds, nightstands, and dressers for peaceful rest',
  },
  {
    id: '3',
    name: 'Dining',
    slug: 'dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
    description: 'Tables and chairs for memorable gatherings',
  },
]

const featuredProducts = [
  {
    id: '1',
    name: 'Oslo Lounge Chair',
    slug: 'oslo-lounge-chair',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Copenhagen Sofa',
    slug: 'copenhagen-sofa',
    price: 4850,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Stockholm Coffee Table',
    slug: 'stockholm-coffee-table',
    price: 1280,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Bergen Dining Chair',
    slug: 'bergen-dining-chair',
    price: 890,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop',
  },
]

export default function InteriorHomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden lg:h-[85vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent" />
        
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
          <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#B8A076]">
            New Collection 2024
          </span>
          <h1 className="max-w-2xl font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight text-[#2D2A26] lg:text-6xl lg:leading-tight">
            Scandinavian Elegance for Modern Living
          </h1>
          <p className="mt-6 max-w-lg text-lg text-[#2D2A26]/70">
            Discover handcrafted furniture that brings warmth, comfort, and
            timeless design to your interior spaces.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/interior/products">
              <Button
                size="lg"
                className="rounded-full bg-[#2D2A26] px-8 text-white hover:bg-[#2D2A26]/90"
              >
                Shop Collection
              </Button>
            </Link>
            <Link href="/interior/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-[#2D2A26]/20 px-8 text-[#2D2A26] hover:bg-[#2D2A26]/5"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#B8A076]">
                Curated Spaces
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] lg:text-4xl">
                Shop by Room
              </h2>
            </div>
            <Link
              href="/interior/collections"
              className="hidden items-center gap-2 text-sm font-medium text-[#2D2A26] transition-colors hover:text-[#B8A076] lg:flex"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/interior/collections/${collection.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/80 via-[#2D2A26]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-4">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#F5F2EE] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#B8A076]">
                Curated Selection
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] lg:text-4xl">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/interior/products"
              className="hidden items-center gap-2 text-sm font-medium text-[#2D2A26] transition-colors hover:text-[#B8A076] lg:flex"
            >
              <span>Shop All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/interior/products/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-[#FAF8F5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-[#2D2A26] transition-colors group-hover:text-[#B8A076]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#2D2A26]/60">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9B99A]/20">
                <svg
                  className="h-8 w-8 text-[#B8A076]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2D2A26]">
                Thoughtful Design
              </h3>
              <p className="mt-3 text-sm text-[#2D2A26]/70">
                Every piece is designed with intention, balancing form and
                function for timeless appeal.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9B99A]/20">
                <svg
                  className="h-8 w-8 text-[#B8A076]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2D2A26]">
                Global Delivery
              </h3>
              <p className="mt-3 text-sm text-[#2D2A26]/70">
                White-glove delivery service to your door, anywhere in the
                world.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9B99A]/20">
                <svg
                  className="h-8 w-8 text-[#B8A076]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2D2A26]">
                Made with Care
              </h3>
              <p className="mt-3 text-sm text-[#2D2A26]/70">
                Handcrafted by skilled artisans using sustainably sourced
                materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[#2D2A26]/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white lg:text-5xl">
            Create Your Custom Piece
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Work with our design team to create bespoke furniture tailored to
            your exact specifications and style preferences.
          </p>
          <Link href="/interior/customization">
            <Button
              size="lg"
              className="mt-8 rounded-full bg-white px-8 text-[#2D2A26] hover:bg-white/90"
            >
              Start Customizing
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
