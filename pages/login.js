import Google from 'next-auth/providers/google';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/router';


function loginPage() {

    const {data: session, status} = useSession()
    const router = useRouter()

    if(status !== "loading" && status === "authenticated"){
        router.push("/")
    }

  return (
    <div>
      <button onClick={() => signIn()}>Iniciar sesión</button>
    </div>
  );
}

export default loginPage;