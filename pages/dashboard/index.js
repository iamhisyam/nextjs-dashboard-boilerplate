import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { useSession, signIn, signOut } from "next-auth/react"
import { fetcher } from "@/lib/fetch";
import { useState } from "react";

import { Alert, Button } from "@mantine/core"
import { AlertCircle,Refresh } from "tabler-icons-react"

const DashboardPage = ({ user }) => {

    const [loading, setLoading] = useState(false)
    const [needVerification, setNeedVerification] = useState(!user.verified)
    const { data: session } = useSession()

    const items = [
        { title: " Dashboard", href: "#" },
        { title: " Index", href: "#" },
    ]

  
    const sendVerificationEmail = async (email) => {
        setLoading(true)
        const response = await fetcher("/api/auth/verify",{
            method: "POST",
            body: JSON.stringify({email}),
            headers: { "Content-Type": "application/json" }
            
        })

        setNeedVerification(false)
        setLoading(false)
    }

    return (
        <>

            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Dashboard" items={items} />
            <div className="mt-8">
            <div className="flex flex-col items-center justify-center">
                {!user.verified && 
                <Alert icon={<AlertCircle size={16} />} title="Not Verified" color="orange">
                   
                    <p>We have sent you a link to verify, please check email or resend email </p>
                       
                    <Button
                    loading={loading}
                        onClick={()=>sendVerificationEmail(user.email)}
                        mt="md" variant="subtle" leftIcon={<Refresh />} compact>resend email</Button>
                </Alert>
                }
            
            </div>
            </div>
            
            


        </>
    )
}

export default DashboardPage;