import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICartItem {
  product: mongoose.Types.ObjectId
  quantity: number
  customizations: {
    material?: string
    color?: string
    size?: string
    addons?: string[]
  }
  unitPrice: number
  totalPrice: number
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId
  sessionId?: string
  items: ICartItem[]
  subtotal: number
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
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
  totalPrice: {
    type: Number,
    required: true,
  },
})

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: {
      type: String,
    },
    items: [CartItemSchema],
    subtotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Calculate subtotal before saving
CartSchema.pre('save', function (next) {
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0)
  next()
})

CartSchema.index({ user: 1 })
CartSchema.index({ sessionId: 1 })

const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)

export default Cart
