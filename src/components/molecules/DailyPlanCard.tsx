import Link from "next/link";
import { ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface DailyPlanCardProps {
  title: string;
  focus: string;
  duration: string;
  tasks: string[];
  actionLabel: string;
  actionHref?: string;
  actionIcon?: ReactNode;
  actionVariant?: ButtonProps["variant"];
  onActionClick?: () => void;
}

export function DailyPlanCard({
  title,
  focus,
  duration,
  tasks,
  actionLabel,
  actionHref,
  actionIcon,
  actionVariant = "secondary",
  onActionClick
}: DailyPlanCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{focus}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{duration}</p>
          <Separator />
          <ul className="space-y-1 text-sm text-muted-foreground">
            {tasks.map((task) => (
              <li key={task} className="flex items-center gap-2">
                <span aria-hidden>•</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          className="w-full"
          variant={actionVariant}
          onClick={onActionClick}
          asChild={Boolean(actionHref)}
        >
          {actionHref ? (
            <Link href={actionHref} className="flex items-center justify-center gap-2">
              {actionIcon}
              <span>{actionLabel}</span>
            </Link>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {actionIcon}
              <span>{actionLabel}</span>
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
