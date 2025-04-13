import Link from "next/link"
import Image from "next/image"
import styles from "./category-section.module.css"

interface Category {
  id: string
  name: string
  image: string
  path: string
}

export default function CategorySection() {
  const categories: Category[] = [
    {
      id: "toiletries",
      name: "Baby Toiletries",
      image: "/toiletry.webp",
      path: "/products?category=toiletries",
    },
    {
      id: "feeding",
      name: "Feeding Accessories",
      image: "/feeding.webp",
      path: "/products?category=feeding",
    },
    {
      id: "nests",
      name: "Carry Nests",
      image: "/carry.webp",
      path: "/products?category=nests",
    },
    {
      id: "wearing",
      name: "Baby Wearing",
      image: "/clothes.jpg",
      path: "/products?category=wearing",
    },
    {
      id: "toys",
      name: "Toys",
      image: "/toys.webp",
      path: "/products?category=toys",
    },
  ]

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.sectionTitle}>Shop by Category</h2>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link href={category.path} key={category.id} className={styles.categoryCard}>
            <div className={styles.imageContainer}>
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={300}
                height={300}
                className={styles.categoryImage}
              />
            </div>
            <h3 className={styles.categoryName}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

