import bcrypt from 'bcrypt'

export const findUsers =
    async (
        db,
        filter
    ) => {
        const user = await db.user.findMany({
            select: {
                id: true,
                name: true,
                image: true,
                email: true,
                userRole: true
            }
            // where: {
            //     ...(filter && { filter })
            // }
        });

        return user
    }

export const createUser =
    async (db,
        {
            name,
            email,
            password
        }) => {

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                name,
                email,
                ...(password && { password: hashPassword })
            }
        })

        return user;

    }

export const findUserById = async (
    db,
    id
) => {
    const user = await db.user.findUnique({ 
        where: { id },
        include: {
            userRole: {
                include: {
                    menuAuths : {
                        include:{
                             menu: true
                        }
                    }
                }
            }
        } 
    });

    return user
}

export const findUserByEmail = async (
    db,
    email
) => {
    const user = await db.user.findUnique({ where: { email } });

    return user
}

export const findUserByEmailAndPassword = async (
    db,
    email,
    password
) => {
    const user = await findUserByEmail(db, email);

    if (!user) return null;

    const match = await bcrypt.compare(password, user.password)

    if (!match) return null;
    return user
}


