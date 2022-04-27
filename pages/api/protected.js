import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'

import { getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"

const handler = nc(ncOptions);

handler.use(database);

handler.get(async (req, res) => {
    const session = await getSession({req})
    if(session){
        const token = await getToken({req})
        res.json({
            success: true, data: {
                token
            }
        })
    }else{
        res.status(401).json({
            success: false, error: "You must login to access this data"
        })
    }
     
})

export default handler;