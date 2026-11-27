"use client"

import * as React from "react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const categories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Human Resources",
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const salaryFrequencies = ["per hour", "per month", "per year"]

export default function NewJobPage() {
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = {
      title: String(formData.get("title") ?? ""),
      companyName: String(formData.get("companyName") ?? ""),
      category: String(formData.get("category") ?? ""),
      jobType: String(formData.get("jobType") ?? ""),
      isRemote: formData.has("isRemote"),
      location: String(formData.get("location") ?? ""),
      deadline: String(formData.get("deadline") ?? ""),
      minSalary: String(formData.get("minSalary") ?? ""),
      maxSalary: String(formData.get("maxSalary") ?? ""),
      salaryFrequency: String(formData.get("salaryFrequency") ?? ""),
      responsibilities: String(formData.get("responsibilities") ?? ""),
      requirements: String(formData.get("requirements") ?? ""),
    }

    console.log("New job data:", data)
    setSubmitted(true)
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8">
      <Card className="border-border/60 bg-card/80 shadow-xl backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </CardTitle>
          <CardDescription>
            Fill in the position specifications to attract qualified talent
            across our network.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-6">
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold">1. Basic Information</h2>

              <Field label="Job Title *" htmlFor="title">
                <Input
                  id="title"
                  name="title"
                  placeholder="Frontend Developer"
                  required
                />
              </Field>

              <Field label="Company Name *" htmlFor="companyName">
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="HirePulse Network"
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Job Category *" htmlFor="category">
                  <Select name="category" defaultValue={categories[0]}>
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue>
                        {(value: string | null) =>
                          value ?? "Select a category"
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Job Type *" htmlFor="jobType">
                  <Select name="jobType" defaultValue={jobTypes[0]}>
                    <SelectTrigger id="jobType" className="w-full">
                      <SelectValue>
                        {(value: string | null) => value ?? "Select a job type"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold">
                2. Location, Compensation & Timeline
              </h2>

              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="isRemote"
                  name="isRemote"
                  aria-label="Remote Work Allowed"
                  className="mt-0.5"
                />
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="isRemote" className="font-medium">
                    Remote Work Allowed (isRemote)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Job Location (location) *" htmlFor="location">
                  <Input
                    id="location"
                    name="location"
                    placeholder="New York, USA"
                    required
                  />
                </Field>

                <Field label="Application Deadline (deadline)" htmlFor="deadline">
                  <Input id="deadline" name="deadline" type="date" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Min Salary / Rate" htmlFor="minSalary">
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    placeholder="0"
                  />
                </Field>

                <Field label="Max Salary / Rate" htmlFor="maxSalary">
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    placeholder="0"
                  />
                </Field>

                <Field label="Frequency" htmlFor="salaryFrequency">
                  <Select name="salaryFrequency" defaultValue={salaryFrequencies[2]}>
                    <SelectTrigger id="salaryFrequency" className="w-full">
                      <SelectValue>
                        {(value: string | null) =>
                          value ?? "Select a frequency"
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {salaryFrequencies.map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold">
                3. Responsibilities & Requirements
              </h2>

              <Field label="Key Responsibilities *" htmlFor="responsibilities">
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="Describe the day-to-day responsibilities..."
                  required
                />
              </Field>

              <Field label="Qualifications & Requirements *" htmlFor="requirements">
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the required skills and qualifications..."
                  required
                />
              </Field>
            </section>

            {submitted && (
              <p
                role="status"
                className="rounded-lg bg-muted/60 p-3 text-center text-xs text-muted-foreground"
              >
                Job details collected — check the browser console.
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Publish Job
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}
