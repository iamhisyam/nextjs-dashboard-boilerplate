import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { useSession, signIn, signOut } from "next-auth/react"

const DashboardPage = () => {
    const { data: session } = useSession()
    const items = [
        { title: " Dashboard", href: "#" },
        { title: " Index", href: "#" },
    ]
    return (
        <>

            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Dashboard" items={items} />
            <div className="mt-10">
                {
                    session ?
                        <>
                            Signed in as {session.user.email} <br />
                            <button onClick={() => signOut()}>Sign out</button>
                        </>
                        :
                        <>
                            Not signed in <br />
                            <button onClick={() => signIn()}>Sign in</button>
                        </>
                }
            </div>
        </>
    )
}

export default DashboardPage;