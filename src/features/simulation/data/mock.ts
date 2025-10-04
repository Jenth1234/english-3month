import { simulationScenarioSchema } from "@/features/simulation/schema";

export const mockSimulationScenarios = simulationScenarioSchema.array().parse([
  {
    id: "day1-daily-sync",
    day: 1,
    collection: "new",
    title: "Daily Stand-up Role-play",
    role: "speaker",
    context: "Bạn là developer chia sẻ trong stand-up đầu sprint.",
    goal: "Thông báo tiến độ rõ ràng và đề cập blocker",
    script: [
      { actor: "You", line: "Yesterday I wrapped up the onboarding error states." },
      { actor: "You", line: "Today I'm pairing with Linh on the API retry logic." },
      { actor: "Scrum Master", line: "Any blockers?" },
      { actor: "You", line: "None for now, but I might need QA regression results tomorrow." }
    ],
    followUpQuestions: [
      "Nếu có blocker bất ngờ, bạn sẽ nhờ ai hỗ trợ?",
      "Đề xuất cách thông báo nếu cần đổi ưu tiên."
    ],
    tips: [
      "Nhấn mạnh phần Yesterday/Today/Blockers",
      "Giữ câu ngắn gọn, rõ ràng"
    ]
  },
  {
    id: "day1-retro-meeting",
    day: 1,
    collection: "review",
    title: "Retro Meeting Feedback",
    role: "speaker",
    context: "Bạn chia sẻ trong cuộc họp retrospective cuối tuần.",
    goal: "Trình bày điểm tốt và đề xuất cải thiện",
    script: [
      { actor: "You", line: "What went well: pairing reduced the number of late bugs." },
      { actor: "You", line: "What to improve: document the deployment steps so on-call can react faster." },
      { actor: "Scrum Master", line: "Any action item?" },
      { actor: "You", line: "I'll draft the checklist and share it before next sprint." }
    ],
    followUpQuestions: [
      "Làm sao để mọi người theo dõi action item?",
      "Bạn sẽ đo hiệu quả cải thiện thế nào?"
    ],
    tips: [
      "Sử dụng cấu trúc WW/WI",
      "Đưa ra hành động cụ thể"
    ]
  },
  {
    id: "day2-incident-bridge",
    day: 2,
    collection: "new",
    title: "Incident Bridge Call",
    role: "speaker",
    context: "Bạn là incident commander cập nhật cho team cross-functional.",
    goal: "Thông báo trạng thái, mitigation và next steps",
    script: [
      { actor: "You", line: "Time of incident: 09:12. Impact: 30% of API requests timed out." },
      { actor: "You", line: "Mitigation: rolled back release 34. Monitoring shows recovery." },
      { actor: "SRE Lead", line: "What's next?" },
      { actor: "You", line: "We are drafting the postmortem and assigning RCA owners." }
    ],
    followUpQuestions: [
      "Bạn cần thông tin gì thêm từ SRE/Support?",
      "Kế hoạch truyền thông tới khách hàng ra sao?"
    ],
    tips: [
      "Nhấn rõ timeline và mitigation",
      "Giữ giọng dứt khoát để tạo niềm tin"
    ]
  },
  {
    id: "day2-stakeholder-brief",
    day: 2,
    collection: "review",
    title: "Stakeholder Briefing",
    role: "speaker",
    context: "Bạn giải thích sự cố cho PM và CS.",
    goal: "Đảm bảo stakeholder hiểu ảnh hưởng và kế hoạch",
    script: [
      { actor: "You", line: "The service was degraded for 18 minutes, mostly affecting APAC users." },
      { actor: "PM", line: "Do we expect repeat issues?" },
      { actor: "You", line: "Mitigation is in place. We'll complete RCA tomorrow and send a summary." },
      { actor: "CS", line: "What should we tell customers?" },
      { actor: "You", line: "Please reassure them the issue is mitigated and refer to the status page for updates." }
    ],
    followUpQuestions: [
      "Bạn sẽ follow-up với stakeholder bằng hình thức gì?",
      "Làm sao để khách hàng cảm thấy yên tâm?"
    ],
    tips: [
      "Trả lời ngắn gọn, mang tính trấn an",
      "Chuẩn bị số liệu nếu stakeholder hỏi thêm"
    ]
  }
]);
