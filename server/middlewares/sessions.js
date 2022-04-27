import { getSession } from "next-auth/react";

export default async function authSession(req, res, next) {
    const session = await getSession({ req })
    
    if(!session)return res.status(401).json({
        success: false,
        error: "Unauthorized access"
    })
    return next();

}