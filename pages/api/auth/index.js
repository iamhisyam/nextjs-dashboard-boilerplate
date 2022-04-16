import nc from 'next-connect'
import { ncOptions } from '@/server/config/ncOptions'

const handler = nc(ncOptions);

handler.get(async (req, res) => {
     res.json({
        status: "success", data: {
            hello: "world!"
        }
    })
})

export default handler;