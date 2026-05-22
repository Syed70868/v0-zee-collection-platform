import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILead extends Document {
  source: 'newsletter' | 'contact' | 'inquiry' | 'customization'
  email: string
  name?: string
  phone?: string
  message?: string
  store: 'interior' | 'exterior' | 'both'
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  tags: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    source: {
      type: String,
      enum: ['newsletter', 'contact', 'inquiry', 'customization'],
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    message: { type: String },
    store: {
      type: String,
      enum: ['interior', 'exterior', 'both'],
      default: 'both',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted'],
      default: 'new',
    },
    tags: [{ type: String }],
    notes: { type: String },
  },
  {
    timestamps: true,
  }
)

LeadSchema.index({ email: 1 })
LeadSchema.index({ status: 1 })
LeadSchema.index({ source: 1 })
LeadSchema.index({ createdAt: -1 })

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)

export default Lead
