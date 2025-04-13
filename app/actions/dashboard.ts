'use server'

import { prisma } from "@/lib/prisma"

export async function getDashboardStats() {
  try {
    const [totalProducts, totalOrders, recentOrders] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: true,
          items: {
            include: {
              product: true
            }
          }
        }
      })
    ])

    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      }
    })

    return {
      totalProducts,
      totalOrders,
      recentOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('Failed to fetch dashboard stats')
  }
} 