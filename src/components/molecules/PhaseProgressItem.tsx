import { ProgressBar } from "@/components/atoms/ProgressBar";

interface PhaseProgressItemProps {
  title: string;
  description: string;
  weekRange: string;
  progress: number;
}

export function PhaseProgressItem({ title, description, weekRange, progress }: PhaseProgressItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{weekRange}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <ProgressBar value={progress} />
    </div>
  );
}
