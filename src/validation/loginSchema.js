import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Érvényes email címet adjon meg" }),
  password: z
    .string()
    .min(6, { message: "Legalább 6 karakter hosszú jelszót adjon meg" }),
});
