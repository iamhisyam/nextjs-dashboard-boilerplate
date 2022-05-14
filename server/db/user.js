import bcrypt from 'bcrypt'

export const findUsers =
    async (
        db,
        params
    ) => {
        const { row, limit, sort, global, filter } = params
        const trans = await db.$transaction([
            db.user.count({
                where : {
                    ...(global && { OR : global}),
                    ...(filter && { AND : filter})
                },
            }),
            db.user.findMany({
            where : {
                ...(global && { OR : global}),
                ...(filter && { AND : filter})
            },
            orderBy: sort,
            skip:row,
            take:limit,
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
            

        })
        ])
        
        return {count: trans[0] ,users: trans[1] }
    }

export const createUser =
    async (db,
        {
            name,
            email,
            password,
            userRoleCode
        }) => {

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                name,
                email,
                ...(userRoleCode && { userRoleCode: userRoleCode } || { userRoleCode: "member" }  ),
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
            userRoleCode,
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
                userRoleCode,
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


export const findUserRoles = async (db,{}) => {
    const userRoles = await db.userRole.findMany()
    return userRoles;
}


