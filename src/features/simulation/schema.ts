import { z } from "zod";

export const simulationScenarioSchema = z.object({
  id: z.string(),
  day: z.number().int().min(1),
  collection: z.enum(["new", "review"]).default("new"),
  title: z.string(),
  role: z.enum(["speaker", "listener", "interviewer", "interviewee"]).default("speaker"),
  context: z.string(),
  goal: z.string(),
  script: z
    .array(
      z.object({
        actor: z.string(),
        line: z.string()
      })
    )
    .default([]),
  followUpQuestions: z.array(z.string()).default([]),
  tips: z.array(z.string()).default([])
});

export type SimulationScenario = z.infer<typeof simulationScenarioSchema>;
