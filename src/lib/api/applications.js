import { serverFetch } from "@/lib/api/core/server"

export const getApplicationByApplicant = async (applicantId,options={})=>{
    return serverFetch(`/api/applications?applicantId=${applicantId}`,options)

}