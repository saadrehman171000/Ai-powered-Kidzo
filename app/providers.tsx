'use client'

import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
} 