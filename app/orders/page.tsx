import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import OrdersList from "@/components/orders/orders-list"

export default async function OrdersPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <OrdersList userId={userId} />
    </div>
  )
}

