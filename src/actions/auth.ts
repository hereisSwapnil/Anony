"use server";

import { signIn, signOut } from "@/auth";
import userModel from "@/model/user.model";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const getUserByUsername = async (username: string) => {
  try {
    const user = await userModel.findOne({ username });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    username: formData.get("username"),
    password: formData.get("password"),
    redirectTo: "/",
  };

  const existingUser = await getUserByUsername(
    formData.get("username") as string
  );
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  revalidatePath("/");
};
