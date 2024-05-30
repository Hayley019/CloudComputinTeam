import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Footer from "../components/layout/Footer";
import styles from "../components/signup/table.module.css";

export default function SignIn({ providers }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center">
                <div className={`${styles.container} bg-gray-100 p-4 rounded-lg shadow-lg mb-8 max-w-xs mx-auto`}>
                    {Object.values(providers).map((provider, index) => (
                        <div key={provider.name}>
                            <button
                                className={`${styles.button} ${index % 2 === 0 ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 text-white font-bold py-2 px-4 rounded ${index !== Object.values(providers).length - 1 ? 'mr-4' : ''}`} 
                                onClick={() => signIn(provider.id)}
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
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
