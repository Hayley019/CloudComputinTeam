import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from "@lib/mongodb";
import mongoose from "mongoose";


export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password" },
      },
      /* async authorize(credentials) {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        const collection = client.db("Tour").collection("Users");
        const user = await collection.findOne({
          username: credentials.username,
        });

        if (!user) {
          // Si el usuario no existe, lo registramos
          await collection.insertOne({
            username: credentials.username,
            password: credentials.password // Aquí deberías hashear la contraseña antes de almacenarla en la base de datos por seguridad
            ,
            role: null 
          });
          return { name: credentials.username };
        } else if (user.password === credentials.password) {
          // Si el usuario existe y la contraseña coincide, permitimos el inicio de sesión
          return { name: credentials.username };
        } else {
          // Si la contraseña no coincide, denegamos el acceso
          return null;
        }
      }, */

      async authorize(credentials) {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        const collection = client.db("Tour").collection("Users");
        const user = await collection.findOne({
          username: credentials.username,
        });

        if (!user) {
          // Si el usuario no existe, retornamos null
          return null;
        } else if (user.password === credentials.password) {
          // Si el usuario existe y la contraseña coincide, permitimos el inicio de sesión
          return { name: credentials.username };
        } else {
          // Si la contraseña no coincide, denegamos el acceso
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
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
            // Aquí puedes almacenar más información según la que proporciona el objeto 'profile'
          };

          await collection.insertOne(newUser);
          
        }

        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };

      },

      // Save the user profile in MongoDB
      /* async authorize(profile) {
        // Lógica de autorización para GitHub
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        const collection = client.db("Tour").collection("Users");
        const existingUser = await collection.findOne({ email: profile.email });

        if (existingUser) {
          // Si el usuario ya existe
          console.log("User already exists");

          return { name: existingUser.username };
        } else {
          // Si el usuario no existe, lo registramos
          const newUser = {
            email: profile.email,
            username: profile.name, // Puedes ajustar esto según la información que desees almacenar
            // Aquí puedes almacenar más información según la que proporciona el objeto 'profile'
          };
          await collection.insertOne(newUser);
          return { name: newUser.username };
        }
      }, */
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  /*callbacks: {
    async signIn(user, account, credentials) {
      console.log("signIn", credentials);
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();

      const collection = client.db("Tour").collection("Users");
      const existingUser = await collection.findOne({ email: credentials.email });

      if (!existingUser) {
        // If user doesn't exist in the database, create a new one
        await collection.insertOne({
          email: credentials.email,
          name: credentials.name,
          // You may want to add more user information here
        });
      }

      return true;
    },
    async jwt(token, user, credentials) {
      if (credentials) {
        token.id = credentials.id;
      }

      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },*/
};

export default NextAuth(authOptions);
