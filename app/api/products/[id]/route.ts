import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Add admin role check

    const data = await request.json()
    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data,
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Add admin role check

    await prisma.product.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
} 