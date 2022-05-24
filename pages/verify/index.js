import { Alert, Button } from "@mantine/core"
import Head from "next/head"
import { AlertCircle } from "tabler-icons-react"
import {useState } from "react";
import { useSession } from "next-auth/react";

const VerifyPage = () => {
    const [loading, setLoading] = useState(false)
    const { data: session, status } = useSession()
    console.log(session)

    const sendVerificationEmail = async (email) => {
        setLoading(true)
        const response = await fetcher("/api/auth/verify",{
            method: "POST",
            body: JSON.stringify({email}),
            headers: { "Content-Type": "application/json" }
            
        })

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Not Verified</title>
            </Head>
            <div className="flex flex-col items-center justify-center">
                <Alert icon={<AlertCircle size={16} />} title="Not Verified" color="orange">
                    We have sent you a link to verify
                    <Button
                        onClick={sendVerificationEmail}
                        mt="md" variant="subtle" leftIcon={<Refresh />} compact>resend email</Button>
                </Alert>
            
            </div>
        </>

    )
}

export default VerifyPage


