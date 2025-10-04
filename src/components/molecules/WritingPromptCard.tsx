import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { WritingPrompt } from "@/features/writing/schema";

interface WritingPromptCardProps {
  prompt: WritingPrompt;
  actionLabel?: string;
}

export function WritingPromptCard({ prompt, actionLabel = "Bắt đầu viết" }: WritingPromptCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{prompt.title}</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Day {prompt.day}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{prompt.scenario}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Checklist</p>
          <ul className="mt-2 space-y-1 text-foreground">
            {prompt.checklist.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        {prompt.sampleOutline.length ? (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Gợi ý outline</p>
            <ul className="mt-2 space-y-1 text-foreground">
              {prompt.sampleOutline.map((item) => (
                <li key={item}>→ {item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">{prompt.targetLength} words</Badge>
          {prompt.aiAssistance ? <Badge variant="outline">AI Assist</Badge> : null}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="secondary" className="w-full">
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
