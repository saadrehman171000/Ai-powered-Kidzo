import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>Stocklytic</h3>
            <p className={styles.description}>
              Premium baby products for your little ones. Quality, safety, and comfort are our top priorities.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Facebook">
                <span className={styles.socialIcon}>📘</span>
              </a>
              <a href="#" aria-label="Instagram">
                <span className={styles.socialIcon}>📸</span>
              </a>
              <a href="#" aria-label="Twitter">
                <span className={styles.socialIcon}>🐦</span>
              </a>
              <a href="#" aria-label="Pinterest">
                <span className={styles.socialIcon}>📌</span>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Shop</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/products?category=toiletries">Baby Toiletries</Link>
              </li>
              <li>
                <Link href="/products?category=feeding">Feeding Accessories</Link>
              </li>
              <li>
                <Link href="/products?category=nests">Carry Nests</Link>
              </li>
              <li>
                <Link href="/products?category=wearing">Baby Wearing</Link>
              </li>
              <li>
                <Link href="/products?category=toys">Toys</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Help</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Newsletter</h3>
            <p className={styles.description}>
              Subscribe to our newsletter for updates, promotions, and parenting tips.
            </p>
            <form className={styles.form}>
              <input type="email" placeholder="Your email address" className={styles.input} required />
              <button type="submit" className={styles.button}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Stocklytic. All rights reserved.</p>
          <div className={styles.payments}>
            <span className={styles.paymentIcon}>💳</span>
            <span className={styles.paymentIcon}>💰</span>
            <span className={styles.paymentIcon}>🏦</span>
            <span className={styles.paymentIcon}>💵</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

