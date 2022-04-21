import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findMenuAuths } from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);

handler.get(async (req, res) => {
    const userRoleCode = req.query.userRoleCode
    const menuAuths = await findMenuAuths(req.db, { userRoleCode });
    const menus = menuAuths.map(({
        menu: { id, name, slug, subMenus, iconName }
    }) => {
        return {
            id,
            name,
            slug,
            iconName,
            ...(subMenus && {
                subMenus: subMenus.map(({ slug, name, id }) => ({ slug, name, id }))
            })
        }
    })
    res.status(201).json({
        status: "success", data: {
            menuAuths: menus
        }
    })
})

export default handler;