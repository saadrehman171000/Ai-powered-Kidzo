import Banner from "@/components/home/banner"
import CategorySection from "@/components/home/category-section"
// import TrendingProducts from "@/components/home/trending-products"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Banner />
      <CategorySection />
      {/* <TrendingProducts /> */}
    </div>
  )
}

