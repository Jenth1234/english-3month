import { assessmentSchema, dailyPlanDaySchema, phaseProgressSchema } from "@/features/dashboard/types";

export const mockDailyPlan = dailyPlanDaySchema.array().parse([
  {
    id: "day-1",
    label: "Ngày 1 · Vocabulary Sprint",
    sequence: 1,
    locked: false,
    completed: false,
    items: [
      {
        id: "vocab",
        title: "Vocabulary Sprint",
        duration: "20 phút",
        focus: "Từ vựng IT tuần 2",
        tasks: [
          { id: "flashcards", label: "Ôn 20 flashcard nền tảng", completed: false },
          { id: "quiz", label: "Làm quiz 10 câu về onboarding", completed: false }
        ],
        actionLabel: "Bắt đầu luyện",
        actionHref: "/vocabulary"
      },
      {
        id: "listening",
        title: "Listening Lab",
        duration: "15 phút",
        focus: "Bản thu daily stand-up",
        tasks: [
          { id: "watch", label: "Xem video 2 lần", completed: false },
          { id: "comprehension", label: "Trả lời 5 câu hỏi hiểu nội dung", completed: false }
        ],
        actionLabel: "Mở audio",
        actionHref: "/listening"
      },
      {
        id: "speaking",
        title: "Speaking Boost",
        duration: "10 phút",
        focus: "Shadowing câu trả lời blocker",
        tasks: [
          { id: "record", label: "Ghi âm 2 lượt phản xạ", completed: false },
          { id: "compare", label: "Đối chiếu transcript và chỉnh phát âm", completed: false }
        ],
        actionLabel: "Ghi âm ngay",
        actionHref: "/pronunciation"
      }
    ]
  },
  {
    id: "day-2",
    label: "Ngày 2 · Listening & Writing",
    sequence: 2,
    locked: true,
    completed: false,
    items: [
      {
        id: "vocab-day2",
        title: "Vocabulary Sprint",
        duration: "20 phút",
        focus: "Từ vựng mô tả lỗi production",
        tasks: [
          { id: "incident-terms", label: "Học 10 từ liên quan production issue", completed: false },
          { id: "use-case", label: "Viết 3 câu dùng từ mới vào ngữ cảnh", completed: false }
        ],
        actionLabel: "Ôn từ mới",
        actionHref: "/vocabulary"
      },
      {
        id: "listening-day2",
        title: "Listening Lab",
        duration: "15 phút",
        focus: "Call xử lý sự cố",
        tasks: [
          { id: "listen", label: "Nghe bản ghi incident call", completed: false },
          { id: "note", label: "Ghi chú 3 key action item", completed: false }
        ],
        actionLabel: "Play incident call",
        actionHref: "/listening"
      },
      {
        id: "writing-day2",
        title: "Writing Boost",
        duration: "15 phút",
        focus: "Email cập nhật stakeholder",
        tasks: [
          { id: "draft", label: "Soạn email cập nhật status", completed: false },
          { id: "review", label: "Tự review bằng checklist viết email", completed: false }
        ],
        actionLabel: "Bắt đầu viết",
        actionHref: "/writing"
      }
    ]
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
