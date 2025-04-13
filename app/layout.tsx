import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Providers from "./providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stocklytic - Premium Baby Products",
  description: "Shop the best baby products for your little one",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

