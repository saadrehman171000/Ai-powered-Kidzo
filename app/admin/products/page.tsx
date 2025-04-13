"use client"

import { useState, useEffect } from "react"
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/app/actions/products"
import ProductTable from "@/components/admin/product-table"
import AddProductForm from "@/components/admin/add-product-form"
import styles from "./page.module.css"
import type { Product, ProductFormData } from "@/types"

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const newProduct = await createProduct(data)
      setProducts((prev) => [...prev, newProduct])
      setIsAddModalOpen(false)
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleUpdate = async (id: string, updatedProduct: Partial<Product>) => {
    try {
      const updated = await updateProduct(id, updatedProduct)
      setProducts(products.map((p) => (p.id === id ? updated : p)))
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading products...</div>
  }

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        <button className={styles.addButton} onClick={() => setIsAddModalOpen(true)}>
          <span className={styles.addIcon}>+</span>
          Add Product
        </button>
      </div>

      <div className={styles.content}>
        <ProductTable products={products} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>

      {isAddModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsAddModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add New Product</h2>
              <button className={styles.closeButton} onClick={() => setIsAddModalOpen(false)}>
                ×
              </button>
            </div>
            <AddProductForm onSubmit={handleSubmit} onCancel={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
