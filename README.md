<div align="center">

<img src="https://github.com/adityakumarsahoo.png" width="120" height="120" style="border-radius: 50%;" alt="Aditya Kumar Sahoo" />

<h1>⚡ Aditya Kumar Sahoo — Portfolio</h1>

<p>
  <strong>Full Stack Developer · MERN Stack · Java Spring Boot · AI Enthusiast</strong>
</p>

<p>
  <a href="https://github.com/Adityakumarsahoo/adityaportfolio/stargazers">
    <img src="https://img.shields.io/github/stars/Adityakumarsahoo/adityaportfolio?style=for-the-badge&color=6366f1&labelColor=0f172a" alt="Stars" />
  </a>
  <a href="https://github.com/Adityakumarsahoo/adityaportfolio/network/members">
    <img src="https://img.shields.io/github/forks/Adityakumarsahoo/adityaportfolio?style=for-the-badge&color=38bdf8&labelColor=0f172a" alt="Forks" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0f172a" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0f172a" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=0f172a" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Gemini-AI-8B5CF6?style=for-the-badge&logo=google&logoColor=white&labelColor=0f172a" alt="Gemini AI" />
</p>

<p>
  <a href="https://toadityakumarsahoo@gmail.com">📧 Contact Me</a> ·
  <a href="https://drive.google.com/file/d/1dxDcPWwZFoShY4_b-VfnNkyLBu3UOsrA/view?usp=sharing">📄 Download Resume</a> ·
  <a href="https://github.com/Adityakumarsahoo">🐙 GitHub</a>
</p>

</div>

---

## 🌟 Overview

A **premium, futuristic personal portfolio** built for Aditya Kumar Sahoo — a results-driven Full Stack Developer with 2+ years of experience delivering scalable web applications across MERN Stack and Java Spring Boot ecosystems.

This portfolio features a **Gemini-powered AI twin chat assistant**, **MongoDB Atlas** cloud backend, interactive **3D constellation canvas**, a cinematic **loading screen**, and a fully functional **admin dashboard** — all wrapped in a sleek dark-mode glassmorphism UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Twin Chat** | Gemini-powered assistant that answers as Aditya — for recruiters & clients |
| 🍃 **MongoDB Atlas Backend** | Cloud database for contact inquiries & portfolio items |
| 🎨 **3D Canvas Background** | Interactive particle constellation with WebGL |
| 🌀 **Cinematic Loader** | Orbital ring animation with GitHub avatar + progress bar |
| 🔐 **Admin Dashboard** | Secure panel to manage contact inquiries & toggle replies |
| 📧 **Nodemailer Integration** | Email notifications for every contact form submission |
| 🖨️ **ATS Resume Viewer** | Print-optimized, recruiter-ready resume sheet |
| 🌗 **Dark / Light Mode** | Smooth theme toggle across the entire portfolio |
| 📱 **Fully Responsive** | Mobile-first design across all screen sizes |
| ⚡ **Vite + React 19** | Blazing-fast HMR development with TypeScript |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript** — Component-driven UI
- **Tailwind CSS v4** — Utility-first responsive design
- **Motion (Framer Motion)** — Smooth animations & transitions
- **Lucide React** — Crisp icon library

### Backend
- **Node.js + Express** — REST API server
- **tsx** — TypeScript execution for Node
- **Nodemailer** — Email notifications (SMTP or Ethereal fallback)

### Database & AI
- **MongoDB Atlas** + **Mongoose** — Cloud NoSQL database
- **Google Gemini AI** (`@google/genai`) — AI twin chat assistant

### DevOps & Tools
- **Vite** — Frontend bundler & dev server
- **esbuild** — Production server bundler
- **dotenv** — Secure environment variable management

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org))
- A **Gemini API Key** ([Get one free](https://aistudio.google.com/app/apikey))
- A **MongoDB Atlas URI** ([Free cluster](https://cloud.mongodb.com)) *(optional — falls back to local JSON)*

### 1. Clone the repository
```bash
git clone https://github.com/Adityakumarsahoo/adityaportfolio.git
cd adityaportfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and fill in your values:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"
ADMIN_PASSCODE="admin123"

# Optional SMTP (falls back to Ethereal preview mode if empty)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""

# Optional MongoDB (falls back to local JSON file if empty)
MONGODB_URI="your_mongodb_atlas_uri"
```

### 4. Run the development server
```bash
npm run dev
```

🎉 Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🗂️ Project Structure

```
adityaportfolio/
├── server/
│   └── db.ts              # MongoDB / local JSON database layer
├── src/
│   ├── components/
│   │   ├── Loader.tsx     # Cinematic loading screen with orbital avatar
│   │   ├── Hero.tsx       # Hero intro section
│   │   ├── About.tsx      # About & timeline
│   │   ├── Skills.tsx     # Tech skills grid
│   │   ├── Experience.tsx # Work experience cards
│   │   ├── Projects.tsx   # Project showcase
│   │   ├── Certifications.tsx
│   │   ├── Services.tsx
│   │   ├── Resume.tsx     # ATS-optimized resume viewer
│   │   ├── Contact.tsx    # Contact form (saves to DB + email)
│   │   ├── AIAssistant.tsx  # Gemini AI twin chat widget
│   │   ├── AdminDashboard.tsx # Secure admin inquiries panel
│   │   ├── Canvas3D.tsx   # WebGL particle constellation
│   │   └── CustomCursor.tsx
│   ├── App.tsx            # Root layout, nav, routing
│   ├── main.tsx
│   └── index.css
├── server.ts              # Express server + Vite middleware + all API routes
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit a contact inquiry |
| `POST` | `/api/chat` | AI twin chat (Gemini) |
| `GET` | `/api/portfolio` | Fetch all portfolio items |
| `GET` | `/api/admin/inquiries` | List all inquiries *(admin)* |
| `PATCH` | `/api/admin/inquiries/:id/reply` | Toggle replied status *(admin)* |
| `DELETE` | `/api/admin/inquiries/:id` | Delete inquiry *(admin)* |
| `GET` | `/api/admin/db-mode` | Check DB mode *(admin)* |

> **Admin routes** require `Authorization: <ADMIN_PASSCODE>` header.

---

## 📜 Scripts

```bash
npm run dev      # Start development server (tsx + Vite middleware)
npm run build    # Build frontend + bundle server for production
npm run start    # Run production server from dist/
npm run lint     # TypeScript type check (no emit)
```

---

## 🔒 Security Notes

- `.env` is excluded from git via `.gitignore` — **never commit your secrets**
- Admin dashboard is passcode-protected via HTTP Authorization header
- Contact form data is validated server-side before storage
- Gemini API calls are server-side only — key never exposed to browser

---

## 👨‍💻 About Aditya

| | |
|---|---|
| 🎓 **Education** | B.Tech in CSE — Nalanda Institute of Technology (2022–2026) |
| 🏆 **Rank** | #1 Batch Topper — Highest SGPA in CSE Department |
| 💼 **Experience** | 2 industry internships (Labmentix · ExcelR) |
| 🚀 **Projects** | 15+ live full-stack apps deployed on Vercel & Netlify |
| 🎤 **Leadership** | Tech Club Coordinator — workshops for 100+ students |
| 📍 **Location** | Bangalore, Karnataka, India |
| 📧 **Email** | toadityakumarsahoo@gmail.com |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ by [Aditya Kumar Sahoo](https://github.com/Adityakumarsahoo)**

⭐ **Star this repo** if you find it helpful!

</div>
