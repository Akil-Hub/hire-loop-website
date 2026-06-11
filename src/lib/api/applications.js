import { serverFetch } from "@/lib/api/core/server"

export const getApplicationByApplicant = async (applicantId)=>{
    return serverFetch(`/api/applications?applicantId=${applicantId}`)

}