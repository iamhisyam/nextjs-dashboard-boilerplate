import { Collapse, Group, Text, UnstyledButton, ThemeIcon, Box, createStyles } from '@mantine/core'
import { ChevronRight, ChevronLeft } from 'tabler-icons-react';
import { useState } from 'react'

import Link from 'next/link'

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));



export function LinksGroup({ icon: Icon , name,slug, initiallyOpened, subMenu }) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(subMenu);
    // console.log(hasLinks)
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? ChevronRight : ChevronLeft;
    const items = (hasLinks ? subMenu : []).map(({ slug, name },id) => (
        <Link passHref  href={slug}  key={id} >
            <Text
               
                className={classes.link}
                component='a'
               
               
            >
                {name}
            </Text>
        </Link>
    ))


    return (
        <>
            <UnstyledButton onClick={() => setOpened(o => !o)} className={classes.control}>
                <Group position='apart' spacing={0}>
                    {!hasLinks ? 
                    
                
                    <Link href={slug} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="light" size={30}>
                        {Icon && <Icon size={18} />}
                    </ThemeIcon>
                    <Box ml="md">{name}</Box>
                    </Box>
                    </Link>
                    :
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="light" size={30}>
                        {Icon && <Icon size={18} />}
                    </ThemeIcon>
                    <Box ml="md">{name}</Box>
                    </Box>
                    }
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size={14}
                            style={{
                                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                            }}
                        />
                    )}
                </Group>

            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    )

}