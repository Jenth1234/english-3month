# Development Progress Log

## Completed

- Initialized Next.js 15 app router structure with root and dashboard layouts.
- Built dashboard base screen with atomic components (atoms, molecules, organisms) leveraging shadcn UI + Tailwind CSS.
- Added reusable feature scaffolding for vocabulary, listening, pronunciation, writing, and simulation with Firebase hooks and Zod schemas.
- Configured Firebase client bootstrap utilities (environment validation, app initializer, shared Firestore hook).
- Refreshed light-theme tokens and dashboard layout styling for a brighter UI.
- Triển khai API /api/daily-plan với lưu trữ JSON, hook client, và khả năng tick nhiệm vụ theo thời gian thực.
- Hoàn thiện trang Vocabulary với mock data (lọc theo phase, tìm kiếm, card chi tiết) để demo khách hàng.
- Bổ sung daily plan cho 2 ngày với cơ chế khóa/mở dựa trên tiến độ nhiệm vụ.
- Mở rộng mock vocabulary 20 từ (chia theo ngày, preview 10 từ cho ngày kế tiếp) và cập nhật trang Vocabulary theo daily plan.
- Dựng mock Listening/Pronunciation/Writing/Simulation (Day 1-2) với pages theo daily plan.
- Thiết kế flashcard Vocabulary (kiểu Tinder) với reveal/nhập lại từ và đồng bộ daily plan.
- Cập nhật bộ từ vựng ngày (20 từ mới + 10 từ ôn) và điều chỉnh trang Vocabulary theo BRD.
- Them Listening swipe deck (danh dau video/audio, dong bo daily plan) + preview/review update.
- Listening deck chi giu video hom nay (khong preview review audio), swipe + quiz 5 cau dung truoc khi unlock clip tiep.

## Next Ideas

- Connect Firestore collections with real data and seed sample modules.
- Implement authentication guard (Firebase Auth or internal SSO) for protected routes.
- Expand dashboard with analytics charts and streak tracking visuals.
