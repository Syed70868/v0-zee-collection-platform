import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Cart } from '@/lib/models'
import { getSession } from '@/lib/auth'

export async function PUT(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const { itemId, quantity } = await request.json()

    if (quantity < 1) {
      return NextResponse.json({ error: 'Quantity must be at least 1' }, { status: 400 })
    }

    const cart = await Cart.findOne({ user: session.userId })
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id?.toString() === itemId
    )

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 })
    }

    cart.items[itemIndex].quantity = quantity
    cart.items[itemIndex].totalPrice = cart.items[itemIndex].unitPrice * quantity

    await cart.save()

    await cart.populate({
      path: 'items.product',
      select: 'name slug images basePrice store',
    })

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Update cart error:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}
