import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUsers } from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);

handler.get(async(req,res)=>{
    const users = await findUsers(req.db,{});

    res.status(201).json({
        status: "success", data: {
            users
        }
    })
})

export default handler;