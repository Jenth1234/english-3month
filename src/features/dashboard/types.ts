import { z } from "zod";

export const dailyPlanTaskSchema = z.object({
  id: z.string(),
  label: z.string(),
  completed: z.boolean().default(false),
  resourceHref: z.string().optional()
});

export type DailyPlanTask = z.infer<typeof dailyPlanTaskSchema>;

export const dailyPlanItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  focus: z.string(),
  tasks: z.array(dailyPlanTaskSchema),
  actionLabel: z.string(),
  actionHref: z.string().optional(),
  updatedAt: z.string().datetime().optional()
});

export type DailyPlanItem = z.infer<typeof dailyPlanItemSchema>;

export const dailyPlanDaySchema = z.object({
  id: z.string(),
  label: z.string(),
  sequence: z.number().int().nonnegative(),
  locked: z.boolean().default(false),
  completed: z.boolean().default(false),
  items: z.array(dailyPlanItemSchema)
});

export type DailyPlanDay = z.infer<typeof dailyPlanDaySchema>;

export const dailyPlanResponseSchema = z.object({
  days: z.array(dailyPlanDaySchema)
});

export type DailyPlanResponse = z.infer<typeof dailyPlanResponseSchema>;

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
