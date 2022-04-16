import Head from "next/head";
import Main from "./Main";



const Template = ({ children }) => {

    return (
        <>
            <Head>
                <title>Ahisyam Dashboard</title>
                <meta
                    key="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="description" content="Dashboard for WebApp" />
                <meta property="og:title" content="Payrollkita " />
                <meta
                    property="og:description"
                    content="Dashboard"
                />
            </Head>
            <Main>
                {children}
            </Main>

        </>
    )

}

export default Template;