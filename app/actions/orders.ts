'use server'

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { CreateOrderData } from "@/types"

interface ShippingAddress {
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export async function createOrder(data: CreateOrderData) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    if (!user?.emailAddresses?.[0]?.emailAddress) {
      throw new Error("User email not found")
    }

    const userEmail = user.emailAddresses[0].emailAddress

    // First, ensure the customer exists
    const customer = await prisma.customer.upsert({
      where: { id: userId },
      update: {
        email: userEmail,
        name: data.shippingAddress.name,
      },
      create: {
        id: userId,
        name: data.shippingAddress.name,
        email: userEmail,
      },
    })

    // Get all products to get their current prices
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: data.items.map(item => item.id)
        }
      }
    })

    // Create the order with items
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: data.total,
        shippingAddress: data.shippingAddress,
        items: {
          create: data.items.map(item => {
            const product = products.find(p => p.id === item.id)
            if (!product) {
              throw new Error(`Product ${item.id} not found`)
            }
            return {
              quantity: item.quantity,
              productId: item.id,
              price: product.price
            }
          }),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Update customer's total spent
    await prisma.customer.update({
      where: { id: userId },
      data: {
        totalSpent: {
          increment: data.total,
        },
      },
    })

    return order
  } catch (error) {
    throw new Error("Failed to create order")
  }
}

export async function getOrders(status?: string) {
  try {
    const orders = await prisma.order.findMany({
      where: status ? {
        status: status as any
      } : undefined,
      include: {
        customer: true,  // Include all customer fields
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}

export async function getUserOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  } catch (error) {
    throw new Error('Failed to fetch user orders')
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: status as any
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return order
  } catch (error) {
    throw new Error('Failed to update order status')
  }
}

export async function updateTrackingNumber(orderId: string, trackingNumber: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { trackingNumber }
    })

    return order
  } catch (error) {
    throw new Error('Failed to update tracking number')
  }
}

export async function addOrderNote(orderId: string, note: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { notes: note }
    })

    return order
  } catch (error) {
    throw new Error('Failed to add order note')
  }
} 