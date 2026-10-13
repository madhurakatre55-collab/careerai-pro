# AI-Powered Student Career Guidance System (EduGuide AI)

A full-fledged, full-stack intelligent career guidance platform engineered according to the **PME Mini Project Report** for the Department of Artificial Intelligence and Data Science at **Nutan Maharashtra Institute of Engineering and Technology (NMIET)**, Pune (Autonomous Institute under PCET, Affiliated to SPPU).

---

## 🎓 Academic Project Credentials
- **Course / Subject:** Principles of Management and Entrepreneurship (PME)
- **Academic Year:** 2026–2027
- **Department:** Department of Artificial Intelligence and Data Science (AI&DS)
- **Institution:** Nutan Maharashtra Institute of Engineering and Technology (NMIET), Pune
- **Project Team:**
  - **Madhura Katre** (PRN: `U251D060`, Roll: `SEAIDB11`)
  - **Aditi Jambhulkar** (PRN: `U251D050`, Roll: `SEAIDB10`)
  - **Indira Mante** (PRN: `U251D068` / `U251D069`, Roll: `SEAIDB12`)
- **Faculty Leadership:**
  - **Prof. Roomana Hasan** (Project Guide)
  - **Dr. Rohini Hanchate** (Academic Coordinator, Dept. of AI&DS)
  - **Prof. Tushar Waykole** (Head of Department, AI&DS)

---

## 📊 Grounded Research & Problem Context (From Report)
- **AISHE 2022–23 Data:** Over **4.46 Crore students** enrolled in Indian higher education—a massive demographic requiring scalable guidance.
- **Mercer | Mettl 2025 Study:** Only **42.6%** of Indian graduates assessed are considered overall employable, exposing a persistent skill-gap.
- **Over 60% of graduates** report feeling unprepared for the job market.
- **IC3 Global Study:** More than **80%** of surveyed students actively use AI tools for career research and discovery.
- **Conventional Limitation:** Human counseling is constrained by scheduled availability, high cost (₹2,500–5,000/session), and static periodic data.

## 🚀 Key System Features & Working Pipeline

### 0. Student Authentication & Isolated Personal Profiles (NEW)
- **Individual User Accounts:** Secure registration & login with password hashing.
- **Isolated Personal Telemetry:** Each student maintains their private profile, academic details, technical skill vectors, personalized roadmap, continuous refinement feedback, and 24/7 AI mentor chat history.
- **1-Click Team Logins for Evaluation:** Pre-seeded accounts for report authors:
  - `madhura.katre@nmiet.edu.in` (Password: `nmiet123`)
  - `aditi.jambhulkar@nmiet.edu.in` (Password: `nmiet123`)
  - `indira.mante@nmiet.edu.in` (Password: `nmiet123`)
- **Persistent Local Session:** Auto-retains logged-in student across page refreshes via `localStorage`.

### 1. Stage 1: Student Profile Analysis (Vectorization)

- Captures academic records (Department, Degree, Year of Study, CGPA).
- Interactive technical skill inventory & self-rated proficiencies.
- Cognitive and Aptitude Vector Profiling (Analytical, Logical, Systems Engineering, Creative, Collaboration sliders 0–100).
- Encodes multidimensional features into normalized feature vectors.

### 2. Stage 2: AI Matching Engine & Market Integration
- Evaluates student vectors against career archetype demands using weighted similarity scoring.
- Incorporates real-time 2026–2027 labor market signals (market demand score, hiring growth rates, starting salary brackets in INR & USD).
- Outputs ranked career matches with confidence percentages (e.g. 94% match) and contextual **"AI Fit Rationale"**.

### 3. Stage 3: Skill Gap Analysis & Diagnostic
- Calculates an **Employability Readiness Score** compared against national benchmarks.
- Segregates skills into:
  - ✅ **Mastered / Aligned Skills**
  - ⚠️ **Critical Missing Skills** (High-priority placement prerequisites with time-to-learn estimates)
  - 💡 **Recommended Emerging Skills** (Generative AI, MLOps, Containerization)

### 4. Stage 3b: Personalized Learning Roadmaps & Milestones
- 4-phase structured milestones (Foundations ➔ Core Tooling ➔ Capstone Projects ➔ Placement Prep).
- Curated learning resources (Coursera, YouTube, NPTEL, Documentation).
- **Interactive Checkbox Refinement:** Checking completed milestones updates the database and dynamically boosts student readiness scores.

### 5. 24/7 AI Career Counselor Chat
- Always-available conversational mentor answering student questions about interview strategies, placement preparation, project ideas, and salary benchmarks.
- Persists chat threads to SQLite.

### 6. Labour Market Explorer 2026–2027
- Sector growth rates (+38% for GenAI, +32% for Cloud/DevOps, +35% for Cyber).
- Technical competency demand barometers and starting salary benchmarks.

### 7. Institutional / College TPO Portal (B2B Showcase)
- Dedicated placement dashboard for NMIET AI&DS department.
- Cohort readiness distribution (Tier 1 Ready, Tier 2 Ready, Needs Upskilling).
- Batch curriculum gap identification and CSV export capability.

### 8. PME Entrepreneurship & Business Model
- **Multi-tier Revenue Architecture:**
  - *Freemium (B2C):* ₹0 forever (Basic profiling, top 3 matches).
  - *Student Pro (B2C):* ₹299/mo or ₹1,999/yr (Unlimited AI counseling, custom roadmap, resume review).
  - *Institutional Campus License (B2B):* ₹75,000–₹2,50,000/yr per college.
- **Year-1 Projections:** 50,000 users, ₹95.4 Lakhs ARR, 62% operating margin.

### 9. Ethics, Privacy & Algorithmic Transparency
- Bias auditing across academic and demographic lines.
- Complete student data portability: 1-click JSON export.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite 8, Tailwind CSS, Lucide Icons, Glassmorphic UI.
- **Backend:** Node.js, Express 5 REST API, CORS.
- **Database:** Persistent SQLite via WebAssembly (`sql.js`), zero native compilation requirements, persistent disk file (`server/career_guidance.sqlite`).
- **Algorithm:** Multi-factor weighted cosine similarity matching engine with dynamic feedback adjustment.

---

## 🏃 Running the Prototype Locally

The application is unified—the Express server on port 5000 serves both the backend API and the compiled React single-page frontend.

### Option 1: One-Command Turnkey Run
```bash
# In the project root directory
npm start
```
Then open your browser at:
👉 **[http://localhost:5000](http://localhost:5000)**

### Option 2: Active Development Mode
To run Vite live-reloading alongside the API:
```bash
# Terminal 1: Run Backend
npm run server

# Terminal 2: Run Vite Dev Server
npm run client
```
- Frontend dev server: `http://localhost:3000` (auto-proxies `/api` to port 5000)
- Backend server: `http://localhost:5000`

---

## 🌐 Deploying to Production (Render / Railway / Vercel / Heroku)
1. **Render.com / Railway:**
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Port: Express automatically uses `process.env.PORT` (defaults to 5000).
2. **Vercel / Netlify:**
   - Point output directory to `client/dist`.

---

## 📡 REST API Endpoints Overview
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check & NMIET PME metadata |
| `GET` | `/api/project-info` | Academic project team, faculty guides & literature citations |
| `GET` | `/api/careers` | Catalog of 20+ technology and modern career pathways |
| `GET` | `/api/careers/:id` | Detailed career profile, core skills, salary ranges & roadmaps |
| `GET` | `/api/students/:id` | Student profile, academic details, and assessment history |
| `POST` | `/api/students/:id/profile` | Update skills, interests, aptitude vectors & re-run AI matching |
| `POST` | `/api/students/:id/assess` | Execute 3-stage AI career guidance pipeline |
| `POST` | `/api/students/:id/feedback` | Record recommendation feedback (Accepted / Shortlisted / Rejected) |
| `POST` | `/api/students/:id/milestones/toggle` | Toggle learning milestone & recalibrate readiness score |
| `GET` | `/api/students/:id/messages` | Retrieve conversation history with AI Counselor |
| `POST` | `/api/students/:id/messages` | Chat with 24/7 AI Career Guidance Counselor |
| `GET` | `/api/market-trends` | Real-time labor market trends, AISHE & Mercer Mettl stats |
| `GET` | `/api/institutional/analytics` | College TPO cohort analytics for NMIET AI&DS |
| `GET` | `/api/pme/business-model` | Startup business plan, pricing tiers & Year 1 financials |
