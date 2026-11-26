"use client"

import { useRouter } from "next/navigation"

import { AuthForm, type AuthFormData } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp = async (data: AuthFormData) => {
    console.log("Sign up form data:", data)

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
      image: data.image,
    })

    if (error) {
      return error.message ?? "Sign up failed. Please try again."
    }

    // replace: don't leave the signup page in browser history
    router.replace("/")
    router.refresh() // refresh session data in server components
  }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
}
