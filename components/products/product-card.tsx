import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types"
import styles from "./product-card.module.css"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
        />
        {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.category}>{product.category}</div>

        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
           
            <span key={i} className={i < Math.floor(product.rating) ? styles.starFilled : styles.star}>
              ★
            </span>
          ))}
          <span className={styles.reviewCount}>({product.reviewCount})</span>
        </div>

        <div className={styles.price}>${product.price.toFixed(2)}</div>
      </div>
    </Link>
  )
}

