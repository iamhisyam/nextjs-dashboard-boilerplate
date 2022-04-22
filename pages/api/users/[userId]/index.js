import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { deleteUserById, findUserById} from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);

handler.get(async(req,res)=>{
    const userId = req.query.userId
    const user = await findUserById(req.db, userId);

    res.status(201).json({
        status: "success", data: {
            user
        }
    })
})


handler.delete(async(req,res)=>{
    const userId = req.query.userId
    const user = await deleteUserById(req.db, userId);

    res.status(201).json({
        status: "success", data: {
            user
        }
    })
})

export default handler;