import { z } from "zod";

export const writingPromptSchema = z.object({
  id: z.string(),
  day: z.number().int().min(1),
  collection: z.enum(["new", "review"]).default("new"),
  title: z.string(),
  scenario: z.string(),
  checklist: z.array(z.string()).default([]),
  aiAssistance: z.boolean().default(false),
  targetLength: z.number().min(50).max(500).default(150),
  sampleOutline: z.array(z.string()).default([])
});

export type WritingPrompt = z.infer<typeof writingPromptSchema>;
