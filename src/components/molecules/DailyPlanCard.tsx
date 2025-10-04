import Link from "next/link";
import { ReactNode, useMemo } from "react";

import { ProgressBar } from "@/components/atoms/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DailyPlanTask } from "@/features/dashboard/types";

interface DailyPlanCardProps {
  title: string;
  focus: string;
  duration: string;
  tasks: DailyPlanTask[];
  actionLabel: string;
  actionHref?: string;
  actionIcon?: ReactNode;
  actionVariant?: ButtonProps["variant"];
  onActionClick?: () => void;
  onToggleTask?: (taskId: string, nextValue: boolean) => void;
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
  onActionClick,
  onToggleTask
}: DailyPlanCardProps) {
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
              Daily Sprint
            </Badge>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{focus}</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <Badge variant="outline" className="border-border text-muted-foreground">
              {duration}
            </Badge>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Tiến độ</span>
            <span className="text-lg font-semibold text-primary">{progress}%</span>
          </div>
        </div>
        <ProgressBar value={progress} />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <Separator />
        <ul className="space-y-3 text-sm">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-start gap-3">
              <input
                aria-label={task.label}
                checked={task.completed}
                className="mt-1 h-4 w-4 cursor-pointer rounded border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onChange={() => onToggleTask?.(task.id, !task.completed)}
                type="checkbox"
              />
              <div className="flex-1">
                <p className={task.completed ? "font-medium text-foreground" : "font-medium text-foreground"}>
                  {task.label}
                </p>
                {task.resourceHref ? (
                  <Link
                    className="text-xs text-primary underline-offset-4 hover:underline"
                    href={task.resourceHref}
                  >
                    Tài liệu tham khảo
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-0">
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
      </CardFooter>
    </Card>
  );
}
