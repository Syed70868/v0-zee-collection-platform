import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICustomizationRequest extends Document {
  requestNumber: string
  user: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  customizations: {
    material?: string
    color?: string
    size?: {
      name: string
      width: number
      height: number
      depth: number
    }
    addons?: string[]
    specialRequests?: string
  }
  referenceImages: string[]
  configuratorSnapshot: string
  previewImage?: string
  estimatedPrice: number
  status: 'pending' | 'reviewing' | 'quoted' | 'approved' | 'in_production' | 'completed'
  adminResponse?: {
    message: string
    finalPrice: number
    estimatedDelivery: string
    respondedAt: Date
  }
  createdAt: Date
  updatedAt: Date
}

const CustomizationRequestSchema = new Schema<ICustomizationRequest>(
  {
    requestNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    customizations: {
      material: { type: String },
      color: { type: String },
      size: {
        name: { type: String },
        width: { type: Number },
        height: { type: Number },
        depth: { type: Number },
      },
      addons: [{ type: String }],
      specialRequests: { type: String },
    },
    referenceImages: [{ type: String }],
    configuratorSnapshot: { type: String },
    previewImage: { type: String },
    estimatedPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'quoted', 'approved', 'in_production', 'completed'],
      default: 'pending',
    },
    adminResponse: {
      message: { type: String },
      finalPrice: { type: Number },
      estimatedDelivery: { type: String },
      respondedAt: { type: Date },
    },
  },
  {
    timestamps: true,
  }
)

// Generate request number before saving
CustomizationRequestSchema.pre('save', async function (next) {
  if (!this.requestNumber) {
    const count = await mongoose.models.CustomizationRequest.countDocuments()
    this.requestNumber = `CUS-${String(count + 1).padStart(6, '0')}`
  }
  next()
})

CustomizationRequestSchema.index({ user: 1 })
CustomizationRequestSchema.index({ status: 1 })
CustomizationRequestSchema.index({ createdAt: -1 })

const CustomizationRequest: Model<ICustomizationRequest> =
  mongoose.models.CustomizationRequest ||
  mongoose.model<ICustomizationRequest>('CustomizationRequest', CustomizationRequestSchema)

export default CustomizationRequest
