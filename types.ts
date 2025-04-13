export interface Product {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
  imageUrl: string
  description: string
  rating?: number
  reviewCount?: number
}

export interface ProductFormData {
  name: string
  price: number
  category: string
  inStock: boolean
  imageUrl: string
  description: string
} 