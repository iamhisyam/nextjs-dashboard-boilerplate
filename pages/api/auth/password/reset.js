import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserByEmailAndPassword, findUserByEmail, createToken, findAndDeleteTokenByIdAndType, updateUserPassword } from '@/server/db';
import validation from '@/server/middlewares/validation';
import { ValidateSchema } from 'shared/constants';
import { z } from 'zod';
import { sendEmailWithTemplate } from '@/lib/mailersend';


const handler = nc(ncOptions);

handler.use(database);


handler.post(
    validation(
        z.object({
            password: ValidateSchema.user.password,
            confirmPassword: ValidateSchema.user.confirmPassword,
            token: ValidateSchema.user.token
        })
            .strict()
    ),
    async (req, res) => {

        const { password, token } = req.body
        const deletedToken = await findAndDeleteTokenByIdAndType(
            req.db,
            token,
            'passwordReset'
        );
        if (!deletedToken) {
            res.status(403).end();
            return;
        }

        const resetPassword = await  updateUserPassword(req.db,{
            id: deletedToken.userId,
            password

        })


        if (!resetPassword) {
            res.status(403).end();
            return;
        }

        res.status(204).end();


    })


export default handler;