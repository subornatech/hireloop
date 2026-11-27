export type NavItem = {
  title: string
  href: string
}

export type UserRole = "seeker" | "recruiter" | "admin"

const DEFAULT_ROLE: UserRole = "seeker"

export const siteConfig = {
  name: "HireLoop",
  logo: "/hireloop-logo.png",
}

export function normalizeRole(role?: string | null): UserRole {
  return role === "seeker" || role === "recruiter" || role === "admin"
    ? role
    : DEFAULT_ROLE
}

export function getDashboardHref(role?: string | null) {
  return `/dashboard/${normalizeRole(role)}`
}

export function getMainNav(role?: string | null): NavItem[] {
  return [
    { title: "Browse Jobs", href: "/jobs" },
    { title: "Company", href: "/companies" },
    { title: "Pricing", href: "/pricing" },
    { title: "Dashboard", href: getDashboardHref(role) },
  ]
}

/** Default nav for static/server usage. Use getMainNav(role) in client components. */
export const mainNav: NavItem[] = getMainNav()

export const authNav = {
  signIn: { title: "Sign In", href: "/sign-in" },
  getStarted: { title: "Get Started", href: "/sign-up" },
}
