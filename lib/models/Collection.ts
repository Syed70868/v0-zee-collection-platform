import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICollection extends Document {
  name: string
  slug: string
  description: string
  store: 'interior' | 'exterior'
  image: string
  featured: boolean
  order: number
  status: 'active' | 'draft'
  createdAt: Date
  updatedAt: Date
}

const CollectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: [true, 'Collection name is required'],
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
    store: {
      type: String,
      enum: ['interior', 'exterior'],
      required: [true, 'Store type is required'],
    },
    image: {
      type: String,
      required: [true, 'Collection image is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'draft'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
)

// Create slug from name before saving
CollectionSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

CollectionSchema.index({ store: 1, status: 1 })

const Collection: Model<ICollection> =
  mongoose.models.Collection ||
  mongoose.model<ICollection>('Collection', CollectionSchema)

export default Collection
