"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks/useFirestoreCollection";

import { SimulationScenario, simulationScenarioSchema } from "@/features/simulation/schema";

const COLLECTION_PATH = "simulationScenarios";

export function useSimulationScenarios() {
  return useFirestoreCollection<SimulationScenario>({
    path: COLLECTION_PATH,
    schema: simulationScenarioSchema
  });
}
