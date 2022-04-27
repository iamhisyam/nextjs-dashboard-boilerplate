import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserRoles } from '@/server/db';
import authSession from '@/server/middlewares/sessions';


const handler = nc(ncOptions);

handler.use(database);
handler.use(authSession)

handler.get(async (req, res) => {
    const userRoles = await findUserRoles(req.db, {});

    res.status(201).json({
        success: true, data: {
            userRoles
        }
    })
})


export default handler;