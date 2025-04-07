import Link from "next/link";
import Image from "next/image";
import styles from "./category-section.module.css";

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

export default function CategorySection() {
  const categories: Category[] = [
    {
      id: "toiletries",
      name: "Baby Toiletries",
      image:
        "https://media.istockphoto.com/id/625379326/photo/organic-cosmetic-children-for-bath-on-wooden-bakground-close-up.jpg?s=2048x2048&w=is&k=20&c=BIuc1Jf2fE5M1_1wSTCyMqCnFbepxKMnt16z3HF_kNU=",
      path: "/products?category=toiletries",
    },

    {
      id: "feeding",
      name: "Feeding Accessories",
      image:
        "https://media.istockphoto.com/id/1348234289/photo/baby-bottle-with-milk-on-white-background-selective-focus.jpg?s=2048x2048&w=is&k=20&c=Z7fu9XZRzejwFN5FXQk4arDDLN-aKkTHmFnDbbbGmQg=",
      path: "/products?category=feeding",
    },
    {
      id: "nests",
      name: "Carry Nests",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&fit=crop",
      path: "/products?category=nests",
    },
    {
      id: "wearing",
      name: "Baby Wearing",
      image:
        "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=600&fit=crop",
      path: "/products?category=wearing",
    },
    {
      id: "toys",
      name: "Toys",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=600&fit=crop",
      path: "/products?category=toys",
    },
  ];

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.sectionTitle}>Shop by Category</h2>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link
            href={category.path}
            key={category.id}
            className={styles.categoryCard}
          >
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
  );
}
