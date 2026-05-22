import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProductImage {
  url: string
  alt: string
  isPrimary: boolean
}

export interface IDimensions {
  width: number
  height: number
  depth: number
  unit: string
}

export interface IMaterialOption {
  name: string
  priceModifier: number
  preview: string
}

export interface IColorOption {
  name: string
  hex: string
  priceModifier: number
}

export interface ISizeOption {
  name: string
  dimensions: IDimensions
  priceModifier: number
}

export interface IAddonOption {
  name: string
  price: number
  image: string
}

export interface ICustomizationOptions {
  materials: IMaterialOption[]
  colors: IColorOption[]
  sizes: ISizeOption[]
  addons: IAddonOption[]
}

export interface IProduct extends Document {
  name: string
  slug: string
  description: string
  shortDescription: string
  store: 'interior' | 'exterior'
  category: string
  collection?: mongoose.Types.ObjectId
  basePrice: number
  images: IProductImage[]
  dimensions: IDimensions
  materials: string[]
  colors: string[]
  customizable: boolean
  customizationOptions: ICustomizationOptions
  stock: number
  featured: boolean
  bestseller: boolean
  tags: string[]
  seo: {
    title: string
    description: string
  }
  status: 'active' | 'draft' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const ProductImageSchema = new Schema<IProductImage>({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
})

const DimensionsSchema = new Schema<IDimensions>({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  unit: { type: String, default: 'cm' },
})

const MaterialOptionSchema = new Schema<IMaterialOption>({
  name: { type: String, required: true },
  priceModifier: { type: Number, default: 0 },
  preview: { type: String },
})

const ColorOptionSchema = new Schema<IColorOption>({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  priceModifier: { type: Number, default: 0 },
})

const SizeOptionSchema = new Schema<ISizeOption>({
  name: { type: String, required: true },
  dimensions: DimensionsSchema,
  priceModifier: { type: Number, default: 0 },
})

const AddonOptionSchema = new Schema<IAddonOption>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
})

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 200,
    },
    store: {
      type: String,
      enum: ['interior', 'exterior'],
      required: [true, 'Store type is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: 0,
    },
    images: [ProductImageSchema],
    dimensions: DimensionsSchema,
    materials: [{ type: String }],
    colors: [{ type: String }],
    customizable: {
      type: Boolean,
      default: false,
    },
    customizationOptions: {
      materials: [MaterialOptionSchema],
      colors: [ColorOptionSchema],
      sizes: [SizeOptionSchema],
      addons: [AddonOptionSchema],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String }],
    seo: {
      title: { type: String },
      description: { type: String },
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
)

// Create slug from name before saving
ProductSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

// Index for search
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' })
ProductSchema.index({ store: 1, status: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ collection: 1 })

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
