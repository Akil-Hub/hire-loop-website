'use server'
const baseUrl = process.env.EXPRESS_API_URL

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`)
    return res.json()
}


export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })


    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} — ${text}`);
    }


    return res.json()
}