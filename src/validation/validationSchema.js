import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Érvénytelen email cím"),
    name: z
      .string()
      .min(5, "A névnek legalább 5 karakter hosszúnak kell lennie"),
    password: z
      .string()
      .min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie"),
    confirmPassword: z
      .string()
      .min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "A két jelszó nem egyezik meg",
      });
    }
  });
