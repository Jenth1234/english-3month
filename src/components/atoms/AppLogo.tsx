import { GraduationCap } from "lucide-react";

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 font-semibold tracking-tight">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <GraduationCap className="h-5 w-5" />
      </div>
      <span>English Roadmap</span>
    </div>
  );
}
