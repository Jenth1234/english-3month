import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SimulationScenario } from "@/features/simulation/schema";

interface SimulationScenarioCardProps {
  scenario: SimulationScenario;
}

export function SimulationScenarioCard({ scenario }: SimulationScenarioCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold">{scenario.title}</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Day {scenario.day}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{scenario.context}</p>
        <Badge variant="outline" className="w-fit uppercase tracking-wide text-xs">
          Role: {scenario.role}
        </Badge>
        <p className="text-xs text-muted-foreground">Goal: {scenario.goal}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Script</p>
          <div className="mt-2 space-y-2 rounded-lg bg-secondary/40 p-3 text-foreground">
            {scenario.script.map((line, index) => (
              <p key={`${line.actor}-${index}`}>
                <span className="font-semibold">{line.actor}:</span> {line.line}
              </p>
            ))}
          </div>
        </div>
        {scenario.followUpQuestions.length ? (
          <div>
            <Separator className="my-2" />
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Follow-up</p>
            <ul className="mt-2 space-y-1 text-foreground">
              {scenario.followUpQuestions.map((question) => (
                <li key={question}>• {question}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {scenario.tips.length ? (
          <div>
            <Separator className="my-2" />
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Tips</p>
            <ul className="mt-2 space-y-1 text-foreground">
              {scenario.tips.map((tip) => (
                <li key={tip}>→ {tip}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="secondary" className="w-full">
          Bắt đầu giả lập
        </Button>
      </CardFooter>
    </Card>
  );
}
