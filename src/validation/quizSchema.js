import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(1, "A cím megadása kötelező"),
  type: z.string().min(1, "A típus megadása kötelező"),
});
