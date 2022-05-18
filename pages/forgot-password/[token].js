import ForgotPasswordToken from "@/page-components/ForgotPassword/ForgotPasswordToken";
import { findTokenByIdAndType } from "@/server/db";
import database from "@/server/middlewares/database";
import nc from 'next-connect';
import Head from "next/head";

const ResetPasswordTokenPage = ({ valid, token} ) => {
    return(
        <>
            <Head>
                <title>Reset Password</title>
            </Head>
            
            <ForgotPasswordToken valid={valid} token={token}/>
            
        </>
    )
}

export default ResetPasswordTokenPage;

export async function getServerSideProps(context) {
    await nc().use(database).run(context.req, context.res);
  
    const tokenDoc = await findTokenByIdAndType(
      context.req.db,
      context.params.token,
      'passwordReset'
    );

  
    return { props: { token: context.params.token, valid: !!tokenDoc } };
  }

  ResetPasswordTokenPage.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};
