import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Collection, Product } from '@/lib/models'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect()

    const { slug } = await params

    const collection = await Collection.findOne({
      slug,
      status: 'active',
    }).lean()

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    // Get products in this collection
    const products = await Product.find({
      collection: collection._id,
      status: 'active',
    })
      .sort('-createdAt')
      .select('name slug shortDescription basePrice images store featured')
      .lean()

    return NextResponse.json({ collection, products })
  } catch (error) {
    console.error('Get collection error:', error)
    return NextResponse.json(
      { error: 'Failed to get collection' },
      { status: 500 }
    )
  }
}
