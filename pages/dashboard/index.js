import Head from "next/head";
import {Header} from "@/components/Layout/Dashboard"

const DashboardPage = () => {
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
        <div>
           
        </div>
    </>
)}

export default DashboardPage;