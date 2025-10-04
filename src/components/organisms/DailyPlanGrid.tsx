import { DailyPlanCard } from "@/components/molecules/DailyPlanCard";
import type { DailyPlanItem } from "@/features/dashboard/types";

interface DailyPlanGridProps {
  items: DailyPlanItem[];
}

export function DailyPlanGrid({ items }: DailyPlanGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <DailyPlanCard key={item.id} {...item} />
      ))}
    </div>
  );
}
