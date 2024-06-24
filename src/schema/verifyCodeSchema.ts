import { z } from "zod";

export const verifyCodeSchema = z.object({
  verifyCode: z
    .string()
    .length(6, "Verification code should be 6 characters long."),
  username: z
    .string()
    .min(3, "Username should be at least 3 characters long.")
    .max(10, "Username should be at most 10 characters long.")
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Username should contain only letters, numbers, and underscores."
    ),
});
