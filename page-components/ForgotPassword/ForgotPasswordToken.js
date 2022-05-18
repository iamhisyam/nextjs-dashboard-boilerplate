import { fetcher } from "@/lib/fetch";
import { notif } from "@/lib/notification";
import { ValidateSchema } from "@/shared/constants";
import { Button, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from 'react';
import { z } from "zod";

const NewPassword = ({ token }) => {

    const [loading, setLoading] = useState(false)

    const route = useRouter()

    const schema = z.object({
        password: ValidateSchema.user.password,
        confirmPassword: ValidateSchema.user.confirmPassword,


    }).refine((data) =>
        data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
    })

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            password: "",
            confirmPassword: ""

        }
    })

    const handleSubmit = async (form) => {
        setLoading(true)

        try {
            const response = await fetcher("/api/auth/password/reset",
                {
                    method: "POST",
                    body: JSON.stringify({ ...form, token }),
                    headers: { "Content-Type": "application/json" }
                })
            notif(true, "Password updated", "")
            route.replace("/login")
        } catch (error) {

            notif(false, "Password reset failed", error)
        }

        setLoading(false)

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="container">
                    <div className="flex flex-col mt-10 mx-auto w-96 space-y-3">
                        <Title>
                            Reset Password
                        </Title>
                        <Text size="sm">
                            Fill new password
                        </Text>
                        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-3">
                            <TextInput
                                type="password"
                                id="password"
                                label="Password"
                                placeholder="Password"
                                {...form.getInputProps('password')}
                                required />
                            <TextInput
                                type="password"
                                id="confirmPassword"
                                label="Confirm password"
                                placeholder="Confirm Password"
                                {...form.getInputProps('confirmPassword')}
                                required />
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


const ForgotPasswordToken = ({ valid, token }) => {
    const route = useRouter()
    return (
        <>
            {valid ? <NewPassword token={token} /> :
                <div className="flex flex-col items-center justify-center">
                    <Title size="md">
                        Invalid link
                    </Title>
                    <Button size="xs"  onClick={() => {
                        route.back();
                    }}>
                        Back
                    </Button> 
                </div>

            }
        </>
    )
}

export default ForgotPasswordToken;


