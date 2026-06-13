'use server'

import { serverMutation } from "@/lib/api/core/server"


export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData)
}





// lib/actions/companies.js
import { serverFetch } from '@/lib/api/core/server'

export const updateCompany = async (id, payload) => {
    return serverFetch(`/api/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
}