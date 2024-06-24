import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters long.")
    .max(20, "Username should be at most 20 characters long.")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Username should contain only letters, numbers, and underscores."
    ),
  password: z.string().min(6, "Password should be at least 6 characters long."),
  email: z.string().email("Invalid email address."),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters long.")
    .max(20, "Username should be at most 20 characters long.")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Username should contain only letters, numbers, and underscores."
    ),
});
