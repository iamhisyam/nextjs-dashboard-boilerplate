import { fetcher } from "@/lib/fetch";
import { notif } from "@/lib/notification";
import { ValidateSchema } from "@/shared/constants";
import { Button, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from 'react';
import { z } from "zod";

const ForgotPasswordIndex = () => {

    const [loading, setLoading] = useState(false)

    const route = useRouter()

    const schema = z.object({
        email: ValidateSchema.user.email
    })

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            email: ""
        }
    })

    const handleSubmit = async (form) => {
        setLoading(true)

        try {
            const response = await fetcher("/api/auth/password/forgot",
            {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            })
            notif(true,"User found", "we sent the link to your email!")
            route.replace("/login")
        } catch (error) {   

            notif(false,"Not found", error)
        }
        
        setLoading(false)

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="container">
                    <div className="flex flex-col mt-10 mx-auto w-96 space-y-3">
                        <Title>
                            Forgot Password
                        </Title>
                        <Text size="sm">
                            Don't worry, please type your registered email, we will send a link to reset your password
                        </Text>
                        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-3">
                            <TextInput
                                id="email"
                                name="email"
                                placeholder="Type your email"
                                {...form.getInputProps('email')}
                                required

                            />
                            <Button loading={loading} size="md" color="blue" type="submit">
                                Send
                            </Button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordIndex;


