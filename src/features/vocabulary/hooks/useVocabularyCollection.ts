"use client";

import { useMemo } from "react";

import { useFirestoreCollection } from "@/lib/firebase/hooks/useFirestoreCollection";

import { VocabularyEntry, vocabularyEntrySchema } from "@/features/vocabulary/schema";

const COLLECTION_PATH = "vocabulary";

export function useVocabularyCollection() {
  const result = useFirestoreCollection<VocabularyEntry>({
    path: COLLECTION_PATH,
    schema: vocabularyEntrySchema
  });

  const groupedByProficiency = useMemo(() => {
    return result.data.reduce<Record<string, VocabularyEntry[]>>((accumulator, entry) => {
      const key = entry.proficiency;
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(entry);
      return accumulator;
    }, {});
  }, [result.data]);

  return {
    ...result,
    groupedByProficiency
  };
}
