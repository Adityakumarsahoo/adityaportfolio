import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Define TypeScript Interface for Inquiry submissions
export interface IInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  replied: boolean;
  createdAt: Date;
}

// 1. Mongoose Schema Setup
const InquirySchema = new mongoose.Schema<IInquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  replied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const InquiryModel = mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

// Mongoose Schema for Dynamic Portfolio items
export interface IPortfolioItem {
  id: string;
  type: string; // 'project' | 'skill' | 'experience' | 'certification' | 'service' | 'testimonial'
  data: any;
}

const PortfolioItemSchema = new mongoose.Schema<IPortfolioItem>({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const PortfolioItemModel = mongoose.models.PortfolioItem || mongoose.model<IPortfolioItem>("PortfolioItem", PortfolioItemSchema);

// 2. Local Fallback Database Paths
const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), "utf-8");
}
if (!fs.existsSync(PORTFOLIO_FILE)) {
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify([], null, 2), "utf-8");
}

// Local Database Helpers
function readLocalSubmissions(): any[] {
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeLocalSubmissions(submissions: any[]): boolean {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}

function readLocalPortfolio(): any[] {
  try {
    const data = fs.readFileSync(PORTFOLIO_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeLocalPortfolio(items: any[]): boolean {
  try {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(items, null, 2), "utf-8");
    return true;
  } catch (err) {
    return false;
  }
}

// Default Seed Data
const defaultPortfolioItems: IPortfolioItem[] = [
  // PROJECTS
  {
    id: "p_1",
    type: "project",
    data: {
      id: "p_1",
      title: "NavVaSeconds Medical Appointment System",
      category: "Full Stack",
      description: "A comprehensive digital medical platform that unifies hospital workflows, medical professionals, and patient appointment queues under a high-performance MERN architecture.",
      features: [
        "Specialized Doctor dashboard to coordinate slots, check patient histories, and write electronic prescriptions.",
        "Comprehensive Admin center offering control over registered medical credentials, analytics, and billing records.",
        "Interactive patient portal facilitating real-time slot selection, secure profile storage, and booking confirmation.",
        "Robust REST APIs verified with JWT security blocks protecting patient confidentiality.",
        "Integrated payment gateways enabling split invoice processing directly inside patient portals."
      ],
      challengesSolved: "Synchronizing doctor schedules dynamically in real-time to prevent overlapping booking requests. Implemented an transactional slot verification algorithm using MongoDB collections to guarantee atomic reservation actions.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Authentication", "REST APIs"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.com",
      image: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)"
    }
  },
  {
    id: "p_2",
    type: "project",
    data: {
      id: "p_2",
      title: "Aditya Prime Healthcare",
      category: "Full Stack",
      description: "An enterprise-grade hospital registration and clinical management workspace designed for scalable, high-throughput digital registration pipelines.",
      features: [
        "Patient digital registration eliminating manual entry errors.",
        "Clinical doctor roster scheduler with role-based access controls (RBAC).",
        "Interactive secure doctor-to-doctor messaging channels.",
        "Full Spring Security middleware ensuring role-based routing (Admin, Doctor, Patient)."
      ],
      challengesSolved: "Safeguarding granular role-based permissions at the endpoint level. Engineered custom Spring Security configuration patterns with JWT claim filters that validates user privileges on every transaction request.",
      techStack: ["Java", "Spring Boot", "Spring Core", "React.js", "MySQL", "JWT Security", "Spring Security"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.com",
      image: "linear-gradient(135deg, #0f766e 0%, #022c22 100%)"
    }
  },
  {
    id: "p_3",
    type: "project",
    data: {
      id: "p_3",
      title: "Cancer Awareness & Support Platform",
      category: "Frontend",
      description: "An educational community forum and resource network facilitating peer-to-peer discussion, cancer awareness material sharing, and local health resources search.",
      features: [
        "Accessible, high-contrast, fully responsive client interfaces styled with Tailwind CSS guidelines.",
        "Dynamic categorization filters for various oncology specialties.",
        "Support groups discussion boards with real-time reactive posting feeds."
      ],
      challengesSolved: "Providing an accessible UI for a diverse audience. Refined focus structures, added semantic HTML tags, and guaranteed solid color contrast matching high AA accessibility parameters.",
      techStack: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Responsive UI"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.com",
      image: "linear-gradient(135deg, #be185d 0%, #500724 100%)"
    }
  },
  {
    id: "p_4",
    type: "project",
    data: {
      id: "p_4",
      title: "Attendance Management System",
      category: "AI & Other",
      description: "A centralized digital roster workspace built to let academic administrators track student schedules, visualize aggregate attendance rates, and analyze metrics.",
      features: [
        "Interactive analytics dashboard representing weekly attendance metrics with charts.",
        "Secure student credentials repository with role validations.",
        "CSV export/import systems to synchronize schedules effortlessly."
      ],
      challengesSolved: "Optimizing relational aggregations. Designed complex SQL query patterns with index optimization on date keys, reducing analytics load latency by 65%.",
      techStack: ["React.js", "Node.js", "Express.js", "MySQL", "SQL Indexing", "Responsive UI"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.com",
      image: "linear-gradient(135deg, #5b21b6 0%, #1e1b4b 100%)"
    }
  },
  {
    id: "p_5",
    type: "project",
    data: {
      id: "p_5",
      title: "Quick Chat Application",
      category: "Full Stack",
      description: "A real-time, zero-delay chat application utilizing modern WebSocket connections to provide direct peer-to-peer conversations and private room chats.",
      features: [
        "Instant message delivery and typing status indicators using Socket.io integration.",
        "Persistent message archives indexed using document storage.",
        "Clean, responsive, glassmorphic layout optimized for mobile chatting."
      ],
      challengesSolved: "Eliminating latency on chat history fetching. Set up server-side cursor pagination query patterns in MongoDB, preventing browser bottlenecking during bulk thread retrievals.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "WebSockets"],
      githubUrl: "https://github.com",
      liveUrl: "https://vercel.com",
      image: "linear-gradient(135deg, #115e59 0%, #0c2d27 100%)"
    }
  },

  // SKILLS
  { id: "s_1", type: "skill", data: { name: "Java", category: "Languages", level: 92, color: "from-red-500 to-amber-600", iconName: "Java" } },
  { id: "s_2", type: "skill", data: { name: "Python", category: "Languages", level: 85, color: "from-blue-400 to-indigo-600", iconName: "Python" } },
  { id: "s_3", type: "skill", data: { name: "C++", category: "Languages", level: 78, color: "from-sky-500 to-blue-700", iconName: "C++" } },
  { id: "s_4", type: "skill", data: { name: "JavaScript", category: "Languages", level: 90, color: "from-yellow-400 to-amber-500", iconName: "JavaScript" } },
  { id: "s_5", type: "skill", data: { name: "TypeScript", category: "Languages", level: 88, color: "from-blue-500 to-indigo-600", iconName: "TypeScript" } },
  { id: "s_6", type: "skill", data: { name: "React.js", category: "Frontend", level: 94, color: "from-cyan-400 to-blue-500", iconName: "React" } },
  { id: "s_7", type: "skill", data: { name: "Redux", category: "Frontend", level: 82, color: "from-purple-500 to-indigo-700", iconName: "Redux" } },
  { id: "s_8", type: "skill", data: { name: "HTML5", category: "Frontend", level: 95, color: "from-orange-500 to-red-600", iconName: "HTML5" } },
  { id: "s_9", type: "skill", data: { name: "CSS3", category: "Frontend", level: 92, color: "from-blue-400 to-indigo-500", iconName: "CSS3" } },
  { id: "s_10", type: "skill", data: { name: "Tailwind CSS", category: "Frontend", level: 95, color: "from-teal-400 to-cyan-500", iconName: "Tailwind" } },
  { id: "s_11", type: "skill", data: { name: "Bootstrap", category: "Frontend", level: 80, color: "from-purple-600 to-violet-800", iconName: "Bootstrap" } },
  { id: "s_12", type: "skill", data: { name: "Node.js", category: "Backend", level: 88, color: "from-emerald-500 to-green-600", iconName: "Node" } },
  { id: "s_13", type: "skill", data: { name: "Express.js", category: "Backend", level: 90, color: "from-slate-600 to-slate-800", iconName: "Express" } },
  { id: "s_14", type: "skill", data: { name: "Spring Boot", category: "Backend", level: 85, color: "from-green-500 to-emerald-700", iconName: "SpringBoot" } },
  { id: "s_15", type: "skill", data: { name: "Spring Core", category: "Backend", level: 80, color: "from-lime-500 to-green-600", iconName: "Spring" } },
  { id: "s_16", type: "skill", data: { name: "MongoDB", category: "Databases", level: 88, color: "from-green-400 to-emerald-600", iconName: "MongoDB" } },
  { id: "s_17", type: "skill", data: { name: "MySQL", category: "Databases", level: 85, color: "from-sky-500 to-blue-600", iconName: "MySQL" } },
  { id: "s_18", type: "skill", data: { name: "SQL", category: "Databases", level: 86, color: "from-blue-600 to-indigo-800", iconName: "SQL" } },
  { id: "s_19", type: "skill", data: { name: "Git", category: "Tools & DevOps", level: 90, color: "from-orange-600 to-red-700", iconName: "Git" } },
  { id: "s_20", type: "skill", data: { name: "GitHub", category: "Tools & DevOps", level: 92, color: "from-slate-700 to-slate-950", iconName: "GitHub" } },
  { id: "s_21", type: "skill", data: { name: "Docker", category: "Tools & DevOps", level: 75, color: "from-blue-500 to-sky-600", iconName: "Docker" } },
  { id: "s_22", type: "skill", data: { name: "Postman", category: "Tools & DevOps", level: 88, color: "from-orange-400 to-orange-600", iconName: "Postman" } },
  { id: "s_23", type: "skill", data: { name: "Vercel / Netlify", category: "Tools & DevOps", level: 85, color: "from-slate-800 to-slate-950", iconName: "Vercel" } },
  { id: "s_24", type: "skill", data: { name: "Prompt Engineering", category: "AI & Security", level: 95, color: "from-pink-500 to-rose-600", iconName: "Prompt" } },
  { id: "s_25", type: "skill", data: { name: "Spring AI", category: "AI & Security", level: 78, color: "from-emerald-400 to-green-500", iconName: "SpringAI" } },
  { id: "s_26", type: "skill", data: { name: "JWT Security", category: "AI & Security", level: 86, color: "from-indigo-500 to-purple-600", iconName: "JWT" } },
  { id: "s_27", type: "skill", data: { name: "REST APIs", category: "AI & Security", level: 92, color: "from-indigo-600 to-blue-600", iconName: "REST" } },

  // EXPERIENCE
  {
    id: "e_1",
    type: "experience",
    data: {
      id: "e_1",
      role: "Full Stack Java Developer (Intern)",
      company: "Labmentix",
      location: "Bangalore, India",
      period: "Sep 2025 - Mar 2026",
      isInternship: true,
      description: [
        "Engineered and deployed 5+ full-stack web applications using MERN Stack and Java Spring Boot, delivering scalable, production-ready solutions for real-world client projects.",
        "Built responsive, accessible UIs using React.js and Tailwind CSS, reducing reported UI bugs by collaborating closely with QA teams.",
        "Designed and consumed RESTful APIs integrated with MongoDB and MySQL databases, improving data retrieval efficiency through optimized query design."
      ],
      skills: ["Java", "Spring Boot", "React.js", "Express.js", "MongoDB", "MySQL", "Tailwind CSS", "REST APIs"]
    }
  },
  {
    id: "e_2",
    type: "experience",
    data: {
      id: "e_2",
      role: "Full Stack Java Developer (Intern)",
      company: "ExcelR",
      location: "Bangalore, India",
      period: "Jul 2025 - Nov 2025",
      isInternship: true,
      description: [
        "Developed enterprise-grade full-stack applications using Java, Spring Boot, React.js, and MySQL, focusing on scalable architecture and high-performance output.",
        "Built and tested 10+ RESTful API endpoints with proper authentication (JWT) and error handling, ensuring secure and reliable data exchange."
      ],
      skills: ["Java", "Spring Boot", "Spring Core", "React.js", "MySQL", "REST APIs", "JWT Security"]
    }
  },

  // CERTIFICATIONS
  {
    id: "c_1",
    type: "certification",
    data: {
      id: "c_1",
      title: "Oracle Certified - AI Foundations Associate",
      issuer: "Oracle",
      year: "2025",
      badgeColor: "from-red-500 to-amber-600",
      description: "Core AI concepts including machine learning, neural networks, deep learning, and intelligent system designs."
    }
  },
  {
    id: "c_2",
    type: "certification",
    data: {
      id: "c_2",
      title: "Certified Prompt Engineering & Programming",
      issuer: "OpenAI & DeepLearning.AI",
      year: "2025",
      badgeColor: "from-pink-500 to-rose-600",
      description: "Advanced prompt design techniques, system formatting guidelines, and chaining logic for highly accurate LLM outputs."
    }
  },
  {
    id: "c_3",
    type: "certification",
    data: {
      id: "c_3",
      title: "TATA Data Analytics Certification",
      issuer: "TATA Group / Forage",
      year: "2025",
      badgeColor: "from-blue-500 to-indigo-600",
      description: "Data preparation, exploratory analysis, performance metrics visualization, and corporate dashboard designs."
    }
  },
  {
    id: "c_4",
    type: "certification",
    data: {
      id: "c_4",
      title: "Business Analysis Certification",
      issuer: "LinkedIn Learning",
      year: "2024",
      badgeColor: "from-teal-500 to-emerald-600",
      description: "Functional requirement gathering, workflow mapping, and translating corporate needs into robust system blueprints."
    }
  },
  {
    id: "c_5",
    type: "certification",
    data: {
      id: "c_5",
      title: "Professional Communication Skills",
      issuer: "NIT / Nalanda CSE",
      year: "2024",
      badgeColor: "from-purple-500 to-indigo-600",
      description: "Technical presentation, project management workflows, agile team communication, and mentoring standards."
    }
  },

  // SERVICES
  {
    id: "srv_1",
    type: "service",
    data: {
      id: "srv_1",
      title: "Full Stack Development",
      description: "End-to-end web deployment pairing complex database schemas with high-fidelity, secure backends and elegant responsive frontends.",
      iconName: "FullStack",
      skillsCovered: ["React.js", "Java", "Spring Boot", "MySQL", "MongoDB", "Auth & JWT"]
    }
  },
  {
    id: "srv_2",
    type: "service",
    data: {
      id: "srv_2",
      title: "MERN Stack Development",
      description: "Robust JavaScript software applications combining Document-Stores, Express routers, client-side rendering engines, and real-time sockets.",
      iconName: "Mern",
      skillsCovered: ["MongoDB", "Express.js", "React.js", "Node.js", "Real-time Sockets"]
    }
  },
  {
    id: "srv_3",
    type: "service",
    data: {
      id: "srv_3",
      title: "React Application Crafting",
      description: "Building responsive, beautiful state-driven client-side application layouts with smooth transitions, custom hooks, and strict rendering checks.",
      iconName: "React",
      skillsCovered: ["TypeScript", "Tailwind CSS", "Redux", "Framer Motion", "Modular UI"]
    }
  },
  {
    id: "srv_4",
    type: "service",
    data: {
      id: "srv_4",
      title: "Secure API Development",
      description: "Architecting high-performance restful interfaces incorporating relational/document database optimization, JWT authentication, and structured validation layers.",
      iconName: "Api",
      skillsCovered: ["Spring Boot Core", "RESTful Systems", "SQL Queries", "JSON Schema", "JWT Security"]
    }
  },
  {
    id: "srv_5",
    type: "service",
    data: {
      id: "srv_5",
      title: "AI Integrations",
      description: "Pairing conventional business applications with Large Language Models, Prompt engineering chains, and custom vector search utilities.",
      iconName: "AI",
      skillsCovered: ["OpenAI Prompting", "Spring AI Tools", "Gemini Node SDK", "Vector Workflows"]
    }
  },
  {
    id: "srv_6",
    type: "service",
    data: {
      id: "srv_6",
      title: "Website Development",
      description: "Engineering blazing fast responsive presentation layouts optimized for SEO, structured schema data, fast caching, and cross-browser consistency.",
      iconName: "Web",
      skillsCovered: ["SEO Optimizations", "Fluid Bento Grids", "HTML5 Semantics", "Vite Bundles"]
    }
  },

  // TESTIMONIALS
  {
    id: "t_1",
    type: "testimonial",
    data: {
      id: "t_1",
      name: "Rohan Das",
      role: "Lead Software Architect",
      company: "Labmentix Contracts Division",
      text: "Aditya displayed outstanding capabilities during his Full Stack internship. He single-handedly developed two MERN interfaces, showing great logic with DB schema optimization. His proactive approach and clean modular styling exceeded our expectations.",
      avatar: "https://picsum.photos/seed/rohan/100/100"
    }
  },
  {
    id: "t_2",
    type: "testimonial",
    data: {
      id: "t_2",
      name: "Sneha Mohanty",
      role: "Senior Consultant",
      company: "ExcelR Internships Program",
      text: "An exceptionally fast learner who engineered secure backend endpoints with ease. Aditya's mastery over Java Spring Boot and his discipline with REST guidelines was impressive. He is ready for highly complex software roles.",
      avatar: "https://picsum.photos/seed/sneha/100/100"
    }
  },
  {
    id: "t_3",
    type: "testimonial",
    data: {
      id: "t_3",
      name: "Dr. P. K. Sahu",
      role: "Head of Computer Science",
      company: "Nalanda Institute of Technology",
      text: "Aditya is an exemplary student, topping his CSE department batch with the highest academic marks. As our Tech Club Coordinator, he successfully hosted technical seminars, mentored dozens of juniors in full-stack engineering, and proved himself as an excellent team leader.",
      avatar: "https://picsum.photos/seed/pksahu/100/100"
    }
  }
];

// Helper to seed local file if empty
function seedLocalPortfolioIfEmpty() {
  const current = readLocalPortfolio();
  if (current.length === 0) {
    writeLocalPortfolio(defaultPortfolioItems);
  }
}

// Helper to seed MongoDB if connected and empty
async function seedMongoPortfolioIfEmpty() {
  try {
    const count = await PortfolioItemModel.countDocuments();
    if (count === 0) {
      console.log("Seeding default portfolio items to MongoDB...");
      await PortfolioItemModel.insertMany(defaultPortfolioItems);
      console.log("Seeding portfolio completed successfully!");
    }
  } catch (err) {
    console.error("Failed to seed MongoDB portfolio items:", err);
  }
}

// 3. Database State Manager
let isMongoConnected = false;
let hasAttemptedConnection = false;
let isConnecting = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (!hasAttemptedConnection) {
      console.warn("⚠️ MONGODB_URI is not defined. Falling back to local file-based database.");
      hasAttemptedConnection = true;
      seedLocalPortfolioIfEmpty();
    }
    isMongoConnected = false;
    return false;
  }

  if (isMongoConnected) return true;

  if (hasAttemptedConnection && !isMongoConnected) {
    // Fail-fast if previous attempt failed, avoiding continuous blockages
    return false;
  }

  if (isConnecting) {
    return false;
  }

  isConnecting = true;
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Fail-fast within 2.5s instead of waiting 10s
    });
    isMongoConnected = true;
    hasAttemptedConnection = true;
    isConnecting = false;
    console.log("🚀 MongoDB connected successfully!");
    
    // Seed MongoDB
    await seedMongoPortfolioIfEmpty();
    return true;
  } catch (err: any) {
    console.error("❌ MongoDB connection error, falling back to local database:", err?.message || err);
    isMongoConnected = false;
    hasAttemptedConnection = true;
    isConnecting = false;
    seedLocalPortfolioIfEmpty();
    return false;
  }
}

// Check database mode
export function getDbMode() {
  return isMongoConnected ? "MongoDB" : "Local Database (JSON)";
}

// 4. Abstract Database Handlers (Seamless Switch between MongoDB and File-System)
export async function saveInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const isConnected = await connectDB();

  if (isConnected) {
    try {
      const newInquiry = new InquiryModel(data);
      const saved = await newInquiry.save();
      // Map to plain object matching local format for API stability
      return {
        id: saved._id.toString(),
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        subject: saved.subject,
        message: saved.message,
        replied: saved.replied,
        createdAt: saved.createdAt.toISOString(),
      };
    } catch (err) {
      console.error("Failed to save to MongoDB, falling back to local file store:", err);
    }
  }

  // Fallback to local file store
  const localList = readLocalSubmissions();
  const newInquiry = {
    id: "inq_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    subject: data.subject,
    message: data.message,
    replied: false,
    createdAt: new Date().toISOString(),
  };
  localList.push(newInquiry);
  writeLocalSubmissions(localList);
  return newInquiry;
}

export async function getAllInquiries() {
  const isConnected = await connectDB();

  if (isConnected) {
    try {
      const results = await InquiryModel.find().sort({ createdAt: -1 });
      return results.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        email: r.email,
        phone: r.phone,
        subject: r.subject,
        message: r.message,
        replied: r.replied,
        createdAt: r.createdAt.toISOString(),
      }));
    } catch (err) {
      console.error("Failed to retrieve from MongoDB, returning local store logs:", err);
    }
  }

  // Fallback
  const localList = readLocalSubmissions();
  localList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return localList;
}

export async function toggleReplyStatus(id: string) {
  const isConnected = await connectDB();

  if (isConnected && mongoose.isValidObjectId(id)) {
    try {
      const item = await (InquiryModel as any).findOne({ _id: id });
      if (item) {
        item.replied = !item.replied;
        const updated = await item.save();
        return {
          id: updated._id.toString(),
          name: updated.name,
          email: updated.email,
          phone: updated.phone,
          subject: updated.subject,
          message: updated.message,
          replied: updated.replied,
          createdAt: updated.createdAt.toISOString(),
        };
      }
    } catch (err) {
      console.error("MongoDB reply toggle failed, seeking local database:", err);
    }
  }

  // Fallback
  const localList = readLocalSubmissions();
  const index = localList.findIndex((s) => s.id === id);
  if (index !== -1) {
    localList[index].replied = !localList[index].replied;
    writeLocalSubmissions(localList);
    return localList[index];
  }
  return null;
}

export async function deleteInquiryItem(id: string) {
  const isConnected = await connectDB();

  if (isConnected && mongoose.isValidObjectId(id)) {
    try {
      const result = await (InquiryModel as any).findOneAndDelete({ _id: id });
      if (result) return true;
    } catch (err) {
      console.error("MongoDB delete failed, seeking local database:", err);
    }
  }

  // Fallback
  let localList = readLocalSubmissions();
  const initialLength = localList.length;
  localList = localList.filter((s) => s.id !== id);
  if (localList.length < initialLength) {
    writeLocalSubmissions(localList);
    return true;
  }
  return false;
}

// PORTFOLIO MANAGERS
export async function getPortfolioItems(type?: string): Promise<IPortfolioItem[]> {
  const isConnected = await connectDB();

  if (isConnected) {
    try {
      const filter: any = type ? { type } : {};
      const results = await PortfolioItemModel.find(filter);
      if (results.length > 0) {
        return results.map((r) => ({
          id: r.id,
          type: r.type,
          data: r.data
        }));
      }
      // If DB is empty, run seed and fetch again
      await seedMongoPortfolioIfEmpty();
      const resultsRetry = await PortfolioItemModel.find(filter);
      return resultsRetry.map((r) => ({
        id: r.id,
        type: r.type,
        data: r.data
      }));
    } catch (err) {
      console.error("MongoDB getPortfolioItems failed, seeking local file:", err);
    }
  }

  // Fallback
  seedLocalPortfolioIfEmpty();
  const localList = readLocalPortfolio();
  if (type) {
    return localList.filter((item) => item.type === type);
  }
  return localList;
}

export async function savePortfolioItem(type: string, data: any): Promise<IPortfolioItem> {
  const isConnected = await connectDB();
  const newId = data.id || `${type.slice(0, 3)}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const itemData = { ...data, id: newId };
  
  const newItem: IPortfolioItem = {
    id: newId,
    type,
    data: itemData
  };

  if (isConnected) {
    try {
      const created = new PortfolioItemModel(newItem);
      await created.save();
      return newItem;
    } catch (err) {
      console.error("MongoDB savePortfolioItem failed, falling back to local:", err);
    }
  }

  // Fallback
  seedLocalPortfolioIfEmpty();
  const localList = readLocalPortfolio();
  localList.push(newItem);
  writeLocalPortfolio(localList);
  return newItem;
}

export async function updatePortfolioItem(type: string, id: string, data: any): Promise<IPortfolioItem | null> {
  const isConnected = await connectDB();
  const updatedData = { ...data, id }; // Ensure id is preserved

  if (isConnected) {
    try {
      const updated = await PortfolioItemModel.findOneAndUpdate(
        { id } as any,
        { data: updatedData } as any,
        { new: true } as any
      ) as any;
      if (updated) {
        return {
          id: updated.id,
          type: updated.type,
          data: updated.data
        };
      }
    } catch (err) {
      console.error("MongoDB updatePortfolioItem failed, falling back to local:", err);
    }
  }

  // Fallback
  seedLocalPortfolioIfEmpty();
  const localList = readLocalPortfolio();
  const idx = localList.findIndex((item) => item.id === id);
  if (idx !== -1) {
    localList[idx].data = updatedData;
    writeLocalPortfolio(localList);
    return localList[idx];
  }
  return null;
}

export async function deletePortfolioItem(type: string, id: string): Promise<boolean> {
  const isConnected = await connectDB();

  if (isConnected) {
    try {
      const result = await PortfolioItemModel.findOneAndDelete({ id } as any);
      if (result) return true;
    } catch (err) {
      console.error("MongoDB deletePortfolioItem failed, falling back to local:", err);
    }
  }

  // Fallback
  seedLocalPortfolioIfEmpty();
  const localList = readLocalPortfolio();
  const filtered = localList.filter((item) => item.id !== id);
  if (filtered.length < localList.length) {
    writeLocalPortfolio(filtered);
    return true;
  }
  return false;
}
