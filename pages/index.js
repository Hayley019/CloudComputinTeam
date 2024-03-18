import { getSession } from "next-auth/react"
import { Inter } from "next/font/google"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

function Home({session}) {

  return (
    <div>
      {
        session ? (
          <div>
            <h1>{session.user.name}</h1>
            <p>{session.user.email}</p>
            <img src={session.user.image} alt=""/>
          </div>
        ) : (
          <p>Por favor, inicia sesión</p>
        )
      }
      <button onClick={() => signOut()}>Cerrar Sesion</button>
    </div>
  );
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

export default Home;