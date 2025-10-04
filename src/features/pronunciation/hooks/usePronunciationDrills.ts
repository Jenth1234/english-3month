"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks/useFirestoreCollection";

import { PronunciationDrill, pronunciationDrillSchema } from "@/features/pronunciation/schema";

const COLLECTION_PATH = "pronunciationDrills";

export function usePronunciationDrills() {
  return useFirestoreCollection<PronunciationDrill>({
    path: COLLECTION_PATH,
    schema: pronunciationDrillSchema
  });
}
