import { Login } from "@/page-components/Auth"
import Head from "next/head"
import { getCsrfToken } from "next-auth/react"

const LoginPage = ({ csrfToken }) => {
    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login csrfToken={csrfToken} />

        </div>
    )

}

export default LoginPage

export async function getServerSideProps(ctx) {
    return {
        props: {
            csrfToken: await getCsrfToken(ctx),
        }
    }

}

LoginPage.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};
