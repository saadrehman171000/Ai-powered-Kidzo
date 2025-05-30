"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { getProduct } from "@/app/actions/products"
import type { Product } from "@/types"
import { useCart } from "@/context/cart-context"
import ReviewSection from "@/components/products/review-section"
import styles from "./product-details.module.css"

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id !== 'string') {
          throw new Error('Invalid product ID')
        }
        const data = await getProduct(id)
        if (!data) {
          throw new Error('Product not found')
        }
        setProduct(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError(error instanceof Error ? error.message : 'Failed to load product')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity })
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity })
      // Navigate to checkout
      window.location.href = "/checkout"
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading product details...</div>
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <h2>Error</h2>
        <p>{error || 'Product not found'}</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.productDetails}>
        <div className={styles.imageContainer}>
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            width={500}
            height={500}
            className={styles.productImage}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.productName}>{product.name}</h1>

          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < (product.rating || 0) ? styles.starFilled : styles.star}>
                ★
              </span>
            ))}
            <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
          </div>

          <div className={styles.price}>PKR {product.price.toFixed(2)}</div>

          <div className={styles.availability}>
            {product.inStock ? (
              <span className={styles.inStock}>In Stock</span>
            ) : (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
          </div>

          <div className={styles.description}>{product.description}</div>

          <div className={styles.actions}>
            <div className={styles.quantityContainer}>
              <button 
                className={styles.quantityBtn} 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={!product.inStock}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className={styles.quantityInput}
                disabled={!product.inStock}
              />
              <button 
                className={styles.quantityBtn} 
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
              >
                +
              </button>
            </div>

            <button className={styles.addToCartBtn} onClick={handleAddToCart} disabled={!product.inStock}>
              Add to Cart
            </button>

            <button className={styles.buyNowBtn} onClick={handleBuyNow} disabled={!product.inStock}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <ReviewSection 
        productId={product.id} 
        reviews={(product as any).reviews ?? []} 
      />
    </div>
  )
}

