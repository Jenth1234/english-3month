import { useMemo } from "react";

import { mockListeningExercises } from "@/features/listening/data/mock";
import type { ListeningExercise } from "@/features/listening/schema";

interface UseListeningShowcaseOptions {
  activeDay?: number;
  previewDay?: number | null;
  newLimit?: number;
}

interface UseListeningShowcaseResult {
  deckEntries: ListeningExercise[];
  preview: ListeningExercise[];
  stats: {
    total: number;
    foundation: number;
    practice: number;
    workReady: number;
  };
}

export function useListeningShowcase({
  activeDay = 1,
  previewDay = activeDay + 1,
  newLimit = 2
}: UseListeningShowcaseOptions = {}): UseListeningShowcaseResult {
  const stats = useMemo(() => {
    return mockListeningExercises.reduce(
      (acc, exercise) => {
        acc.total += 1;
        if (exercise.level === "foundation") acc.foundation += 1;
        if (exercise.level === "practice") acc.practice += 1;
        if (exercise.level === "work-ready") acc.workReady += 1;
        return acc;
      },
      { total: 0, foundation: 0, practice: 0, workReady: 0 }
    );
  }, []);

  const deckEntries = useMemo(() => {
    return mockListeningExercises
      .filter((exercise) => exercise.day === activeDay && exercise.collection === "new")
      .slice(0, newLimit);
  }, [activeDay, newLimit]);

  const preview = useMemo(() => {
    if (!previewDay) {
      return [];
    }

    return mockListeningExercises
      .filter((exercise) => exercise.day === previewDay && exercise.collection === "new")
      .slice(0, newLimit);
  }, [previewDay, newLimit]);

  return {
    deckEntries,
    preview,
    stats
  };
}
