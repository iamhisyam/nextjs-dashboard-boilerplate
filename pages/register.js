import { Register } from "@/page-components/Auth"
import Head from "next/head"
import { getCsrfToken } from "next-auth/react"

const RegisterPage = ({ csrfToken }) => {
    return (
        <div>
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Register csrfToken={csrfToken} />

        </div>
    )

}

export default RegisterPage

export async function getServerSideProps(ctx) {
    return {
        props: {
            csrfToken: await getCsrfToken(ctx),
        }
    }

}

RegisterPage.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};
