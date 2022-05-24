import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'


import { ValidateSchema } from 'shared/constants'
import validation from '@/server/middlewares/validation'
import { z } from 'zod'
import { createToken, createUser, findUserByEmail } from '@/server/db'
import { sendEmailWithTemplate } from '@/lib/mailersend'

const handler = nc(ncOptions);

handler.use(database);

handler.post(
    validation(
        z.object({
            email: ValidateSchema.user.email
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {
       const { email } = req.body
        const user = await findUserByEmail(req.db, email);

        if (!user) {
            res.status(400).json({
                success: false, 
                error: "User not found"             
            })
            return;
        }

        const token = await createToken(req.db, {
            userId: user.id,
            type: "userVerification",
            expireAt: new Date(Date.now() + 1000 * 60 * 20)
        })


        const substitutions = [{
            var: 'linkVerification',
            value: `${process.env.WEB_URI}/verify/${token.id}`
        }]

        // console.log(user)
        // console.log(token)
        // console.log(substitutions)

        await sendEmailWithTemplate({
            name: user.name,
            email,
            substitutions,
            templateId: "zr6ke4n1ezegon12"
        })

        res.status(204).end();


    })


export default handler;