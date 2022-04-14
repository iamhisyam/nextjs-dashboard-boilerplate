import '../assets/global.css'

import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                emotionOptions={{ key: 'mantine', prepend: false }}
                theme={{
                    /** Put your mantine theme override here */
                    colors:{
                        twBlue : ['#eff6ff','#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a']
                    },
                    primaryColor: 'twBlue',
                    colorScheme: 'light',
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>

    )
}

export default App;