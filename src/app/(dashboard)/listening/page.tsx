"use client";

import { useMemo, useState } from "react";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ListeningExerciseCard } from "@/components/molecules/ListeningExerciseCard";
import { MetricTile } from "@/components/molecules/MetricTile";
import type { MetricTileProps } from "@/components/molecules/MetricTile";
import { ListeningSwipeDeck } from "@/components/organisms/ListeningSwipeDeck";
import { useDailyPlan } from "@/features/dashboard/hooks/useDailyPlan";
import { useListeningShowcase } from "@/features/listening/hooks/useListeningShowcase";

export default function ListeningPage() {
  const { activeDay, days, toggleTask } = useDailyPlan();
  const activeSequence = activeDay?.sequence ?? 1;

  const nextUnlockedDay = useMemo(() => {
    if (!days.length) {
      return null;
    }
    const sorted = [...days].sort((a, b) => a.sequence - b.sequence);
    const index = sorted.findIndex((day) => day.id === activeDay?.id);
    return index >= 0 ? sorted[index + 1] ?? null : sorted[1] ?? null;
  }, [activeDay, days]);

  const { deckEntries, preview, stats } = useListeningShowcase({
    activeDay: activeSequence,
    previewDay: nextUnlockedDay ? nextUnlockedDay.sequence : null,
    newLimit: 2
  });

  const [completed, setCompleted] = useState<number>(0);

  const handleProgress = (done: number) => {
    setCompleted(done);
  };

  const handleDeckComplete = () => {
    if (!activeDay) {
      return;
    }

    const listeningItem = activeDay.items.find((item) => item.title.toLowerCase().includes("listening"));
    if (!listeningItem) {
      return;
    }

    const firstTask = listeningItem.tasks[0];
    if (!firstTask) {
      return;
    }

    toggleTask(activeDay.id, listeningItem.id, firstTask.id, true).catch(() => undefined);
  };

  const summaryTiles: MetricTileProps[] = [
    {
      title: `Listening Day ${activeSequence}`,
      value: `${completed}/${Math.max(deckEntries.length, 1)}`,
      description: "So luong clip da hoan thanh",
      status: deckEntries.length > 0 && completed >= deckEntries.length ? "success" : "warning"
    },
    {
      title: "Video hom nay",
      value: deckEntries.length,
      description: "Clip phai xem",
      status: deckEntries.length ? "success" : "warning"
    },
    {
      title: nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview",
      value: preview.length,
      description: nextUnlockedDay ? nextUnlockedDay.label : "Khong co ngay tiep",
      status: "neutral" as const
    },
    {
      title: "Tong clip trong kho",
      value: stats.total,
      description: "Foundation/Practice/Work-ready",
      status: "neutral" as const
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Listening Lab"
        title="Luyen nghe theo ngu canh sprint"
        description="Xem video hoac audio roi lam quiz 5 cau hoi chinh xac."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <MetricTile key={tile.title} {...tile} />
        ))}
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <SectionHeading
            eyebrow={`Day ${activeSequence}`}
            title="Deck bai nghe hom nay"
            description="Xem video hoac audio roi lam quiz 5 cau hoi."
          />
          <ListeningSwipeDeck
            exercises={deckEntries}
            title="Swipe de luyen nghe"
            onDeckComplete={handleDeckComplete}
            onProgressChange={handleProgress}
          />
        </div>

        <div className="space-y-3">
          <SectionHeading
            eyebrow={nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview"}
            title="Clip ngay tiep theo"
            description="Xem truoc chu de de san sang."
          />
          {preview.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {preview.map((exercise) => (
                <ListeningExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Khong co preview cho ngay tiep theo.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

