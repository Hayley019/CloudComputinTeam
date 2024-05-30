import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Admin, MongoClient } from "mongodb";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from "@lib/mongodb";




export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        const collection = client.db("Tour").collection("Users");
        const user = await collection.findOne({
          username: credentials.username,
        });

        if (!user) {
          // Si el usuario no existe, creamos uno nuevo
          await collection.insertOne({
            username: credentials.username,
            password: credentials.password,
            provider: "credentials",
            role: "user",
          });
          return user;
        } else if (user.password === credentials.password) {
          // Si el usuario existe y la contraseña coincide, permitimos el inicio de sesión
          return { name: credentials.username };
        } else {
          // Si la contraseña no coincide, denegamos el acceso
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      
      // save profile to database, adding the role
      async profile(profile) {
        console.log("Google");
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        const collection = client.db("Tour").collection("Users");
        const existingUser = await collection.findOne({ email: profile.email });

        if (existingUser) {
          // Si el usuario ya existe
          console.log("User already exists");

          
        } else {
          // Si el usuario no existe, lo registramos
          const newUser = {
            email: profile.email,
            username: profile.name, // Puedes ajustar esto según la información que desees almacenar
            
            provider: "Google",
            // Aquí puedes almacenar más información según la que proporciona el objeto 'profile'
            role: "user"
          };

          await collection.insertOne(newUser);
          
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };

      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
      // save profile to database, adding the role
      async profile(profile) {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        const collection = client.db("Tour").collection("Users");
        const existingUser = await collection.findOne({ email: profile.email });

        if (existingUser) {
          // Si el usuario ya existe
          console.log("User already exists");

          
        } else {
          // Si el usuario no existe, lo registramos
          const newUser = {
            email: profile.email,
            username: profile.name, // Puedes ajustar esto según la información que desees almacenar
            
            provider: "GitHub",
            // Aquí puedes almacenar más información según la que proporciona el objeto 'profile'
            role: "user"
          };

          await collection.insertOne(newUser);
          
        }

        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };

      },

    }),
  ],
  pages: {
    signIn: "/signup",
    Admin_page: "/admin",
  },

  secret: process.env.NEXTAUTH_SECRET,
  
};

export default NextAuth(authOptions);
