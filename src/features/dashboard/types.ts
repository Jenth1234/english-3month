import { z } from "zod";

export const dailyPlanItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  focus: z.string(),
  tasks: z.array(z.string()),
  actionLabel: z.string(),
  actionHref: z.string().optional()
});

export type DailyPlanItem = z.infer<typeof dailyPlanItemSchema>;

export const phaseProgressSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  weekRange: z.string(),
  progress: z.number().min(0).max(100)
});

export type PhaseProgress = z.infer<typeof phaseProgressSchema>;

export const assessmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  actionLabel: z.string(),
  actionHref: z.string().optional()
});

export type AssessmentItem = z.infer<typeof assessmentSchema>;
