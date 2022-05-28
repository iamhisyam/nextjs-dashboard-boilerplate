import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUsers, findUserByEmail, updateUser, createUser, deleteUserBulk } from '@/server/db';
import { ValidateSchema } from '@/shared/constants';
import validation from '@/server/middlewares/validation';
import { z } from 'zod';
import authSession from '@/server/middlewares/sessions';

const handler = nc(ncOptions);

handler.use(database);
handler.use(authSession);

handler.get(async (req, res) => {
    const { row, limit, sort, global, filter } = req.query
   
   
    const {users, count} = await findUsers(req.db, {
        row: parseInt(row), 
        limit:  parseInt(limit), 
        sort: JSON.parse(sort),
        global: JSON.parse(global),
        filter: JSON.parse(filter)
    });

    res.status(201).json({
        success: true, data: {
            users,
            count
        }
    })
})

handler.post(
    validation(
        z.object({
            name: ValidateSchema.user.name,
            email: ValidateSchema.user.email,
            password: ValidateSchema.user.password,
            userRoleCode: ValidateSchema.user.userRoleCode,
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {

        const { name, email, password, userRoleCode } = req.body


        if (await findUserByEmail(req.db, email)) {
            res.status(400).json({
                success: false, 
                    error: "The email has already been taken"
                
            })
            return;
        }


        const user = await createUser(req.db, { name, email, password, userRoleCode })


        res.status(201).json({
            success: true, data: {
                user
            }
        })


    })


handler.patch(
    validation(
        z.object({
            id: ValidateSchema.user.id,
            name: ValidateSchema.user.name.optional(),
            email: ValidateSchema.user.email.optional(),
            bio: ValidateSchema.user.bio.optional(),
            password: ValidateSchema.user.password.optional(),
            userRoleCode: ValidateSchema.user.userRoleCode.optional(),
            imageUrl: ValidateSchema.user.imageUrl.optional(),
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {

        const { name, email, id, userRoleCode, bio } = req.body

        const user = await updateUser(req.db, { name, email, id, userRoleCode, bio, imageUrl })
        //fix for bigInt parsing to JSON
        user.verifiedAt = user.verifiedAt.toString()

        res.status(201).json({
            success: true, data: {
                user
            }
        })
})

handler.delete(
    validation(
        z.object({
            ids: ValidateSchema.user.ids,
        })
            .strict()
    ),
    async(req,res)=>{
        const { ids } = req.body
  
    const users = await deleteUserBulk(req.db, ids);

    res.status(200).json({
        success: true, data: {
            users
        }
    })
})



export default handler;