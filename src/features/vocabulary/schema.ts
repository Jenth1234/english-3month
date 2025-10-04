import { z } from "zod";

export const vocabularyEntrySchema = z.object({
  id: z.string(),
  term: z.string(),
  translation: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.string().optional(),
  notes: z.string().optional(),
  examples: z
    .array(
      z.object({
        context: z.string(),
        sentence: z.string()
      })
    )
    .default([]),
  tags: z.array(z.string()).default([]),
  proficiency: z.enum(["foundation", "practice", "work-ready"]).default("foundation")
});

export type VocabularyEntry = z.infer<typeof vocabularyEntrySchema>;
