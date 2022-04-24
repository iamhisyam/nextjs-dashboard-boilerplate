import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserRoles } from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);

handler.get(async (req, res) => {
    const userRoles = await findUserRoles(req.db, {});

    res.status(201).json({
        status: "success", data: {
            userRoles
        }
    })
})


export default handler;