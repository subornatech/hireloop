export type NavItem = {
  title: string
  href: string
}

export const siteConfig = {
  name: "HireLoop",
  logo: "/hireloop-logo.png",
}

export const mainNav: NavItem[] = [
  { title: "Browse Jobs", href: "/jobs" },
  { title: "Company", href: "/companies" },
  { title: "Pricing", href: "/pricing" },
]

export const authNav = {
  signIn: { title: "Sign In", href: "/sign-in" },
  getStarted: { title: "Get Started", href: "/sign-up" },
}
