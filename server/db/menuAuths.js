export const findMenuAuths =
    async (
        db,
        filter
    ) => {

        const { userRoleCode } = filter
        const menuAuths = await db.menuAuth.findMany({
            where: {
                menu :{
                    parentMenuId : null
                },
                ...(userRoleCode && { userRoleCode })
            },
            include : {
                menu : {
                    include : {
                        subMenus : true
                    }
                }
            }
        });

        return menuAuths
    }