"use client"

import styles from "./product-filter.module.css"

interface ProductFilterProps {
  onCategoryChange: (category: string) => void
  selectedCategory: string
}

export default function ProductFilter({ onCategoryChange, selectedCategory }: ProductFilterProps) {
  const categories = [
    { value: "all", label: "All Products" },
    { value: "toiletries", label: "Baby Toiletries" },
    { value: "feeding", label: "Feeding Accessories" },
    { value: "nests", label: "Carry Nests" },
    { value: "wearing", label: "Baby Wearing" },
    { value: "toys", label: "Toys" },
  ]

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Categories</h3>

      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.value} className={styles.categoryItem}>
            <button
              className={`${styles.categoryButton} ${selectedCategory === category.value ? styles.active : ""}`}
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.priceFilter}>
        <h3 className={styles.filterTitle}>Price Range</h3>
        <div className={styles.priceInputs}>
          <input type="number" placeholder="Min" className={styles.priceInput} />
          <span className={styles.priceSeparator}>-</span>
          <input type="number" placeholder="Max" className={styles.priceInput} />
        </div>
        <button className={styles.applyButton}>Apply</button>
      </div>
    </div>
  )
}

