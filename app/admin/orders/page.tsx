"use client"

import { useState, useEffect } from "react"
import { getOrders, updateOrderStatus, updateTrackingNumber, addOrderNote } from "@/app/actions/orders"
import styles from "./orders.module.css"

type Order = Awaited<ReturnType<typeof getOrders>>[0]
type OrderItem = Order["items"][0]

interface EditingOrder {
  id: string
  field: "status" | "tracking" | "notes"
  value: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [editingOrder, setEditingOrder] = useState<EditingOrder | null>(null)

  useEffect(() => {
    loadOrders()
  }, [selectedStatus])

  const loadOrders = async () => {
    try {
      const data = await getOrders(selectedStatus || undefined)
      setOrders(data)
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status)
      loadOrders()
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const handleTrackingUpdate = async (orderId: string, trackingNumber: string) => {
    try {
      await updateTrackingNumber(orderId, trackingNumber)
      loadOrders()
      setEditingOrder(null)
    } catch (error) {
      console.error("Error updating tracking number:", error)
    }
  }

  const handleNoteAdd = async (orderId: string, note: string) => {
    try {
      await addOrderNote(orderId, note)
      loadOrders()
      setEditingOrder(null)
    } catch (error) {
      console.error("Error adding note:", error)
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading orders...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Orders</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className={styles.statusFilter}
        >
          <option value="">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h3>Order #{order.id.slice(-8)}</h3>
              <span className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>

            <div className={styles.customerInfo}>
              <p>
                Customer: <strong>{order.customer.name}</strong>
              </p>
              <p>Email: {order.customer.email}</p>
            </div>

            <div className={styles.items}>
              <h4>Items</h4>
              {order.items.map((item: OrderItem) => (
                <div key={item.id} className={styles.item}>
                  <span className={styles.itemName}>{item.product.name}</span>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemQuantity}>x{item.quantity}</span>
                    <span className={styles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderDetails}>
              <div className={styles.totalAmount}>
                <span>Total:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>

              <div className={styles.statusContainer}>
                <span>Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <div className={styles.tracking}>
              <h4>Tracking Information</h4>
              {editingOrder?.id === order.id && editingOrder?.field === "tracking" ? (
                <div className={styles.editField}>
                  <input
                    type="text"
                    value={editingOrder?.value ?? ""}
                    onChange={(e) =>
                      setEditingOrder({
                        id: editingOrder.id,
                        field: editingOrder.field,
                        value: e.target.value,
                      })
                    }
                    placeholder="Enter tracking number"
                    className={styles.input}
                  />
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => handleTrackingUpdate(order.id, editingOrder.value)}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingOrder(null)} className={styles.cancelButton}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.trackingInfo}>
                  <span>{order.trackingNumber || "No tracking number available"}</span>
                  <button
                    onClick={() =>
                      setEditingOrder({
                        id: order.id,
                        field: "tracking",
                        value: order.trackingNumber || "",
                      })
                    }
                    className={styles.actionButton}
                  >
                    {order.trackingNumber ? "Update" : "Add"} Tracking
                  </button>
                </div>
              )}
            </div>

            <div className={styles.notes}>
              <h4>Notes</h4>
              {editingOrder?.id === order.id && editingOrder?.field === "notes" ? (
                <div className={styles.editField}>
                  <textarea
                    value={editingOrder?.value ?? ""}
                    onChange={(e) =>
                      setEditingOrder({
                        id: editingOrder.id,
                        field: editingOrder.field,
                        value: e.target.value,
                      })
                    }
                    placeholder="Add a note"
                    className={styles.textarea}
                  />
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleNoteAdd(order.id, editingOrder.value)} className={styles.saveButton}>
                      Save
                    </button>
                    <button onClick={() => setEditingOrder(null)} className={styles.cancelButton}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.noteInfo}>
                  <p>{order.notes || "No notes added yet."}</p>
                  <button
                    onClick={() =>
                      setEditingOrder({
                        id: order.id,
                        field: "notes",
                        value: order.notes || "",
                      })
                    }
                    className={styles.actionButton}
                  >
                    {order.notes ? "Edit" : "Add"} Note
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
