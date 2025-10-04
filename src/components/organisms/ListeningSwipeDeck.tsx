"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ListeningExercise } from "@/features/listening/schema";

interface ListeningSwipeDeckProps {
  exercises: ListeningExercise[];
  onDeckComplete?: () => void;
  onProgressChange?: (completed: number, total: number) => void;
  title?: string;
}

type CardPhase = "media" | "quiz" | "finished";

interface DeckState {
  index: number;
  phase: CardPhase;
  completedIds: Set<string>;
  answers: Record<string, number | null>;
  error: string | null;
}

const initialState: DeckState = {
  index: 0,
  phase: "media",
  completedIds: new Set(),
  answers: {},
  error: null
};

export function ListeningSwipeDeck({
  exercises,
  onDeckComplete,
  onProgressChange,
  title
}: ListeningSwipeDeckProps) {
  const [state, setState] = useState<DeckState>(initialState);

  const currentExercise = exercises[state.index];
  const total = exercises.length;
  const completedCount = state.completedIds.size;
  const deckDone = completedCount === total && total > 0;

  // 🪵 Log mỗi lần render
  console.log("📍 STATE:", state);
  console.log("📍 currentExercise:", currentExercise);
  console.log("📍 total:", total, "completedCount:", completedCount);

  useEffect(() => {
    setState(initialState);
  }, [exercises]);

  useEffect(() => {
    onProgressChange?.(completedCount, total);
  }, [completedCount, total, onProgressChange]);

  useEffect(() => {
    if (deckDone) {
      onDeckComplete?.();
    }
  }, [deckDone, onDeckComplete]);

  useEffect(() => {
    if (!currentExercise) return;

    const freshAnswers: Record<string, number | null> = {};
    currentExercise.questions.forEach((q) => {
      freshAnswers[q.id] = null;
    });

    console.log("🆕 Reset answers for new exercise:", freshAnswers);

    setState((prev) => ({
      ...prev,
      answers: freshAnswers,
      phase: "media",
      error: null
    }));
  }, [currentExercise]);

  const progressLabel = useMemo(() => {
    if (deckDone) return "Da hoan thanh Listening Lab hom nay.";
    if (!currentExercise) return "Khong co du lieu bai nghe.";
    return `Card ${state.index + 1}/${total}`;
  }, [currentExercise, deckDone, state.index, total]);

  const renderMedia = () => {
    if (!currentExercise) return null;

    if (currentExercise.mediaType === "video" && currentExercise.youTubeId) {
  const params = "?controls=1&modestbranding=1&rel=0";

      return (
        <div className="space-y-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src={`https://www.youtube.com/embed/${currentExercise.youTubeId}${params}`}
              title={currentExercise.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Video controls da duoc an. Xem het truoc khi lam quiz.
          </p>
        </div>
      );
    }

    if (currentExercise.mediaUrl) {
      return (
        <div className="space-y-3">
          <audio controls className="w-full">
            <source src={currentExercise.mediaUrl} />
          </audio>
          <p className="text-xs text-muted-foreground">
            Nghe het audio truoc khi lam quiz.
          </p>
        </div>
      );
    }

    return <p className="text-sm text-muted-foreground">Chua co media cho bai nay.</p>;
  };

  const allAnswered = useMemo(() => {
    return currentExercise?.questions.every((q) => state.answers[q.id] !== null) ?? false;
  }, [currentExercise, state.answers]);

  const allCorrect = useMemo(() => {
    if (!currentExercise) return false;
    return currentExercise.questions.every((q) => {
      const selected = state.answers[q.id];
      return selected === q.correctIndex;
    });
  }, [currentExercise, state.answers]);

  const goToNextExercise = useCallback(
    (updatedCompleted: Set<string>) => {
      console.log("➡️ Going to next exercise...");
      console.log("✅ Completed IDs:", Array.from(updatedCompleted));

      if (updatedCompleted.size === total) {
        setState((prev) => ({
          ...prev,
          completedIds: updatedCompleted,
          phase: "finished",
          error: null
        }));
        return;
      }

      const nextIndex = exercises.findIndex(
        (ex, idx) => idx > state.index && !updatedCompleted.has(ex.id)
      );
      const fallbackIndex = exercises.findIndex(
        (ex, idx) => idx !== state.index && !updatedCompleted.has(ex.id)
      );
      const resolvedIndex = nextIndex !== -1 ? nextIndex : fallbackIndex !== -1 ? fallbackIndex : state.index;

      console.log("➡️ Next index:", resolvedIndex);

      setState((prev) => ({
        index: resolvedIndex,
        phase: "media",
        completedIds: updatedCompleted,
        answers: prev.answers,
        error: null
      }));
    },
    [exercises, state.index, total]
  );

  const handleSubmitQuiz = useCallback(() => {
    console.log("📤 Submitting quiz...");
    console.log("🧠 Answers:", state.answers);
    console.log("✅ allAnswered:", allAnswered, "✅ allCorrect:", allCorrect);

    if (!currentExercise) return;

    if (!allAnswered) {
      setState((prev) => ({ ...prev, error: "Hay tra loi tat ca cau hoi." }));
      return;
    }
    if (!allCorrect) {
      setState((prev) => ({ ...prev, error: "Co cau chua dung, vui long xem lai." }));
      return;
    }

    const updated = new Set(state.completedIds);
    updated.add(currentExercise.id);
    goToNextExercise(updated);
  }, [allAnswered, allCorrect, currentExercise, goToNextExercise, state.answers, state.completedIds]);

  const handleBeginQuiz = useCallback(() => {
    console.log("▶️ Begin quiz");
    setState((prev) => ({ ...prev, phase: "quiz", error: null }));
  }, []);

  const handleSelectAnswer = useCallback((questionId: string, optionIndex: number) => {
    console.log(`✏️ Answer selected for ${questionId}:`, optionIndex);
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionIndex },
      error: null
    }));
  }, []);

  const handleRestart = useCallback(() => {
    console.log("🔄 Restart deck");
    setState(initialState);
  }, []);

  if (!total) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
        Khong co listening task cho ngay nay.
      </div>
    );
  }

  if (deckDone) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center">
        <h3 className="text-xl font-semibold text-primary">Hoan thanh Listening Lab</h3>
        <p className="text-sm text-muted-foreground">Ban da hoan thanh {total} clip hoac audio.</p>
        <Button variant="secondary" onClick={handleRestart}>
          Luyen lai deck
        </Button>
      </div>
    );
  }

  if (!currentExercise) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
      <div className="text-center">
        {title ? <h3 className="text-lg font-semibold">{title}</h3> : null}
        <p className="text-sm text-muted-foreground">{progressLabel}</p>
      </div>

      <div className="relative flex h-[28rem] w-full max-w-2xl items-center justify-center">
        {[...exercises]
          .slice(state.index)
          .slice(0, 3)
          .map((exercise, offset) => {
            const isActive = offset === 0;
            const depth = offset * 12;
            const scale = 1 - offset * 0.06;
            return (
              <Card
                key={exercise.id}
                className="absolute flex h-full w-full flex-col overflow-hidden rounded-3xl border-none bg-card shadow-2xl transition-all duration-300"
                style={{ transform: "translateY(" + depth + "px) scale(" + scale + ")", opacity: scale }}
              >
                {isActive ? (
                  <div className="flex h-full w-full flex-col gap-4 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Listening Lab</p>
                        <h4 className="text-xl font-semibold text-foreground">{exercise.title}</h4>
                      </div>
                      <span className="text-xs text-muted-foreground">{exercise.mediaType}</span>
                    </div>

                    <div className="flex-1 space-y-4 overflow-auto pr-2">
                      {renderMedia()}

                      {state.phase === "quiz" ? (
                        <div className="space-y-4">
                          <Separator />
                          <p className="text-sm font-semibold text-foreground">Tra loi 5 cau hoi</p>
                          <div className="space-y-4">
                            {exercise.questions.map((question) => (
                              <div key={question.id} className="space-y-2 rounded-md border border-border p-3">
                                <p className="text-sm font-medium text-foreground">{question.prompt}</p>
                                <div className="space-y-1">
                                  {question.options.map((option, optionIndex) => {
                                    const inputId = `${question.id}-${optionIndex}`;
                                    const selected = state.answers[question.id];
                                    return (
                                      <label key={inputId} className="flex items-center gap-2 text-sm text-foreground">
                                        <input
                                          id={inputId}
                                          type="radio"
                                          name={question.id}
                                          value={optionIndex}
                                          checked={selected === optionIndex}
                                          onChange={() => handleSelectAnswer(question.id, optionIndex)}
                                        />
                                        {option}
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {state.phase === "media" ? (
                      <Button onClick={handleBeginQuiz}>Bat dau cau hoi</Button>
                    ) : (
                      <Button onClick={handleSubmitQuiz}>Submit cau tra loi</Button>
                    )}

                    {state.error ? <p className="text-xs text-destructive">{state.error}</p> : null}
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-3xl bg-muted/40">
                    <span className="text-sm text-muted-foreground">Dang cho</span>
                  </div>
                )}
              </Card>
            );
          })}
      </div>

      <div className="text-xs text-muted-foreground">
        Da hoan thanh: {completedCount}/{total}
      </div>
    </div>
  );
}
