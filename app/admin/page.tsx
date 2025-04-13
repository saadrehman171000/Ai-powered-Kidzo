import { auth } from "@clerk/nextjs/server"
import { getDashboardStats } from "../actions/dashboard"
import styles from "./page.module.css"

type OrderWithRelations = {
  id: string
  totalAmount: number
  customer: {
    name: string
  }
}

export default async function AdminDashboard() {
  const { sessionClaims } = auth()
  const stats = await getDashboardStats()

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin!</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statContent}>
            <h3>Total Products</h3>
            <div className={styles.value}>{stats.totalProducts}</div>
            <p className={styles.statDescription}>Products in your inventory</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🛒</div>
          <div className={styles.statContent}>
            <h3>Total Orders</h3>
            <div className={styles.value}>{stats.totalOrders}</div>
            <p className={styles.statDescription}>Orders processed</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statContent}>
            <h3>Total Revenue</h3>
            <div className={styles.value}>${stats.totalRevenue.toFixed(2)}</div>
            <p className={styles.statDescription}>Revenue generated</p>
          </div>
        </div>
      </div>

      <div className={styles.recentOrders}>
        <div className={styles.recentOrdersHeader}>
          <h2>Recent Orders</h2>
          <a href="/admin/orders" className={styles.viewAllLink}>
            View all →
          </a>
        </div>
        <div className={styles.ordersList}>
          {stats.recentOrders.map((order: OrderWithRelations) => (
            <div key={order.id} className={styles.orderItem}>
              <div className={styles.orderInfo}>
                <span className={styles.orderId}>Order #{order.id.slice(-8)}</span>
                <span className={styles.customer}>{order.customer.name}</span>
              </div>
              <span className={styles.orderAmount}>${order.totalAmount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
