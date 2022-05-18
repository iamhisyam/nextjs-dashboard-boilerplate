import ForgotPasswordIndex from "@/page-components/ForgotPassword/ForgotPasswordIndex";
import Head from "next/head";

const ForgotPassword = () => {
    return(
        <>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <ForgotPasswordIndex/>
        </>
    )
}

export default ForgotPassword;

ForgotPassword.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};
