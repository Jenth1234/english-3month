"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { VocabularyEntry } from "@/features/vocabulary/schema";

interface VocabularyFlashcardDeckProps {
  entries: VocabularyEntry[];
  onDeckComplete?: () => void;
  onProgressChange?: (completed: number, total: number) => void;
  title?: string;
}

type CardPhase = "front" | "revealed" | "input" | "completed";

interface DeckState {
  index: number;
  phase: CardPhase;
  answer: string;
  error: string | null;
  completedIds: Set<string>;
}

const initialState: DeckState = {
  index: 0,
  phase: "front",
  answer: "",
  error: null,
  completedIds: new Set()
};

export function VocabularyFlashcardDeck({ entries, onDeckComplete, onProgressChange, title }: VocabularyFlashcardDeckProps) {
  const [state, setState] = useState<DeckState>(initialState);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setState(initialState);
  }, [entries]);

  const currentEntry = entries[state.index];
  const total = entries.length;
  const completedCount = state.completedIds.size;
  const deckDone = completedCount === total && total > 0;

  useEffect(() => {
    onProgressChange?.(completedCount, total);
  }, [completedCount, total, onProgressChange]);

  useEffect(() => {
    if (state.phase === "input") {
      inputRef.current?.focus();
    }
  }, [state.phase]);

  useEffect(() => {
    if (deckDone) {
      onDeckComplete?.();
    }
  }, [deckDone, onDeckComplete]);

  const progressLabel = useMemo(() => {
    if (deckDone) {
      return "Đã hoàn thành tất cả từ của ngày hôm nay";
    }
    if (!currentEntry) {
      return "Không có dữ liệu";
    }
    return `Thẻ ${state.index + 1}/${total}`;
  }, [currentEntry, deckDone, state.index, total]);

  const handleShowMeaning = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "revealed", error: null }));
  }, []);

  const handleStartInput = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "input", error: null }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!currentEntry) {
      return;
    }

    const normalizedAnswer = state.answer.trim().toLowerCase();
    const normalizedTerm = currentEntry.term.trim().toLowerCase();

    if (!normalizedAnswer) {
      setState((prev) => ({ ...prev, error: "Hãy nhập lại từ." }));
      return;
    }

    if (normalizedAnswer !== normalizedTerm) {
      setState((prev) => ({ ...prev, error: "Chưa chính xác, thử lại nhé." }));
      return;
    }

    setState((prev) => {
      const nextCompleted = new Set(prev.completedIds);
      nextCompleted.add(currentEntry.id);

      if (nextCompleted.size === total) {
        return {
          ...prev,
          completedIds: nextCompleted,
          phase: "completed",
          error: null
        };
      }

      const nextIndex = entries.findIndex((entry, idx) => idx > prev.index && !nextCompleted.has(entry.id));
      return {
        index: nextIndex !== -1 ? nextIndex : prev.index,
        phase: "front",
        answer: "",
        error: null,
        completedIds: nextCompleted
      };
    });
  }, [currentEntry, entries, state.answer, total]);

  const handleNextCard = useCallback(() => {
    setState((prev) => {
      const nextIndex = entries.findIndex((entry, idx) => idx > prev.index && !prev.completedIds.has(entry.id));
      const fallbackIndex = entries.findIndex((entry, idx) => idx !== prev.index && !prev.completedIds.has(entry.id));
      const resolvedIndex = nextIndex !== -1 ? nextIndex : fallbackIndex !== -1 ? fallbackIndex : prev.index;
      return {
        ...prev,
        index: resolvedIndex,
        phase: "front",
        answer: "",
        error: null
      };
    });
  }, [entries]);

  const handleRestart = useCallback(() => {
    setState(initialState);
  }, []);

  if (!entries.length) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
        Không có từ vựng cho ngày này.
      </div>
    );
  }

  if (deckDone) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center">
        <h3 className="text-xl font-semibold text-primary">Hoàn thành flashcard</h3>
        <p className="text-sm text-muted-foreground">Bạn đã ôn xong {total} từ của ngày hôm nay.</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleRestart}>
            Luyện lại vòng nữa
          </Button>
        </div>
      </div>
    );
  }

  if (!currentEntry) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
      <div className="text-center">
        {title ? <h3 className="text-lg font-semibold">{title}</h3> : null}
        <p className="text-sm text-muted-foreground">{progressLabel}</p>
      </div>

      <div className="relative flex h-80 w-full max-w-sm items-center justify-center">
        {[...entries]
          .slice(state.index)
          .slice(0, 3)
          .map((entry, offset) => {
            const isActive = offset === 0;
            const depth = offset * 8;
            const scale = 1 - offset * 0.05;
            return (
              <Card
                key={entry.id}
                className={cn(
                  "absolute flex h-full w-full flex-col items-center justify-center rounded-2xl border-none bg-card shadow-xl transition-all duration-300",
                  isActive ? "z-30" : "z-20"
                )}
                style={{ transform: `translateY(${depth}px) scale(${scale})`, opacity: scale }}
              >
                {isActive ? (
                  <div className="flex h-full w-full flex-col gap-4 p-6 text-center">
                    <div className="flex flex-1 flex-col items-center justify-center gap-4">
                      <span className="text-sm uppercase tracking-widest text-muted-foreground">Flashcard</span>
                      <h4 className="text-2xl font-semibold text-primary">{entry.term}</h4>

                      {state.phase === "revealed" || state.phase === "input" ? (
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {entry.pronunciation ? (
                            <p className="text-base text-foreground">/{entry.pronunciation}/</p>
                          ) : null}
                          <p className="text-foreground">{entry.translation}</p>
                          {entry.notes ? <p className="text-xs">{entry.notes}</p> : null}
                          {entry.tags.length ? (
                            <div className="flex flex-wrap justify-center gap-1 text-xs text-muted-foreground">
                              {entry.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-secondary px-2 py-0.5">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      {state.phase === "input" ? (
                        <div className="w-full space-y-2">
                          <Input
                            ref={inputRef}
                            value={state.answer}
                            onChange={(event) =>
                              setState((prev) => ({ ...prev, answer: event.target.value, error: null }))
                            }
                            placeholder="Nhập lại từ tiếng Anh"
                          />
                          {state.error ? (
                            <p className="text-xs text-destructive">{state.error}</p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    <div className="grid gap-2">
                      {state.phase === "front" ? (
                        <Button onClick={handleShowMeaning} variant="secondary">
                          Hiển thị nghĩa & phiên âm
                        </Button>
                      ) : null}

                      {state.phase === "revealed" ? (
                        <Button onClick={handleStartInput}>
                          Ôn lại bằng cách nhập lại từ
                        </Button>
                      ) : null}

                      {state.phase === "input" ? (
                        <Button onClick={handleSubmit}>Submit</Button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-muted/40">
                    <span className="text-sm text-muted-foreground">Đang chờ...</span>
                  </div>
                )}
              </Card>
            );
          })}
      </div>

      <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>Đã hoàn thành: {completedCount}/{total}</span>
        {state.phase !== "input" && !deckDone ? (
          <Button onClick={handleNextCard} variant="ghost" size="sm">
            Bỏ qua thẻ này
          </Button>
        ) : null}
      </div>
    </div>
  );
}

