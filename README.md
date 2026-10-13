# 🚀 CareerAI Pro — Autonomous AI Career Intelligence & Placement Acceleration Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-emerald?style=for-the-badge&logo=render)](https://careerai-pro-xur4.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/madhurakatre55-collab/careerai-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-indigo?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Live Production URL:** 👉 **[https://careerai-pro-xur4.onrender.com](https://careerai-pro-xur4.onrender.com)**  
> **Source Repository:** 👉 **[https://github.com/madhurakatre55-collab/careerai-pro](https://github.com/madhurakatre55-collab/careerai-pro)**

---

## 🌟 Executive Overview

**CareerAI Pro** is a production-ready, full-stack autonomous career intelligence platform engineered to bridge the critical higher-education employability gap. Built on multi-vector cosine similarity and deep neural network inference (Stage 2 MLP), the system autonomously analyzes student competencies, matches candidates to high-growth industry pathways, bridges concrete technical skill deficits, and dynamically orchestrates personalized 4-phase learning milestones.

The platform includes full **commercial SaaS monetization** infrastructure, including direct B2C consumer subscriptions (₹299/month with coupon redemption), automated B2B institutional campus licensing (₹75k–₹2.5L/year with an interactive quote calculator), and an enterprise Placement Cell (TPO) intelligence dashboard.

---

## 🔗 Live Application Access
- **Production URL:** [https://careerai-pro-xur4.onrender.com](https://careerai-pro-xur4.onrender.com)
- **API Health Check:** [https://careerai-pro-xur4.onrender.com/api/health](https://careerai-pro-xur4.onrender.com/api/health)
- **Pre-Seeded Demo Credentials:**
  - `alex.chen@careerai.io` (Password: `career123`) — *Active Pro Tier Subscriber*
  - `priya.sharma@careerai.io` (Password: `career123`) — *Active Pro Tier Subscriber*
  - `marcus.vance@careerai.io` (Password: `career123`) — *Free Tier User*
  - *New users can register instantly on the website with isolated personal profile storage!*

---

## 📊 Grounded Research & Problem Context
* **Demographic Scale:** According to AISHE data, over **4.46 Crore students** are currently enrolled in Indian higher education—creating unprecedented demand for scalable, individualized career guidance.
* **The Employability Deficit:** The Mercer | Mettl 2025 assessment benchmark indicates that only **42.6% of graduating students** meet baseline enterprise employability criteria.
* **Preparation Gap:** Over **60% of graduates** report feeling fundamentally unprepared for competitive campus placement drives.
* **AI Tool Demand:** IC3 Global studies reveal that **>80% of students** actively search for AI assistance for career roadmaps, yet conventional counseling remains constrained by high hourly fees (₹2,500–₹5,000/session) and static advice.

---

## 🏗️ 10 Core Platform Modules & Pipeline

### 1. Student Authentication & Isolated Data Sovereignty
* Secure registration & login with password hashing and JWT/session management.
* Strict tenant isolation: Each student retains private academic profiles, skill vectors, custom learning roadmaps, continuous refinement feedback, and 24/7 AI mentor chat logs.
* Local persistent storage with one-click user switching.

### 2. Stage 1: Multidimensional Profile Vectorization
* Academic profile capture (Department, Degree, Year of Study, CGPA).
* Technical skill inventory with granular proficiency self-evaluations.
* 5-dimensional Cognitive & Aptitude Profiling (Analytical, Logical, Systems Architecture, Creative, Collaborative) scaled to normalized feature vectors.

### 3. Stage 2: Deep ML Neural Model & AI Matching Engine
* Deep Multi-Layer Perceptron (MLP) neural network architecture with forward pass inference.
* Multi-factor cosine similarity ranking combining skill overlaps, aptitude weights, and live labor market multipliers.
* Real-time confidence calibration and automated "AI Fit Rationale" generation.

### 4. Stage 3: Automated Skill Gap Diagnostic
* Real-time Employability Readiness Score compared against national benchmarks.
* Three-tier taxonomy:
  * ✅ **Mastered Competencies:** Validated, placement-ready skills.
  * ⚠️ **High Priority Critical Gaps:** Placement prerequisites with realistic time-to-learn estimates.
  * ⚡ **Emerging Trends:** 2026 competitive edge competencies (GenAI, MLOps, System Design).

### 5. Stage 4: Personalized Learning Roadmap & Dynamic Milestones
* Phased progression: Foundations ➔ Core Tooling ➔ Capstone Projects ➔ Placement Prep.
* Curated resources (Coursera, YouTube, NPTEL, Official Docs).
* **Interactive Adaptive Refinement:** Toggling completed milestones triggers automated recalculation of readiness and updates vector weights.

### 6. Stage 5: 24/7 Context-Grounded AI Career Counselor
* Continuous mentor answering questions regarding placement rounds, technical interviews, project ideas, and salary benchmarks.
* Persistent SQLite chat history.

### 7. Stage 6: 2026–2027 Labor Market Intelligence Hub
* Real-time tracking of top growth sectors (Generative AI +38%, Cloud/DevOps +32%, Cybersecurity +35%).
* Average starting packages (₹8.5 LPA to ₹18.5 LPA) and technical competency demand barometer.

### 8. Stage 7: Institutional Placement (TPO) Consortium Portal
* Enterprise placement cell dashboard supporting 45+ consortium campuses.
* Real-time cohort analytics: Assessed ratios, Tier-1 Product readiness, needs-upskilling breakdowns.
* Cohort curriculum gap summaries and one-click TPO CSV audit export.

### 9. Stage 8: B2C & B2B Commercial SaaS Monetization Engine
* **Consumer B2C Subscriptions:** ₹299/month Pro upgrade with instant checkout and coupon code support (`LAUNCH50` for 50% off).
* **Institutional B2B Campus Licensing:** Interactive fee calculator based on cohort size (₹199–₹249/student/year) with instant automated formal quotation dispatch.
* Complete Year-1 unit economics & financial projections (₹95.4 Lakhs ARR at 62% operating margin).

### 10. Stage 9: AI Ethics, Algorithmic Transparency & DPDP Compliance
* Continuous algorithmic bias auditing to prevent stereotyping across background, gender, or academic streams.
* Zero data monetization: Student data is strictly private and never sold to advertisers.
* DPDP Act & FERPA compliance with full data sovereignty (One-click JSON export).

---

## 🛠️ Technology Architecture

* **Frontend:** React 19, Vite 8, Tailwind CSS, Lucide Icons.
* **Backend:** Node.js, Express 5 REST API, CORS.
* **Database:** Persistent SQLite via WebAssembly (`sql.js`), zero native compilation requirements, persistent disk file (`server/career_guidance.sqlite`).
* **Machine Learning:** Multi-factor cosine vector similarity engine & Stage 2 Deep MLP Neural Network.
* **Cloud Hosting:** Render.com (Linux Web Service with automated CI/CD from GitHub).

---

## 💻 Local Development Setup

To run the project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/madhurakatre55-collab/careerai-pro.git
cd careerai-pro

# 2. Install dependencies for root & client
npm install
npm --prefix client install

# 3. Build the frontend
npm run build

# 4. Start the server
npm start
```

Open your browser at:
👉 **`http://localhost:5000`**

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & system metadata |
| `POST` | `/api/auth/login` | User login with email & password |
| `POST` | `/api/auth/register` | Register new student profile |
| `GET` | `/api/students` | List all registered users (for persona switcher) |
| `GET` | `/api/students/:id` | Retrieve student profile, skills & assessments |
| `POST` | `/api/students/:id/profile` | Update profile vectors & trigger matching |
| `POST` | `/api/students/:id/assess` | Execute multi-stage recommendation pipeline |
| `POST` | `/api/students/:id/feedback` | Continuous feedback (Target, Shortlist, Reject) |
| `POST` | `/api/students/:id/milestones/toggle` | Check milestone & recalibrate score |
| `POST` | `/api/ml/infer/:id` | Stage 2 Deep MLP Neural Network inference |
| `GET` | `/api/students/:id/messages` | Fetch AI Counselor chat messages |
| `POST` | `/api/students/:id/messages` | Send query to 24/7 AI Counselor |
| `GET` | `/api/market-trends` | 2026–2027 labor market indicators & salary bands |
| `GET` | `/api/institutional/analytics` | Enterprise campus placement statistics |
| `POST` | `/api/institutional/quote` | Generate & record institutional license proposal |
| `POST` | `/api/billing/upgrade` | Upgrade subscription tier & apply promo code |
| `GET` | `/api/pme/business-model` | Commercial business model & Year-1 financials |

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
