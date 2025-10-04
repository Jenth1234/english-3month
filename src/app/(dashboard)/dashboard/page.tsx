"use client";

import { SectionHeading } from "@/components/atoms/SectionHeading";
import { MetricTile } from "@/components/molecules/MetricTile";
import { AssessmentsPanel } from "@/components/organisms/AssessmentsPanel";
import { DailyPlanGrid } from "@/components/organisms/DailyPlanGrid";
import { PhaseProgressPanel } from "@/components/organisms/PhaseProgressPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDailyPlan } from "@/features/dashboard/hooks/useDailyPlan";
import { mockAssessments, mockPhaseProgress } from "@/features/dashboard/data/sample";

const TOP_METRICS = [
  {
    title: "Daily Focus",
    value: "Vocabulary + Listening",
    description: "Today's blend",
    status: "success" as const
  },
  {
    title: "Streak",
    value: "12 days",
    description: "Consistency",
    status: "success" as const
  },
  {
    title: "Weekly Completion",
    value: "68%",
    description: "Week 2 of Phase 1",
    status: "warning" as const
  },
  {
    title: "Next Milestone",
    value: "Shadowing Check",
    description: "Due tomorrow",
    status: "neutral" as const
  }
];

export default function DashboardPage() {
  const { days, activeDay, setActiveDayId, loading, error, toggleTask, dayCompletion } = useDailyPlan();
  const showSkeleton = loading && !activeDay;

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Trung tâm điều phối"
        title="Luyện tiếng Anh sẵn sàng cho sprint"
        description="Theo sát lộ trình tuần 2 và hoàn thành mục tiêu trước cột mốc tiếp theo."
        actions={<Badge variant="secondary">Hoàn thành hôm nay: {dayCompletion}%</Badge>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TOP_METRICS.map((metric) => (
          <MetricTile key={metric.title} {...metric} />
        ))}
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Nhịp học mỗi ngày"
          title="Plan cho hôm nay"
          description={
            activeDay
              ? activeDay.label
              : "Hoàn thành 3 nhiệm vụ trọng tâm: từ vựng, nghe và phản xạ nói."
          }
          actions={error ? <span className="text-xs text-destructive">{error}</span> : null}
        />

        <div className="flex flex-wrap items-center gap-2">
          {days.map((day) => (
            <Button
              key={day.id}
              variant={activeDay?.id === day.id ? "default" : day.locked ? "outline" : "secondary"}
              disabled={day.locked}
              onClick={() => setActiveDayId(day.id)}
            >
              {day.label}
              {day.locked ? (
                <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide">
                  Khóa
                </span>
              ) : null}
              {day.completed && !day.locked ? (
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                  Done
                </span>
              ) : null}
            </Button>
          ))}
        </div>

        {showSkeleton ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : activeDay ? (
          <DailyPlanGrid
            items={activeDay.items}
            onToggleTask={(itemId, taskId, nextValue) =>
              void toggleTask(activeDay.id, itemId, taskId, nextValue)
            }
          />
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
            Chưa có daily plan nào để hiển thị.
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PhaseProgressPanel phases={mockPhaseProgress} />
        <AssessmentsPanel assessments={mockAssessments} />
      </section>
    </div>
  );
}

