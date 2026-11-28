const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5100/"

export type NewJobData = {
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

export async function createJob(data: NewJobData) {
  const res = await fetch(`${BASE_URL}jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}