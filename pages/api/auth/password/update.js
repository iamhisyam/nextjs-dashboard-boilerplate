import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserByEmailAndPassword, updateUserPassword } from '@/server/db';
import validation from '@/server/middlewares/validation';
import { ValidateSchema } from 'shared/constants';
import { z } from 'zod';



const handler = nc(ncOptions);

handler.use(database);


handler.post(
    validation(
        z.object({
            newPassword: ValidateSchema.user.password,
            confirmPassword: ValidateSchema.user.confirmPassword,
            oldPassword: ValidateSchema.user.password,
            email: ValidateSchema.user.email
        })
            .strict()
    ),
    async (req, res) => {

        const { newPassword, oldPassword, email } = req.body
        const user = await findUserByEmailAndPassword(req.db,email,oldPassword);
        if (!user) {
            res.status(403).json({success:false,error:"Wrong password"})
            return;
        }

        const updatePassword = await  updateUserPassword(req.db,{
            id: user.id,
            password: newPassword

        })


        if (!updatePassword) {
            res.status(403).json({success:false,error:"Failed"});
            return;
        }

        res.status(204).end();


    })


export default handler;