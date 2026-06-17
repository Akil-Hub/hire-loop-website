'use server'

import { getUserToken } from "@/lib/api/core/session"

const baseUrl = process.env.EXPRESS_API_URL

// auth header for passing token into api call

export const authHeader = async()=>{
    const token = await getUserToken()
    const header = token ? {
        authorization : `Bearer ${token}`

    }:{}
    return header
}


export const serverFetch = async (path,options={}) => {
    const res = await fetch(`${baseUrl}${path}`,{
        cache:'no-store',
        ...options
    })
    return res.json()
}

export const protectedFetch = async(path)=>{
    const res = await fetch(`${baseUrl}${path}`,{
    
        headers: await authHeader()
    })
    return res.json()
}



export const serverMutation = async (path, data,method='POST') => {
   try {
     const res = await fetch(`${baseUrl}${path}`, {
        method:method,
        headers: {
            'content-type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data)
    })
console.log('server mutation errro ',res)

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} — ${text}`);
    }


    return res.json()
   } catch (error) {
    console.log(error)
   }
}