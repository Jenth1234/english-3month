import { z } from "zod";

export const vocabularyExampleSchema = z.object({
  context: z.string(),
  sentence: z.string()
});

export const vocabularyEntrySchema = z.object({
  id: z.string(),
  day: z.number().int().min(1),
  collection: z.enum(["new", "review"]).default("new"),
  term: z.string(),
  translation: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.string().optional(),
  notes: z.string().optional(),
  examples: z.array(vocabularyExampleSchema).default([]),
  tags: z.array(z.string()).default([]),
  proficiency: z.enum(["foundation", "practice", "work-ready"]).default("foundation"),
  reviewSourceDay: z.number().int().min(1).optional()
});

export type VocabularyEntry = z.infer<typeof vocabularyEntrySchema>;
