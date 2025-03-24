"use client"

import styles from "./sort-options.module.css"

interface SortOptionsProps {
  onSort: (option: string) => void
  selectedOption: string
}

export default function SortOptions({ onSort, selectedOption }: SortOptionsProps) {
  const options = [
    { value: "best-selling", label: "Best Selling" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "new-arrivals", label: "New Arrivals" },
  ]

  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort" className={styles.sortLabel}>
        Sort by:
      </label>
      <select id="sort" value={selectedOption} onChange={(e) => onSort(e.target.value)} className={styles.sortSelect}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

