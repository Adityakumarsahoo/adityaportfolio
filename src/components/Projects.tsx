import React, { useState, useEffect } from "react";
import { FolderGit, ExternalLink, Github, CheckCircle, HelpCircle, X, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

const staticBackupProjects: Project[] = [
  {
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
    image: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)", // Blue Deep
  },
  {
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
    image: "linear-gradient(135deg, #0f766e 0%, #022c22 100%)", // Teal Deep
  },
  {
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
    image: "linear-gradient(135deg, #be185d 0%, #500724 100%)", // Rose Deep
  },
  {
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
    image: "linear-gradient(135deg, #5b21b6 0%, #1e1b4b 100%)", // Violet Deep
  },
  {
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
    image: "linear-gradient(135deg, #115e59 0%, #0c2d27 100%)", // Emerald Deep
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [projectsList, setProjectsList] = useState<Project[]>(staticBackupProjects);

  useEffect(() => {
    fetch("/api/portfolio/project")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((items: any[]) => {
        if (items && items.length > 0) {
          setProjectsList(items.map(it => it.data));
        }
      })
      .catch((err) => console.log("Projects loaded from static backup"));
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative z-10 select-none">
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono rounded-full font-medium tracking-wide uppercase">
            <FolderGit className="w-3.5 h-3.5" />
            My Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Detailed breakdown of production-ready full stack systems and responsive architectures.
          </p>
        </motion.div>

        {/* Projects Grid with Staggered children */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsList.map((project) => {
            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const xc = rect.width / 2;
              const yc = rect.height / 2;
              // Limit rotation angles for elegant tilt
              const rotX = -((y - yc) / yc) * 10;
              const rotY = ((x - xc) / xc) * 10;
              card.style.setProperty("--rotX", `${rotX}deg`);
              card.style.setProperty("--rotY", `${rotY}deg`);
              card.style.setProperty("--glow-x", `${x}px`);
              card.style.setProperty("--glow-y", `${y}px`);
            };

            const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget;
              card.style.setProperty("--rotX", "0deg");
              card.style.setProperty("--rotY", "0deg");
            };

            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                key={project.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: "perspective(1000px) rotateX(var(--rotX, 0deg)) rotateY(var(--rotY, 0deg))",
                  transition: "transform 0.1s ease, border-color 0.3s ease",
                }}
                className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col hover:border-sky-500/40 relative group cursor-pointer transition-all duration-300 transform-gpu"
              >
                {/* Radial Spotlight Highlight Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle 200px at var(--glow-x, 0px) var(--glow-y, 0px), rgba(0, 212, 255, 0.12), transparent)"
                  }}
                />

                {/* Neon Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Project Card Header Illustration with custom gradients */}
                <div
                  className="h-44 w-full relative p-6 flex flex-col justify-between overflow-hidden"
                  style={{ background: project.image }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Tech icon category label */}
                  <span className="self-start text-[9px] font-mono font-bold uppercase bg-black/40 backdrop-blur text-sky-400 px-2.5 py-1 rounded border border-sky-500/20 z-10">
                    {project.category}
                  </span>

                  <div className="space-y-1 text-left z-10">
                    <h4 className="text-lg font-extrabold text-white leading-snug drop-shadow-md font-sans tracking-tight">
                      {project.title.split(" ")[0]} Project
                    </h4>
                    <p className="text-[10px] text-sky-300/80 font-mono font-semibold">SYS_INDEX: {project.id}</p>
                  </div>

                  {/* Abstract graphic mockup wireframe representing full stack */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-25 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none w-28 h-20 z-10">
                    <svg viewBox="0 0 100 80" className="w-full h-full fill-none stroke-sky-400" strokeWidth="1">
                      <rect x="5" y="5" width="90" height="50" rx="3" />
                      <line x1="5" y1="45" x2="95" y2="45" />
                      <circle cx="15" cy="50" r="2" />
                      <circle cx="25" cy="50" r="2" />
                      <rect x="40" y="55" width="20" height="15" />
                      <line x1="30" y1="70" x2="70" y2="70" />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4 z-10 bg-slate-950/80">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-400 leading-snug font-sans transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology list tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-300 py-0.5 px-2 rounded-md hover:border-sky-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[9px] font-mono text-sky-400 font-semibold bg-sky-500/5 px-2 py-0.5 rounded-md">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card Action Controls */}
                  <div className="flex items-center justify-between border-t border-slate-900 pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-sky-400 hover:text-sky-300 cursor-pointer flex items-center gap-1 hover:underline"
                    >
                      View Specs & Case
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 text-slate-400 hover:text-sky-400 cursor-pointer transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 text-slate-400 hover:text-sky-400 cursor-pointer transition-colors"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed specs sheet overlay / Side Drawer dialog */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setCarouselIndex(0);
                  }}
                  className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Body Content */}
                <div className="space-y-6 text-left">
                  {/* Title & Tag */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20">
                        {selectedProject.category}
                      </span>
                      <span className="text-xs text-sky-300 font-mono font-medium">SYS_ID: {selectedProject.id}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* HIGH-TECH PREVIEW CAROUSEL */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      SYSTEM ARCHITECTURE PREVIEWS (Carousel)
                    </span>
                    <div className="relative h-48 w-full bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between p-5">
                      {/* Grid background on carousel */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      
                      {carouselIndex === 0 && (
                        <div className="z-10 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                              VISUAL PREVIEW 01 / HUD VIEW
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400">● LIVE CONNECTION</span>
                          </div>
                          
                          <div className="space-y-1.5 py-4">
                            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                              Interactive Dashboard Analytics HUD
                            </div>
                            <p className="text-[11px] text-slate-400 max-w-md">
                              Real-time metrics visualizer with canvas charting, lazy state binding, and custom theme layouts.
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <div className="h-1 w-8 rounded bg-sky-400" />
                            <div className="h-1 w-8 rounded bg-slate-800" />
                            <div className="h-1 w-8 rounded bg-slate-800" />
                          </div>
                        </div>
                      )}

                      {carouselIndex === 1 && (
                        <div className="z-10 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                              VISUAL PREVIEW 02 / AUTH ROUTING
                            </span>
                            <span className="text-[9px] font-mono text-purple-400">● SECURE CLOUD GATEWAY</span>
                          </div>

                          <div className="space-y-1.5 py-4">
                            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                              Secure REST API & JWT Middleware
                            </div>
                            <p className="text-[11px] text-slate-400 max-w-md">
                              Endpoint privilege verification layers mapping user identities onto database access tokens.
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <div className="h-1 w-8 rounded bg-slate-800" />
                            <div className="h-1 w-8 rounded bg-purple-400" />
                            <div className="h-1 w-8 rounded bg-slate-800" />
                          </div>
                        </div>
                      )}

                      {carouselIndex === 2 && (
                        <div className="z-10 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                              VISUAL PREVIEW 03 / DATABASE MATRIX
                            </span>
                            <span className="text-[9px] font-mono text-cyan-400">● IN-MEMORY CACHING ACTIVE</span>
                          </div>

                          <div className="space-y-1.5 py-4">
                            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                              Optimized High-Throughput Storage Layer
                            </div>
                            <p className="text-[11px] text-slate-400 max-w-md">
                              Atomic database clustering queries preventing duplicate reservations and bottleneck latencies.
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <div className="h-1 w-8 rounded bg-slate-800" />
                            <div className="h-1 w-8 rounded bg-slate-800" />
                            <div className="h-1 w-8 rounded bg-cyan-400" />
                          </div>
                        </div>
                      )}

                      {/* Navigation Carousel arrows */}
                      <div className="absolute right-4 bottom-4 flex items-center gap-1.5 z-20">
                        <button
                          onClick={() => setCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))}
                          className="p-1 px-2 text-[10px] font-mono bg-slate-950 border border-slate-800 hover:border-sky-500/50 rounded text-slate-400 hover:text-white cursor-pointer active:scale-95"
                        >
                          &lt; PREV
                        </button>
                        <button
                          onClick={() => setCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))}
                          className="p-1 px-2 text-[10px] font-mono bg-slate-950 border border-slate-800 hover:border-sky-500/50 rounded text-slate-400 hover:text-white cursor-pointer active:scale-95"
                        >
                          NEXT &gt;
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Core Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                      Key Capabilities & Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case study challenge solved */}
                  <div className="p-4 bg-sky-950/20 border border-sky-500/10 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-sky-400" />
                      Challenge Solved
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selectedProject.challengesSolved}
                    </p>
                  </div>

                  {/* Specs footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-900">
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 py-0.5 px-2 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 text-slate-300 hover:text-sky-400 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" /> Repo
                      </a>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 hover:opacity-90 text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10"
                      >
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
