'use server'

import { serverMutation } from "@/lib/api/core/server"

export const createSubscription = async(subInfo)=>{
    return serverMutation('/api/subscriptions',subInfo)
}