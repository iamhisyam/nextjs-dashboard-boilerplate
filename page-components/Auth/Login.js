import { useSpringCarousel } from "react-spring-carousel"
import { useEffect, useState } from "react";
import { TextInput, Checkbox, Grid, Center, Button, Alert } from "@mantine/core";
import { useForm, zodResolver } from '@mantine/form';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DotsLoader } from "@/components/Dashboard/Loaders";
import { notif } from "@/lib/notification";
import { z } from 'zod';
import { ValidateSchema } from "shared/constants";
import Link from "next/link";
import { fetcher } from "@/lib/fetch";
import { AlertCircle, Refresh } from "tabler-icons-react";
import { Logo } from "@/components/General/Logo";

const errorMessages = {
    NotVerified: "User not verified",
    CredentialsSignin: "User or password wrong"
}



const dataSlider = [
    {
        title: "New dashboard",
        description: "leverage our standard to international",
        image: "/images/auth/Money_motivation_Monochromatic.svg",
        link: ""
    },
    {
        title: "New look",
        description: "leverage our standard to international",
        image: "/images/auth/Finance_analytics _Monochromatic.svg",
        link: ""
    },
    {
        title: "New spirit",
        description: "leverage our standard to international",
        image: "/images/auth/Wallet_Monochromatic.svg",
        link: ""
    }
]

const Slider = () => {

    const [activeSlide, setActiveSlide] = useState(0)


    const {
        carouselFragment,
        slideToItem,
        slideToNextItem,
        slideToPrevItem,
        getIsActiveItem,
        getCurrentActiveItem
    } = useSpringCarousel({
        withLoop: true,
        items: dataSlider.map((item, id) => ({
            id,
            renderItem: (
                <div className="flex flex-col w-full items-center">
                    <img className="mb-4" src={item.image} />
                    <p className="text-xs sm:text-base  font-bold">{item.title}</p>
                    <p className="text-xs sm:text-sm ">{item.description}</p>
                </div>
            ),
        }))

    });


    useEffect(() => {
        // console.log(activeSlide)
        // console.log(getCurrentActiveItem())
    }, [activeSlide])


    return (
        <div className="hidden md:flex  md:flex-col ">
            <div className="  text-black ">
                {carouselFragment}
            </div>

            <div className="flex flex-row text-black justify-center gap-4 mt-4">
                <button onClick={() => {
                    setActiveSlide(getCurrentActiveItem().index - 1)
                    slideToPrevItem()
                }} className="hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex flex-row items-center gap-1">
                    {/* {thumbsFragment} */}
                    {dataSlider.map((item, id) => {
                        if (getIsActiveItem(id))
                            return <button key={id} onClick={() => {
                                setActiveSlide(id);
                                slideToItem(id)
                            }} className="h-2 w-2 mx-1 rounded-full bg-black" />
                        else
                            return <button key={id} onClick={() => {
                                setActiveSlide(id);
                                slideToItem(id)
                            }} className="h-2 w-2 mx-1 rounded-full bg-gray-800" />

                    })}
                </div>
                <button onClick={() => {
                    slideToNextItem()
                    setActiveSlide(getCurrentActiveItem().index + 1)

                }} className="hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )

}

export const Login = ({ csrfToken }) => {

    const [loading, setLoading] = useState(false)
    const [needVerification, setNeedVerification] = useState(false)
    const { data: session, status } = useSession()


    const route = useRouter()

    const schema = z.object({
        email: ValidateSchema.user.email,
        password: ValidateSchema.user.password
    })

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },

    });

    const sendVerificationEmail = async () => {
        setLoading(true)
        const { email } = form.values
        const response = await fetcher("/api/auth/verify",{
            method: "POST",
            body: JSON.stringify({email}),
            headers: { "Content-Type": "application/json" }
            
        })
        //reset
        setNeedVerification(false)
        setLoading(false)
    }


    const handleSubmit = async (credentials) => {
        setLoading(true)
        let extendCredentials = credentials;
        extendCredentials.csrfToken = csrfToken

        try {
            const response = await signIn('credentials', {
                redirect: false,
                ...credentials
            })
            const { error } = response
            if (error) {
                if (error === "NotVerified")
                    setNeedVerification(true)
                throw error
            }
            notif(true, "Login Success")

        } catch (error) {
            notif(false, "Login Fail", errorMessages[error])
        }

        setLoading(false)
    }

    if (status === "loading") return <DotsLoader />

    if (status === "authenticated") {
        route.replace("/dashboard")
        return <DotsLoader />
    }



    return (
        <div className="flex flex-col-reverse md:flex-row h-screen min-h-screen ">
            <div className="basis-5/6 md:basis-1/2  bg-white">
                <div className="flex flex-col justify-between h-full md:h-full">
                    <div className="basis-5/6  flex flex-col items-center justify-center h-full">
                        <div className="w-auto px-8 py-8  sm:px-4  ">
                            <Logo />
                            <div className="flex flex-col gap-5 max-w-sm">
                               
                                <h1 className="text-3xl">Login</h1>
                                {needVerification && <Alert icon={<AlertCircle size={16} />} title="Not Verified" color="orange">
                                    We have sent you a link to verify 
                                    <Button
                                    onClick={sendVerificationEmail}
                                     mt="md" variant="subtle" leftIcon={<Refresh/>} compact>resend email</Button> 
                                </Alert>}
                                <p className="text-base text-gray-500">Welcome back! please enter your details</p>
                                <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-2" id="login-form">
                                    <TextInput
                                        id="email"
                                        label="Email"
                                        placeholder="Email"
                                        {...form.getInputProps('email')}
                                        required />

                                    <TextInput
                                        type="password"
                                        id="password"
                                        label="Password"
                                        placeholder="Password"
                                        {...form.getInputProps('password')}
                                        required />

                                    <Grid justify="flex-end" align="center" style={{ marginBottom: 6, padding: 8 }}>
                                        <Link href="/forgot-password" passHref>
                                            <a className="text-xs font-bold text-blue-800 hover:text-blue-900" >Forgot Password</a>
                                        </Link>

                                    </Grid>
                                    <Button loading={loading} type="submit" >Login</Button>
                                    <Center style={{ marginTop: 6, padding: 8 }}>
                                        <p className="text-xs">Don't have an Account? &nbsp;
                                            <Link href="/register" passHref>
                                                <a className="font-bold text-blue-800 hover:text-blue-900" >Register</a>
                                            </Link>
                                        </p>
                                    </Center>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="basis-1/6 flex flex-col justify-end">
                        <p className="text-xs text-gray-400  mb-4 ml-4">by <a className="text-blue-800" href="https://ahisyam.com"> ahisyam</a> @ 2022 All right reserved</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 basis-1/6 md:basis-1/2 bg-slate-200 overflow-hidden">
                <div className="w-full h-full flex flex-col justify-center ">
                    <Slider />
                    <p className="p-8 md:hidden text-2xl font-bold">New Dashboard</p>
                </div>

            </div>
        </div>
    )
}