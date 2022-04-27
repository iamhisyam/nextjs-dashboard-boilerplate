import { Group, Navbar, Text, createStyles, Skeleton } from '@mantine/core'
import { LayoutDashboard,  Settings, Database, Users, User, Folder } from 'tabler-icons-react';

import { LinksGroup } from '@/components/Dashboard/NavbarLinksGroup'

import { useSession } from "next-auth/react"
import { useMenuAuths } from '@/lib/menuAuths';
import { useUser } from '@/lib/users';
import { useRouter } from 'next/router';
import { SkeletonNavigation } from '../Skeleton/SkeletonNavigation';





const iconList = 
    {   
   
        dashboard: LayoutDashboard,
        settings: Settings,
        user: User,
        users: Users,
        database: Database,
        folder: Folder,
    }


// const menuList = [
//     {
//         name: "Dashboard",
//         slug: "/dashboard",
//         icon: LayoutDashboard
//     },
//     {
//         name: "Master",
//         slug: "#",
//         icon: Database,
//         subMenu: [
//             {
//                 name: "Department",
//                 slug: "/dashboard/setting",


//             },
//             {
//                 name: "Grade",
//                 slug: "/dashboard/setting",


//             },
//             {
//                 name: "Job",
//                 slug: "/dashboard/setting",


//             }
//         ]
//     },
//     {
//         name: "Settings",
//         slug: "#",
//         icon: Settings,
//         subMenu: [
//             {
//                 name: "Users",
//                 slug: "/dashboard/master/users",
//             },
//             {
//                 name: "Menu Auth",
//                 slug: "/dashboard/master/menu_auth",
//             }
//             ,
//             {
//                 name: "Setting",
//                 slug: "/dashboard/setting",
//             }
//         ]

//     }
// ]


export default function NavigationNested({ hidden }) {
    const { classes } = useStyles();
    const { data: session, status } = useSession()

    
    
    const { user, isLoading } = useUser(session?.userId)
  
  

    const { menuAuths, isLoading : loadingMenuAuth } = useMenuAuths(user.userRoleCode);

    if(status==="loading")return <SkeletonNavigation hidden={hidden}/>


    const menuList =  menuAuths.map(({name,slug, iconName, subMenus},id)=>({
        name,
        slug,
        ...(subMenus.length > 0 && { subMenu: subMenus}),
        icon: iconList[iconName]
    })) 


    const menus = menuList.map((menu, id) => (<LinksGroup {...menu} key={id} />))
    return (
        <Navbar hidden={hidden} height={800} width={{ sm: 220 }} p="md" >
            <Navbar.Section>
                <Group position='apart'>
                    <Text size='sm' color="gray">Navigation</Text>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow>
                {menus}
            </Navbar.Section>

            <Navbar.Section>
                User
            </Navbar.Section>

        </Navbar>
    )
}


const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },
}));