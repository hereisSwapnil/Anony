"use server";
import { signInSchema } from "@/schema/signInSchema";
import { signIn } from "../auth";
import { z } from "zod";

export async function SignIn(values: z.infer<typeof signInSchema>) {
  return await signIn("credentials", {
    redirect: false,
    username: values.username,
    password: values.password,
  });
}
