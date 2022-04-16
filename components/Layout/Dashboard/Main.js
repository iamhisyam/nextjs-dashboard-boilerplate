import React, { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Avatar,
    
} from '@mantine/core';
import Navigation from './Navigation';
import ProfileMenu from './Avatar';

export default function Main({ children }) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            // asideOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navigation hidden={!opened} />
            }
            // aside={
            //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //         <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            //             <Text>Application sidebar</Text>
            //         </Aside>
            //     </MediaQuery>
            // }
            footer={
                <Footer height={60} p="md">
                    <p className="text-xs text-gray-400  mb-4 ml-4">by <a className="text-blue-800" href="https://ahisyam.com"> ahisyam</a> @ 2022 All right reserved</p>
                </Footer>
            }
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <div className='flex w-full justify-between'>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up-right-square-fill text-blue-800" viewBox="0 0 16 16">
                                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
                                </svg>
                                <h1 className="text-lg font-bold ">Payroll<span className="text-blue-800">Kita</span></h1>
                            </div>
                            <ProfileMenu>
                                <Avatar color={theme.colors.blue[9]} radius="xl" />
                            </ProfileMenu>
                        </div>
                    </div>
                </Header>
            }
        >

            {children}
        </AppShell>
    );
}