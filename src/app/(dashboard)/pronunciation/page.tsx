"use client";

import { useMemo } from "react";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { PronunciationDrillCard } from "@/components/molecules/PronunciationDrillCard";
import { MetricTile } from "@/components/molecules/MetricTile";
import { useDailyPlan } from "@/features/dashboard/hooks/useDailyPlan";
import { usePronunciationShowcase } from "@/features/pronunciation/hooks/usePronunciationShowcase";

export default function PronunciationPage() {
  const { activeDay, days } = useDailyPlan();
  const activeSequence = activeDay?.sequence ?? 1;
  const nextUnlockedDay = useMemo(() => {
    if (!days.length) {
      return null;
    }
    const sorted = [...days].sort((a, b) => a.sequence - b.sequence);
    const index = sorted.findIndex((day) => day.id === activeDay?.id);
    return index >= 0 ? sorted[index + 1] ?? null : sorted[1] ?? null;
  }, [activeDay, days]);

  const { currentDay, preview, stats } = usePronunciationShowcase({
    activeDay: activeSequence,
    previewDay: nextUnlockedDay ? nextUnlockedDay.sequence : null,
    reviewCount: 2
  });

  const summaryTiles = [
    {
      title: `Day ${activeSequence}`,
      value: `${currentDay.length} bài luyện`,
      description: "Shadowing hôm nay",
      status: "success" as const
    },
    {
      title: nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Ôn trước",
      value: `${preview.length} drill`,
      description: nextUnlockedDay ? nextUnlockedDay.label : "Không có bài tiếp theo",
      status: "warning" as const
    },
    {
      title: "Foundation",
      value: stats.foundation,
      description: "Kho luyện nền",
      status: "success" as const
    },
    {
      title: "Work-ready",
      value: stats.workReady,
      description: "Tình huống production",
      status: "neutral" as const
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Pronunciation Boost"
        title="Shadowing & voice training"
        description="Drill theo ngữ cảnh meeting và incident để phản xạ giọng chuẩn." />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <MetricTile key={tile.title} {...tile} />
        ))}
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <SectionHeading
            eyebrow={`Day ${activeSequence}`}
            title="Drill chính"
            description={activeDay?.label ?? "Phát âm cho daily stand-up."}
          />
          {currentDay.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {currentDay.map((drill) => (
                <PronunciationDrillCard key={drill.id} drill={drill} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              Chưa có drill cho ngày này.
            </p>
          )}
        </div>

        <div className="space-y-3">
          <SectionHeading
            eyebrow={nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview"}
            title="Ôn trước"
            description="Chuẩn bị phát âm cho tình huống ngày mai." />
          {preview.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {preview.map((drill) => (
                <PronunciationDrillCard key={drill.id} drill={drill} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Không có drill preview.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
