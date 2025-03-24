"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/products/product-card"
import ProductFilter from "@/components/products/product-filter"
import SearchBar from "@/components/products/search-bar"
import SortOptions from "@/components/products/sort-options"
import { getAllProducts } from "@/lib/api"
import type { Product } from "@/types"
import styles from "./products.module.css"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
        setFilteredProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    if (sortOption === "best-selling") {
      result.sort((a, b) => b.salesCount - a.salesCount)
    } else if (sortOption === "price-low-high") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "new-arrivals") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, searchQuery, sortOption])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (option: string) => {
    setSortOption(option)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading products...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Products</h1>

      <div className={styles.filterContainer}>
        <SearchBar onSearch={handleSearch} />
        <SortOptions onSort={handleSort} selectedOption={sortOption} />
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <ProductFilter onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
        </aside>

        <div className={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className={styles.noProducts}>No products found. Try adjusting your filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}

