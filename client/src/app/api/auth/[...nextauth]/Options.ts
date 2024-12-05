import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import UserModel from "@/model/UserSchema";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

type CredentialsType = {
  identifier: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [{ email: credentials.email }],
          });

          if (!user) throw new Error("No user found with this email");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password!!!\nPlease try again");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username || user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 2 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
