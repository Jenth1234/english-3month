import { listeningExerciseSchema } from "@/features/listening/schema";

export const mockListeningExercises = listeningExerciseSchema.array().parse([
  {
    id: "day1-daily-standup-video",
    day: 1,
    collection: "new",
    title: "Daily Stand-up Sample",
    level: "foundation",
    mediaType: "video",
    youTubeId: "5jO-6F-C2GY",
    duration: "04:10",
    mustWatch: true,
    transcript:
      "Yesterday I wrapped up the onboarding flow UI. Today I am pairing with backend on the auth API and I have no blockers.",
    tags: ["daily", "meeting"],
    keyPhrases: ["wrapped up", "pairing", "blockers"],
    questions: [
      {
        id: "q1",
        prompt: "What did the speaker finish yesterday?",
        options: ["Unit tests", "Onboarding flow UI", "Design handoff", "Release notes"],
        correctIndex: 1
      },
      {
        id: "q2",
        prompt: "Who is the speaker pairing with today?",
        options: ["Design lead", "QA engineer", "Backend developer", "Product owner"],
        correctIndex: 2
      },
      {
        id: "q3",
        prompt: "What is the topic of today's pairing session?",
        options: ["Auth API", "UI polish", "Analytics dashboard", "Sprint retrospective"],
        correctIndex: 0
      },
      {
        id: "q4",
        prompt: "How many blockers does the speaker have?",
        options: ["None", "One minor blocker", "Two blockers", "Blocked completely"],
        correctIndex: 0
      },
      {
        id: "q5",
        prompt: "Which statement best describes the speaker's mood?",
        options: ["Frustrated", "Calm and focused", "Confused", "Requesting help"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "day1-grooming-highlights",
    day: 1,
    collection: "new",
    title: "Backlog Grooming Highlights",
    level: "foundation",
    mediaType: "video",
    youTubeId: "HXV3zeQKqGY",
    duration: "03:25",
    mustWatch: true,
    transcript:
      "We clarified acceptance criteria for the payment story and estimated spillover tasks for next sprint.",
    tags: ["planning", "scrum"],
    keyPhrases: ["acceptance criteria", "spillover", "estimate"],
    questions: [
      {
        id: "q1",
        prompt: "Which story was clarified during grooming?",
        options: ["Analytics story", "Payment story", "Onboarding story", "Incident postmortem"],
        correctIndex: 1
      },
      {
        id: "q2",
        prompt: "What extra work did the team estimate?",
        options: ["Technical debt", "Spillover tasks", "Hiring plan", "Design sprint"],
        correctIndex: 1
      },
      {
        id: "q3",
        prompt: "Why was the payment story discussed?",
        options: ["To hand it off", "To refine its acceptance criteria", "To celebrate release", "To postpone it"],
        correctIndex: 1
      },
      {
        id: "q4",
        prompt: "When will the spillover tasks likely be handled?",
        options: ["This afternoon", "Next sprint", "Next quarter", "After launch"],
        correctIndex: 1
      },
      {
        id: "q5",
        prompt: "Which ceremony does this video emulate?",
        options: ["Daily stand-up", "Backlog grooming", "Sprint demo", "Retro"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "day1-daily-recap-audio",
    day: 1,
    collection: "review",
    title: "Daily Stand-up Recap",
    level: "foundation",
    mediaType: "audio",
    mediaUrl: "https://storage.googleapis.com/example-audio/daily-standup-recap.mp3",
    duration: "02:35",
    transcript:
      "Blocker update: waiting for QA to finish regression tests. Next action is to prepare release notes once QA gives the green light.",
    tags: ["daily", "blocker"],
    keyPhrases: ["blocker", "regression tests", "release notes"],
    questions: [
      {
        id: "q1",
        prompt: "Who is the blocker waiting on?",
        options: ["Product owner", "QA team", "Design team", "Security team"],
        correctIndex: 1
      },
      {
        id: "q2",
        prompt: "What has QA not finished yet?",
        options: ["Performance tests", "Regression tests", "Unit tests", "Security review"],
        correctIndex: 1
      },
      {
        id: "q3",
        prompt: "What is the next action after QA finishes?",
        options: ["Deploy hotfix", "Prepare release notes", "Cancel sprint", "Start retro"],
        correctIndex: 1
      },
      {
        id: "q4",
        prompt: "What color metaphorically represents the go-ahead?",
        options: ["Red light", "Yellow light", "Green light", "Blue light"],
        correctIndex: 2
      },
      {
        id: "q5",
        prompt: "Which meeting is this recap most related to?",
        options: ["Sprint planning", "Daily stand-up", "Quarterly review", "Incident bridge"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "day2-incident-bridge-video",
    day: 2,
    collection: "new",
    title: "Production Incident Bridge",
    level: "practice",
    mediaType: "video",
    youTubeId: "Vt6KispDuAU",
    duration: "05:32",
    mustWatch: true,
    transcript:
      "Status update: API latency is back to normal after the rollback. We still need to run root cause analysis and notify stakeholders.",
    tags: ["incident", "operations"],
    keyPhrases: ["latency", "rollback", "root cause analysis"],
    questions: [
      {
        id: "q1",
        prompt: "Which metric was affected during the incident?",
        options: ["CPU usage", "API latency", "Error rate", "Database size"],
        correctIndex: 1
      },
      {
        id: "q2",
        prompt: "What action restored the system?",
        options: ["Scaling up servers", "Rolling back release", "Disabling caching", "Restarting CI"],
        correctIndex: 1
      },
      {
        id: "q3",
        prompt: "What important follow-up is still required?",
        options: ["Run root cause analysis", "Deploy new features", "Send marketing emails", "Hire more staff"],
        correctIndex: 0
      },
      {
        id: "q4",
        prompt: "Who needs to be notified after the call?",
        options: ["Internal tools team", "Stakeholders", "Designers", "Investors"],
        correctIndex: 1
      },
      {
        id: "q5",
        prompt: "What is the overall status at the end of the clip?",
        options: ["Still degraded", "Mitigated but follow-up pending", "Irreversible failure", "Completely unrelated"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "day2-stakeholder-briefing",
    day: 2,
    collection: "new",
    title: "Stakeholder Briefing",
    level: "practice",
    mediaType: "video",
    youTubeId: "IUN664s7N-c",
    duration: "04:05",
    mustWatch: true,
    transcript:
      "The incident has been mitigated. We are tracking customer impact and scheduling a postmortem tomorrow at 10 AM.",
    tags: ["incident", "communication"],
    keyPhrases: ["mitigated", "customer impact", "postmortem"],
    questions: [
      {
        id: "q1",
        prompt: "What is the status of the incident?",
        options: ["Ongoing", "Mitigated", "Unknown", "Escalated"],
        correctIndex: 1
      },
      {
        id: "q2",
        prompt: "What data is being tracked after mitigation?",
        options: ["Server load", "Customer impact", "Marketing metrics", "Recruiting pipeline"],
        correctIndex: 1
      },
      {
        id: "q3",
        prompt: "When is the postmortem scheduled?",
        options: ["Today at 5 PM", "Tomorrow at 10 AM", "Next week", "Not scheduled"],
        correctIndex: 1
      },
      {
        id: "q4",
        prompt: "Who is the audience of this briefing?",
        options: ["General users", "Stakeholders", "Investors", "Design interns"],
        correctIndex: 1
      },
      {
        id: "q5",
        prompt: "What is the tone of the update?",
        options: ["Panic", "Calm and informative", "Angry", "Sarcastic"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "day2-status-email-audio",
    day: 2,
    collection: "review",
    title: "Status Email Readout",
    level: "practice",
    mediaType: "audio",
    mediaUrl: "https://storage.googleapis.com/example-audio/status-update.mp3",
    duration: "03:05",
    transcript:
      "Dear stakeholders, the production issue has been mitigated. A postmortem is scheduled tomorrow at 10 AM. Please review the attached incident summary for details.",
    tags: ["communication", "email"],
    keyPhrases: ["mitigated", "postmortem", "incident summary"],
    questions: [
      {
        id: "q1",
        prompt: "How does the email address the recipients?",
        options: ["Team", "Stakeholders", "Customers", "Engineers"],
        correctIndex: 1
      },
      {
        id: "q2",
        prompt: "What event is scheduled tomorrow?",
        options: ["Stand-up", "Postmortem", "Board meeting", "Product launch"],
        correctIndex: 1
      },
      {
        id: "q3",
        prompt: "What attachment is referenced?",
        options: ["Sprint plan", "Incident summary", "Budget report", "Hiring plan"],
        correctIndex: 1
      },
      {
        id: "q4",
        prompt: "What is the current status of the incident?",
        options: ["Unresolved", "Mitigated", "Escalated", "Unknown"],
        correctIndex: 1
      },
      {
        id: "q5",
        prompt: "What is the next action for stakeholders?",
        options: ["Ignore", "Review the summary", "Deploy code", "Call support"],
        correctIndex: 1
      }
    ]
  }
]);
