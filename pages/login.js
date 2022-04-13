import { Login } from "@/page-components/Auth"
import Head from "next/head"
import Image from "next/image"

const LoginPage = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login/>
            

        </div>
    )

}

export default LoginPage