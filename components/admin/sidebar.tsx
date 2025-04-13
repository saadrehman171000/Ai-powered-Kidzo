"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./sidebar.module.css"

type MenuItem = {
  label: string
  href: string
  icon: string
  submenu?: { label: string; href: string }[]
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    settings: false,
  })

  const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Orders", href: "/admin/orders", icon: "🛒" },
    { label: "Products", href: "/admin/products", icon: "📦" },
    // { label: "Customers", href: "/admin/customers", icon: "👥" },
    // {
    //   label: "Settings",
    //   href: "#",
    //   icon: "⚙️",
    //   submenu: [
    //     { label: "General", href: "/admin/settings/general" },
    //     { label: "Appearance", href: "/admin/settings/appearance" },
    //     { label: "Notifications", href: "/admin/settings/notifications" },
    //   ],
    // },
  ]

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label.toLowerCase()]: !prev[label.toLowerCase()],
    }))
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/admin" className={styles.logo}>
          <span className={styles.logoIcon}>🏪</span>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Admin Dashboard</span>
            <span className={styles.logoSubtitle}>E-Commerce</span>
          </div>
        </Link>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.label} className={styles.navItem}>
              {item.submenu ? (
                <>
                  <button className={styles.navButton} onClick={() => toggleSubmenu(item.label)}>
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <span
                      className={`${styles.navArrow} ${expandedItems[item.label.toLowerCase()] ? styles.expanded : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                  {expandedItems[item.label.toLowerCase()] && (
                    <ul className={styles.submenu}>
                      {item.submenu.map((subitem) => (
                        <li key={subitem.label} className={styles.submenuItem}>
                          <Link
                            href={subitem.href}
                            className={`${styles.submenuLink} ${pathname === subitem.href ? styles.active : ""}`}
                          >
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link href={item.href} className={`${styles.navLink} ${pathname === item.href ? styles.active : ""}`}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>AD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin User</span>
            <span className={styles.userEmail}>admin@example.com</span>
          </div>
        </div>
        <button className={styles.signOutButton}>
          <span className={styles.signOutIcon}>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}
