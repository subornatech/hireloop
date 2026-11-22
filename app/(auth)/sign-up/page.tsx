"use client"

import { AuthForm, type AuthFormData } from "@/components/auth/auth-form"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const handleSignUp = async (data: AuthFormData) => {
    console.log("Sign up form data:", data)

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
      image: data.image,
      callbackURL: "/",
    })

    if (error) {
      return error.message ?? "Sign up failed. Please try again."
    }
  }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
}
