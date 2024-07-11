import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword, getUserFromDb } from "./utils/helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await getUserFromDb(username, password);
        if (!user) {
          throw new Error("Incorrect password.");
        }
        return user;
      },
    }),
  ],
});
