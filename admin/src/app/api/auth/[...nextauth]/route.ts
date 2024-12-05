import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProviders from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/AdminModel";
import bcrypt from "bcryptjs";

const authOption: NextAuthOptions = {
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await AdminModel.findOne({
            $or: [{ email: credentials.email }],
          });

          if (!user) throw new Error("No user found with this email ");

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isCorrectPassword) {
            return user;
          } else {
            throw new Error("Incorrect password");
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
        token.username = user.username;
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
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
