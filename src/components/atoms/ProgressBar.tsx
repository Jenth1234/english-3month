import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

export function ProgressBar({ value, max = 100, className }: ProgressBarProps) {
  const ratio = Math.min(Math.max(value / max, 0), 1);

  return (
    <div className={cn("h-2 rounded-full bg-muted", className)}>
      <div
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar"
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: String(ratio * 100) + "%" }}
      />
    </div>
  );
}
