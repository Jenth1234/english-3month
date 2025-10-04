import { z } from "zod";

export const listeningExerciseSchema = z.object({
  id: z.string(),
  title: z.string(),
  level: z.enum(["foundation", "practice", "work-ready"]),
  mediaUrl: z.string().url(),
  transcript: z.string().optional(),
  tags: z.array(z.string()).default([]),
  comprehensionQuestions: z
    .array(
      z.object({
        id: z.string(),
        prompt: z.string(),
        answer: z.string()
      })
    )
    .default([])
});

export type ListeningExercise = z.infer<typeof listeningExerciseSchema>;
