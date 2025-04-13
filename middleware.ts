import { authMiddleware } from "@clerk/nextjs/server"

// This example protects all routes including api/trpc routes
export default authMiddleware({
  publicRoutes: ["/", "/products(.*)"],
  ignoredRoutes: ["/api/webhook"]
})

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/"
  ],
}