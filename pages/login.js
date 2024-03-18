import { signIn, signOut, useSession, getProviders } from 'next-auth/react'



function loginPage() {
  return (
    <div>
      <button onClick={() => signIn()}>Iniciar sesión</button>
    </div>
  );
}

export default loginPage;