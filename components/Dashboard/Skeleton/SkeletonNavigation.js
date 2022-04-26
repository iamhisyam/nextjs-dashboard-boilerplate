const { Stack, Navbar, Skeleton, Group } = require("@mantine/core")

export const SkeletonNavigation = ({hidden}) => {

    return (
        <Navbar hidden={hidden} height={800} width={{ sm: 220 }} p="md" >
            <Navbar.Section>

            </Navbar.Section>
            <Navbar.Section >
                <Stack>
                    <Group>
                        <Skeleton height={20} />
                    </Group>
                    <Group>
                        <Skeleton height={20} />
                    </Group>
                </Stack>

            </Navbar.Section>

            <Navbar.Section>

            </Navbar.Section>

        </Navbar>

    )
}