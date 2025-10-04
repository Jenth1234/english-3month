import { z } from "zod";

// ✅ Schema cho từng câu hỏi
export const listeningQuestionSchema = z.object({
  id: z.string().min(1, "Question ID is required"),
  prompt: z.string().min(1, "Question prompt is required"),
  options: z.array(z.string().min(1)).min(2, "At least two options are required"),
  correctIndex: z.number().int().min(0),
  explanation: z.string().optional(),
});

// ✅ Schema cho toàn bộ bài nghe
export const listeningExerciseSchema = z.object({
  id: z.string().min(1, "Exercise ID is required"),
  day: z.number().int().min(1, "Day must be >= 1"),
  collection: z.enum(["new", "review"]).default("new"),
  title: z.string().min(1, "Title is required"),
  level: z.enum(["foundation", "practice", "work-ready"]),
  mediaUrl: z.string().url().optional().or(z.literal("")), // ✅ tránh lỗi nếu null hoặc ""
  youTubeId: z.string().optional().or(z.literal("")),
  mediaType: z.enum(["audio", "video"]).default("audio"),
  duration: z.string().min(1, "Duration is required"),
  mustWatch: z.boolean().default(false),
  transcript: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  keyPhrases: z.array(z.string()).default([]),
  questions: z.array(listeningQuestionSchema).default([]),
});

// ✅ Type inference
export type ListeningExercise = z.infer<typeof listeningExerciseSchema>;
export type ListeningQuestion = z.infer<typeof listeningQuestionSchema>;
