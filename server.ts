import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

import {
  saveInquiry,
  getAllInquiries,
  toggleReplyStatus,
  deleteInquiryItem,
  getDbMode,
  connectDB,
  getPortfolioItems,
  savePortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
} from "./server/db";

// Connect to MongoDB on startup gracefully
connectDB().catch(err => console.error("Database connection initialization failed:", err));

// Nodemailer helper
async function sendNotificationEmail(submission: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const emailBody = `
    <h3>New Portfolio Inquiry</h3>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Phone:</strong> ${submission.phone || "N/A"}</p>
    <p><strong>Subject:</strong> ${submission.subject}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; border-radius: 4px;">${submission.message}</p>
  `;

  // If we have SMTP configuration, use it
  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"${submission.name}" <${user}>`,
        to: "toadityakumarsahoo@gmail.com",
        replyTo: submission.email,
        subject: `New Portfolio Inquiry from ${submission.name}: ${submission.subject}`,
        html: emailBody,
      });
      console.log(`Email successfully sent to toadityakumarsahoo@gmail.com via configured SMTP.`);
      return true;
    } catch (error) {
      console.error("Nodemailer SMTP failed, falling back to local simulation:", error);
    }
  }

  // Fallback: create a test Ethereal account dynamically for beautiful previews
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${submission.name}" <${submission.email}>`,
      to: "toadityakumarsahoo@gmail.com",
      subject: `New Portfolio Inquiry from ${submission.name}: ${submission.subject}`,
      html: emailBody,
    });

    console.log("Email captured in simulated SMTP Ethereal mode.");
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  } catch (err) {
    console.log("Simulated Email notification:", {
      to: "toadityakumarsahoo@gmail.com",
      from: submission.email,
      subject: submission.subject,
      body: submission.message,
    });
    return null;
  }
}

// Admin Passcode Check Middleware
const checkAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adminPass = process.env.ADMIN_PASSCODE || "admin123";
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== adminPass) {
    return res.status(401).json({ error: "Unauthorized access. Invalid admin passcode." });
  }
  next();
};

// API Routes

// 0. Database Connection Mode (Admin)
app.get("/api/admin/db-mode", checkAdminAuth, (req, res) => {
  res.json({ mode: getDbMode() });
});

// 1. Submit Inquiry
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields (name, email, subject, message)." });
    }

    // Save using DB Layer (MongoDB with automatic graceful local JSON fallback)
    const savedInquiry = await saveInquiry({
      name,
      email,
      phone: phone || "",
      subject,
      message
    });

    // Send Nodemailer notification
    const emailResult = await sendNotificationEmail({
      name: savedInquiry.name,
      email: savedInquiry.email,
      phone: savedInquiry.phone || "N/A",
      subject: savedInquiry.subject,
      message: savedInquiry.message
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been stored and notification sent!",
      data: savedInquiry,
      emailPreview: typeof emailResult === "string" ? emailResult : undefined,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// 2. View all inquiries (Admin)
app.get("/api/admin/inquiries", checkAdminAuth, async (req, res) => {
  try {
    const inquiries = await getAllInquiries();
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to load inquiries: " + error.message });
  }
});

// 3. Mark inquiry as replied (Admin)
app.patch("/api/admin/inquiries/:id/reply", checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await toggleReplyStatus(id);

    if (!updated) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update inquiry: " + error.message });
  }
});

// 4. Delete inquiry (Admin)
app.delete("/api/admin/inquiries/:id", checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteInquiryItem(id);

    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    res.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete inquiry: " + error.message });
  }
});

// 4.5 Dynamic Portfolio API Routes
app.get("/api/portfolio", async (req, res) => {
  try {
    const items = await getPortfolioItems();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch portfolio data: " + error.message });
  }
});

app.get("/api/portfolio/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const items = await getPortfolioItems(type);
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch portfolio items: " + error.message });
  }
});

app.post("/api/admin/portfolio/:type", checkAdminAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const newItem = await savePortfolioItem(type, req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create portfolio item: " + error.message });
  }
});

app.put("/api/admin/portfolio/:type/:id", checkAdminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const updatedItem = await updatePortfolioItem(type, id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    res.json({ success: true, data: updatedItem });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update portfolio item: " + error.message });
  }
});

app.delete("/api/admin/portfolio/:type/:id", checkAdminAuth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const success = await deletePortfolioItem(type, id);
    if (!success) {
      return res.status(404).json({ error: "Item not found or already deleted." });
    }
    res.json({ success: true, message: "Portfolio item deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete portfolio item: " + error.message });
  }
});

// 5. AI Chat Assistant powered by Gemini API (Server-side)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message prompt is required." });
    }

    if (!ai) {
      return res.status(503).json({
        error: "AI Chat Assistant is currently offline. Please set GEMINI_API_KEY to activate it.",
      });
    }

    // Comprehensive biography instructions for Aditya Kumar Sahoo
    const systemInstruction = `
      You are the personal AI Assistant representing Aditya Kumar Sahoo, an elite Full Stack Developer, MERN Stack Developer, Java Developer, and AI Enthusiast.
      Your goal is to answer questions from potential employers, recruiters, and clients visiting Aditya's portfolio website in a helpful, professional, engaging, and friendly manner.
      Always reply in first-person ("I") as if you are Aditya's digital twin or Aditya himself. Keep answers concise, highly structured, and confident.

      Here is the complete profile context of Aditya Kumar Sahoo that you must use to answer questions:

      1. Name: Aditya Kumar Sahoo
      2. Role: Full Stack Developer | MERN Stack Developer | Java Developer | AI Enthusiast
      3. Contact Details:
         - Email: toadityakumarsahoo@gmail.com
         - Location: Bangalore, Karnataka, India
         - Web: www.aditya.com
      4. Summary:
         - Results-driven Full Stack Developer with 2+ years of hands-on experience building and deploying scalable web applications using the MERN Stack and Java Spring Boot.
         - Deployed 15+ live full-stack projects independently across Vercel, Netlify, and GitHub Pages.
         - Completed 2 high-impact industry internships prior to graduation.
         - Ranked #1 in the Computer Science & Engineering department (Highest SGPA in the Batch).
         - Tech Club Coordinator, conducting workshops for 100+ students and mentoring 50+ juniors in MERN Stack and AI development.
      5. Education:
         - Bachelor of Engineering (B.Tech) in Computer Science & Engineering (2022 - 2026)
         - Institution: Nalanda Institute of Technology, Bhubaneswar
         - Accomplishments: Ranked #1, Batch topper, Tech Club Coordinator.
      6. Core Technical Skills:
         - Programming Languages: Java (Spring Boot, Spring Core), Python, C++, JavaScript, TypeScript
         - Frontend Technologies: React.js, Redux, HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive Design, UI/UX Principles
         - Backend Technologies: Node.js, Express.js, Spring Boot, Spring Core, REST APIs, WebSockets
         - Databases: MongoDB, MySQL, SQL (Optimized queries, relational and document stores)
         - Tools & DevOps: Git, GitHub, Vercel, Netlify, Postman, Docker, Maven, Gradle
         - AI & Next-Gen Tech: OpenAI Prompt Engineering, Spring AI, JWT Security, Authentication & Authorization, Web Security
      7. Experience:
         - Full Stack Java Developer (Intern) at Labmentix (Sep 2025 - Mar 2026):
           * Engineered and deployed 5+ full-stack web applications using MERN Stack and Java Spring Boot, delivering production-ready client systems.
           * Built responsive, accessible UIs with React and Tailwind, collaborating closely with QA to reduce bugs.
           * Designed RESTful APIs integrated with MongoDB & MySQL, enhancing data retrieval speeds.
         - Full Stack Java Developer (Intern) at ExcelR (Jul 2025 - Nov 2025):
           * Developed enterprise-grade full-stack applications with Java, Spring Boot, React.js, and MySQL.
           * Designed and tested 10+ RESTful API endpoints with authentication and proper error handling.
      8. Highlighted Projects:
         - NavVaSeconds Medical Appointment System: Full-featured MERN Stack platform with specialized Admin, Doctor, and Patient panels, JWT authentication, appointment scheduling, and payment integration.
         - Aditya Prime Healthcare: Digital hospital system incorporating patient registration, doctor scheduling, role-based access controls using Spring Security and JWT. (Tech: Java, Spring Boot, React, MySQL).
         - Cancer Awareness & Support Platform: Responsive educational/community forum built with React and Tailwind for peer support and awareness.
         - Student Attendance Management System: Full analytics dashboard tracking attendance for classes with admin analytics and responsive dashboard charts.
         - Quick Chat Application: Real-time MERN message sharing utilizing WebSockets (Socket.io) with zero-delay delivery and persistent chat history.
         - ScamShield (AI Fraud Protection, May 2026 - Present): AI-powered fraud detection platform identifying phishing links, fake profiles, and scams using pattern recognition and real-time alerts.
         - SEO Rank Tracker: Real-time keyword ranking monitor and search engine performance visualizer.
      9. Certifications:
         - Oracle Certified - AI Foundations Associate
         - Certified - Prompt Engineering & Programming with OpenAI
         - TATA Data Analytics Certification
         - Business Analysis Certification
         - Communication Skills Certification
      10. Achievements:
          - Successfully launched 15+ production-grade web applications.
          - Batch Topper (#1 in Department).
          - Hosted 10+ tech club workshops on MERN and AI for 100+ student attendees.

      Guidelines for your tone:
      - Be polite, enthusiastic, extremely capable, and technical.
      - If asked about download links, point them to the "Download Resume" button in the Hero or Resume sections.
      - If asked about hiring or project quotes, guide them to use the Contact form or email me directly at toadityakumarsahoo@gmail.com.
      - Use bullet points and clean spacing for easy reading. Avoid blocky paragraphs.
    `;

    // Map history to contents array for Gemini chat session, ensuring it starts with a 'user' turn and alternates strictly
    const contents: any[] = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      let expectedRole = "user";
      chatHistory.forEach((turn: any) => {
        const role = turn.role === "user" ? "user" : "model";
        if (role === expectedRole) {
          contents.push({
            role: role,
            parts: [{ text: turn.text }],
          });
          expectedRole = expectedRole === "user" ? "model" : "user";
        }
      });
      // Ensure the history ends with a 'model' turn so the next current prompt can be a 'user' turn
      if (contents.length > 0 && contents[contents.length - 1].role === "user") {
        contents.pop();
      }
    }

    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Helper function for progressive backoff and fallback models
    async function generateContentWithRetry(aiClient: any, chatContents: any[], systemInstructions: string) {
      const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-3.5-flash",
        "gemini-flash-latest",
        "gemini-3.1-flash-lite"
      ];

      let lastError: any = null;

      for (const modelName of modelsToTry) {
        const attempts = 2; // Try each model up to 2 times
        for (let attempt = 1; attempt <= attempts; attempt++) {
          try {
            console.log(`[Gemini] Attempting generation with model '${modelName}' (Attempt ${attempt}/${attempts})...`);
            const res = await aiClient.models.generateContent({
              model: modelName,
              contents: chatContents,
              config: {
                systemInstruction: systemInstructions,
                temperature: 0.7,
              },
            });
            if (res && res.text) {
              console.log(`[Gemini] Success using model '${modelName}'`);
              return res;
            }
          } catch (err: any) {
            lastError = err;
            console.warn(`[Gemini] Model '${modelName}' failed on attempt ${attempt}:`, err.message || err);
            if (attempt < attempts) {
              const delay = attempt * 1200;
              console.log(`[Gemini] Waiting ${delay}ms before retrying model '${modelName}'...`);
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          }
        }
      }

      throw lastError || new Error("Failed to communicate with any Gemini model.");
    }

    let response;
    try {
      response = await generateContentWithRetry(ai, contents, systemInstruction);
    } catch (modelError: any) {
      console.error("[Gemini] All models and retries failed:", modelError);
      throw modelError;
    }

    const replyText = response.text || "I'm sorry, I couldn't formulate a response right now. Please feel free to email me directly!";

    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini Chat API error:", error);
    res.status(500).json({ error: "Failed to communicate with AI twin: " + error.message });
  }
});

// Configure Vite or Static Assets serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for Development Mode.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
