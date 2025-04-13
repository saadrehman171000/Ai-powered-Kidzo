import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import CheckoutForm from "@/components/checkout/checkout-form"
import styles from "./checkout.module.css"

export default async function CheckoutPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm userId={userId} />
    </div>
  )
} 