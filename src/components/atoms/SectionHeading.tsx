import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function SectionHeading({ title, eyebrow, description, actions, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p> : null}
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2 text-sm text-muted-foreground">{actions}</div> : null}
    </div>
  );
}
