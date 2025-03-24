"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { getUserOrders } from "@/lib/api"
import type { Order } from "@/types"
import styles from "./orders.module.css"

export default function OrdersPage() {
  const { user, isLoaded } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const data = await getUserOrders(user.id)
          setOrders(data)
        } catch (error) {
          console.error("Error fetching orders:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (!isLoaded) return <div>Loading...</div>

  if (!user) {
    return (
      <div className={styles.notLoggedIn}>
        <h1>Please Login</h1>
        <p>You need to be logged in to view your orders.</p>
        <Link href="/login" className={styles.loginBtn}>
          Login
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading your orders...</div>
  }

  if (orders.length === 0) {
    return (
      <div className={styles.noOrders}>
        <h1>No Orders Found</h1>
        <p>You haven't placed any orders yet.</p>
        <Link href="/products" className={styles.shopNowBtn}>
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Orders</h1>

      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div>
                <h2 className={styles.orderId}>Order #{order.id}</h2>
                <p className={styles.orderDate}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className={styles.orderStatus}>
                <span className={`${styles.status} ${styles[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.productId} className={styles.orderItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} width={60} height={60} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                <span>Total:</span>
                <span className={styles.totalAmount}>${order.total.toFixed(2)}</span>
              </div>
              <div className={styles.orderActions}>
                <Link href={`/orders/${order.id}`} className={styles.viewDetailsBtn}>
                  View Details
                </Link>
                {order.status === "delivered" && (
                  <button className={styles.downloadInvoiceBtn}>Download Invoice</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

