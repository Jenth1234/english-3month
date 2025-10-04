import { DailyPlanCard } from "@/components/molecules/DailyPlanCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyPlanItem } from "@/features/dashboard/types";

interface DailyPlanGridProps {
  items: DailyPlanItem[];
  onToggleTask?: (itemId: string, taskId: string, nextValue: boolean) => void;
}

export function DailyPlanGrid({ items, onToggleTask }: DailyPlanGridProps) {
  if (!items.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Không có kế hoạch cho hôm nay</CardTitle>
          <CardDescription>Hãy thêm nhiệm vụ mới trong CMS hoặc đồng bộ từ Firestore.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Nhấn nút làm mới sau khi bạn cập nhật dữ liệu.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <DailyPlanCard
          key={item.id}
          {...item}
          onToggleTask={(taskId, nextValue) => onToggleTask?.(item.id, taskId, nextValue)}
        />
      ))}
    </div>
  );
}
