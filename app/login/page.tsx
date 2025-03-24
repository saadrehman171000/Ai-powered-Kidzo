"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import styles from "./login.module.css"
import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <SignIn
        appearance={{
          elements: {
            rootBox: styles.signInBox,
            card: styles.card,
            headerTitle: styles.headerTitle,
            headerSubtitle: styles.headerSubtitle,
            socialButtonsBlockButton: styles.socialButton,
            formButtonPrimary: styles.submitButton,
            footerAction: styles.footerText,
            footerActionLink: styles.footerLink,
          },
        }}
      />
    </div>
  )
}

