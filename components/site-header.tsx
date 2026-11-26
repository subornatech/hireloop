"use client"

import Image from "next/image"
import Link from "next/link"

import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { authNav, mainNav, siteConfig } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { useSession,signOut } from "@/lib/auth-client"
import { Button } from "@base-ui/react"

function SiteHeader() {
  const {data:session}= useSession();
  console.log(session);
  const handleSignOut = async ()=>{
    await signOut()
  }
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-[60px]">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center rounded-2xl border border-border/60 bg-background/80 px-3 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-4 lg:h-[74px] lg:px-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="flex shrink-0 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={154}
            height={44}
            loading="eager"
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                activeClassName="bg-muted text-foreground"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          <div
            aria-hidden="true"
            className="mx-1 hidden h-5 w-px bg-border md:block"
          />

          <div className="flex items-center gap-1 sm:gap-1.5">
            <ThemeToggle />

           { 
           session?.user ?  <> 
           <Button onClick={handleSignOut} className="btn">SignOut</Button>
           <span className="text-[#EDEDEF]">Welcome,{session.user.name}</span> </>:
            <>
             <Link
              href={authNav.signIn.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "hidden rounded-xl px-4 text-primary hover:bg-primary/10 hover:text-primary sm:inline-flex"
              )}
            >
              {authNav.signIn.title}
            </Link>

            <Link
              href={authNav.getStarted.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden rounded-xl px-5 shadow-sm sm:inline-flex"
              )}
            >
              {authNav.getStarted.title}
            </Link>
            
            </>
           }

            <MobileNav items={mainNav} />
          </div>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
