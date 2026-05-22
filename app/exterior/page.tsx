import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data for initial display
const featuredCollections = [
  {
    id: '1',
    name: 'Outdoor Living',
    slug: 'outdoor-living',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    description: 'Seating and lounging for your outdoor spaces',
  },
  {
    id: '2',
    name: 'Garden & Patio',
    slug: 'garden-patio',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
    description: 'Elegant furniture for gardens and patios',
  },
  {
    id: '3',
    name: 'Poolside',
    slug: 'poolside',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b021aa?q=80&w=1200&auto=format&fit=crop',
    description: 'Weather-resistant pieces for pool areas',
  },
]

const featuredProducts = [
  {
    id: '1',
    name: 'Monolith Outdoor Sofa',
    slug: 'monolith-outdoor-sofa',
    price: 6850,
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Granite Dining Table',
    slug: 'granite-dining-table',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Steel Frame Lounger',
    slug: 'steel-frame-lounger',
    price: 1890,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Concrete Planter Box',
    slug: 'concrete-planter-box',
    price: 780,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop',
  },
]

export default function ExteriorHomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden lg:h-[85vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/90 via-[#1C1C1C]/60 to-transparent" />
        
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7A6F5D]">
            Architectural Collection
          </span>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-archivo)] text-4xl font-bold uppercase tracking-wide text-white lg:text-6xl">
            Bold Design for Outdoor Living
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/80">
            Statement pieces crafted from stone, steel, and concrete. Built to
            endure. Designed to inspire.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/exterior/products">
              <Button
                size="lg"
                className="rounded-none bg-white px-8 font-bold uppercase tracking-wide text-[#1C1C1C] hover:bg-white/90"
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/exterior/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-none border-white/30 px-8 font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                Our Process
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
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7A6F5D]">
                Curated Spaces
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-archivo)] text-2xl font-bold uppercase tracking-wide text-[#1C1C1C] lg:text-3xl">
                Shop by Environment
              </h2>
            </div>
            <Link
              href="/exterior/collections"
              className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#1C1C1C] transition-colors hover:text-[#7A6F5D] lg:flex"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-6">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/exterior/collections/${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="font-[family-name:var(--font-archivo)] text-xl font-bold uppercase tracking-wide text-white lg:text-2xl">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white transition-all group-hover:gap-4">
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
      <section className="bg-[#1C1C1C] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7A6F5D]">
                Statement Pieces
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-archivo)] text-2xl font-bold uppercase tracking-wide text-white lg:text-3xl">
                Featured Products
              </h2>
            </div>
            <Link
              href="/exterior/products"
              className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:text-[#7A6F5D] lg:flex"
            >
              <span>Shop All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/exterior/products/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-[#2A2A2A]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:text-[#7A6F5D]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7A6F5D]">
                Our Materials
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-archivo)] text-2xl font-bold uppercase tracking-wide text-[#1C1C1C] lg:text-4xl">
                Built to Last. Designed to Endure.
              </h2>
              <p className="mt-6 text-[#1C1C1C]/70">
                Our exterior collection is crafted from materials that age
                beautifully and withstand the elements. Each piece is engineered
                for longevity without sacrificing design integrity.
              </p>
              
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="border-l-2 border-[#1A3A2F] pl-4">
                  <h3 className="font-bold uppercase tracking-wide text-[#1C1C1C]">
                    Weathered Steel
                  </h3>
                  <p className="mt-2 text-sm text-[#1C1C1C]/70">
                    Develops a protective patina over time
                  </p>
                </div>
                <div className="border-l-2 border-[#1A3A2F] pl-4">
                  <h3 className="font-bold uppercase tracking-wide text-[#1C1C1C]">
                    Cast Concrete
                  </h3>
                  <p className="mt-2 text-sm text-[#1C1C1C]/70">
                    Hand-poured architectural grade concrete
                  </p>
                </div>
                <div className="border-l-2 border-[#1A3A2F] pl-4">
                  <h3 className="font-bold uppercase tracking-wide text-[#1C1C1C]">
                    Natural Stone
                  </h3>
                  <p className="mt-2 text-sm text-[#1C1C1C]/70">
                    Quarried and shaped by master craftsmen
                  </p>
                </div>
                <div className="border-l-2 border-[#1A3A2F] pl-4">
                  <h3 className="font-bold uppercase tracking-wide text-[#1C1C1C]">
                    Marine-Grade Teak
                  </h3>
                  <p className="mt-2 text-sm text-[#1C1C1C]/70">
                    Sustainably sourced, naturally resistant
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                  alt="Steel material"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
                  alt="Concrete material"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[#1A3A2F]/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-[family-name:var(--font-archivo)] text-3xl font-bold uppercase tracking-wide text-white lg:text-5xl">
            Commission a Custom Piece
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Work with our architects and craftsmen to create bespoke exterior
            furniture tailored to your space and vision.
          </p>
          <Link href="/exterior/customization">
            <Button
              size="lg"
              className="mt-8 rounded-none bg-white px-10 font-bold uppercase tracking-wide text-[#1C1C1C] hover:bg-white/90"
            >
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
