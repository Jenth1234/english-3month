"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks/useFirestoreCollection";

import { ListeningExercise, listeningExerciseSchema } from "@/features/listening/schema";

const COLLECTION_PATH = "listeningExercises";

export function useListeningExercises() {
  return useFirestoreCollection<ListeningExercise>({
    path: COLLECTION_PATH,
    schema: listeningExerciseSchema
  });
}
