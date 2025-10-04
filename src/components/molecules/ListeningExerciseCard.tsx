import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ListeningExercise } from "@/features/listening/schema";

interface ListeningExerciseCardProps {
  exercise: ListeningExercise;
}

const LEVEL_BADGE: Record<ListeningExercise["level"], string> = {
  foundation: "bg-emerald-100 text-emerald-700",
  practice: "bg-amber-100 text-amber-700",
  "work-ready": "bg-sky-100 text-sky-700"
};

export function ListeningExerciseCard({ exercise }: ListeningExerciseCardProps) {
  const renderMedia = () => {
    if (exercise.mediaType === "video" && exercise.youTubeId) {
      return (
        <div className="space-y-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`https://www.youtube.com/embed/${exercise.youTubeId}`}
              title={exercise.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={`https://www.youtube.com/watch?v=${exercise.youTubeId}`} target="_blank" rel="noopener noreferrer">
              Open on YouTube
            </a>
          </Button>
        </div>
      );
    }

    if (exercise.mediaUrl) {
      return (
        <div className="flex items-center justify-between rounded-md border border-border bg-secondary/40 p-3">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Audio clip</p>
            <p>{exercise.duration}</p>
          </div>
          <Button asChild variant="secondary" size="sm">
            <a href={exercise.mediaUrl} target="_blank" rel="noopener noreferrer">
              Play audio
            </a>
          </Button>
        </div>
      );
    }

    return (
      <CardDescription className="text-sm text-muted-foreground">
        Media source is not available yet.
      </CardDescription>
    );
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold">{exercise.title}</CardTitle>
          <Badge className={LEVEL_BADGE[exercise.level]} variant="outline">
            {exercise.level.replace("work-ready", "work ready")}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="bg-secondary/80">
            {exercise.duration}
          </Badge>
          <Badge variant="outline">{exercise.mediaType}</Badge>
          <span>Day {exercise.day}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {exercise.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="bg-secondary text-xs capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 text-sm text-muted-foreground">
        {renderMedia()}
        {exercise.transcript ? (
          <div className="rounded-lg bg-secondary/40 p-3 text-foreground">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Transcript snippet</p>
            <p>{exercise.transcript}</p>
          </div>
        ) : null}
        {exercise.keyPhrases.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key phrases</p>
            <ul className="mt-2 space-y-1">
              {exercise.keyPhrases.map((phrase: string) => (
                <li key={phrase} className="text-foreground">
                  - {phrase}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {exercise.questions.length ? (
          <div>
            <Separator className="my-2" />
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sample questions</p>
            <ul className="mt-2 space-y-1">
              {exercise.questions.slice(0, 2).map((question) => (
                <li key={question.id} className="text-foreground">
                  - {question.prompt}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
      <CardFooter />
    </Card>
  );
}
