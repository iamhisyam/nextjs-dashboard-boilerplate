import bcrypt from 'bcrypt'

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
                password: hashPassword
            }
        })

        return user;

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

