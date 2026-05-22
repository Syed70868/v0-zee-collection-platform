import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Product } from '@/lib/models'

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const store = searchParams.get('store')
    const category = searchParams.get('category')
    const collection = searchParams.get('collection')
    const featured = searchParams.get('featured')
    const bestseller = searchParams.get('bestseller')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const sort = searchParams.get('sort') || '-createdAt'

    // Build query
    const query: Record<string, unknown> = { status: 'active' }

    if (store) query.store = store
    if (category) query.category = category
    if (collection) query.collection = collection
    if (featured === 'true') query.featured = true
    if (bestseller === 'true') query.bestseller = true
    if (search) {
      query.$text = { $search: search }
    }

    // Execute query
    const skip = (page - 1) * limit
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('collection', 'name slug')
      .lean()

    const total = await Product.countDocuments(query)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to get products' },
      { status: 500 }
    )
  }
}
