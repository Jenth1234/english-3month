import { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusDot } from "@/components/atoms/StatusDot";

export interface MetricTileProps {
  title: string;
  value: ReactNode;
  description?: string;
  status?: "success" | "warning" | "error" | "neutral";
}

export function MetricTile({ title, value, description, status }: MetricTileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {title}
          {status ? <StatusDot status={status} /> : null}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

