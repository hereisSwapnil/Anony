import NextAuth, { Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import userModel from "./model/user.model";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import { JWT } from "next-auth/jwt";

async function getUserFromDb(username: string, password: string) {
  const user = await userModel.findOne({ username });
  if (!user) {
    return null;
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return null;
  }
  return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials: any): Promise<any> => {
        await dbConnect();
        if (
          !credentials ||
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }
        console.log("credentials", credentials);
        const user = await getUserFromDb(
          credentials.username,
          credentials.password
        );
        if (!user) {
          throw new Error("No user found");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id?.toString(),
          isVerified: token.isVerified,
          isAcceptingMessages: token.isAcceptingMessages,
          username: token.username,
        } as User;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
