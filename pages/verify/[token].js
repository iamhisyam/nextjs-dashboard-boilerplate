import { findAndDeleteTokenByIdAndType, verifyUser } from "@/server/db";
import database from "@/server/middlewares/database";
import { Button, Title } from "@mantine/core";
import nc from 'next-connect';
import Head from "next/head";
import { useRouter } from "next/router";


const VerificationPage = ({ valid, token }) => {
    const route = useRouter()
    return (
        <>
            <Head>
                <title>Verification</title>
            </Head>
            <div className="flex flex-col items-center justify-center">
               
                {valid ?
                    <div>
                        <Title>
                            Thank you for your verification
                        </Title>
                    </div>
                    :
                    <div>
                        <Title size="md">
                            Invalid link
                        </Title>
                        <Button size="xs" onClick={() => {
                            route.back();
                        }}>
                            Back
                        </Button>
                    </div>
                }

            </div>


        </>
    )
}

export default VerificationPage;

export async function getServerSideProps(context) {
    await nc().use(database).run(context.req, context.res);

    const tokenDoc = await findAndDeleteTokenByIdAndType(
        context.req.db,
        context.params.token,
        'userVerification'
    );
    if(tokenDoc) await verifyUser(context.req.db,
        {
            id: tokenDoc.userId,

        })


    return { props: { token: context.params.token, valid: !!tokenDoc } };
}

VerificationPage.getLayout = function getLayout(page) {
    return <div>{page}</div>;
};
