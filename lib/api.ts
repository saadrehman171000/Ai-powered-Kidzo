import type { Product, Review, Order } from "@/types"

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Baby Shampoo",
    description: "Gentle, tear-free formula made with organic ingredients for your baby's delicate skin and hair.",
    price: 12.99,
    category: "toiletries",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    salesCount: 1500,
    createdAt: "2023-01-15T00:00:00.000Z",
    reviews: [
      {
        id: "101",
        userId: "user1",
        userName: "Sarah J.",
        rating: 5,
        comment: "Amazing product! My baby's hair is so soft now.",
        date: "2023-05-20T00:00:00.000Z",
      },
      {
        id: "102",
        userId: "user2",
        userName: "Michael T.",
        rating: 4,
        comment: "Good product, but a bit pricey.",
        date: "2023-06-15T00:00:00.000Z",
      },
    ],
  },
  {
    id: "2",
    name: "Baby Bottle Set",
    description: "Set of 3 BPA-free baby bottles with anti-colic system and natural-feel nipples.",
    price: 24.99,
    category: "feeding",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.8,
    reviewCount: 256,
    salesCount: 2200,
    createdAt: "2023-02-10T00:00:00.000Z",
    reviews: [
      {
        id: "103",
        userId: "user3",
        userName: "Jessica L.",
        rating: 5,
        comment: "These bottles are amazing! No more colic issues.",
        date: "2023-04-12T00:00:00.000Z",
      },
    ],
  },
  {
    id: "3",
    name: "Soft Baby Carrier",
    description: "Ergonomic baby carrier with adjustable straps and breathable fabric for comfort.",
    price: 49.99,
    category: "wearing",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.7,
    reviewCount: 189,
    salesCount: 1200,
    createdAt: "2023-03-05T00:00:00.000Z",
    reviews: [],
  },
  {
    id: "4",
    name: "Baby Nest Lounger",
    description: "Portable and lightweight baby nest for lounging, tummy time, and supervised napping.",
    price: 39.99,
    category: "nests",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: false,
    rating: 4.6,
    reviewCount: 142,
    salesCount: 950,
    createdAt: "2023-04-20T00:00:00.000Z",
    reviews: [],
  },
  {
    id: "5",
    name: "Wooden Activity Gym",
    description: "Sustainable wooden baby gym with detachable toys for sensory development.",
    price: 59.99,
    category: "toys",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    salesCount: 600,
    createdAt: "2023-05-15T00:00:00.000Z",
    reviews: [],
  },
  {
    id: "6",
    name: "Baby Diaper Cream",
    description: "Soothing diaper rash cream with zinc oxide and natural oils.",
    price: 8.99,
    category: "toiletries",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.4,
    reviewCount: 210,
    salesCount: 1800,
    createdAt: "2023-01-25T00:00:00.000Z",
    reviews: [],
  },
  {
    id: "7",
    name: "Silicone Baby Spoons",
    description: "Set of 4 soft silicone spoons perfect for baby's first foods.",
    price: 9.99,
    category: "feeding",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.3,
    reviewCount: 156,
    salesCount: 1100,
    createdAt: "2023-02-28T00:00:00.000Z",
    reviews: [],
  },
  {
    id: "8",
    name: "Baby Wrap Carrier",
    description: "Soft fabric wrap carrier for newborns and infants up to 35 lbs.",
    price: 34.99,
    category: "wearing",
    imageUrl: "/placeholder.svg?height=300&width=300",
    inStock: true,
    rating: 4.5,
    reviewCount: 167,
    salesCount: 890,
    createdAt: "2023-03-18T00:00:00.000Z",
    reviews: [],
  },
]

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      {
        productId: "1",
        name: "Organic Baby Shampoo",
        price: 12.99,
        quantity: 2,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        productId: "2",
        name: "Baby Bottle Set",
        price: 24.99,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
    ],
    total: 50.97,
    status: "delivered",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    paymentMethod: "credit_card",
    createdAt: "2023-06-10T00:00:00.000Z",
    updatedAt: "2023-06-15T00:00:00.000Z",
  },
  {
    id: "order2",
    userId: "user1",
    items: [
      {
        productId: "3",
        name: "Soft Baby Carrier",
        price: 49.99,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
    ],
    total: 49.99,
    status: "shipped",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    paymentMethod: "paypal",
    createdAt: "2023-07-05T00:00:00.000Z",
    updatedAt: "2023-07-07T00:00:00.000Z",
  },
  {
    id: "order3",
    userId: "user1",
    items: [
      {
        productId: "5",
        name: "Wooden Activity Gym",
        price: 59.99,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        productId: "7",
        name: "Silicone Baby Spoons",
        price: 9.99,
        quantity: 2,
        imageUrl: "/placeholder.svg?height=100&width=100",
      },
    ],
    total: 79.97,
    status: "processing",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    paymentMethod: "credit_card",
    createdAt: "2023-07-20T00:00:00.000Z",
    updatedAt: "2023-07-20T00:00:00.000Z",
  },
]

// Add quality and fit parameters to Unsplash URLs
const formatImageUrl = (url: string) => `${url}?q=80&w=1080&fit=crop`

// API functions
export const getAllProducts = async (): Promise<Product[]> => {
  // This is mock data - replace with actual API call
  return [
    {
      id: "1",
      name: "Organic Cotton Onesie",
      price: 24.99,
      imageUrl: formatImageUrl("https://images.unsplash.com/photo-1555252333-9f8e92e65df9"),
      category: "clothing",
      salesCount: 1250,
      description: "Soft and comfortable organic cotton onesie for babies",
      inStock: true,
      rating: 4.5,
      reviewCount: 150,
      createdAt: "2024-01-01T00:00:00.000Z",
      reviews: [],
    },
    {
      id: "2",
      name: "Natural Baby Lotion",
      price: 19.99,
      imageUrl: formatImageUrl("https://images.unsplash.com/photo-1523482580672-f109ba8cb9be"),
      category: "toiletries",
      salesCount: 980,
      description: "Natural and gentle baby lotion",
      inStock: true,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      reviews: [],
    },
    {
      id: "3",
      name: "Silicone Feeding Set",
      price: 34.99,
      imageUrl: formatImageUrl("https://images.unsplash.com/photo-1611175694989-4870fafa4494"),
      category: "feeding",
      salesCount: 856,
    },
    {
      id: "4",
      name: "Wooden Activity Gym",
      price: 89.99,
      imageUrl: formatImageUrl("https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"),
      category: "toys",
      salesCount: 742,
    },
  ].map(product => ({
    ...product,
    description: product.description || "Product description not available",
    inStock: product.inStock ?? true,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    createdAt: product.createdAt || new Date().toISOString(),
    reviews: product.reviews || [],
  }))
}

export const getProductById = async (id: string): Promise<Product> => {
  // This is mock data - replace with actual API call
  return {
    id,
    name: "Organic Cotton Baby Onesie",
    price: 24.99,
    description: "Super soft, 100% organic cotton onesie perfect for your baby's sensitive skin.",
    imageUrl: formatImageUrl("https://images.unsplash.com/photo-1555252333-9f8e92e65df9"),
    category: "clothing",
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    salesCount: 1250,
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Amazing quality, my baby loves it!",
        date: "2024-03-20",
      },
    ],
    createdAt: new Date().toISOString(),
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts.filter((p) => p.category === category)
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const product = mockProducts.find((p) => p.id === productId)
  return product?.reviews || []
}

export async function addProductReview(productId: string, review: Omit<Review, "id" | "date">): Promise<Review> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newReview: Review = {
    id: `review-${Date.now()}`,
    ...review,
    date: new Date().toISOString(),
  }

  return newReview
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockOrders.filter((order) => order.userId === userId)
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const order = mockOrders.find((o) => o.id === orderId)
  return order || null
}

