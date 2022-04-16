import { Navbar, UnstyledButton, Stack, Text, Anchor, Group, Accordion } from '@mantine/core'
import { LayoutDashboard, ChevronUp, Settings, Database, Users, User,Folder } from 'tabler-icons-react';
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useMeasure from 'react-use-measure'



const iconList = 
    {   
        chevronUp: <ChevronUp size={16}/>, 
        dashboard: <LayoutDashboard size={16}/>,
        settings: <Settings size={16}/>,
        user: <User size={16}/>,
        users: <Users size={16}/>,
        database: <Database size={16}/>,
        folder: <Folder size={16}/>,
    }


const menuList = [
    {
        name: "Dashboard",
        slug: "/dashboard",
        icon: "dashboard"
    },
    {
        name: "Master",
        slug: "#",
        icon: "database",
        subMenu: [
            {
                name: "Department",
                slug: "/dashboard/setting",
                icon: "folder",

            },
            {
                name: "Grade",
                slug: "/dashboard/setting",
                icon: "folder",

            },
            {
                name: "Job",
                slug: "/dashboard/setting",
                icon: "folder",

            }
        ]
    },
    {
        name: "Settings",
        slug: "/dashboard/setting",
        icon: 'settings'

    }
]


const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => { ref.current = value }, [value])
    return ref.current
}

const MainLink = ({ name, slug, subMenu, icon }) => {
    const [open, setOpen] = useState(false);
    const previous = usePrevious(open)
    const [ref, { height: viewHeight }] = useMeasure()

    // const openAnimation = useSpring({ 
    //     from : {
    //         opacity : 0,
    //         maxHeight: "50px"
    //     },
    //     to:{
    //         opacity: 1,
    //         maxHeight: open ? "100%" : "50px"
    //     },
    //     config: { duration: 200}

    // })

    const {height, opacity, y } = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
        to: {
            height: open ? viewHeight : 0,
            opacity: open ? 1 : 0,
           // y: open ? 0 : 0,
        }
    })

    const subMenuAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        config: { duration: 300 }
    })


    const iconAnimation = useSpring({
        from: {
            transform: "rotate(90deg)"
        },
        to: {
            transform: open ? "rotate(180deg)" : "rotate(90deg)"
        },
        config: { duration: 120 }
    })

    const showSubmenu = () => setOpen(!open);
    return (
        <>
            <UnstyledButton
           
                onClick={subMenu && showSubmenu}
                sx={(theme) => ({
                    position: 'relative',
                    overflowX: 'hidden',
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.blue[3] : theme.colors.blue[0],
                    },
                })}
            >
                <Link href={slug}>
                    <Group position="apart">
                        <Group>
                            {iconList[icon] || null}
                             <Text size='sm'>{name}</Text>
                        </Group>
                        {subMenu ? <animated.i style={iconAnimation}> <ChevronUp size={16}/> </animated.i> : null}
                    </Group>
                </Link>
            </UnstyledButton>

            {subMenu &&
                <animated.div  style={{height,opacity}} >
                    <Stack spacing="xs"  ref={ref}  >
                        {subMenu.map(({ name, slug, icon }, id) =>
                            <UnstyledButton
                                key={id}
                                onClick={(e) => e.stopPropagation()}
                                sx={(theme) => ({
                                    display: 'block',
                                    width: '100%',
                                    paddingLeft: theme.spacing.lg,
                                    paddingBottom: theme.spacing.xs/2,
                                    paddingTop: theme.spacing.xs/2,

                                    borderRadius: theme.radius.sm,
                                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                                    '&:hover': {
                                        backgroundColor:
                                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                                    },
                                })}
                            >
                                <Link href={slug}  >
                                    <Group>
                                    {iconList[icon] || null}
                                    <Text size="sm" style={{ paddingLeft: 10 }}>{name}</Text>
                                    </Group>
                                    
                                </Link>
                            </UnstyledButton>
                        )}
                    </Stack>
                </animated.div>
            }
       </>
    )
}

const MemoizeMainLink = React.memo(MainLink)

const Navigation = ({ hidden }) => {

    return (
        <Navbar hidden={hidden} p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="xs">
                {menuList.map((menu, id) => (
                    <MemoizeMainLink {...menu} key={id} />
                ))}
            </Navbar.Section>

        </Navbar>

    )
}

export default Navigation;