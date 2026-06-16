import { protectedFetch, serverFetch } from "@/lib/api/core/server"
import { getUserSession } from "@/lib/api/core/session"


export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
}

export const getLoggedInRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompany(user?.id)
}


export const getAllCompanies= async()=>{
    return protectedFetch('/api/companies')

}