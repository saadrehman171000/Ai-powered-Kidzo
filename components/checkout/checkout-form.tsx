// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useCart } from "@/context/cart-context"
// import { createOrder } from "@/app/actions/orders"
// import styles from "@/app/checkout/checkout.module.css"

// interface CheckoutFormProps {
//   userId: string
// }

// export default function CheckoutForm({ userId }: CheckoutFormProps) {
//   const router = useRouter()
//   const { cart, clearCart } = useCart()
//   const [loading, setLoading] = useState(false)
//   const [total, setTotal] = useState(0)
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     paymentMethod: "credit",
//     cardNumber: "",
//     cardName: "",
//     expiryDate: "",
//     cvv: "",
//   })

//   useEffect(() => {
//     // Calculate total
//     const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     const shipping = subtotal > 100 ? 0 : 10
//     const tax = subtotal * 0.08
//     const newTotal = subtotal + shipping + tax
//     setTotal(newTotal)
//   }, [cart])

//   if (cart.length === 0) {
//     return <div className={styles.message}>Your cart is empty. Please add items before checking out.</div>
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const orderData = {
//         userId,
//         items: cart,
//         shippingAddress: {
//           name: formData.name,
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           zipCode: formData.zipCode,
//           country: formData.country,
//         },
//         paymentMethod: formData.paymentMethod,
//         total,
//       }

//       await createOrder(orderData)
//       clearCart()
//       router.push("/orders")
//     } catch (error) {
//       console.error("Error creating order:", error)
//       alert("Failed to create order. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1)
//     window.scrollTo(0, 0)
//   }

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1)
//     window.scrollTo(0, 0)
//   }

//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   const shipping = subtotal > 100 ? 0 : 10
//   const tax = subtotal * 0.08

//   return (
//     <>
//       {/* <h1 className={styles.title}>Checkout</h1> */}

//       {/* Checkout Steps */}
//       <div className={styles.checkoutSteps}>
//         <div className={`${styles.step} ${currentStep >= 1 ? styles.activeStep : ""}`}>
//           <div className={styles.stepNumber}>1</div>
//           <div className={styles.stepLabel}>Shipping</div>
//         </div>
//         <div className={styles.stepDivider}></div>
//         <div className={`${styles.step} ${currentStep >= 2 ? styles.activeStep : ""}`}>
//           <div className={styles.stepNumber}>2</div>
//           <div className={styles.stepLabel}>Payment</div>
//         </div>
//         <div className={styles.stepDivider}></div>
//         <div className={`${styles.step} ${currentStep >= 3 ? styles.activeStep : ""}`}>
//           <div className={styles.stepNumber}>2</div>
//           <div className={styles.stepLabel}>Review</div>
//         </div>
//       </div>

//       <div className={styles.content}>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {/* Step 1: Shipping Information */}
//           {currentStep === 1 && (
//             <div className={styles.section}>
//               <h2>Shipping Information</h2>
//               <div className={styles.formGrid}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="name">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="street">Street Address</label>
//                   <input
//                     type="text"
//                     id="street"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="city">City</label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="state">State</label>
//                   <input
//                     type="text"
//                     id="state"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="zipCode">ZIP Code</label>
//                   <input
//                     type="text"
//                     id="zipCode"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="country">Country</label>
//                   <input
//                     type="text"
//                     id="country"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>
      
//               <div className={styles.buttonContainer}>
//                 <button type="button" className={styles.continueButton} onClick={nextStep}>
//                   Continue to Payment
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Payment Information */}
//            {currentStep === 2 && (
//             <div className={styles.section}>
//               <h2>Payment Method</h2>
//               <div className={styles.paymentOptions}>
//                 <div className={styles.paymentOption}>
//                   <input
//                     type="radio"
//                     id="credit"
//                     name="paymentMethod"
//                     value="credit"
//                     checked={formData.paymentMethod === "credit"}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="credit">Credit Card</label>
//                 </div>
//                 <div className={styles.paymentOption}>
//                   <input
//                     type="radio"
//                     id="paypal"
//                     name="paymentMethod"
//                     value="paypal"
//                     checked={formData.paymentMethod === "paypal"}
//                     onChange={handleInputChange}
//                   />
//                   <label htmlFor="paypal">PayPal</label>
//                 </div>
//               </div> 

//               {formData.paymentMethod === "credit" && (
//                 <div className={styles.cardDetails}>
//                   <div className={styles.formGroup}>
//                     <label htmlFor="cardNumber">Card Number</label>
//                     <input
//                       type="text"
//                       id="cardNumber"
//                       name="cardNumber"
//                       value={formData.cardNumber}
//                       onChange={handleInputChange}
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </div>
//                   <div className={styles.formGroup}>
//                     <label htmlFor="cardName">Name on Card</label>
//                     <input
//                       type="text"
//                       id="cardName"
//                       name="cardName"
//                       value={formData.cardName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className={styles.formRow}>
//                     <div className={styles.formGroup}>
//                       <label htmlFor="expiryDate">Expiry Date</label>
//                       <input
//                         type="text"
//                         id="expiryDate"
//                         name="expiryDate"
//                         value={formData.expiryDate}
//                         onChange={handleInputChange}
//                         placeholder="MM/YY"
//                         required
//                       />
//                     </div>
//                     <div className={styles.formGroup}>
//                       <label htmlFor="cvv">CVV</label>
//                       <input
//                         type="text"
//                         id="cvv"
//                         name="cvv"
//                         value={formData.cvv}
//                         onChange={handleInputChange}
//                         placeholder="123"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {formData.paymentMethod === "paypal" && (
//                 <div className={styles.paypalInfo}>
//                   <p>You will be redirected to PayPal to complete your payment after reviewing your order.</p>
//                 </div>
//               )}

//               <div className={styles.buttonContainer}>
//                 <button type="button" className={styles.backButton} onClick={prevStep}>
//                   Back
//                 </button>
//                 <button type="button" className={styles.continueButton} onClick={nextStep}>
//                   Review Order
//                 </button>
//               </div>
//             </div>
//           )} 

//           {/* Step 3: Review Order */}
//           {currentStep === 3 && (
//             <div className={styles.section}>
//               <h2>Review Your Order</h2>

//               <div className={styles.reviewSection}>
//                 <h3>Shipping Address</h3>
//                 <div className={styles.reviewInfo}>
//                   <p>{formData.name}</p>
//                   <p>{formData.street}</p>
//                   <p>
//                     {formData.city}, {formData.state} {formData.zipCode}
//                   </p>
//                   <p>{formData.country}</p>
//                 </div>
//               </div>

//               <div className={styles.reviewSection}>
//                 <h3>Payment Method</h3>
//                 <div className={styles.reviewInfo}>
//                   {formData.paymentMethod === "credit" ? (
//                     <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
//                   ) : (
//                     <p>PayPal</p>
//                   )}
//                 </div>
//               </div>

//               <div className={styles.reviewSection}>
//                 <h3>Order Summary</h3>
//                 <div className={styles.orderSummary}>
//                   {cart.map((item) => (
//                     <div key={item.id} className={styles.summaryItem}>
//                       <span>
//                         {item.name} × {item.quantity}
//                       </span>
//                       <span>${(item.price * item.quantity).toFixed(2)}</span>
//                     </div>
//                   ))}
//                   <div className={styles.summaryItem}>
//                     <span>Subtotal</span>
//                     <span>${subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className={styles.summaryItem}>
//                     <span>Shipping</span>
//                     <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
//                   </div>
//                   <div className={styles.summaryItem}>
//                     <span>Tax (8%)</span>
//                     <span>${tax.toFixed(2)}</span>
//                   </div>
//                   <div className={styles.summaryTotal}>
//                     <strong>Total:</strong>
//                     <strong>${total.toFixed(2)}</strong>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.buttonContainer}>
//                 <button type="button" className={styles.backButton} onClick={prevStep}>
//                   Back
//                 </button>
//                 <button type="submit" className={styles.submitButton} disabled={loading}>
//                   {loading ? "Processing..." : "Place Order"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   )
// }




"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { createOrder } from "@/app/actions/orders"
import styles from "@/app/checkout/checkout.module.css"

interface CheckoutFormProps {
  userId: string
}

export default function CheckoutForm({ userId }: CheckoutFormProps) {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "cash",
  })

  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.08
    const newTotal = subtotal + shipping + tax
    setTotal(newTotal)
  }, [cart])

  if (cart.length === 0) {
    return <div className={styles.message}>Your cart is empty. Please add items before checking out.</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        userId,
        items: cart,
        shippingAddress: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        total,
      }

      await createOrder(orderData)
      clearCart()
      router.push("/orders")
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Failed to create order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08

  return (
    <>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h2>Shipping Information</h2>
            <div className={styles.formGrid}>
              {[
                { label: "Full Name", name: "name" },
                { label: "Street Address", name: "street" },
                { label: "City", name: "city" },
                { label: "State", name: "state" },
                { label: "ZIP Code", name: "zipCode" },
                { label: "Country", name: "country" },
              ].map((field) => (
                <div key={field.name} className={styles.formGroup}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}
                  />
                </div>
              ))}
            </div>

            <h2>Payment Method</h2>
            <div className={styles.paymentOptions}>
              <div className={styles.paymentOption}>
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleInputChange}
                />
                <label htmlFor="cash">Cash on Delivery</label>
              </div>
            </div>

            <div className={styles.reviewSection}>
              <h3>Order Summary</h3>
              <div className={styles.orderSummary}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>PKR {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className={styles.summaryItem}>
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Tax (8%)</span>
                  <span>PKR {tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryTotal}>
                  <strong>Total:</strong>
                  <strong>PKR {total.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}