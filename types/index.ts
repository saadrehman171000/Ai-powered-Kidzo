export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    imageUrl: string
    inStock: boolean
    rating: number
    reviewCount: number
    salesCount: number
    createdAt: string
    reviews?: Review[]
  }
  
  export interface Review {
    id: string
    userId: string
    userName: string
    rating: number
    comment: string
    date: string
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
    items: OrderItem[]
    total: number
    status: "processing" | "shipped" | "delivered" | "cancelled"
    shippingAddress: ShippingAddress
    paymentMethod: "credit_card" | "paypal" | "cod"
    createdAt: string
    updatedAt: string
  }
  
  export interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
  }
  
  