"use client";

import { useEffect, useMemo, useState } from "react";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { VocabularyCard } from "@/components/molecules/VocabularyCard";
import { MetricTile } from "@/components/molecules/MetricTile";
import type { MetricTileProps } from "@/components/molecules/MetricTile";
import { VocabularyFlashcardDeck } from "@/components/organisms/VocabularyFlashcardDeck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDailyPlan } from "@/features/dashboard/hooks/useDailyPlan";
import {
  useVocabularyShowcase,
  type VocabularyProficiencyFilter
} from "@/features/vocabulary/hooks/useVocabularyShowcase";

const FILTER_LABELS: Record<VocabularyProficiencyFilter, string> = {
  all: "T?t c?",
  foundation: "Phase 1",
  practice: "Phase 2",
  "work-ready": "Phase 3"
};

export default function VocabularyPage() {
  const { activeDay, days, toggleTask } = useDailyPlan();
  const activeSequence = activeDay?.sequence ?? 1;

  const nextUnlockedDay = useMemo(() => {
    if (!days.length) {
      return null;
    }
    const sorted = [...days].sort((a, b) => a.sequence - b.sequence);
    const currentIndex = sorted.findIndex((day) => day.id === activeDay?.id);
    return currentIndex >= 0 ? sorted[currentIndex + 1] ?? null : sorted[1] ?? null;
  }, [activeDay, days]);

  const {
    deckEntries,
    todayNewEntries,
    todayReviewEntries,
    previewEntries,
    filter,
    setFilter,
    search,
    setSearch
  } = useVocabularyShowcase({
    activeDay: activeSequence,
    previewDay: nextUnlockedDay ? nextUnlockedDay.sequence : null,
    reviewCount: 10,
    newLimit: 20
  });

  const [completedFlashcards, setCompletedFlashcards] = useState<number>(0);

  useEffect(() => {
    setCompletedFlashcards(0);
  }, [deckEntries]);

  const handleDeckProgress = (completed: number) => {
    setCompletedFlashcards(completed);
  };

  const handleDeckComplete = () => {
    if (!activeDay) {
      return;
    }
    const vocabItem = activeDay.items.find((item) => item.title.toLowerCase().includes("vocabulary"));
    if (!vocabItem) {
      return;
    }
    const firstTask = vocabItem.tasks[0];
    if (!firstTask) {
      return;
    }
    toggleTask(activeDay.id, vocabItem.id, firstTask.id, true).catch(() => undefined);
  };

  const filterOptions = useMemo(
    () => (Object.keys(FILTER_LABELS) as VocabularyProficiencyFilter[]).map((key) => ({
      id: key,
      label: FILTER_LABELS[key]
    })),
    []
  );

  const deckTotal = deckEntries.length;
  const summaryTiles: MetricTileProps[] = [
    {
      title: `Flashcard Day ${activeSequence}`,
      value: `${completedFlashcards}/${Math.max(deckTotal, 1)}`,
      description: "Ti?n d? b? th?",
      status: deckTotal > 0 && completedFlashcards >= deckTotal ? "success" : "warning"
    },
    {
      title: "T? m?i hôm nay",
      value: todayNewEntries.length,
      description: "Gi?i h?n 20 t?",
      status: todayNewEntries.length >= 20 ? "success" : "warning"
    },
    {
      title: "Ôn t? cu",
      value: todayReviewEntries.length,
      description: "L?y ng?u nhiên t? ngày tru?c",
      status: todayReviewEntries.length ? "success" : "neutral"
    },
    {
      title: nextUnlockedDay ? `Ôn tru?c Day ${nextUnlockedDay.sequence}` : "Ôn tru?c",
      value: `${previewEntries.length} t?`,
      description: nextUnlockedDay ? nextUnlockedDay.label : "Không có ngày ti?p theo",
      status: "neutral" as const
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Vocabulary Toolkit"
        title="Flashcard song hành daily sprint"
        description="20 t? m?i c?a ngày hi?n t?i và 10 t? dã h?c d? ôn l?i, chu?n b? cho bu?c k? ti?p." />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <MetricTile key={tile.title} {...tile} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant={filter === option.id ? "default" : "secondary"}
                onClick={() => setFilter(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm theo t?, nghia ho?c tag"
            className="w-64"
          />
        </div>
        <Separator />
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <SectionHeading
            eyebrow={`Day ${activeSequence}`}
            title="Flashcard hôm nay"
            description={activeDay?.label ?? "Danh sách t? v?ng cho sprint hôm nay."}
          />
          <VocabularyFlashcardDeck
            entries={deckEntries}
            onDeckComplete={handleDeckComplete}
            onProgressChange={handleDeckProgress}
            title="Qu?t d? ôn t?ng t?"
          />
        </div>

        <div className="space-y-3">
          <SectionHeading
            eyebrow="Ôn t? dã h?c"
            title="10 t? cu du?c ch?n ng?u nhiên"
            description="C?ng c? trí nh? tru?c khi sang tình hu?ng m?i."
          />
          {todayReviewEntries.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {todayReviewEntries.map((entry) => (
                <VocabularyCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Chua có t? c?n ôn l?i cho ngày này.
            </div>
          )}
        </div>

        <div className="space-y-3">
          <SectionHeading
            eyebrow={nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview"}
            title={
              nextUnlockedDay
                ? `Ôn tru?c 10 t? cho ${nextUnlockedDay.label}`
                : "Chua có ngày ti?p theo"
            }
            description="Chu?n b? tru?c d? ngày mai ph?n x? nhanh hon."
          />
          {previewEntries.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {previewEntries.map((entry) => (
                <VocabularyCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              Không có t? v?ng nào d? ôn tru?c cho ngày ti?p theo.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

