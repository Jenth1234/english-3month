import { z } from "zod";

export const pronunciationDrillSchema = z.object({
  id: z.string(),
  day: z.number().int().min(1),
  collection: z.enum(["new", "review"]).default("new"),
  title: z.string(),
  focus: z.string(),
  audioUrl: z.string().url(),
  script: z.string(),
  targetPhonemes: z.array(z.string()).default([]),
  difficulty: z.enum(["foundation", "practice", "work-ready"]).default("foundation"),
  tips: z.array(z.string()).default([])
});

export type PronunciationDrill = z.infer<typeof pronunciationDrillSchema>;
