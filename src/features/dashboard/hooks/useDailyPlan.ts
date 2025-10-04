"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { mockDailyPlan } from "@/features/dashboard/data/sample";
import type { DailyPlanDay, DailyPlanItem } from "@/features/dashboard/types";

interface UseDailyPlanResult {
  days: DailyPlanDay[];
  activeDay: DailyPlanDay | null;
  setActiveDayId: (dayId: string) => void;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  toggleTask: (dayId: string, itemId: string, taskId: string, nextValue: boolean) => Promise<void>;
  dayCompletion: number;
}

const DAILY_PLAN_ENDPOINT = "/api/daily-plan";

const cloneDays = (days: DailyPlanDay[]): DailyPlanDay[] =>
  JSON.parse(JSON.stringify(days));

const pickFirstAvailableDay = (days: DailyPlanDay[]): string | null => {
  const unlocked = days.find((day) => !day.locked);
  return unlocked?.id ?? days[0]?.id ?? null;
};

export function useDailyPlan(): UseDailyPlanResult {
  const [days, setDays] = useState<DailyPlanDay[]>(() => cloneDays(mockDailyPlan));
  const [activeDayId, setActiveDayIdState] = useState<string | null>(() => pickFirstAvailableDay(mockDailyPlan));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setActiveDayId = useCallback((dayId: string) => {
    setActiveDayIdState(dayId);
  }, []);

  const syncActiveDay = useCallback((nextDays: DailyPlanDay[]) => {
    const currentActive = nextDays.find((day) => day.id === activeDayId);
    if (!currentActive || currentActive.locked) {
      const nextId = pickFirstAvailableDay(nextDays);
      setActiveDayIdState(nextId);
    }
  }, [activeDayId]);

  const fetchPlan = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(DAILY_PLAN_ENDPOINT, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Không thể tải daily plan");
      }
      const data = await response.json();
      const nextDays = Array.isArray(data.days) && data.days.length ? data.days : cloneDays(mockDailyPlan);
      setDays(nextDays);
      syncActiveDay(nextDays);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      setError(message);
      const fallback = cloneDays(mockDailyPlan);
      setDays(fallback);
      syncActiveDay(fallback);
    } finally {
      setLoading(false);
    }
  }, [syncActiveDay]);

  useEffect(() => {
    void fetchPlan();
  }, [fetchPlan]);

  const toggleTask = useCallback(
    async (dayId: string, itemId: string, taskId: string, nextValue: boolean) => {
      setDays((prev) =>
        prev.map((day) =>
          day.id === dayId
            ? {
                ...day,
                items: day.items.map((item) =>
                  item.id === itemId
                    ? {
                        ...item,
                        tasks: item.tasks.map((task) =>
                          task.id === taskId ? { ...task, completed: nextValue } : task
                        )
                      }
                    : item
                )
              }
            : day
        )
      );

      try {
        const response = await fetch(DAILY_PLAN_ENDPOINT, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dayId, itemId, taskId, completed: nextValue })
        });

        if (!response.ok) {
          throw new Error(`Không thể cập nhật task (mã ${response.status})`);
        }

        const data = await response.json();
        const nextDays = Array.isArray(data.days) && data.days.length ? data.days : cloneDays(mockDailyPlan);
        setDays(nextDays);
        syncActiveDay(nextDays);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Lỗi cập nhật";
        setError(message);
        const fallback = cloneDays(mockDailyPlan);
        setDays(fallback);
        syncActiveDay(fallback);
      }
    },
    [syncActiveDay]
  );

  const activeDay = useMemo(() => days.find((day) => day.id === activeDayId) ?? null, [days, activeDayId]);

  const dayCompletion = useMemo(() => {
    if (!activeDay) {
      return 0;
    }

    const totals = activeDay.items.reduce(
      (acc, item) => {
        acc.completed += item.tasks.filter((task) => task.completed).length;
        acc.total += item.tasks.length;
        return acc;
      },
      { completed: 0, total: 0 }
    );

    if (!totals.total) {
      return 0;
    }

    return Math.round((totals.completed / totals.total) * 100);
  }, [activeDay]);

  return {
    days,
    activeDay,
    setActiveDayId,
    loading,
    error,
    refresh: fetchPlan,
    toggleTask,
    dayCompletion
  };
}
