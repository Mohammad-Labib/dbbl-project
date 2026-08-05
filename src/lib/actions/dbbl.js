"use server"


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createDbbl = async (newDbbl) =>{
    const res = await fetch(`${baseUrl}/api/dbbl`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDbbl),
    });

    return res.json();
}