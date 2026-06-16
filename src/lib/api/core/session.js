import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getUserSession = async()=>{
    const session = await auth.api.getSession({
        headers: await headers()

    })
    return session?.user || null
}

// get token from the  bettert auth session 

export const getUserToken = async ()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.session?.token || null
}







export const requireRole = async(role)=>{
    const user =await getUserSession()

    if (!user) {
        redirect('/auth/signIn')
        
    }
    if (user?.role != role) {
        redirect('/unauthorized')
    }
    return user


}