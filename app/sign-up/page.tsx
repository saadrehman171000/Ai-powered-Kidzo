import { SignUp } from "@clerk/nextjs"
import styles from "./sign-up.module.css"

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUp
        appearance={{
          elements: {
            rootBox: styles.signUpBox,
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