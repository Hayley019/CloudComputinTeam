import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Footer from "../components/layout/Footer";

export default function SignIn({ providers }) {
    return (
        <><>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        onClick={() => signIn(provider.id)}
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </><Footer /></>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    };
}
