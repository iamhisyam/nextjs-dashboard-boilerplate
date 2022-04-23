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
                userRoleCode: true,          
                userRole : {
                    select : {
                        code: true,
                        name : true
                    }
                } 
            },
            

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

export const updateUser =
    async (db,
        {
            id,
            name,
            email,
            password
        }) => {

        let hashPassword = password && await bcrypt.hash(password, 10);

        const user = await db.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                ...(password && { password: hashPassword })
            }
        })

        return user;

}

export const deleteUserById = async (
    db,
    id
) => {
    const user = await db.user.delete({
        where: { id :id }
    });

    return user
}

export const deleteUserBulk = async (
    db,
    ids
) => {
    const user = await db.user.deleteMany({
        where: { id : { in : ids }}
    });

    return user
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
                    menuAuths: {
                        include: {
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


