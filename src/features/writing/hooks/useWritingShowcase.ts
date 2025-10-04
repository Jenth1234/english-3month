"use client";

import { useMemo } from "react";

import { mockWritingPrompts } from "@/features/writing/data/mock";
import type { WritingPrompt } from "@/features/writing/schema";

interface UseWritingShowcaseOptions {
  activeDay?: number;
  previewDay?: number | null;
  reviewCount?: number;
}

interface UseWritingShowcaseResult {
  currentDay: WritingPrompt[];
  review: WritingPrompt[];
  preview: WritingPrompt[];
}

export function useWritingShowcase({
  activeDay = 1,
  previewDay = activeDay + 1,
  reviewCount = 1
}: UseWritingShowcaseOptions = {}): UseWritingShowcaseResult {
  const currentDay = useMemo(
    () =>
      mockWritingPrompts.filter(
        (prompt) => prompt.day === activeDay && prompt.collection === "new"
      ),
    [activeDay]
  );

  const review = useMemo(
    () =>
      mockWritingPrompts.filter(
        (prompt) => prompt.day === activeDay && prompt.collection === "review"
      ),
    [activeDay]
  );

  const preview = useMemo(() => {
    if (!previewDay) {
      return [];
    }

    return mockWritingPrompts
      .filter((prompt) => prompt.day === previewDay && prompt.collection === "new")
      .slice(0, reviewCount);
  }, [previewDay, reviewCount]);

  return { currentDay, review, preview };
}
