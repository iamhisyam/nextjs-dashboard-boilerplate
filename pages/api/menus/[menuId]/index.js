import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { deleteMenuById, findMenuById, deleteMenuAuthById} from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);

handler.get(async(req,res)=>{
    const menuId = req.query.menuId
    const menu = await findMenuById(req.db, menuId);

    res.status(200).json({
        success: true, data: {
            menu
        }
    })
})


handler.delete(async(req,res)=>{
    const menuId = req.query.menuId
    const menuAuth = await deleteMenuAuthById(req.db,{menuId})
    const menu = await deleteMenuById(req.db, menuId);

    res.status(200).json({
        success: true, data: {
            menu,
            menuAuth
        }
    })
})

export default handler;