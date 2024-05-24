import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { MongoClient } from "mongodb";
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

        const collection = client.db("BisonTour").collection("Users");
        const user = await collection.findOne({
          username: credentials.username,
        });

        if (user && user.password === credentials.password) {
          return { name: user.username };
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
