import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Cart, Product } from '@/lib/models'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Please login to add items to cart' }, { status: 401 })
    }

    await dbConnect()

    const { productId, quantity = 1, customizations = {}, unitPrice } = await request.json()

    // Get product to calculate price
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Calculate price (use provided unitPrice or base price)
    const price = unitPrice || product.basePrice
    const totalPrice = price * quantity

    // Find or create cart
    let cart = await Cart.findOne({ user: session.userId })
    if (!cart) {
      cart = new Cart({ user: session.userId, items: [] })
    }

    // Check if item with same customizations exists
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
    )

    if (existingItemIndex > -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity
      cart.items[existingItemIndex].totalPrice =
        cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].unitPrice
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        customizations,
        unitPrice: price,
        totalPrice,
      })
    }

    await cart.save()

    // Populate and return
    await cart.populate({
      path: 'items.product',
      select: 'name slug images basePrice store',
    })

    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
}
