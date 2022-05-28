import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'
import database from '@/server/middlewares/database'
import authSession from '@/server/middlewares/sessions';

import multer from 'multer';
import { imageUpload } from 'lib-services/imagekit';
// const upload = multer({ dest: '/tmp' });

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp')
//     },
//     filename: function (req, file, cb) {
//     console.log(file)
//     const filetype = file.mimetype.split("/")[1] || ""
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + "."+filetype)
//     }
//   })

// const upload = multer({ storage: storage })

import { promises as fs } from "fs";
import { updateUser } from '@/server/db';

const handler = nc(ncOptions);

handler.use(database);
handler.use(authSession)

handler.post(
    upload.single("avatar"),
    async (req, res) => {
        const file = req.file

        const { userId } = req.body
        console.log(file)
        console.log(file.originalname)
        // const data = await fs.readFile(file.path, "binary");
        const resp = await imageUpload(file.buffer.toString("base64"), file.originalname, `/users/${userId}/avatar`)

        if (!resp) {
            res.status(403).json({
                success: false,
                error: "upload file fail"
            })
            return
        }

        const user = await updateUser(req.db, { id: userId, imageUrl: resp.url })

        if (!user) {
            res.status(403).json({
                success: false,
                error: "update user fail"
            })
            return
        }

        res.status(201).json({
            success: true,
            data: resp
        })
    })


export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;