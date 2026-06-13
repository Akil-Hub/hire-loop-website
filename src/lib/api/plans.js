import { serverFetch } from "@/lib/api/core/server"

export const getPlanById = async (planId) => {
    return serverFetch(`/api/plans?plan_id=${planId}`)

}