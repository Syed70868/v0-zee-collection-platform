'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { toast } from 'sonner'
import { Heart, Share2, Minus, Plus, ChevronRight, Palette, Maximize, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useCart } from '@/lib/contexts/CartContext'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Mock product for initial display
const mockProduct = {
  _id: '1',
  name: 'Oslo Lounge Chair',
  slug: 'oslo-lounge-chair',
  description: `The Oslo Lounge Chair embodies the essence of Scandinavian design philosophy – combining exceptional comfort with timeless elegance. Crafted from sustainably sourced solid oak, this piece features hand-finished details and premium upholstery that will grace your living space for generations.

Each chair is meticulously constructed by skilled artisans in our Copenhagen workshop, ensuring the highest standards of quality and craftsmanship. The ergonomic design provides optimal lumbar support while the gently curved arms create a welcoming embrace.`,
  shortDescription: 'Elegant curved armchair with oak frame',
  store: 'interior',
  category: 'Living Room',
  basePrice: 2450,
  images: [
    { url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop', alt: 'Oslo Lounge Chair - Front view', isPrimary: true },
    { url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop', alt: 'Oslo Lounge Chair - Side view', isPrimary: false },
    { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop', alt: 'Oslo Lounge Chair - In room', isPrimary: false },
  ],
  dimensions: { width: 75, height: 85, depth: 80, unit: 'cm' },
  materials: ['Oak', 'Bouclé Fabric', 'Brass'],
  colors: ['Natural Oak', 'Walnut', 'Black'],
  customizable: true,
  customizationOptions: {
    materials: [
      { name: 'Bouclé Fabric', priceModifier: 0, preview: '#F5F0E8' },
      { name: 'Velvet', priceModifier: 200, preview: '#4A4E69' },
      { name: 'Leather', priceModifier: 450, preview: '#8B4513' },
    ],
    colors: [
      { name: 'Cream', hex: '#F5F0E8', priceModifier: 0 },
      { name: 'Charcoal', hex: '#36454F', priceModifier: 0 },
      { name: 'Sage', hex: '#9CAF88', priceModifier: 50 },
      { name: 'Terracotta', hex: '#C04000', priceModifier: 50 },
    ],
    sizes: [
      { name: 'Standard', dimensions: { width: 75, height: 85, depth: 80 }, priceModifier: 0 },
      { name: 'Large', dimensions: { width: 85, height: 90, depth: 85 }, priceModifier: 300 },
    ],
    addons: [
      { name: 'Ottoman', price: 650, image: '' },
      { name: 'Lumbar Cushion', price: 120, image: '' },
    ],
  },
}

const relatedProducts = [
  {
    _id: '2',
    name: 'Copenhagen Sofa',
    slug: 'copenhagen-sofa',
    shortDescription: 'Three-seater sofa in premium bouclé',
    basePrice: 4850,
    images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', alt: 'Copenhagen Sofa' }],
  },
  {
    _id: '3',
    name: 'Stockholm Coffee Table',
    slug: 'stockholm-coffee-table',
    shortDescription: 'Minimalist oak coffee table',
    basePrice: 1280,
    images: [{ url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop', alt: 'Stockholm Coffee Table' }],
  },
  {
    _id: '4',
    name: 'Bergen Side Table',
    slug: 'bergen-side-table',
    shortDescription: 'Sculptural walnut side table',
    basePrice: 680,
    images: [{ url: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=800&auto=format&fit=crop', alt: 'Bergen Side Table' }],
  },
]

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { user } = useAuth()
  const { addToCart } = useCart()
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedMaterial, setSelectedMaterial] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedAddons, setSelectedAddons] = useState<number[]>([])
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { data, isLoading } = useSWR(`/api/products/${slug}`, fetcher)

  const product = data?.product || mockProduct
  const related = data?.relatedProducts || relatedProducts

  // Calculate total price
  const calculatePrice = () => {
    let price = product.basePrice
    if (product.customizationOptions) {
      price += product.customizationOptions.materials?.[selectedMaterial]?.priceModifier || 0
      price += product.customizationOptions.colors?.[selectedColor]?.priceModifier || 0
      price += product.customizationOptions.sizes?.[selectedSize]?.priceModifier || 0
      selectedAddons.forEach((addonIndex) => {
        price += product.customizationOptions.addons?.[addonIndex]?.price || 0
      })
    }
    return price
  }

  const totalPrice = calculatePrice()

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    setIsAddingToCart(true)
    try {
      const customizations = {
        material: product.customizationOptions?.materials?.[selectedMaterial]?.name,
        color: product.customizationOptions?.colors?.[selectedColor]?.name,
        size: product.customizationOptions?.sizes?.[selectedSize]?.name,
        addons: selectedAddons.map(
          (i) => product.customizationOptions?.addons?.[i]?.name
        ),
      }

      await addToCart(product._id, quantity, customizations, totalPrice)
      toast.success('Added to cart')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const toggleAddon = (index: number) => {
    setSelectedAddons((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  if (isLoading) {
    return (
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-10">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-[#2D2A26]/60">
          <Link href="/interior" className="hover:text-[#2D2A26]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/interior/products" className="hover:text-[#2D2A26]">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#2D2A26]">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F2EE]">
              <Image
                src={product.images?.[selectedImage]?.url || '/placeholder.jpg'}
                alt={product.images?.[selectedImage]?.alt || product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                    selectedImage === index
                      ? 'ring-2 ring-[#C9B99A]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#B8A076]">
                  {product.category}
                </p>
                <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26] lg:text-4xl">
                  {product.name}
                </h1>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold text-[#2D2A26]">
              ${totalPrice.toLocaleString()}
            </p>

            <p className="mt-4 text-[#2D2A26]/70">{product.shortDescription}</p>

            {/* Customization Options */}
            {product.customizable && product.customizationOptions && (
              <div className="mt-8 space-y-6">
                {/* Material */}
                {product.customizationOptions.materials?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-[#2D2A26]">
                      <Package className="h-4 w-4" />
                      Material
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.customizationOptions.materials.map(
                        (material: any, index: number) => (
                          <button
                            key={material.name}
                            onClick={() => setSelectedMaterial(index)}
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                              selectedMaterial === index
                                ? 'border-[#C9B99A] bg-[#C9B99A]/10 text-[#2D2A26]'
                                : 'border-[#E8E4DD] text-[#2D2A26]/70 hover:border-[#C9B99A]'
                            }`}
                          >
                            {material.name}
                            {material.priceModifier > 0 && (
                              <span className="ml-1 text-xs">
                                (+${material.priceModifier})
                              </span>
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Color */}
                {product.customizationOptions.colors?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-[#2D2A26]">
                      <Palette className="h-4 w-4" />
                      Color:{' '}
                      <span className="font-normal text-[#2D2A26]/70">
                        {product.customizationOptions.colors[selectedColor]?.name}
                      </span>
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {product.customizationOptions.colors.map(
                        (color: any, index: number) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(index)}
                            className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                              selectedColor === index
                                ? 'border-[#2D2A26] ring-2 ring-[#C9B99A] ring-offset-2'
                                : 'border-transparent hover:border-[#E8E4DD]'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Size */}
                {product.customizationOptions.sizes?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-[#2D2A26]">
                      <Maximize className="h-4 w-4" />
                      Size
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.customizationOptions.sizes.map(
                        (size: any, index: number) => (
                          <button
                            key={size.name}
                            onClick={() => setSelectedSize(index)}
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                              selectedSize === index
                                ? 'border-[#C9B99A] bg-[#C9B99A]/10 text-[#2D2A26]'
                                : 'border-[#E8E4DD] text-[#2D2A26]/70 hover:border-[#C9B99A]'
                            }`}
                          >
                            {size.name}
                            {size.priceModifier > 0 && (
                              <span className="ml-1 text-xs">
                                (+${size.priceModifier})
                              </span>
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Addons */}
                {product.customizationOptions.addons?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[#2D2A26]">
                      Add-ons
                    </h3>
                    <div className="mt-3 space-y-2">
                      {product.customizationOptions.addons.map(
                        (addon: any, index: number) => (
                          <button
                            key={addon.name}
                            onClick={() => toggleAddon(index)}
                            className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                              selectedAddons.includes(index)
                                ? 'border-[#C9B99A] bg-[#C9B99A]/10'
                                : 'border-[#E8E4DD] hover:border-[#C9B99A]'
                            }`}
                          >
                            <span className="text-sm text-[#2D2A26]">
                              {addon.name}
                            </span>
                            <span className="text-sm font-medium text-[#2D2A26]">
                              +${addon.price}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-[#E8E4DD]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-[#2D2A26]/70 hover:text-[#2D2A26]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium text-[#2D2A26]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-[#2D2A26]/70 hover:text-[#2D2A26]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 rounded-full bg-[#2D2A26] px-8 text-white hover:bg-[#2D2A26]/90"
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>

            {/* Request Custom */}
            {product.customizable && (
              <div className="mt-4">
                <Link href={`/interior/products/${slug}/customize`}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#C9B99A] text-[#2D2A26] hover:bg-[#C9B99A]/10"
                  >
                    Request Custom Configuration
                  </Button>
                </Link>
              </div>
            )}

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="mt-10">
              <TabsList className="w-full justify-start border-b border-[#E8E4DD] bg-transparent p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-[#C9B99A] data-[state=active]:bg-transparent"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="dimensions"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-[#C9B99A] data-[state=active]:bg-transparent"
                >
                  Dimensions
                </TabsTrigger>
                <TabsTrigger
                  value="materials"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-[#C9B99A] data-[state=active]:bg-transparent"
                >
                  Materials
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-sm max-w-none text-[#2D2A26]/80">
                  {product.description?.split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="dimensions" className="mt-6">
                <div className="space-y-2">
                  <p className="text-sm text-[#2D2A26]/70">
                    <span className="font-medium text-[#2D2A26]">Width:</span>{' '}
                    {product.dimensions?.width} {product.dimensions?.unit}
                  </p>
                  <p className="text-sm text-[#2D2A26]/70">
                    <span className="font-medium text-[#2D2A26]">Height:</span>{' '}
                    {product.dimensions?.height} {product.dimensions?.unit}
                  </p>
                  <p className="text-sm text-[#2D2A26]/70">
                    <span className="font-medium text-[#2D2A26]">Depth:</span>{' '}
                    {product.dimensions?.depth} {product.dimensions?.unit}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="materials" className="mt-6">
                <ul className="space-y-2">
                  {product.materials?.map((material: string) => (
                    <li
                      key={material}
                      className="text-sm text-[#2D2A26]/70"
                    >
                      {material}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20 border-t border-[#E8E4DD] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
            You May Also Like
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item: any) => (
              <Link
                key={item._id}
                href={`/interior/products/${item.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F2EE]">
                  <Image
                    src={item.images?.[0]?.url || '/placeholder.jpg'}
                    alt={item.images?.[0]?.alt || item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-[#2D2A26] transition-colors group-hover:text-[#B8A076]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#2D2A26]/60">
                    ${item.basePrice?.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
