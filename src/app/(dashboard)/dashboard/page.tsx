import { SectionHeading } from "@/components/atoms/SectionHeading";
import { MetricTile } from "@/components/molecules/MetricTile";
import { AssessmentsPanel } from "@/components/organisms/AssessmentsPanel";
import { DailyPlanGrid } from "@/components/organisms/DailyPlanGrid";
import { PhaseProgressPanel } from "@/components/organisms/PhaseProgressPanel";
import { mockAssessments, mockDailyPlan, mockPhaseProgress } from "@/features/dashboard/data/sample";

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
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Mission Control"
        title="Sprint-ready English practice"
        description="Stay on track with the week 2 roadmap and close the gap before the next milestone."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TOP_METRICS.map((metric) => (
          <MetricTile key={metric.title} {...metric} />
        ))}
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Daily Stack"
          title="Plan cho hôm nay"
          description="Hoàn thành 3 nhiệm vụ trọng tâm: từ vựng, nghe và phản xạ nói."
        />
        <DailyPlanGrid items={mockDailyPlan} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PhaseProgressPanel phases={mockPhaseProgress} />
        <AssessmentsPanel assessments={mockAssessments} />
      </section>
    </div>
  );
}
