import Head from "next/head";
import Main from "./Main";
import { cloneElement } from "react";

import authenticateRoute from "@/routes/authenticateRoute";



const Template = ({ children, user }) => {
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
                {cloneElement(children, { user })}
            </Main>

        </>
    )

}

export default authenticateRoute(Template);