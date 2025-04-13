import { ProductCategory } from "@/lib/constants"

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  description: string
  inStock: boolean
  imageUrl: string | null
  rating: number
  reviewCount: number
  salesCount: number
  createdAt: string
  reviews?: Review[]
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface ShippingAddress {
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  userId: string
  totalAmount: number
  status: string
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  items: {
    id: string
    quantity: number
    price: number
    productId: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface Customer {
  id: string
  name: string
  email: string
  orders: string[] // Order IDs
  createdAt: string
  totalSpent: number
}

export type ProductFormData = Omit<Product, "id" | "rating" | "reviewCount" | "salesCount" | "createdAt" | "reviews">

export interface CreateOrderData {
  items: {
    id: string
    quantity: number
  }[]
  shippingAddress: ShippingAddress
  total: number
}
  
  