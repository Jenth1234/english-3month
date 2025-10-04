📄 Business Requirement Document (BRD)
Project: English Learning Platform for Dev Team

Version: 1.0
Author: BA Team
Status: Draft
Date: 2025-10-04

1. 📌 Project Overview

Project Name: English Roadmap – Work-Ready Communication Platform
Goal: Xây dựng một nền tảng web nội bộ giúp team dev học tiếng Anh theo lộ trình 3 tháng, từ trình độ cơ bản đến mức có thể giao tiếp trong môi trường công việc (meeting, phỏng vấn, teamwork) mà không cần học trung tâm hay giáo viên.

Why:

100% môi trường làm việc sử dụng tiếng Anh.

Phần lớn dev chưa đủ kỹ năng nghe – nói – mô tả task.

Cần một công cụ học thực tế, có thể track tiến độ, học theo ngày, và áp dụng trực tiếp vào công việc.

2. 🎯 Business Objectives
   Mục tiêu Mô tả
   🚀 Nâng cao kỹ năng giao tiếp tiếng Anh Giúp dev có thể nghe, nói, viết và phản xạ trong 3 tháng.
   📈 Chuẩn hóa năng lực toàn team Tất cả dev junior-mid có thể tham gia họp, daily, phỏng vấn bằng tiếng Anh.
   🧑‍💻 Gắn học với công việc thực tế Học qua ngữ cảnh dev: mô tả task, review code, mô phỏng meeting.
   📊 Theo dõi tiến độ học tập Có hệ thống track từ vựng, nghe, nói, writing theo tuần và tháng.
3. 📁 Scope of Work (Phạm vi dự án)

In Scope:

Nền tảng web học tiếng Anh dành cho dev team.

Lộ trình học theo ngày, tuần, tháng (3 giai đoạn: nền – phản xạ – thực chiến).

Module từ vựng, nghe, phát âm, viết, mô phỏng giao tiếp.

Dashboard quản lý tiến độ học tập cá nhân.

Bộ test đánh giá cuối mỗi giai đoạn.

Out of Scope:

Không tích hợp thanh toán / đăng ký thương mại.

Không bao gồm khóa học bên thứ ba trả phí.

Không tổ chức lớp học online với giáo viên người thật.

4. 📊 Target User Personas
   Persona Vai trò Mục tiêu sử dụng
   👨‍💻 Junior Dev 0 – 2 năm kinh nghiệm Giao tiếp trong daily meeting, hiểu docs
   🧑‍💻 Mid-level Dev 2 – 4 năm Viết email, feedback code, trao đổi kỹ thuật
   🧑‍🏫 QA / BA Non-dev role Hiểu ngôn ngữ kỹ thuật, mô tả task tiếng Anh
   🧑‍💼 PM / Lead Quản lý team Theo dõi tiến độ học, đánh giá năng lực
5. 📐 Functional Requirements (Yêu cầu chức năng)
   5.1 📚 Vocabulary Module

CRUD từ vựng: từ – nghĩa – phát âm – ví dụ – note.

Flashcard học từ hàng ngày (15–20 từ).

Phân loại theo tuần & chuyên ngành (General / IT / Technical).

5.2 🔤 Pronunciation & Speaking

Tích hợp voice input (Web Speech API hoặc 3rd party).

Ghi âm giọng và so sánh với bản gốc.

Shadowing Practice: phát đoạn audio → người dùng lặp lại → điểm phát âm.

5.3 👂 Listening Practice

Video/audio bài nghe chia theo level (Slow → Real).

Transcript song song (ẩn/hiện).

Kiểm tra từ vựng sau mỗi bài nghe.

5.4 ✍️ Writing Practice

Form viết câu / mô tả task / email.

AI hoặc rule-based feedback grammar.

Checklist email chuẩn trong môi trường dev.

5.5 🗣️ Role-play / Simulation

Giả lập hội thoại meeting / daily / 1-1 / phỏng vấn.

Người dùng chọn vai → luyện phản xạ.

Kết quả lưu vào profile để tracking.

5.6 📊 Progress Dashboard

Biểu đồ tiến độ học từ vựng / nghe / nói theo tuần.

Level-up milestone (Beginner → Intermediate → Work-ready).

Hệ thống achievement (Gamification).

6. 🧩 Non-Functional Requirements
   Hạng mục Yêu cầu
   Performance Trang load < 2s, đáp ứng 1000+ users nội bộ
   UX/UI Giao diện tối giản, mobile-friendly, theme dev-tool
   Security Authentication nội bộ (SSO / OAuth / email)
   Scalability Có thể mở rộng thêm tính năng học nâng cao
   Maintainability Code base dễ mở rộng (Next.js + TypeScript)
7. 📜 User Flow (Mô hình hành trình người dùng)

Đăng nhập bằng tài khoản nội bộ

Dashboard → hiển thị trạng thái học hôm nay

Chọn “Daily Plan” → gồm: từ vựng – phát âm – nghe – viết – mô phỏng

Học xong → điểm từng phần + feedback

Dashboard update → thống kê % hoàn thành + lịch sử tiến độ

8. 🗓️ Milestones & Roadmap
   Giai đoạn Thời gian Deliverable
   Phase 1 – Core MVP Tuần 1–4 Vocabulary, Listening, Speaking module
   Phase 2 – Practice Layer Tuần 5–8 Writing, Role-play, Simulation
   Phase 3 – Dashboard & Review Tuần 9–12 Tracking, Report, Final Test
9. 📁 Deliverables

english-app-ui – Frontend (Next.js, Tailwind, TS)

english-api – Backend service (NestJS / Express)

english-db – PostgreSQL schema (vocabulary, progress, record)

english-docs – Documentation (User Guide, Admin Guide)

english-data – Seed data (vocabulary, audio, transcripts)

10. ✅ Success Metrics
    Chỉ số Mục tiêu
    🎯 80% dev Tham gia daily & meeting bằng tiếng Anh sau 3 tháng
    🧑‍💻 70% dev Viết email công việc mà không cần hỗ trợ dịch
    🧪 60% dev Trả lời phỏng vấn kỹ thuật bằng tiếng Anh
11. 📌 Risks & Mitigation
    Rủi ro Giải pháp
    Người dùng bỏ giữa chừng Gamification + email reminder
    Nội dung học nhàm chán Update content hàng tuần từ nguồn open
    Thiếu dữ liệu âm thanh Sử dụng API TTS và open-source audio
12. 📞 Stakeholders
    Vai trò Tên Trách nhiệm
    PO PM / CTO Approve scope & milestone
    BA BA Team Thu thập yêu cầu, viết spec
    FE Dev Frontend Build UI/UX, integration API
    BE Dev Backend Build API, DB schema
    QA QA Team Test chức năng, đảm bảo chất lượng
    📦 Summary

Dự án này không phải chỉ để “học tiếng Anh” mà là giải pháp nội bộ giúp dev team dùng tiếng Anh như một kỹ năng làm việc.
Mục tiêu không phải đạt TOEIC 800 mà là có thể sống sót và phát triển trong môi trường toàn cầu hóa.

🎯 Kết quả cuối: Sau 3 tháng, dev có thể tham gia họp, trình bày ý tưởng, mô tả task, viết email và vượt qua vòng phỏng vấn dev bằng tiếng Anh.
