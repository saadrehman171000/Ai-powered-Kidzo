import type React from "react"
import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs/server"
import AdminSidebar from "@/components/admin/sidebar"
import styles from "./admin.module.css"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect("/")
  }

  const isAdmin = user.publicMetadata?.role === "admin"

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  )
}
