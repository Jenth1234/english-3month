import { vocabularyEntrySchema } from "@/features/vocabulary/schema";

export const mockVocabulary = vocabularyEntrySchema.array().parse([
  // Day 1 · 20 new words
  {
    id: "day1-stand-up",
    day: 1,
    collection: "new",
    term: "stand-up meeting",
    translation: "hop dung hang ngay",
    pronunciation: "stand up meeting",
    partOfSpeech: "noun",
    notes: "Daily sync to share yesterday, today, blockers.",
    tags: ["daily", "scrum"],
    proficiency: "foundation",
    examples: [
      { context: "Daily update", sentence: "Let's keep the stand-up meeting focused on blockers." }
    ]
  },
  {
    id: "day1-product-backlog",
    day: 1,
    collection: "new",
    term: "product backlog",
    translation: "danh sach yeu cau",
    pronunciation: "product backlog",
    partOfSpeech: "noun",
    notes: "Ordered list of user stories, bugs, and tasks.",
    tags: ["scrum", "planning"],
    proficiency: "foundation",
    examples: [
      { context: "Sprint planning", sentence: "Refine the user stories before adding them to the product backlog." }
    ]
  },
  {
    id: "day1-sprint-goal",
    day: 1,
    collection: "new",
    term: "sprint goal",
    translation: "muc tieu sprint",
    pronunciation: "sprint goal",
    partOfSpeech: "noun",
    notes: "Outcome the team must achieve in the sprint.",
    tags: ["scrum", "goal"],
    proficiency: "foundation",
    examples: [
      { context: "Sprint kickoff", sentence: "Our sprint goal is to release the onboarding flow." }
    ]
  },
  {
    id: "day1-retrospective",
    day: 1,
    collection: "new",
    term: "retrospective",
    translation: "tong ket sprint",
    pronunciation: "retro-spective",
    partOfSpeech: "noun",
    notes: "Meeting to review what went well and what to improve.",
    tags: ["scrum", "team"],
    proficiency: "foundation",
    examples: [
      { context: "Sprint review", sentence: "In the retrospective we agreed to update our deployment checklist." }
    ]
  },
  {
    id: "day1-code-review",
    day: 1,
    collection: "new",
    term: "code review",
    translation: "duyet ma",
    pronunciation: "code review",
    partOfSpeech: "noun",
    notes: "Process to check quality and share knowledge.",
    tags: ["quality", "collaboration"],
    proficiency: "foundation",
    examples: [
      { context: "Pull request", sentence: "Please address the feedback from the code review." }
    ]
  },
  {
    id: "day1-handoff",
    day: 1,
    collection: "new",
    term: "handoff",
    translation: "ban giao",
    pronunciation: "hand off",
    partOfSpeech: "noun",
    notes: "Transfer task context to another teammate or shift.",
    tags: ["workflow", "collaboration"],
    proficiency: "practice",
    examples: [
      { context: "Shift change", sentence: "Document deployment status for the handoff to on-call." }
    ]
  },
  {
    id: "day1-blocker",
    day: 1,
    collection: "new",
    term: "blocker",
    translation: "tro ngai",
    pronunciation: "blocker",
    partOfSpeech: "noun",
    notes: "Issue that stops progress until resolved.",
    tags: ["daily", "risk"],
    proficiency: "foundation",
    examples: [
      { context: "Stand-up", sentence: "My blocker is waiting for API credentials from DevOps." }
    ]
  },
  {
    id: "day1-story-points",
    day: 1,
    collection: "new",
    term: "story points",
    translation: "diem uoc luong",
    pronunciation: "story points",
    partOfSpeech: "noun",
    notes: "Relative effort sizing unit in agile.",
    tags: ["planning", "agile"],
    proficiency: "foundation",
    examples: [
      { context: "Estimation", sentence: "This task feels like a three story point effort." }
    ]
  },
  {
    id: "day1-backlog-grooming",
    day: 1,
    collection: "new",
    term: "backlog grooming",
    translation: "sap xep backlog",
    pronunciation: "backlog grooming",
    partOfSpeech: "noun",
    notes: "Session to refine, estimate, and split stories.",
    tags: ["planning", "team"],
    proficiency: "practice",
    examples: [
      { context: "Refinement", sentence: "We run backlog grooming every Tuesday afternoon." }
    ]
  },
  {
    id: "day1-dependency",
    day: 1,
    collection: "new",
    term: "dependency",
    translation: "phu thuoc",
    pronunciation: "dependency",
    partOfSpeech: "noun",
    notes: "Another task or team you need before finishing.",
    tags: ["planning", "risk"],
    proficiency: "practice",
    examples: [
      { context: "Planning", sentence: "Frontend has a dependency on the API contract." }
    ]
  },
  {
    id: "day1-acceptance-criteria",
    day: 1,
    collection: "new",
    term: "acceptance criteria",
    translation: "tieu chi chap nhan",
    pronunciation: "acceptance criteria",
    partOfSpeech: "noun",
    notes: "Conditions a story must meet to be done.",
    tags: ["agile", "quality"],
    proficiency: "foundation",
    examples: [
      { context: "User story", sentence: "Write acceptance criteria for edge cases before coding." }
    ]
  },
  {
    id: "day1-user-story",
    day: 1,
    collection: "new",
    term: "user story",
    translation: "yeu cau nguoi dung",
    pronunciation: "user story",
    partOfSpeech: "noun",
    notes: "Business oriented description of a requirement.",
    tags: ["agile", "product"],
    proficiency: "foundation",
    examples: [
      { context: "Backlog", sentence: "Each user story should state the business value." }
    ]
  },
  {
    id: "day1-velocity",
    day: 1,
    collection: "new",
    term: "velocity",
    translation: "toc do hoan thanh",
    pronunciation: "velocity",
    partOfSpeech: "noun",
    notes: "Total story points completed in a sprint.",
    tags: ["metrics", "agile"],
    proficiency: "practice",
    examples: [
      { context: "Sprint review", sentence: "Our velocity increased after we fixed deployment pain." }
    ]
  },
  {
    id: "day1-burndown",
    day: 1,
    collection: "new",
    term: "burndown chart",
    translation: "bieu do burndown",
    pronunciation: "burndown chart",
    partOfSpeech: "noun",
    notes: "Chart tracking remaining work each day of the sprint.",
    tags: ["metrics", "agile"],
    proficiency: "practice",
    examples: [
      { context: "Sprint tracking", sentence: "The burndown chart shows we are slightly behind schedule." }
    ]
  },
  {
    id: "day1-technical-debt",
    day: 1,
    collection: "new",
    term: "technical debt",
    translation: "no ky thuat",
    pronunciation: "technical debt",
    partOfSpeech: "noun",
    notes: "Work created by shortcuts that must be repaid later.",
    tags: ["quality", "maintenance"],
    proficiency: "practice",
    examples: [
      { context: "Refactor", sentence: "Schedule time to reduce technical debt next sprint." }
    ]
  },
  {
    id: "day1-pair-programming",
    day: 1,
    collection: "new",
    term: "pair programming",
    translation: "lap trinh cap",
    pronunciation: "pair programming",
    partOfSpeech: "noun",
    notes: "Two developers working together on one workstation.",
    tags: ["collaboration", "quality"],
    proficiency: "foundation",
    examples: [
      { context: "Knowledge sharing", sentence: "Pair programming helped onboard the new teammate." }
    ]
  },
  {
    id: "day1-code-freeze",
    day: 1,
    collection: "new",
    term: "code freeze",
    translation: "dong bang code",
    pronunciation: "code freeze",
    partOfSpeech: "noun",
    notes: "Period when no new changes are merged before release.",
    tags: ["release", "process"],
    proficiency: "practice",
    examples: [
      { context: "Deployment", sentence: "Code freeze starts 24 hours before the release window." }
    ]
  },
  {
    id: "day1-deployment-pipeline",
    day: 1,
    collection: "new",
    term: "deployment pipeline",
    translation: "chuoi trien khai",
    pronunciation: "deployment pipeline",
    partOfSpeech: "noun",
    notes: "Automated steps for build, test, and release.",
    tags: ["devops", "automation"],
    proficiency: "practice",
    examples: [
      { context: "CI/CD", sentence: "Our deployment pipeline catches regressions early." }
    ]
  },
  {
    id: "day1-branch-protection",
    day: 1,
    collection: "new",
    term: "branch protection",
    translation: "bao ve nhanh",
    pronunciation: "branch protection",
    partOfSpeech: "noun",
    notes: "Repository rule preventing direct merges without checks.",
    tags: ["git", "quality"],
    proficiency: "foundation",
    examples: [
      { context: "Repository", sentence: "Enable branch protection so every PR needs one approval." }
    ]
  },
  {
    id: "day1-feature-flag",
    day: 1,
    collection: "new",
    term: "feature flag",
    translation: "co tinh nang",
    pronunciation: "feature flag",
    partOfSpeech: "noun",
    notes: "Toggle to control feature rollout per segment.",
    tags: ["release", "feature"],
    proficiency: "practice",
    examples: [
      { context: "Gradual rollout", sentence: "Ship behind a feature flag to limit exposure." }
    ]
  },
  {
    id: "day1-release-notes",
    day: 1,
    collection: "new",
    term: "release notes",
    translation: "ghi chu phat hanh",
    pronunciation: "release notes",
    partOfSpeech: "noun",
    notes: "Summary of changes sent to stakeholders.",
    tags: ["release", "communication"],
    proficiency: "practice",
    examples: [
      { context: "Stakeholder", sentence: "Draft the release notes before deployment." }
    ]
  },
  {
    id: "day1-retro-action-item",
    day: 1,
    collection: "new",
    term: "retro action item",
    translation: "hanh dong sau retro",
    pronunciation: "retro action item",
    partOfSpeech: "noun",
    notes: "Improvement task agreed in the retrospective.",
    tags: ["retro", "process"],
    proficiency: "foundation",
    examples: [
      { context: "Continuous improvement", sentence: "Track each retro action item in the sprint backlog." }
    ]
  },
  {
    id: "day1-release-window",
    day: 1,
    collection: "new",
    term: "release window",
    translation: "khung gio phat hanh",
    pronunciation: "release window",
    partOfSpeech: "noun",
    notes: "Approved time slots to deploy to production.",
    tags: ["release", "operations"],
    proficiency: "practice",
    examples: [
      { context: "Operations", sentence: "Our release window is Tuesday and Thursday evenings." }
    ]
  },
  // Day 2 · 20 new words
  {
    id: "day2-production-issue",
    day: 2,
    collection: "new",
    term: "production issue",
    translation: "su co production",
    pronunciation: "production issue",
    partOfSpeech: "noun",
    notes: "Problem impacting real users in production.",
    tags: ["incident", "operations"],
    proficiency: "practice",
    examples: [
      { context: "Incident call", sentence: "We need to send a status email about the production issue." }
    ]
  },
  {
    id: "day2-escalate",
    day: 2,
    collection: "new",
    term: "escalate",
    translation: "leo thang",
    pronunciation: "es-ca-late",
    partOfSpeech: "verb",
    notes: "Raise an issue to higher authority or wider team.",
    tags: ["communication", "risk"],
    proficiency: "work-ready",
    examples: [
      { context: "Incident response", sentence: "Escalate to the incident commander if downtime passes 15 minutes." }
    ]
  },
  {
    id: "day2-postmortem",
    day: 2,
    collection: "new",
    term: "postmortem",
    translation: "bao cao hau kiem",
    pronunciation: "post-mortem",
    partOfSpeech: "noun",
    notes: "Document analyzing root cause and follow-up actions.",
    tags: ["incident", "documentation"],
    proficiency: "work-ready",
    examples: [
      { context: "Root cause", sentence: "Schedule the postmortem meeting once the issue is resolved." }
    ]
  },
  {
    id: "day2-mitigation",
    day: 2,
    collection: "new",
    term: "mitigation",
    translation: "giam thieu tac dong",
    pronunciation: "mitigation",
    partOfSpeech: "noun",
    notes: "Temporary fix to reduce impact while root cause is handled.",
    tags: ["incident", "operations"],
    proficiency: "practice",
    examples: [
      { context: "Hotfix", sentence: "Our mitigation was to rollback to the previous release." }
    ]
  },
  {
    id: "day2-runbook",
    day: 2,
    collection: "new",
    term: "runbook",
    translation: "so tay xu ly",
    pronunciation: "run-book",
    partOfSpeech: "noun",
    notes: "Step-by-step guide for handling incidents.",
    tags: ["incident", "documentation"],
    proficiency: "practice",
    examples: [
      { context: "Incident", sentence: "Follow the runbook for API outage before paging on-call." }
    ]
  },
  {
    id: "day2-rollback",
    day: 2,
    collection: "new",
    term: "rollback",
    translation: "quay lui phien ban",
    pronunciation: "roll-back",
    partOfSpeech: "verb",
    notes: "Return system to previous stable release.",
    tags: ["deployment", "incident"],
    proficiency: "practice",
    examples: [
      { context: "Deployment", sentence: "Rollback if the new release spikes error rates." }
    ]
  },
  {
    id: "day2-status-page",
    day: 2,
    collection: "new",
    term: "status page",
    translation: "trang trang thai",
    pronunciation: "status page",
    partOfSpeech: "noun",
    notes: "Public page showing live service health.",
    tags: ["communication", "incident"],
    proficiency: "practice",
    examples: [
      { context: "Customer update", sentence: "Update the status page once the incident is acknowledged." }
    ]
  },
  {
    id: "day2-root-cause",
    day: 2,
    collection: "new",
    term: "root cause analysis",
    translation: "phan tich nguyen nhan goc",
    pronunciation: "root cause analysis",
    partOfSpeech: "noun",
    notes: "Process to find underlying reasons for incidents.",
    tags: ["incident", "process"],
    proficiency: "work-ready",
    examples: [
      { context: "Postmortem", sentence: "Root cause analysis showed a misconfigured load balancer." }
    ]
  },
  {
    id: "day2-sla",
    day: 2,
    collection: "new",
    term: "service level agreement",
    translation: "cam ket muc dich vu",
    pronunciation: "S L A",
    partOfSpeech: "noun",
    notes: "Formal uptime and response commitments to customers.",
    tags: ["operations", "contract"],
    proficiency: "work-ready",
    examples: [
      { context: "Support", sentence: "Our SLA requires acknowledging incidents within fifteen minutes." }
    ]
  },
  {
    id: "day2-communication-plan",
    day: 2,
    collection: "new",
    term: "communication plan",
    translation: "ke hoach truyen thong",
    pronunciation: "communication plan",
    partOfSpeech: "noun",
    notes: "Who to inform, which channel, and how often.",
    tags: ["communication", "stakeholder"],
    proficiency: "practice",
    examples: [
      { context: "Incident", sentence: "Follow the communication plan when notifying stakeholders." }
    ]
  },
  {
    id: "day2-hotfix",
    day: 2,
    collection: "new",
    term: "hotfix",
    translation: "ban va khan",
    pronunciation: "hot-fix",
    partOfSpeech: "noun",
    notes: "Urgent fix released outside regular schedule.",
    tags: ["deployment", "incident"],
    proficiency: "practice",
    examples: [
      { context: "Release", sentence: "We shipped a hotfix to restore the login flow." }
    ]
  },
  {
    id: "day2-incident-commander",
    day: 2,
    collection: "new",
    term: "incident commander",
    translation: "chi huy su co",
    pronunciation: "incident commander",
    partOfSpeech: "noun",
    notes: "Leader coordinating the incident bridge call.",
    tags: ["incident", "role"],
    proficiency: "work-ready",
    examples: [
      { context: "Incident call", sentence: "The incident commander keeps everyone aligned." }
    ]
  },
  {
    id: "day2-status-update-call",
    day: 2,
    collection: "new",
    term: "status update call",
    translation: "cuoc goi cap nhat",
    pronunciation: "status update call",
    partOfSpeech: "noun",
    notes: "Brief call to share mitigation status with stakeholders.",
    tags: ["communication", "incident"],
    proficiency: "practice",
    examples: [
      { context: "Stakeholder", sentence: "Schedule a status update call after mitigation." }
    ]
  },
  {
    id: "day2-customer-impact",
    day: 2,
    collection: "new",
    term: "customer impact",
    translation: "anh huong khach hang",
    pronunciation: "customer impact",
    partOfSpeech: "noun",
    notes: "Number of users impacted and how.",
    tags: ["incident", "communication"],
    proficiency: "practice",
    examples: [
      { context: "Incident report", sentence: "Quantify customer impact before sending the email." }
    ]
  },
  {
    id: "day2-blameless-postmortem",
    day: 2,
    collection: "new",
    term: "blameless postmortem",
    translation: "hau kiem khong do loi",
    pronunciation: "blameless postmortem",
    partOfSpeech: "noun",
    notes: "Cultural practice focusing on systems not people.",
    tags: ["incident", "culture"],
    proficiency: "work-ready",
    examples: [
      { context: "Post incident", sentence: "We run a blameless postmortem to learn from outages." }
    ]
  },
  {
    id: "day2-failover",
    day: 2,
    collection: "new",
    term: "failover",
    translation: "chuyen doi du phong",
    pronunciation: "failover",
    partOfSpeech: "noun",
    notes: "Switching traffic to backup systems.",
    tags: ["incident", "operations"],
    proficiency: "practice",
    examples: [
      { context: "Resilience", sentence: "Trigger failover if latency exceeds the threshold." }
    ]
  },
  {
    id: "day2-observability",
    day: 2,
    collection: "new",
    term: "observability",
    translation: "kha nang quan sat",
    pronunciation: "observability",
    partOfSpeech: "noun",
    notes: "Ability to understand system state using telemetry.",
    tags: ["monitoring", "devops"],
    proficiency: "practice",
    examples: [
      { context: "Monitoring", sentence: "Improve observability to detect anomalies faster." }
    ]
  },
  {
    id: "day2-service-degradation",
    day: 2,
    collection: "new",
    term: "service degradation",
    translation: "suy giam dich vu",
    pronunciation: "service degradation",
    partOfSpeech: "noun",
    notes: "Service still works but at reduced quality.",
    tags: ["incident", "operations"],
    proficiency: "practice",
    examples: [
      { context: "Status email", sentence: "Communicate service degradation clearly to support." }
    ]
  },
  {
    id: "day2-alert-fatigue",
    day: 2,
    collection: "new",
    term: "alert fatigue",
    translation: "met moi canh bao",
    pronunciation: "alert fatigue",
    partOfSpeech: "noun",
    notes: "Too many alerts causing teams to ignore signals.",
    tags: ["monitoring", "people"],
    proficiency: "practice",
    examples: [
      { context: "On-call", sentence: "Tune noisy monitors to reduce alert fatigue." }
    ]
  },
  {
    id: "day2-oncall-rotation",
    day: 2,
    collection: "new",
    term: "on-call rotation",
    translation: "lich truc oncall",
    pronunciation: "on-call rotation",
    partOfSpeech: "noun",
    notes: "Schedule describing who is on support duty.",
    tags: ["operations", "people"],
    proficiency: "practice",
    examples: [
      { context: "Team schedule", sentence: "Publish the on-call rotation one month in advance." }
    ]
  },
  {
    id: "day2-uptime",
    day: 2,
    collection: "new",
    term: "uptime",
    translation: "thoi gian hoat dong",
    pronunciation: "uptime",
    partOfSpeech: "noun",
    notes: "Percentage of time the service is available.",
    tags: ["operations", "metrics"],
    proficiency: "work-ready",
    examples: [
      { context: "SLA", sentence: "Our uptime target is ninety nine point nine percent." }
    ]
  },
  {
    id: "day2-communication-bridge",
    day: 2,
    collection: "new",
    term: "communication bridge",
    translation: "kenh lien lac su co",
    pronunciation: "communication bridge",
    partOfSpeech: "noun",
    notes: "Dedicated communication channel for incidents.",
    tags: ["incident", "communication"],
    proficiency: "practice",
    examples: [
      { context: "Incident response", sentence: "Join the communication bridge to coordinate updates." }
    ]
  },
  {
    id: "day2-status-update-call",
    day: 2,
    collection: "new",
    term: "status update call",
    translation: "cuoc goi cap nhat",
    pronunciation: "status update call",
    partOfSpeech: "noun",
    notes: "Short briefing to align stakeholders during an incident.",
    tags: ["communication", "incident"],
    proficiency: "practice",
    examples: [
      { context: "Stakeholder", sentence: "Schedule a status update call after the mitigation." }
    ]
  },
  {
    id: "day2-customer-impact",
    day: 2,
    collection: "new",
    term: "customer impact",
    translation: "anh huong khach hang",
    pronunciation: "customer impact",
    partOfSpeech: "noun",
    notes: "How many users were affected and how badly.",
    tags: ["incident", "communication"],
    proficiency: "practice",
    examples: [
      { context: "Incident report", sentence: "Quantify customer impact before sending the summary." }
    ]
  },
  {
    id: "day2-handover-notes",
    day: 2,
    collection: "new",
    term: "handover notes",
    translation: "ghi chu ban giao",
    pronunciation: "handover notes",
    partOfSpeech: "noun",
    notes: "Written summary for the next on-call engineer.",
    tags: ["operations", "communication"],
    proficiency: "practice",
    examples: [
      { context: "Shift change", sentence: "Prepare handover notes before ending your shift." }
    ]
  },
  {
    id: "day2-incident-dashboard",
    day: 2,
    collection: "new",
    term: "incident dashboard",
    translation: "bang dieu khien incident",
    pronunciation: "incident dashboard",
    partOfSpeech: "noun",
    notes: "Visual board showing current incidents and owners.",
    tags: ["incident", "monitoring"],
    proficiency: "practice",
    examples: [
      { context: "Operations", sentence: "Check the incident dashboard for active alerts." }
    ]
  },
  // Day 2 · review 10 random words from day 1
  {
    id: "day2-review-stand-up",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "stand-up meeting",
    translation: "hop dung hang ngay",
    pronunciation: "stand up meeting",
    partOfSpeech: "noun",
    notes: "Review the daily stand-up format.",
    tags: ["review", "daily"],
    proficiency: "foundation",
    examples: []
  },
  {
    id: "day2-review-blocker",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "blocker",
    translation: "tro ngai",
    pronunciation: "blocker",
    partOfSpeech: "noun",
    notes: "Practice asking for help when blocked.",
    tags: ["review", "daily"],
    proficiency: "foundation",
    examples: []
  },
  {
    id: "day2-review-code-review",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "code review",
    translation: "duyet ma",
    pronunciation: "code review",
    partOfSpeech: "noun",
    notes: "Refresh polite phrases for giving feedback.",
    tags: ["review", "quality"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-handoff",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "handoff",
    translation: "ban giao",
    pronunciation: "handoff",
    partOfSpeech: "noun",
    notes: "Review the handoff checklist before shift change.",
    tags: ["review", "workflow"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-dependency",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "dependency",
    translation: "phu thuoc",
    pronunciation: "dependency",
    partOfSpeech: "noun",
    notes: "Practice stating dependencies clearly.",
    tags: ["review", "planning"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-velocity",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "velocity",
    translation: "toc do hoan thanh",
    pronunciation: "velocity",
    partOfSpeech: "noun",
    notes: "Review how to explain velocity to stakeholders.",
    tags: ["review", "metrics"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-feature-flag",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "feature flag",
    translation: "co tinh nang",
    pronunciation: "feature flag",
    partOfSpeech: "noun",
    notes: "Review key benefits of feature flags.",
    tags: ["review", "release"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-technical-debt",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "technical debt",
    translation: "no ky thuat",
    pronunciation: "technical debt",
    partOfSpeech: "noun",
    notes: "Recall reasons to schedule debt reduction.",
    tags: ["review", "quality"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-release-notes",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "release notes",
    translation: "ghi chu phat hanh",
    pronunciation: "release notes",
    partOfSpeech: "noun",
    notes: "Refresh the structure of a good release note.",
    tags: ["review", "communication"],
    proficiency: "practice",
    examples: []
  },
  {
    id: "day2-review-backlog-grooming",
    day: 2,
    collection: "review",
    reviewSourceDay: 1,
    term: "backlog grooming",
    translation: "sap xep backlog",
    pronunciation: "backlog grooming",
    partOfSpeech: "noun",
    notes: "Review vocabulary for refinement sessions.",
    tags: ["review", "planning"],
    proficiency: "practice",
    examples: []
  }
]);
