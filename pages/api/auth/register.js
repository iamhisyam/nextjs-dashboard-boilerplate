import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'


import { ValidateSchema } from 'shared/constants'
import validation from '@/server/middlewares/validation'
import { z } from 'zod'
import { createUser, findUserByEmail } from '@/server/db'

const handler = nc(ncOptions);

handler.use(database);

handler.post(
    validation(
        z.object({
            name: ValidateSchema.user.name,
            email: ValidateSchema.user.email,
            password: ValidateSchema.user.password,
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {
       
        const { name, email, password } = req.body


        if (await findUserByEmail(req.db, email)) {
            res.status(400).json({
                success: false, 
                error: "The email has already been taken"
                
            })
            return;
        }


        const user = await createUser(req.db, { name, email, password })


        res.status(201).json({
            success: true, data: {
                user
            }
        })


    })


export default handler;