import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { PronunciationDrill } from "@/features/pronunciation/schema";

interface PronunciationDrillCardProps {
  drill: PronunciationDrill;
}

const DIFFICULTY_BADGE: Record<PronunciationDrill["difficulty"], string> = {
  foundation: "bg-emerald-100 text-emerald-700",
  practice: "bg-amber-100 text-amber-700",
  "work-ready": "bg-sky-100 text-sky-700"
};

export function PronunciationDrillCard({ drill }: PronunciationDrillCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold">{drill.title}</CardTitle>
          <Badge className={DIFFICULTY_BADGE[drill.difficulty]} variant="outline">
            {drill.difficulty.replace("work-ready", "work ready")}
          </Badge>
        </div>
        <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
          Day {drill.day}
        </Badge>
        <p className="text-sm text-muted-foreground">{drill.focus}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {drill.targetPhonemes.map((phoneme) => (
            <Badge key={phoneme} variant="outline">
              {phoneme}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="rounded-lg bg-secondary/40 p-3 text-foreground">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Script</p>
          <p>{drill.script}</p>
        </div>
        {drill.tips.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tips</p>
            <ul className="mt-2 space-y-1">
              {drill.tips.map((tip) => (
                <li key={tip} className="text-foreground">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant="secondary">
          <a href={drill.audioUrl} target="_blank" rel="noopener noreferrer">
            Nghe và luyện
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
