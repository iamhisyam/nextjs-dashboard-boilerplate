import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserByEmailAndPassword, findUserByEmail, createToken } from '@/server/db';
import validation from '@/server/middlewares/validation';
import { ValidateSchema } from 'shared/constants';
import { z } from 'zod';
import { sendEmailWithTemplate } from 'lib-services/mailersend';


const handler = nc(ncOptions);

handler.use(database);

handler.put(
    validation(z.object({
        password: ValidateSchema.user.password,
        token: z.string().min(1),
    })),
    async (req, res) => {
        const { password, token } = req.body
        const deletedToken = await findAndDeleteTokenByIdAndType(
            req.db,
            req.body.token,
            'passwordReset'
        );
        if (!deletedToken) {
            res.status(403).end();
            return;
        }

    }
)

handler.post(
    validation(
        z.object({
            email: ValidateSchema.user.email,
        })
            .strict()
    ),
    async (req, res) => {

        const { email } = req.body


        const user = await findUserByEmail(req.db, email);

        if (!user) {
            res.status(400).json({
                success: false,
                error: "cannot find the user"
            })
            return;

        }

        const token = await createToken(req.db, {
            userId: user.id,
            type: "passwordReset",
            expireAt: new Date(Date.now() + 1000 * 60 * 20)
        })


        const substitutions = [{
            var: 'linkResetPassword',
            value: `${process.env.WEB_URI}/forgot-password/${token.id}`
        }]

        console.log(user)
        console.log(token)
        console.log(substitutions)

        await sendEmailWithTemplate({
            name: user.name,
            email,
            substitutions,
            templateId: "3z0vklo6r6pl7qrx"
        })

        res.status(204).end();


    })


export default handler;