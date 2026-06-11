'use server'

import { serverMutation } from "@/lib/api/core/server"

export const submitApplication = async(applicationData)=>{
    return serverMutation('/api/applications',applicationData)
}