import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Cart } from '@/lib/models'
import { getSession } from '@/lib/auth'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const { itemId } = await params

    const cart = await Cart.findOne({ user: session.userId })
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    cart.items = cart.items.filter((item) => item._id?.toString() !== itemId)
    await cart.save()

    await cart.populate({
      path: 'items.product',
      select: 'name slug images basePrice store',
    })

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Remove from cart error:', error)
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 })
  }
}
