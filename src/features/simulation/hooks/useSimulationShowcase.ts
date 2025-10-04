"use client";

import { useMemo } from "react";

import { mockSimulationScenarios } from "@/features/simulation/data/mock";
import type { SimulationScenario } from "@/features/simulation/schema";

interface UseSimulationShowcaseOptions {
  activeDay?: number;
  previewDay?: number | null;
}

interface UseSimulationShowcaseResult {
  currentDay: SimulationScenario[];
  review: SimulationScenario[];
  preview: SimulationScenario[];
}

export function useSimulationShowcase({
  activeDay = 1,
  previewDay = activeDay + 1
}: UseSimulationShowcaseOptions = {}): UseSimulationShowcaseResult {
  const currentDay = useMemo(
    () =>
      mockSimulationScenarios.filter(
        (scenario) => scenario.day === activeDay && scenario.collection === "new"
      ),
    [activeDay]
  );

  const review = useMemo(
    () =>
      mockSimulationScenarios.filter(
        (scenario) => scenario.day === activeDay && scenario.collection === "review"
      ),
    [activeDay]
  );

  const preview = useMemo(() => {
    if (!previewDay) {
      return [];
    }

    return mockSimulationScenarios.filter(
      (scenario) => scenario.day === previewDay && scenario.collection === "new"
    );
  }, [previewDay]);

  return { currentDay, review, preview };
}
