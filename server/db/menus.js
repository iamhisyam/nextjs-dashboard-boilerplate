
export const findMenus =
    async (
        db,
        params
    ) => {
        const { row, limit, sort, global, filter } = params
        const trans = await db.$transaction([
            db.menu.count({
            }),
            db.menu.findMany({
                where: {

                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    iconName: true,
                    parentMenuId: true,
                    subMenus: true,
                    parentMenu: true,
                    menuAuths: true
                },


            })
        ])

        return { count: trans[0], menus: trans[1] }
    }

export const createMenu =
    async (db,
        {
            name,
            slug,
            iconName,
            parentMenuId
        }) => {


        const menu = await db.menu.create({
            data: {
                name,
                slug,
                iconName,
                ...(parentMenuId && { parentMenu : { connect: { id: parentMenuId }}})

            }
        })

        return menu;

    }

export const updateMenu =
    async (db,
        {
            id,
            name,
            slug,
            iconName,
            parentMenuId
        }) => {


        const menu = await db.menu.update({
            where: {
                id
            },
            data: {
                name,
                slug,
                iconName,
                ...(parentMenuId && { parentMenu : { connect: { id: parentMenuId }}})

            }
        })

        return menu;

    }

export const deleteMenuById = async (
    db,
    id
) => {
    const menu = await db.menu.delete({
        where: { id: parseInt(id) }
    });

    return menu
}

export const deleteMenuBulk = async (
    db,
    ids
) => {
    const menus = await db.menu.deleteMany({
        where: { id: { in: ids } }
    });

    return menus
}

export const findMenuById = async (
    db,
    id
) => {
    const menu = await db.menu.findUnique({
        where: { id },
        include: {
            subMenus: true,
            parentMenu: true,
            menuAuths: true
        }
    });

    return menu
}



