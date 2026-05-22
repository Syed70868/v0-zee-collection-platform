import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInquiryItem {
  product: mongoose.Types.ObjectId
  quantity: number
  customizations: {
    material?: string
    color?: string
    size?: string
    addons?: string[]
  }
  unitPrice: number
  notes?: string
}

export interface IInquiry extends Document {
  inquiryNumber: string
  user: mongoose.Types.ObjectId
  items: IInquiryItem[]
  shippingAddress: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  contactInfo: {
    name: string
    email: string
    phone: string
  }
  message?: string
  subtotal: number
  status: 'pending' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled'
  adminNotes?: string
  quotedPrice?: number
  createdAt: Date
  updatedAt: Date
}

const InquiryItemSchema = new Schema<IInquiryItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  customizations: {
    material: { type: String },
    color: { type: String },
    size: { type: String },
    addons: [{ type: String }],
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  notes: { type: String },
})

const InquirySchema = new Schema<IInquiry>(
  {
    inquiryNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [InquiryItemSchema],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    message: { type: String },
    subtotal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    adminNotes: { type: String },
    quotedPrice: { type: Number },
  },
  {
    timestamps: true,
  }
)

// Generate inquiry number before saving
InquirySchema.pre('save', async function (next) {
  if (!this.inquiryNumber) {
    const count = await mongoose.models.Inquiry.countDocuments()
    this.inquiryNumber = `INQ-${String(count + 1).padStart(6, '0')}`
  }
  next()
})

InquirySchema.index({ user: 1 })
InquirySchema.index({ status: 1 })
InquirySchema.index({ createdAt: -1 })

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)

export default Inquiry
