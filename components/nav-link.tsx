"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type NavLinkProps = {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = isActivePath(pathname, href)

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  )
}

export { NavLink }
