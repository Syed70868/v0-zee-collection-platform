"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/contexts/StoreContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useCart } from "@/lib/contexts/CartContext";
import { StoreHeader, StoreFooter } from "@/components/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingBag,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Ruler,
  Palette,
  Layers,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  images: string[];
  category: string;
  store: "interior" | "exterior";
  customization: {
    isCustomizable: boolean;
    options: {
      name: string;
      type: string;
      values: { label: string; value: string; priceModifier: number }[];
    }[];
  };
  specifications: { label: string; value: string }[];
  inventory: { sku: string; quantity: number; lowStockThreshold: number };
  status: string;
}

// Demo product for exterior
const demoProduct: Product = {
  _id: "ext-1",
  name: "Monolith Garden Fountain",
  slug: "monolith-garden-fountain",
  description:
    "A striking vertical water feature carved from natural basalt stone. The Monolith Fountain brings the calming sound of cascading water to your outdoor sanctuary. Each piece is hand-selected for its unique grain pattern and weathering characteristics. Designed to develop a beautiful patina over time, this fountain becomes more characterful with age. The integrated pump system is whisper-quiet and energy-efficient.",
  shortDescription: "Hand-carved basalt stone fountain with integrated pump system",
  basePrice: 4850,
  images: [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80",
  ],
  category: "Water Features",
  store: "exterior",
  customization: {
    isCustomizable: true,
    options: [
      {
        name: "Stone Type",
        type: "select",
        values: [
          { label: "Natural Basalt", value: "basalt", priceModifier: 0 },
          { label: "Black Granite", value: "granite", priceModifier: 800 },
          { label: "Grey Limestone", value: "limestone", priceModifier: 400 },
          { label: "Corten Steel", value: "corten", priceModifier: 1200 },
        ],
      },
      {
        name: "Height",
        type: "select",
        values: [
          { label: '48" (Standard)', value: "48", priceModifier: 0 },
          { label: '60" (Tall)', value: "60", priceModifier: 650 },
          { label: '72" (Grand)', value: "72", priceModifier: 1400 },
          { label: '36" (Compact)', value: "36", priceModifier: -600 },
        ],
      },
      {
        name: "Basin Style",
        type: "select",
        values: [
          { label: "Round Pebble", value: "round-pebble", priceModifier: 0 },
          { label: "Square Minimalist", value: "square-min", priceModifier: 200 },
          { label: "Natural Boulder", value: "boulder", priceModifier: 450 },
          { label: "Infinity Edge", value: "infinity", priceModifier: 800 },
        ],
      },
      {
        name: "LED Lighting",
        type: "select",
        values: [
          { label: "None", value: "none", priceModifier: 0 },
          { label: "Warm White", value: "warm", priceModifier: 350 },
          { label: "Cool White", value: "cool", priceModifier: 350 },
          { label: "RGB Color-changing", value: "rgb", priceModifier: 550 },
        ],
      },
    ],
  },
  specifications: [
    { label: "Material", value: "Natural Basalt Stone" },
    { label: "Weight", value: "180 kg (48\" version)" },
    { label: "Pump", value: "12V DC, 800 L/hr" },
    { label: "Power", value: "15W Energy Efficient" },
    { label: "Warranty", value: "5 Years" },
    { label: "Installation", value: "Professional recommended" },
  ],
  inventory: { sku: "EXT-FNT-001", quantity: 8, lowStockThreshold: 3 },
  status: "active",
};

export default function ExteriorProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { setCurrentStore } = useStore();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Customization state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentStore("exterior");
  }, [setCurrentStore]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          // Initialize default selections
          const defaults: Record<string, string> = {};
          data.customization?.options?.forEach((opt: Product["customization"]["options"][0]) => {
            if (opt.values.length > 0) {
              defaults[opt.name] = opt.values[0].value;
            }
          });
          setSelectedOptions(defaults);
        } else {
          // Use demo product
          setProduct(demoProduct);
          const defaults: Record<string, string> = {};
          demoProduct.customization.options.forEach((opt) => {
            if (opt.values.length > 0) {
              defaults[opt.name] = opt.values[0].value;
            }
          });
          setSelectedOptions(defaults);
        }
      } catch {
        setProduct(demoProduct);
        const defaults: Record<string, string> = {};
        demoProduct.customization.options.forEach((opt) => {
          if (opt.values.length > 0) {
            defaults[opt.name] = opt.values[0].value;
          }
        });
        setSelectedOptions(defaults);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.slug]);

  // Calculate total price based on customization
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    let price = product.basePrice;
    product.customization?.options?.forEach((opt) => {
      const selected = selectedOptions[opt.name];
      const selectedValue = opt.values.find((v) => v.value === selected);
      if (selectedValue) {
        price += selectedValue.priceModifier;
      }
    });
    return price * quantity;
  }, [product, selectedOptions, quantity]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login?redirect=/exterior/products/" + params.slug);
      return;
    }
    if (!product) return;

    setAddingToCart(true);
    try {
      await addItem({
        productId: product._id,
        quantity,
        customizations: selectedOptions,
        price: totalPrice / quantity,
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <StoreFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground">Product not found</p>
          <Button asChild>
            <Link href="/exterior/products">Back to Products</Link>
          </Button>
        </div>
        <StoreFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container px-4 mx-auto mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/exterior" className="hover:text-foreground transition-colors">
              Exterior
            </Link>
            <span>/</span>
            <Link href="/exterior/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.customization?.isCustomizable && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Customizable
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        currentImageIndex === index
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl lg:text-4xl font-serif mb-4">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light">${totalPrice.toLocaleString()}</span>
                {totalPrice !== product.basePrice * quantity && (
                  <span className="text-muted-foreground line-through">
                    ${(product.basePrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Customization Options */}
              {product.customization?.isCustomizable && product.customization.options.length > 0 && (
                <div className="space-y-6 border-t border-b border-border py-8">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Palette className="w-4 h-4" />
                    <span>Customize Your Piece</span>
                  </div>

                  {product.customization.options.map((option) => (
                    <div key={option.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{option.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {option.values.find((v) => v.value === selectedOptions[option.name])?.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {option.values.map((value) => {
                          const isSelected = selectedOptions[option.name] === value.value;
                          return (
                            <button
                              key={value.value}
                              onClick={() => handleOptionChange(option.name, value.value)}
                              className={`relative px-4 py-3 rounded-md border text-sm text-left transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-muted-foreground/50"
                              }`}
                            >
                              <span className="block font-medium">{value.label}</span>
                              {value.priceModifier !== 0 && (
                                <span className="block text-xs text-muted-foreground mt-0.5">
                                  {value.priceModifier > 0 ? "+" : ""}$
                                  {value.priceModifier.toLocaleString()}
                                </span>
                              )}
                              {isSelected && (
                                <Check className="absolute top-3 right-3 w-4 h-4 text-primary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 h-14 text-base"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {addingToCart ? "Adding..." : "Add to Cart"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 w-14"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 w-14">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Request Custom Quote */}
                <Button variant="secondary" size="lg" className="w-full h-12" asChild>
                  <Link href={`/exterior/customize?product=${product.slug}`}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Request Custom Design
                  </Link>
                </Button>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Layers className="w-4 h-4" />
                  <span>Specifications</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="bg-muted/50 rounded-md p-3">
                      <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                      <p className="text-sm font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">About This Piece</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Back Link */}
              <Link
                href="/exterior/products"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Products
              </Link>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
