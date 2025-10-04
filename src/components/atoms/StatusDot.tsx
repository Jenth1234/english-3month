import { cn } from "@/lib/utils";

interface StatusDotProps {
  status?: "success" | "warning" | "error" | "neutral";
}

const STATUS_COLOR: Record<Required<StatusDotProps>["status"], string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  neutral: "bg-muted"
};

export function StatusDot({ status = "neutral" }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-2.5 w-2.5 rounded-full", STATUS_COLOR[status])}
    />
  );
}
