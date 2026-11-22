import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusinessIcon,
  Building2Icon,
  MapPinIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { value: "50K", label: "Active Jobs", icon: BriefcaseBusinessIcon },
  { value: "12K", label: "Companies", icon: Building2Icon },
  { value: "2M", label: "Job Seekers", icon: UsersIcon },
  { value: "97%", label: "Satisfaction Rate", icon: StarIcon },
]

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <div className="mx-auto w-full max-w-[1320px] px-6 pt-14 pb-20 sm:px-8 lg:px-[60px] lg:pt-[140px] lg:pb-28">
        <div className="mx-auto flex max-w-[784px] flex-col items-center gap-8 text-center">
          <div className="rounded-full bg-gradient-to-r from-foreground/25 to-transparent p-px shadow-sm">
            <div className="flex h-12 items-center gap-4 rounded-full border border-foreground/10 bg-gradient-to-b from-muted to-background px-5 sm:px-6">
              <SparklesIcon className="size-5 shrink-0 text-primary" />
              <span className="font-mono text-sm text-foreground/90 sm:text-base">
                50,000+ new jobs this month
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-heading text-4xl font-bold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[56px] lg:leading-[1.15]">
              Find Your Dream Job Today
            </h1>
            <p className="mx-auto max-w-[784px] text-base leading-relaxed text-foreground/70 sm:text-lg lg:text-xl lg:leading-[1.6]">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>
          </div>

          <div className="flex w-full flex-col gap-5">
            <JobSearchForm />
            <TrendingPositions />
          </div>
        </div>

        <HeroStats />
      </div>
    </section>
  )
}

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Purple halo + dark core, mirroring the blurred gradient ellipses in the design. */}
      <div className="absolute top-[8%] left-1/2 h-[880px] w-[1240px] -translate-x-1/2 rounded-[50%] bg-primary/40 blur-[140px]" />
      <div className="absolute top-[12%] left-1/2 h-[760px] w-[980px] -translate-x-1/2 rounded-[50%] bg-background blur-[110px]" />
      <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(ellipse_55%_50%_at_50%_40%,var(--primary),transparent_72%)] opacity-15" />

      <Image
        src="/sparkles.png"
        alt=""
        width={816}
        height={505}
        loading="eager"
        className="absolute inset-x-0 top-[34%] mx-auto w-full max-w-[1180px] opacity-40 dark:opacity-60 dark:mix-blend-screen"
      />
    </div>
  )
}

function JobSearchForm() {
  return (
    <form
      action="/jobs"
      method="get"
      role="search"
      className="flex w-full flex-col gap-1 rounded-2xl border border-border bg-card/70 p-2 shadow-lg shadow-black/5 backdrop-blur transition-colors focus-within:border-primary/40 sm:flex-row sm:items-center sm:gap-0"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <label htmlFor="job-query" className="sr-only">
          Job title, skill or company
        </label>
        <input
          id="job-query"
          name="q"
          type="search"
          placeholder="Job title, skill or company"
          className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div
        aria-hidden="true"
        className="mx-1 hidden h-6 w-px shrink-0 bg-border sm:block"
      />

      <div className="flex flex-1 items-center gap-2 px-3">
        <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
        <label htmlFor="job-location" className="sr-only">
          Location or Remote
        </label>
        <input
          id="job-location"
          name="location"
          type="search"
          placeholder="Location or Remote"
          className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-11 gap-2 rounded-xl px-5 sm:size-12 sm:shrink-0 sm:px-0"
      >
        <SearchIcon className="size-5" />
        <span className="sm:hidden">Search</span>
        <span className="sr-only sm:not-sr-only sm:hidden">Search jobs</span>
      </Button>
    </form>
  )
}

function TrendingPositions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <span className="text-base text-foreground/70">Trending Position</span>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {trendingPositions.map((position) => (
          <li key={position}>
            <Link
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="inline-flex h-[33px] items-center rounded-full border border-border bg-card px-3.5 text-sm text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
            >
              {position}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HeroStats() {
  return (
    <div className="mt-20 flex flex-col gap-12 lg:mt-40">
      <h2 className="mx-auto max-w-[600px] text-center font-heading text-3xl leading-[1.3] font-medium tracking-tight text-balance sm:text-4xl lg:text-[40px]">
        Assisting over 15,000 job seekers find their dream positions.
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stats.map(({ value, label, icon: Icon }) => (
          <div
            key={label}
            className="flex min-h-[254px] flex-col justify-between gap-12 rounded-2xl border border-border/60 bg-gradient-to-b from-background to-muted/60 p-6"
          >
            <Icon aria-hidden="true" className="size-6 text-foreground/70" />
            <div className="flex flex-col gap-2">
              <p className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[56px] lg:leading-none">
                {value}
              </p>
              <p className="text-lg text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { HeroSection }
