"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks/useFirestoreCollection";

import { WritingPrompt, writingPromptSchema } from "@/features/writing/schema";

const COLLECTION_PATH = "writingPrompts";

export function useWritingPrompts() {
  return useFirestoreCollection<WritingPrompt>({
    path: COLLECTION_PATH,
    schema: writingPromptSchema,
    listen: false
  });
}
