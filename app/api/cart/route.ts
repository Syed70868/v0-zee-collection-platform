import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Cart } from '@/lib/models'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    let cart = await Cart.findOne({ user: session.userId }).populate({
      path: 'items.product',
      select: 'name slug images basePrice store',
    })

    if (!cart) {
      cart = await Cart.create({ user: session.userId, items: [] })
    }

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Get cart error:', error)
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    await Cart.findOneAndUpdate(
      { user: session.userId },
      { items: [], subtotal: 0 }
    )

    return NextResponse.json({ message: 'Cart cleared' })
  } catch (error) {
    console.error('Clear cart error:', error)
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
}
