'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createJob = async(newJobData)=>{
    const res = await fetch(`${baseUrl}/api/jobs`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(newJobData)
    })


return res.json()
}

export const deleteJob = async (jobId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${jobId}`, {
        method: 'DELETE',
    })
    return res.json()
}