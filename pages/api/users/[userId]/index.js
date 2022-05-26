import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { deleteUserById, findUserById} from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);

handler.get(async(req,res)=>{
    const userId = req.query.userId
    const user = await findUserById(req.db, userId);

    //fix for bigInt parsing to JSON
    user.verifiedAt = user.verifiedAt.toString()
    delete user.password

    res.status(201).json({
        success: true, data: {
            user
        }
    })
})


handler.delete(async(req,res)=>{
    const userId = req.query.userId
    const user = await deleteUserById(req.db, userId);

    res.status(201).json({
        success: true, data: {
            user
        }
    })
})

export default handler;