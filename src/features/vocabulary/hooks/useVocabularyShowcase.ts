"use client";

import { useMemo, useState } from "react";

import { mockVocabulary } from "@/features/vocabulary/data/mock";
import type { VocabularyEntry } from "@/features/vocabulary/schema";

export type VocabularyProficiencyFilter = "all" | VocabularyEntry["proficiency"];

interface UseVocabularyShowcaseOptions {
  activeDay?: number;
  previewDay?: number | null;
  reviewCount?: number;
  newLimit?: number;
  initialFilter?: VocabularyProficiencyFilter;
}

interface UseVocabularyShowcaseResult {
  entries: VocabularyEntry[];
  filter: VocabularyProficiencyFilter;
  setFilter: (next: VocabularyProficiencyFilter) => void;
  search: string;
  setSearch: (value: string) => void;
  filteredEntries: VocabularyEntry[];
  stats: {
    total: number;
    foundation: number;
    practice: number;
    workReady: number;
  };
  deckEntries: VocabularyEntry[];
  todayNewEntries: VocabularyEntry[];
  todayReviewEntries: VocabularyEntry[];
  previewEntries: VocabularyEntry[];
}

function hashId(id: string, seed: number) {
  let hash = seed;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function useVocabularyShowcase({
  activeDay = 1,
  previewDay = activeDay + 1,
  reviewCount = 10,
  newLimit = 20,
  initialFilter = "all"
}: UseVocabularyShowcaseOptions = {}): UseVocabularyShowcaseResult {
  const [filter, setFilter] = useState<VocabularyProficiencyFilter>(initialFilter);
  const [search, setSearch] = useState<string>("");

  const searchableEntries = useMemo(() => {
    return mockVocabulary.filter((entry) => {
      const matchFilter = filter === "all" ? true : entry.proficiency === filter;
      if (!matchFilter) {
        return false;
      }

      if (!search.trim()) {
        return true;
      }

      const lower = search.toLowerCase();
      return (
        entry.term.toLowerCase().includes(lower) ||
        entry.translation.toLowerCase().includes(lower) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    });
  }, [filter, search]);

  const stats = useMemo(() => {
    return mockVocabulary.reduce(
      (acc, entry) => {
        acc.total += 1;
        if (entry.proficiency === "foundation") acc.foundation += 1;
        if (entry.proficiency === "practice") acc.practice += 1;
        if (entry.proficiency === "work-ready") acc.workReady += 1;
        return acc;
      },
      { total: 0, foundation: 0, practice: 0, workReady: 0 }
    );
  }, []);

  const todayNewEntries = useMemo(() => {
    return searchableEntries
      .filter((entry) => entry.day === activeDay && entry.collection === "new")
      .slice(0, newLimit);
  }, [activeDay, newLimit, searchableEntries]);

  const reviewCandidates = useMemo(() => {
    return searchableEntries.filter((entry) => {
      if (entry.collection !== "review") {
        return false;
      }
      if (entry.day === activeDay) {
        return true;
      }
      if (typeof entry.reviewSourceDay === "number") {
        return entry.reviewSourceDay < activeDay;
      }
      return false;
    });
  }, [activeDay, searchableEntries]);

  const todayReviewEntries = useMemo(() => {
    if (!reviewCandidates.length) {
      return [];
    }
    const ranked = reviewCandidates
      .map((entry) => ({ entry, score: hashId(entry.id, activeDay) }))
      .sort((a, b) => a.score - b.score);
    return ranked.slice(0, reviewCount).map((item) => item.entry);
  }, [activeDay, reviewCandidates, reviewCount]);

  const deckEntries = useMemo(() => {
    return [...todayNewEntries, ...todayReviewEntries];
  }, [todayNewEntries, todayReviewEntries]);

  const previewEntries = useMemo(() => {
    if (!previewDay) {
      return [];
    }

    return searchableEntries
      .filter((entry) => entry.day === previewDay && entry.collection === "new")
      .slice(0, reviewCount);
  }, [previewDay, reviewCount, searchableEntries]);

  return {
    entries: mockVocabulary,
    filter,
    setFilter,
    search,
    setSearch,
    filteredEntries: searchableEntries,
    stats,
    deckEntries,
    todayNewEntries,
    todayReviewEntries,
    previewEntries
  };
}
