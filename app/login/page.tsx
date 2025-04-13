"use client"
import { SignIn } from "@clerk/nextjs"
import styles from "./login.module.css"

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

