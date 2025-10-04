"use client";

import { useMemo } from "react";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { WritingPromptCard } from "@/components/molecules/WritingPromptCard";
import { MetricTile } from "@/components/molecules/MetricTile";
import { useDailyPlan } from "@/features/dashboard/hooks/useDailyPlan";
import { useWritingShowcase } from "@/features/writing/hooks/useWritingShowcase";

export default function WritingPage() {
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

  const { currentDay, review, preview } = useWritingShowcase({
    activeDay: activeSequence,
    previewDay: nextUnlockedDay ? nextUnlockedDay.sequence : null
  });

  const summaryTiles = [
    {
      title: "Prompt chính",
      value: `${currentDay.length} task`,
      description: `Day ${activeSequence}`,
      status: "success" as const
    },
    {
      title: "Ôn lại",
      value: `${review.length} task`,
      description: "Refine từ hôm qua",
      status: "warning" as const
    },
    {
      title: nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview",
      value: `${preview.length} task`,
      description: nextUnlockedDay ? nextUnlockedDay.label : "Không có task tiếp theo",
      status: "neutral" as const
    },
    {
      title: "AI hỗ trợ",
      value: `${currentDay.filter((prompt) => prompt.aiAssistance).length} / ${Math.max(currentDay.length, 1)}`,
      description: "Prompt có AI",
      status: "success" as const
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Writing Practice"
        title="Viết theo tình huống công việc"
        description="Chuẩn bị email, ghi chú retro, và handoff theo checklist rõ ràng." />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <MetricTile key={tile.title} {...tile} />
        ))}
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <SectionHeading
            eyebrow={`Day ${activeSequence}`}
            title="Prompt hôm nay"
            description={activeDay?.label ?? "Ghi chú stand-up và retro."}
          />
          {currentDay.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {currentDay.map((prompt) => (
                <WritingPromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Không có prompt mới.
            </p>
          )}
        </div>

        {review.length ? (
          <div className="space-y-3">
            <SectionHeading
              eyebrow="Ôn lại"
              title="Review nội dung đã viết"
              description="Chỉnh sửa và cải thiện trước khi submit."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {review.map((prompt) => (
                <WritingPromptCard key={prompt.id} prompt={prompt} actionLabel="Mở bài cũ" />
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <SectionHeading
            eyebrow={nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview"}
            title="Chuẩn bị trước"
            description="Nắm outline để ngày mai viết nhanh hơn." />
          {preview.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {preview.map((prompt) => (
                <WritingPromptCard key={prompt.id} prompt={prompt} actionLabel="Xem trước" />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Không có nội dung preview.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}





