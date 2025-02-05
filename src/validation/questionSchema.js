import { z } from "zod";

export const questionSchema = z.object({
  questionType: z.string().min(1, "Question type is required"),
  question: z.string().min(5, "Question must be at least 5 characters long"),
});
