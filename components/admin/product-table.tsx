"use client"

import { useState } from "react"
import Image from "next/image"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import type { Product } from "@/types"
import AddProductForm from "./add-product-form"
import styles from "./product-table.module.css"

// const dummyProducts: Product[] = [
//   {
//     id: "1",
//     name: "Baby Stroller",
//     price: 299.99,
//     category: "Strollers",
//     inStock: true,
//     imageUrl: "/placeholder.png",
//     description: "Premium baby stroller with multiple features",
//     rating: 4.5,
//     reviewCount: 12,
//   },
  
// ]

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedProduct: Partial<Product>) => void;
}

export default function ProductTable({ products, onDelete, onUpdate }: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUpdate = async (productData: Partial<Product>) => {
    if (selectedProduct) {
      await onUpdate(selectedProduct.id, productData)
      setIsModalOpen(false)
      setSelectedProduct(undefined)
    }
  }

  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(undefined)
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.imageCell}>
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className={styles.productImage}
                    unoptimized
                  />
                </div>
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>PKR {product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>
                <span className={`${styles.stockBadge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => openEditModal(product)}
                  >
                    <FiEdit2 className={styles.icon} />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(product.id)}
                  >
                    <FiTrash2 className={styles.icon} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <AddProductForm
              onSubmit={handleUpdate}
              initialData={selectedProduct}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </div>
  )
} 