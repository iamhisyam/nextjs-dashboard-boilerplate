export const findMenuAuths =
    async (
        db,
        filter
    ) => {

        const { userRoleCode } = filter
        const menuAuths = await db.menuAuth.findMany({
            where: {
                menu: {
                    parentMenuId: null
                },
                ...(userRoleCode && { userRoleCode })
            },
            include: {
                menu: {
                    include: {
                        subMenus: true
                    }
                }
            },
            orderBy: {
                menu: {
                    id: "asc"
                }
            }
        });

        return menuAuths
    }


export const createMenuAuthBulk = async (db, { menuId, userRoleCodes }) => {
    const payload = userRoleCodes.map((role) => {
        return {
            userRoleCode: role,
            menuId: menuId
        };
    });

    const menu = await db.menuAuth.createMany({
        data: payload,
        skipDuplicates: true,
    });
    return menu;
}

export const deleteMenuAuthMany = async (db, { menuId, userRoleCodes }) => {
    return db.menuAuth
      .deleteMany({
        where: {
          menuId: parseInt(menuId),
          OR: [
            ...userRoleCodes.map((role) => {
              return { userRoleCode: { equals: role } };
            }),
          ],
        },
      })
      .then((menu) => menu || null);
  }

export const deleteMenuAuthById = async (db, { menuId }) => {
    return db.menuAuth
        .deleteMany({
            where: {
                menuId: parseInt(menuId)
            },
        })
        .then((menu) => menu || null);
}

export const deleteMenuAuthBulk = async (
    db,
    ids
) => {
    const menuAuths = await db.menuAuth.deleteMany({
        where: { menuId: { in: ids } }
    });

    return menuAuths
}