"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import styles from "./cart.module.css"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Calculate subtotal
    const newSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(newSubtotal)

    // Calculate shipping (free over $50)
    const newShipping = newSubtotal > 50 ? 0 : 5.99
    setShipping(newShipping)

    // Calculate total
    setTotal(newSubtotal + newShipping)
  }, [cart])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemove = (id: string) => {
    removeFromCart(id)
  }

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products" className={styles.shopNowBtn}>
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <div className={styles.cartHeader}>
            <span className={styles.productCol}>Product</span>
            <span className={styles.priceCol}>Price</span>
            <span className={styles.quantityCol}>Quantity</span>
            <span className={styles.totalCol}>Total</span>
            <span className={styles.actionCol}></span>
          </div>

          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.productCol}>
                <div className={styles.productInfo}>
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className={styles.productImage}
                  />
                  <div>
                    <h3 className={styles.productName}>{item.name}</h3>
                    <p className={styles.productCategory}>{item.category}</p>
                  </div>
                </div>
              </div>

              <div className={styles.priceCol}>PKR {item.price.toFixed(2)}</div>

              <div className={styles.quantityCol}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.totalCol}>PKR {(item.price * item.quantity).toFixed(2)}</div>

              <div className={styles.actionCol}>
                <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>PKR {subtotal.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          {subtotal < 50 && (
            <div className={styles.freeShippingNote}>Add ${(50 - subtotal).toFixed(2)} more to get FREE shipping!</div>
          )}

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>PKR {total.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>

          <button className={styles.clearCartBtn} onClick={clearCart}>
            Clear Cart
          </button>

          <Link href="/products" className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

