import prismaDB from '@/server/config/prisma'
export default function database(req, res, next) {
    try {
        req.db = prismaDB;
        next();
    } catch (error) {
        next(error)
    }
}