import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Product } from '@/lib/models'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    const { id } = await params

    // Try to find by ID first, then by slug
    let product = await Product.findById(id)
      .populate('collection', 'name slug')
      .lean()

    if (!product) {
      product = await Product.findOne({ slug: id, status: 'active' })
        .populate('collection', 'name slug')
        .lean()
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get related products
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      store: product.store,
      status: 'active',
      $or: [
        { category: product.category },
        { collection: product.collection },
      ],
    })
      .limit(4)
      .select('name slug shortDescription basePrice images store')
      .lean()

    return NextResponse.json({ product, relatedProducts })
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Failed to get product' },
      { status: 500 }
    )
  }
}
