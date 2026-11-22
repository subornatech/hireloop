"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type AuthFormData = {
  name: string
  email: string
  password: string
  image?: string
  confirmPassword?: string
  termsAccepted?: boolean
  rememberMe?: boolean
}

type AuthFormProps = {
  mode: "sign-in" | "sign-up"
  /** Return an error string to display it, or throw to show that error. */
  onSubmit?: (data: AuthFormData) => void | string | Promise<void | string>
}

const content = {
  "sign-in": {
    title: "Welcome back",
    description: "Sign in to continue your job search.",
    submit: "Sign in",
    togglePrompt: "Don't have an account?",
    toggleLabel: "Create an account",
    toggleHref: "/sign-up",
  },
  "sign-up": {
    title: "Create your account",
    description: "Get started and find your next dream role.",
    submit: "Create account",
    togglePrompt: "Already have an account?",
    toggleLabel: "Sign in",
    toggleHref: "/sign-in",
  },
} as const

function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignUp = mode === "sign-up"
  const copy = content[mode]
  const [submittedValues, setSubmittedValues] = React.useState<Record<
    string,
    unknown
  > | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const text = (name: string) => {
      const value = formData.get(name)
      return typeof value === "string" ? value : ""
    }

    const values: AuthFormData = {
      name: text("fullName").trim(),
      email: text("email").trim(),
      password: text("password"),
      ...(isSignUp
        ? {
            confirmPassword: text("confirmPassword"),
            termsAccepted: formData.has("terms"),
          }
        : { rememberMe: formData.has("rememberMe") }),
    }

    if (isSignUp && values.password !== values.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (isSignUp && !values.termsAccepted) {
      setError("Please accept the terms to create an account.")
      return
    }

    setPending(true)
    try {
      if (onSubmit) {
        const result = await onSubmit(values)
        if (typeof result === "string") {
          setError(result)
          return
        }
      } else {
        // Temporary behaviour until an onSubmit handler is provided.
        console.log(`${isSignUp ? "Sign up" : "Sign in"} form data:`, values)
      }
      setSubmittedValues(values)
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong."
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="w-full max-w-[440px] border-border/60 bg-card/80 shadow-xl backdrop-blur">
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {copy.title}
        </CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {isSignUp && (
            <Field id="fullName" label="Full name">
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </Field>
          )}

          <Field id="email" label="Email address">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </Field>

          <Field
            id="password"
            label="Password"
            trailing={
              isSignUp ? null : (
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              )
            }
          >
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </Field>

          {isSignUp && (
            <Field id="confirmPassword" label="Confirm password">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </Field>
          )}

          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id={isSignUp ? "terms" : "rememberMe"}
              name={isSignUp ? "terms" : "rememberMe"}
              aria-label={
                isSignUp ? "Accept terms and privacy policy" : "Remember me"
              }
              className="mt-0.5"
            />
            <Label
              htmlFor={isSignUp ? "terms" : "rememberMe"}
              className="leading-snug font-normal text-muted-foreground"
            >
              {isSignUp ? (
                <>
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              ) : (
                "Keep me signed in for 30 days"
              )}
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="h-11 w-full rounded-xl"
          >
            {pending ? "Please wait…" : copy.submit}
          </Button>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 p-3 text-center text-xs text-destructive"
            >
              {error}
            </p>
          )}

          {submittedValues && !error && (
            <p
              role="status"
              className="rounded-lg bg-muted/60 p-3 text-center text-xs text-muted-foreground"
            >
              {onSubmit
                ? "Submitted successfully."
                : "Form collected — check the browser console for the values."}
            </p>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {copy.togglePrompt}{" "}
            <Link
              href={copy.toggleHref}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {copy.toggleLabel}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

function Field({
  id,
  label,
  trailing,
  children,
}: {
  id: string
  label: string
  trailing?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {trailing}
      </div>
      {children}
    </div>
  )
}

export { AuthForm }
