import { serverFetch } from "@/lib/api/core/server"


const baseUrl = process.env.EXPRESS_API_URL




// get all jobs 
export const getJobs = async () => {
    return serverFetch(`/api/jobs`)
}
// Get jobs by id

export const getJobById = async (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`)

}

// get company individual company jobs
export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}