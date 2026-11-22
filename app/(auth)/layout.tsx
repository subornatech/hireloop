import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/lib/nav"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[160px]"
      />

      <Link
        href="/"
        aria-label={`${siteConfig.name} home`}
        className="mb-8 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Image
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={154}
          height={44}
          loading="eager"
          className="h-10 w-auto"
        />
      </Link>

      {children}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        © 2026 HireLoop. All rights reserved.
      </p>
    </div>
  )
}
