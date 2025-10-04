import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { VocabularyEntry } from "@/features/vocabulary/schema";

interface VocabularyCardProps {
  entry: VocabularyEntry;
}

const PROFICIENCY_COPY: Record<VocabularyEntry["proficiency"], { label: string; tone: string }> = {
  foundation: { label: "Phase 1 · Foundation", tone: "bg-emerald-100 text-emerald-700" },
  practice: { label: "Phase 2 · Practice", tone: "bg-amber-100 text-amber-700" },
  "work-ready": { label: "Phase 3 · Work-ready", tone: "bg-sky-100 text-sky-700" }
};

export function VocabularyCard({ entry }: VocabularyCardProps) {
  const proficiency = PROFICIENCY_COPY[entry.proficiency];

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl font-semibold">
            {entry.term}
            {entry.pronunciation ? (
              <span className="ml-2 text-sm font-normal text-muted-foreground">/{entry.pronunciation}/</span>
            ) : null}
          </CardTitle>
          <Badge className={cn("text-xs", proficiency.tone)} variant="outline">
            {proficiency.label}
          </Badge>
        </div>
        <CardDescription className="text-base text-foreground">{entry.translation}</CardDescription>
        {entry.partOfSpeech ? (
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{entry.partOfSpeech}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        {entry.notes ? <p className="text-sm text-muted-foreground">{entry.notes}</p> : null}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-secondary text-xs capitalize">
              {tag}
            </Badge>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ví dụ</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {entry.examples.map((example) => (
              <li key={example.sentence}>
                <span className="block text-xs font-semibold text-foreground/80">{example.context}</span>
                <span className="block text-foreground">{example.sentence}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        ID: {entry.id}
      </CardFooter>
    </Card>
  );
}
