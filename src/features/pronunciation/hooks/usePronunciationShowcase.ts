"use client";

import { useMemo } from "react";

import { mockPronunciationDrills } from "@/features/pronunciation/data/mock";
import type { PronunciationDrill } from "@/features/pronunciation/schema";

interface UsePronunciationShowcaseOptions {
  activeDay?: number;
  previewDay?: number | null;
  reviewCount?: number;
}

interface UsePronunciationShowcaseResult {
  currentDay: PronunciationDrill[];
  preview: PronunciationDrill[];
  stats: {
    total: number;
    foundation: number;
    practice: number;
    workReady: number;
  };
}

export function usePronunciationShowcase({
  activeDay = 1,
  previewDay = activeDay + 1,
  reviewCount = 2
}: UsePronunciationShowcaseOptions = {}): UsePronunciationShowcaseResult {
  const stats = useMemo(() => {
    return mockPronunciationDrills.reduce(
      (acc, drill) => {
        acc.total += 1;
        if (drill.difficulty === "foundation") acc.foundation += 1;
        if (drill.difficulty === "practice") acc.practice += 1;
        if (drill.difficulty === "work-ready") acc.workReady += 1;
        return acc;
      },
      { total: 0, foundation: 0, practice: 0, workReady: 0 }
    );
  }, []);

  const currentDay = useMemo(
    () =>
      mockPronunciationDrills.filter(
        (drill) => drill.day === activeDay && drill.collection === "new"
      ),
    [activeDay]
  );

  const preview = useMemo(() => {
    if (!previewDay) {
      return [];
    }

    return mockPronunciationDrills
      .filter((drill) => drill.day === previewDay && drill.collection === "new")
      .slice(0, reviewCount);
  }, [previewDay, reviewCount]);

  return { currentDay, preview, stats };
}
