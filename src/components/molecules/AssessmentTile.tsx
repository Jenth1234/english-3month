import { ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

interface AssessmentTileProps {
  title: string;
  description: string;
  actionLabel: string;
  actionVariant?: ButtonProps["variant"];
  actionHref?: string;
  actionIcon?: ReactNode;
}

export function AssessmentTile({
  title,
  description,
  actionLabel,
  actionVariant = "outline",
  actionHref,
  actionIcon
}: AssessmentTileProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border border-dashed border-border/60 p-4">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Button variant={actionVariant} size="sm" asChild={Boolean(actionHref)}>
        {actionHref ? (
          <a href={actionHref} className="flex items-center gap-2">
            {actionIcon}
            <span>{actionLabel}</span>
          </a>
        ) : (
          <span className="flex items-center gap-2">
            {actionIcon}
            <span>{actionLabel}</span>
          </span>
        )}
      </Button>
    </div>
  );
}
