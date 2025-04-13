'use server'

import { prisma } from "@/lib/prisma"
import type { ProductFormData } from "@/types"

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return products.map((product: { createdAt: Date }) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      reviews: [],
      salesCount: 0
    }))
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) return null

    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      reviews: [],
      salesCount: 0
    }
  } catch (error) {
    throw new Error('Failed to fetch product')
  }
}

export async function createProduct(data: ProductFormData) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        inStock: data.inStock,
        imageUrl: data.imageUrl || "/placeholder.png",
      }
    })

    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      reviews: [],
      salesCount: 0,
      rating: 0,
      reviewCount: 0
    }
  } catch (error) {
    throw new Error('Failed to create product')
  }
}

export async function updateProduct(id: string, data: Partial<ProductFormData>) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data
    })

    return {
      ...product,
      createdAt: product.createdAt.toISOString(),
      reviews: [],
      salesCount: 0
    }
  } catch (error) {
    throw new Error('Failed to update product')
  }
}

export async function deleteProduct(id: string) {
  try {
    // First delete all related order items
    await prisma.orderItem.deleteMany({
      where: { productId: id }
    })
    
    // Then delete the product
    await prisma.product.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Delete product error:', error)
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 