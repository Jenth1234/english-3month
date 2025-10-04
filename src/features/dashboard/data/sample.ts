import { assessmentSchema, dailyPlanItemSchema, phaseProgressSchema } from "@/features/dashboard/types";

export const mockDailyPlan = dailyPlanItemSchema.array().parse([
  {
    id: "vocab",
    title: "Vocabulary Sprint",
    duration: "20 min",
    focus: "IT onboarding terms",
    tasks: ["Flashcards", "Quick quiz"],
    actionLabel: "Start practice"
  },
  {
    id: "listening",
    title: "Listening Lab",
    duration: "15 min",
    focus: "Daily stand-up sample",
    tasks: ["Watch clip", "Answer comprehension"],
    actionLabel: "Play audio"
  },
  {
    id: "speaking",
    title: "Speaking Boost",
    duration: "10 min",
    focus: "Shadowing phrases",
    tasks: ["Record", "Check accuracy"],
    actionLabel: "Open recorder"
  }
]);

export const mockPhaseProgress = phaseProgressSchema.array().parse([
  {
    id: "phase-1",
    title: "Phase 1 · Foundation",
    description: "Vocabulary, pronunciation basics, listening warm-up",
    weekRange: "Week 1-4",
    progress: 68
  },
  {
    id: "phase-2",
    title: "Phase 2 · Practice",
    description: "Writing templates, role-play simulations",
    weekRange: "Week 5-8",
    progress: 10
  },
  {
    id: "phase-3",
    title: "Phase 3 · Work Ready",
    description: "Meetings, interview drills, assessments",
    weekRange: "Week 9-12",
    progress: 0
  }
]);

export const mockAssessments = assessmentSchema.array().parse([
  {
    id: "shadowing",
    title: "Shadowing Accuracy",
    description: "Practice with sample meeting transcript",
    actionLabel: "Review"
  },
  {
    id: "retro",
    title: "Weekly Retrospective",
    description: "Share blockers + feedback for BA team",
    actionLabel: "Open form"
  },
  {
    id: "vocab-check",
    title: "Vocabulary Checkpoint",
    description: "IT onboarding + dev workflow terms",
    actionLabel: "Start quiz"
  }
]);
