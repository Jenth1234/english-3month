import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentTile } from "@/components/molecules/AssessmentTile";
import type { AssessmentItem } from "@/features/dashboard/types";

interface AssessmentsPanelProps {
  assessments: AssessmentItem[];
}

export function AssessmentsPanel({ assessments }: AssessmentsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
        <CardDescription>Prep for checkpoints and milestone reviews</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {assessments.map((assessment) => (
          <AssessmentTile key={assessment.id} {...assessment} />
        ))}
      </CardContent>
    </Card>
  );
}
