import { z } from "zod";

export const pronunciationDrillSchema = z.object({
  id: z.string(),
  title: z.string(),
  audioUrl: z.string().url(),
  script: z.string(),
  targetPhonemes: z.array(z.string()).default([]),
  difficulty: z.enum(["foundation", "practice", "work-ready"]).default("foundation")
});

export type PronunciationDrill = z.infer<typeof pronunciationDrillSchema>;
