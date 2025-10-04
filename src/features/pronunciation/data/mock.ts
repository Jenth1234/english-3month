import { pronunciationDrillSchema } from "@/features/pronunciation/schema";

export const mockPronunciationDrills = pronunciationDrillSchema.array().parse([
  {
    id: "day1-daily-phrases",
    day: 1,
    collection: "new",
    title: "Daily Stand-up Responses",
    focus: "Linking consonants in quick updates",
    audioUrl: "https://storage.googleapis.com/example-audio/daily-phrases.mp3",
    script:
      "Yesterday I wrapped up the UI tasks, today I'm pairing with backend, blockers none at the moment.",
    targetPhonemes: ["/r/", "/ŋ/", "connected speech"],
    difficulty: "foundation",
    tips: [
      "Nối âm giữa 'wrapped_up' để câu trôi chảy",
      "Nhấn nhẹ vào từ khóa 'blockers none'"
    ]
  },
  {
    id: "day1-retro-reflection",
    day: 1,
    collection: "review",
    title: "Retro Reflection",
    focus: "Intonation for positive + action items",
    audioUrl: "https://storage.googleapis.com/example-audio/retro-reflection.mp3",
    script:
      "What went well: pairing reduced bugs. Improvement: document deployment steps more clearly.",
    targetPhonemes: ["falling intonation", "/d/ clusters"],
    difficulty: "foundation",
    tips: [
      "Nhấn mạnh cặp đối lập 'What went well' vs 'Improvement'",
      "Giữ âm /d/ rõ trong 'document deployment'"
    ]
  },
  {
    id: "day2-incident-brief",
    day: 2,
    collection: "new",
    title: "Incident Briefing",
    focus: "Stress on urgency and mitigation",
    audioUrl: "https://storage.googleapis.com/example-audio/incident-brief.mp3",
    script:
      "Latency spiked at 09:12. Mitigation applied via rollback. Monitoring shows stability for the past 15 minutes.",
    targetPhonemes: ["/l/", "/t/", "word stress"],
    difficulty: "practice",
    tips: [
      "Nhấn mạnh các mốc thời gian để người nghe nắm timeline",
      "Phát âm rõ 'rollback' và 'monitoring'"
    ]
  },
  {
    id: "day2-stakeholder-update",
    day: 2,
    collection: "review",
    title: "Stakeholder Update",
    focus: "Formal tone in status updates",
    audioUrl: "https://storage.googleapis.com/example-audio/stakeholder-update.mp3",
    script:
      "The incident has been mitigated. A postmortem is scheduled tomorrow to finalize action items.",
    targetPhonemes: ["/m/", "intonation"],
    difficulty: "practice",
    tips: [
      "Giữ tốc độ vừa phải, tránh nuốt âm",
      "Thể hiện sự trấn an ở câu đầu, chắc chắn ở câu sau"
    ]
  }
]);
