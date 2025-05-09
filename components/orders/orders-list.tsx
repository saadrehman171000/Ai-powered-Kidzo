"use client"

import { useEffect, useState } from "react"
import { getUserOrders } from "@/app/actions/orders"
import styles from "@/app/orders/orders.module.css"
import { formatDate } from "@/lib/utils"

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    imageUrl: string
  }
}

interface Order {
  id: string
  createdAt: string
  status: string
  totalAmount: number
  trackingNumber: string | null
  items: OrderItem[]
}

interface OrdersListProps {
  userId: string
}

export default function OrdersList({ userId }: OrdersListProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const userOrders = await getUserOrders(userId)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  if (loading) {
    return (
      <div className={styles.message}>Loading your orders...</div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className={styles.message}>
        You haven't placed any orders yet.
      </div>
    )
  }

  return (
    <>
      {/* <h1 className={styles.title}>Your Orders</h1> */}

      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h3>Order #{order.id.slice(-8)}</h3>
              <span className={styles.date}>
                {formatDate(order.createdAt)}
              </span>
            </div>

            <div className={styles.orderStatus}>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              {order.trackingNumber && (
                <p>
                  <strong>Tracking:</strong> {order.trackingNumber}
                </p>
              )}
            </div>

            <div className={styles.items}>
              <h4>Items</h4>
              {order.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>PKR {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.orderTotal}>
              Total: PKR {order.totalAmount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 