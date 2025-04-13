import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Add admin role check
    
    const data = await request.json()
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        inStock: data.inStock,
        imageUrl: data.imageUrl,
      },
    })
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
} 