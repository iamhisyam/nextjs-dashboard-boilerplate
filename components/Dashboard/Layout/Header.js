import { Container, Text, Breadcrumbs, Anchor, Divider, Group, Stack } from '@mantine/core'

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
            <Container size="xl" sx={(theme) => ({
                
                position: "relative",
                backgroundColor: "white",
                margin: -theme.spacing.md,
                
                padding: theme.spacing.md
            })}>
                <Group>
                    <Text size='sm'>{title}</Text>
                    <Breadcrumbs
                        styles={{
                            separator: { color: "#adb5bd" },
                            root: { color: "#adb5bd" },
                        }}
                    >{links}</Breadcrumbs>
                </Group>

            </Container>
        </>
    )
}

export default Header;