"use client"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div>
      <h1>Admin Sign In</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signIn("credentials", { email, password, callbackUrl: "/admin" })
      }}>
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}