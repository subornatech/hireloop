"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { NavLink } from "@/components/nav-link"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authNav, siteConfig, type NavItem } from "@/lib/nav"
import { cn } from "@/lib/utils"

function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-xs gap-0 p-0 sm:max-w-xs"
      >
        <SheetHeader className="flex-row items-center border-b px-4 py-3 pr-14">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Links to the main pages of {siteConfig.name}.
          </SheetDescription>
          <Link
            href="/"
            onClick={close}
            aria-label={`${siteConfig.name} home`}
            className="flex items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={154}
              height={44}
              className="h-9 w-auto"
            />
          </Link>
        </SheetHeader>

        <nav aria-label="Main" className="flex flex-col gap-1 p-3">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex h-11 items-center rounded-lg px-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              activeClassName="bg-muted text-foreground"
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <SheetFooter className="border-t p-3">
          <Link
            href={authNav.signIn.href}
            onClick={close}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full"
            )}
          >
            {authNav.signIn.title}
          </Link>
          <Link
            href={authNav.getStarted.href}
            onClick={close}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            {authNav.getStarted.title}
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
