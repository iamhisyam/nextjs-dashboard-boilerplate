import { Container, Text, Breadcrumbs, Anchor, Divider, Group, Stack, Box } from '@mantine/core'

const Header = ({ title, items }) => {

    const links = items.map(({ title, href }, id) => (
        <Anchor size="sm" href={href} key={id}
            sx={(theme) => ({
                color: theme.colors.gray[5],
            })}
        >
            {title}
        </Anchor>
    ))
    return (
        <>
            <Box size="xl" sx={(theme) => ({
                position: "relative",
                backgroundColor: "white",
                margin: -theme.spacing.md,
                
                padding: theme.spacing.md
            })}>
                <Group>
                    <Text size='lg' weight={700}>{title}</Text>
                    <Breadcrumbs
                    separator="-"
                        styles={{
                            separator: { color: "#adb5bd" },
                            root: { color: "#adb5bd" },
                        }}
                    >{links}</Breadcrumbs>
                </Group>

            </Box>
        </>
    )
}

export default Header;