import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import { findUserByEmailAndPassword } from '@/server/db';
import validation from '@/server/middlewares/validation';
import { ValidateSchema } from 'shared/constants';
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
            //.strict()
    ),
    async (req, res) => {

        const { email, password } = req.body


        const user = await findUserByEmailAndPassword(req.db, email, password);

        if (user ) {
            delete user.password

            // if (!user.verified) {
            //     res.status(400).json({
            //         success: false, error: "User not verified yet"
            //     })
            //     return;
            // } 

            res.json({
                success: true, data: {
                    user
                }
            })
            return;

        } else {

            res.status(400).json({
                success: false, error: "Cannot find user"

            })
            return;

        }


    })


export default handler;