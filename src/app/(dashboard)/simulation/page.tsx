"use client";

import { useMemo } from "react";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { SimulationScenarioCard } from "@/components/molecules/SimulationScenarioCard";
import { MetricTile } from "@/components/molecules/MetricTile";
import { useDailyPlan } from "@/features/dashboard/hooks/useDailyPlan";
import { useSimulationShowcase } from "@/features/simulation/hooks/useSimulationShowcase";

export default function SimulationPage() {
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

  const { currentDay, review, preview } = useSimulationShowcase({
    activeDay: activeSequence,
    previewDay: nextUnlockedDay ? nextUnlockedDay.sequence : null
  });

  const summaryTiles = [
    {
      title: "Role-play chính",
      value: `${currentDay.length} kịch bản`,
      description: `Day ${activeSequence}`,
      status: "success" as const
    },
    {
      title: "Ôn lại",
      value: `${review.length} tình huống`,
      description: "Nhắc lại skill cũ",
      status: "warning" as const
    },
    {
      title: nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview",
      value: `${preview.length} kịch bản`,
      description: nextUnlockedDay ? nextUnlockedDay.label : "Không có kịch bản tiếp theo",
      status: "neutral" as const
    },
    {
      title: "Stakeholder",
      value: `${preview.filter((scenario) => scenario.context.includes("stakeholder")).length}`,
      description: "Preview liên quan stakeholder",
      status: "success" as const
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Simulation"
        title="Giả lập hội thoại thật"
        description="Thực hành daily, retro và incident call trước khi đi vào thực chiến." />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <MetricTile key={tile.title} {...tile} />
        ))}
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <SectionHeading
            eyebrow={`Day ${activeSequence}`}
            title="Kịch bản chính"
            description={activeDay?.label ?? "Hội thoại stand-up và retro."}
          />
          {currentDay.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {currentDay.map((scenario) => (
                <SimulationScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Không có kịch bản mới.
            </p>
          )}
        </div>

        {review.length ? (
          <div className="space-y-3">
            <SectionHeading
              eyebrow="Ôn lại"
              title="Replay tình huống cũ"
              description="Nhấn mạnh lesson learned ở mỗi hội thoại."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {review.map((scenario) => (
                <SimulationScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <SectionHeading
            eyebrow={nextUnlockedDay ? `Preview Day ${nextUnlockedDay.sequence}` : "Preview"}
            title="Chuẩn bị tình huống"
            description="Làm quen script để ngày mai phản xạ nhanh." />
          {preview.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {preview.map((scenario) => (
                <SimulationScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
              Không có kịch bản preview.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
