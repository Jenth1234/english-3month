import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhaseProgressItem } from "@/components/molecules/PhaseProgressItem";
import type { PhaseProgress } from "@/features/dashboard/types";

interface PhaseProgressPanelProps {
  phases: PhaseProgress[];
}

export function PhaseProgressPanel({ phases }: PhaseProgressPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase Progress</CardTitle>
        <CardDescription>Track your path through the 3-month roadmap</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {phases.map((phase) => (
          <PhaseProgressItem key={phase.id} {...phase} />
        ))}
      </CardContent>
    </Card>
  );
}
