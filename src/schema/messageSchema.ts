import { z } from "zod";

export const messageSchema = z.object({
  message: z
    .string()
    .min(10, "Message should be at least 10 characters long.")
    .max(300, "Message should be at most 300 characters long."),
});
