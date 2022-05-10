import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findMenus, 
    updateMenu, 
    createMenu, 
    deleteMenuBulk, 
    createMenuAuthBulk,
    deleteMenuAuthById,
    deleteMenuAuthBulk
} from '@/server/db';
import { ValidateSchema } from '@/shared/constants';
import validation from '@/server/middlewares/validation';
import { z } from 'zod';
import authSession from '@/server/middlewares/sessions';

const handler = nc(ncOptions);

handler.use(database);
handler.use(authSession);

handler.get(async (req, res) => {

   
    const {menus, count} = await findMenus(req.db, {
    });

    res.status(200).json({
        success: true, data: {
            menus,
            count
        }
    })
})

handler.post(
    validation(
        z.object({
            name: ValidateSchema.menu.name,
            slug: ValidateSchema.menu.slug,
            parentMenuId: ValidateSchema.menu.parentMenuId.optional(),
            userRoleCode: ValidateSchema.menu.userRoleCode,
            iconName: ValidateSchema.menu.iconName.optional()
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {

        const { name, slug, iconName, parentMenuId, userRoleCode } = req.body



        const menu = await createMenu(req.db, { name, slug, parentMenuId, iconName })

        if(!menu) res.status(403).json({success:false,error:"create menu failed"})

        const menuAuth = await createMenuAuthBulk(req.db,{
            menuId: menu.id,
            userRoleCodes: userRoleCode
        })

        if(!menuAuth) res.status(403).json({success:false,error:"create menu auth failed"})

        res.status(201).json({
            success: true, data: {
                menu,
                menuAuth
            }
        })


    })


handler.patch(
    validation(
        z.object({
            id: ValidateSchema.menu.id,
            name: ValidateSchema.menu.name,
            slug: ValidateSchema.menu.slug,
            iconName: ValidateSchema.menu.iconName.optional(),
            parentMenuId: ValidateSchema.menu.parentMenuId.optional(),
            userRoleCode: ValidateSchema.menu.userRoleCode
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {

        const { id, name, slug, iconName, parentMenuId, userRoleCode } = req.body

        const deleteMenuAuth = await deleteMenuAuthById(req.db,{menuId: id})

        if(!deleteMenuAuth)res.status(403).json({success:false,error:"create menu failed"})

        const menu = await updateMenu(req.db, {id, name, slug, iconName, parentMenuId })

        if(!menu) res.status(403).json({success:false,error:"create menu failed"})

        const menuAuth = await createMenuAuthBulk(req.db,{
            menuId: menu.id,
            userRoleCodes: userRoleCode
        })

        if(!menuAuth) res.status(403).json({success:false,error:"create menu auth failed"})

        res.status(201).json({
            success: true, data: {
                menu,
                menuAuth
            }
        })
})

handler.delete(
    validation(
        z.object({
            ids: ValidateSchema.menu.ids,
        })
            .strict()
    ),
    async(req,res)=>{
        const { ids } = req.body
    const menuAuths = await deleteMenuAuthBulk(req.db,ids)
    const menus = await deleteMenuBulk(req.db, ids);

    res.status(200).json({
        success: true, data: {
            menus,
            menuAuths
        }
    })
})



export default handler;