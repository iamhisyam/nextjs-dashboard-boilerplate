import {Group, Navbar, Text,  createStyles} from '@mantine/core'
import { LayoutDashboard, ChevronLeft, ChevronRight , Settings, Database, Users, User,Folder } from 'tabler-icons-react';

import { LinksGroup }  from '@/components/Dashboard/NavbarLinksGroup'




// const iconList = 
//     {   
//         chevronUp: <ChevronUp size={16}/>, 
//         dashboard: <LayoutDashboard size={16}/>,
//         settings: <Settings size={16}/>,
//         user: <User size={16}/>,
//         users: <Users size={16}/>,
//         database: <Database size={16}/>,
//         folder: <Folder size={16}/>,
//     }


const menuList = [
    {
        name: "Dashboard",
        slug: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Master",
        slug: "#",
        icon: Database,
        subMenu: [
            {
                name: "Department",
                slug: "/dashboard/setting",
     

            },
            {
                name: "Grade",
                slug: "/dashboard/setting",
     

            },
            {
                name: "Job",
                slug: "/dashboard/setting",
       

            }
        ]
    },
    {
        name: "Settings",
        slug: "#",
        icon: Settings,
        subMenu: [
            {
                name: "Users",
                slug: "/dashboard/master/users",
            },
            {
                name: "Menu Auth",
                slug: "/dashboard/master/menu_auth",
            }
            ,
            {
                name: "Setting",
                slug: "/dashboard/setting",
            }
        ]

    }
]


export default function NavigationNested({hidden}){
    const { classes } = useStyles();
    const menus = menuList.map((menu,id)=>( <LinksGroup {...menu} key={id} /> ))
    return(
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
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
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
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  }));