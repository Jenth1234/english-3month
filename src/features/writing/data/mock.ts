import { writingPromptSchema } from "@/features/writing/schema";

export const mockWritingPrompts = writingPromptSchema.array().parse([
  {
    id: "day1-standup-notes",
    day: 1,
    collection: "new",
    title: "Daily Stand-up Notes",
    scenario: "Viết lại phần chia sẻ trong daily stand-up với cấu trúc Yesterday / Today / Blockers.",
    checklist: [
      "Yesterday: nêu rõ deliverable",
      "Today: thông tin ai sẽ hỗ trợ",
      "Blockers: nếu không có, ghi 'None'"
    ],
    aiAssistance: true,
    targetLength: 80,
    sampleOutline: [
      "Yesterday: Completed onboarding UI tweaks",
      "Today: Pairing with backend on auth retry logic",
      "Blockers: Waiting for QA regression?"
    ]
  },
  {
    id: "day1-retro-snippet",
    day: 1,
    collection: "review",
    title: "Retro Feedback",
    scenario: "Viết 2 đoạn phản hồi trong retro: What went well / What to improve.",
    checklist: [
      "What went well: tập trung vào kết quả",
      "What to improve: nêu hành động cụ thể",
      "Kết luận: lời cảm ơn team"
    ],
    aiAssistance: false,
    targetLength: 120,
    sampleOutline: [
      "Mở đầu: lý do viết feedback",
      "WW: Pair programming giảm bug",
      "WTI: Cần checklist deployment",
      "Kết: Cảm ơn team"
    ]
  },
  {
    id: "day2-incident-update",
    day: 2,
    collection: "new",
    title: "Incident Status Email",
    scenario: "Soạn email cập nhật stakeholder về sự cố production và bước mitigations.",
    checklist: [
      "Mở mail: tóm tắt sự cố",
      "Thời gian xảy ra & ảnh hưởng",
      "Mitigation áp dụng",
      "Next steps & postmortem"
    ],
    aiAssistance: true,
    targetLength: 150,
    sampleOutline: [
      "Subject: [Update] API latency incident",
      "Paragraph 1: Summary + timeline",
      "Paragraph 2: Mitigation & current status",
      "Paragraph 3: Next steps/postmortem",
      "Closing + contact"
    ]
  },
  {
    id: "day2-handoff-notes",
    day: 2,
    collection: "review",
    title: "Handoff Notes",
    scenario: "Ghi chú bàn giao cho ca trực đêm sau khi sự cố được xử lý.",
    checklist: [
      "System status",
      "Monitoring cần chú ý",
      "Action item còn lại",
      "Thông tin liên hệ khẩn"
    ],
    aiAssistance: false,
    targetLength: 100,
    sampleOutline: [
      "Status: hệ thống stabilised",
      "Monitoring: spike latency ở endpoint /auth",
      "Action: hoàn tất RCA",
      "Contact: incident commander"
    ]
  }
]);
