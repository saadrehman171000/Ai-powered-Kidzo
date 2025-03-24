"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/types"
import { getAllProducts } from "@/lib/api"
import ProductCard from "@/components/products/product-card"
import styles from "./trending-products.module.css"

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts()
        // Sort by sales count to get trending products
        const trendingProducts = [...allProducts].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4) // Get top 4 products
        setProducts(trendingProducts)
      } catch (error) {
        console.error("Error fetching trending products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Loading trending products...</div>
  }

  return (
    <section className={styles.trendingSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Trending Products</h2>
        <p className={styles.sectionSubtitle}>Our most popular products based on sales</p>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

