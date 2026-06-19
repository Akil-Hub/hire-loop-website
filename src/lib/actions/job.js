'use server'

import { serverMutation } from "@/lib/api/core/server"


export const createJob = async (newJobData) => {
    return serverMutation('/api/jobs', newJobData)

}




export const deleteJob = async (jobId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${jobId}`, {
        method: 'DELETE',
    })
    return res.json()
}