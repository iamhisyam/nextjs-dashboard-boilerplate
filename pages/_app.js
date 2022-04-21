import '../assets/global.css'

import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Template } from '@/components/Dashboard/Layout';
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast';

function App({ Component, pageProps: { session, ...pageProps } }) {
    const hasLayout = Component.getLayout
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <SessionProvider session={session}>
            <AppProvider>
                {hasLayout && getLayout(
                    <Component {...pageProps} />
                ) ||
                    <Template>
                        <Component {...pageProps} />
                    </Template>
                }
                <Toaster position='top-right'/>
            </AppProvider>
            </SessionProvider>
        </>
    )
}


const AppProvider = ({ children }) => (
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={{
            fontFamily: 'Poppins, sans-serif',
            /** Put your mantine theme override here */
            colors: {
                //tailwind color
                twBlue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a']
            },
            primaryColor: 'twBlue',
            colorScheme: 'light',
        }}
    >
        {children}
    </MantineProvider>
)

export default App;