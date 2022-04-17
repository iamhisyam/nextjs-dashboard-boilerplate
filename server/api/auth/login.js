import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserByEmailAndPassword } from '@/server/db';
import validation from '@/server/middlewares/validation';
import { ValidateSchema } from '@/server/config/constants';
import { z } from 'zod';


const handler = nc(ncOptions);

handler.use(database);

handler.post(
    validation(
        z.object({
            email: ValidateSchema.user.email,
            password: ValidateSchema.user.password,
            csrfToken: z.string().optional()
        })
            // enable strict
            .strict()
    ),
    async (req, res) => {

        const { email, password } = req.body


        const user = await findUserByEmailAndPassword(req.db, email, password);

        if (user) {
            delete user.password
            res.json({
                status: "success", data: {
                    user
                }
            })
            return;

        } else {

            res.json({
                status: "fail", data: {
                    message: "Cannot find"
                }
            })
            return;

        }


    })


export default handler;