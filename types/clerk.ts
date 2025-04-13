type UserRole = "admin" | "user"

interface UserMetadata {
  role?: UserRole
}

declare module "@clerk/nextjs" {
  export interface SessionClaims {
    metadata: UserMetadata
  }
} 