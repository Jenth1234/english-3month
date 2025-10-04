"use client";

import { useEffect, useMemo, useState } from "react";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { VocabularyCard } from "@/components/molecules/VocabularyCard";
import { MetricTile } from "@/components/molecules/MetricTile";
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
  all: "Tất cả",
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
    setSearch,
    stats
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
  const summaryTiles = [
    {
      title: `Flashcard Day ${activeSequence}`,
      value: `${completedFlashcards}/${Math.max(deckTotal, 1)}`,
      description: "Tiến độ bộ thẻ",
      status: deckTotal > 0 && completedFlashcards >= deckTotal ? "success" : "warning"
    },
    {
      title: "Từ mới hôm nay",
      value: todayNewEntries.length,
      description: "Giới hạn 20 từ",
      status: todayNewEntries.length >= 20 ? "success" : "warning"
    },
    {
      title: "Ôn từ cũ",
      value: todayReviewEntries.length,
      description: "Lấy ngẫu nhiên từ ngày trước",
      status: todayReviewEntries.length ? "success" : "neutral"
    },
    {
      title: nextUnlockedDay ? `Ôn trước Day ${nextUnlockedDay.sequence}` : "Ôn trước",
      value: `${previewEntries.length} từ`,
      description: nextUnlockedDay ? nextUnlockedDay.label : "Không có ngày tiếp theo",
      status: "neutral" as const
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Vocabulary Toolkit"
        title="Flashcard song hành daily sprint"
        description="20 từ mới của ngày hiện tại và 10 từ đã học để ôn lại, chuẩn bị cho bước kế tiếp." />

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
            placeholder="Tìm theo từ, nghĩa hoặc tag"
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
            description={activeDay?.label ?? "Danh sách từ vựng cho sprint hôm nay."}
          />
          <VocabularyFlashcardDeck
            entries={deckEntries}
            onDeckComplete={handleDeckComplete}
            onProgressChange={handleDeckProgress}
            title="Quẹt để ôn từng từ"
          />
        </div>

        <div className="space-y-3">
          <SectionHeading
            eyebrow="Ôn từ đã học"
            title="10 từ cũ được chọn ngẫu nhiên"
            description="Củng cố trí nhớ trước khi sang tình huống mới."
          />
          {todayReviewEntries.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {todayReviewEntries.map((entry) => (
                <VocabularyCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Chưa có từ cần ôn lại cho ngày này.
            </div>
          )}
        </div>

        <div className="space-y-3">
          <SectionHeading
            eyebrow={nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview"}
            title={
              nextUnlockedDay
                ? `Ôn trước 10 từ cho ${nextUnlockedDay.label}`
                : "Chưa có ngày tiếp theo"
            }
            description="Chuẩn bị trước để ngày mai phản xạ nhanh hơn."
          />
          {previewEntries.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {previewEntries.map((entry) => (
                <VocabularyCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              Không có từ vựng nào để ôn trước cho ngày tiếp theo.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
