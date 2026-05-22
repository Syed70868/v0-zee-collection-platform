import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Collection } from '@/lib/models'

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const store = searchParams.get('store')
    const featured = searchParams.get('featured')

    const query: Record<string, unknown> = { status: 'active' }

    if (store) query.store = store
    if (featured === 'true') query.featured = true

    const collections = await Collection.find(query)
      .sort('order')
      .lean()

    return NextResponse.json({ collections })
  } catch (error) {
    console.error('Get collections error:', error)
    return NextResponse.json(
      { error: 'Failed to get collections' },
      { status: 500 }
    )
  }
}
