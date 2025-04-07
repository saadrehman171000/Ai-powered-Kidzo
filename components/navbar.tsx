"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/context/cart-context";
import styles from "./navbar.module.css";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useAuth();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const categories = [
    { name: "Baby Toiletries", path: "/products?category=toiletries" },
    { name: "Feeding Accessories", path: "/products?category=feeding" },
    { name: "Carry Nests", path: "/products?category=nests" },
    { name: "Baby Wearing", path: "/products?category=wearing" },
    { name: "Toys", path: "/products?category=toys" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>Stocklytic</span>
          </Link>
        </div>

        <nav
          className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ""}`}
        >
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                Home
              </Link>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown}`}>
              <button
                className={styles.dropdownBtn}
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                Categories
                <span
                  className={`${styles.dropdownIcon} ${
                    isDropdownOpen ? styles.open : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link href={category.path}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className={styles.navItem}>
              <Link
                href="/products"
                className={pathname === "/products" ? styles.active : ""}
              >
                Products
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/orders"
                className={pathname === "/orders" ? styles.active : ""}
              >
                Orders
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/chatbot"
                className={pathname === "/chatbot" ? styles.active : ""}
              >
                Chatbot
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link
            href="/cart"
            className={styles.cartBtn}
            aria-label="Shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.cartIcon}
            >
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>

          <div className={styles.auth}>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className={styles.signInButton}>Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className={styles.signUpButton}>Sign Up</button>
                </SignUpButton>
              </>
            )}
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`${styles.menuBar} ${
                isMobileMenuOpen ? styles.active : ""
              }`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
}
