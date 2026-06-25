import { GraduationCap, Briefcase, Heart, Target, Sparkles, Milestone } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const journey = [
    {
      year: "2022 - 2026",
      title: "Bachelor of Technology in CSE",
      institution: "Nalanda Institute of Technology, Bhubaneswar",
      desc: "Ranked #1 in the CSE Department with the Highest SGPA in the batch. Served as Tech Club Coordinator, conducting workshops for 100+ students and mentoring 50+ juniors in MERN Stack and AI development.",
      icon: <GraduationCap className="w-5 h-5" />,
      type: "education",
    },
    {
      year: "Jul 2025 - Nov 2025",
      title: "Full Stack Java Developer (Intern)",
      institution: "ExcelR",
      desc: "Architected enterprise-grade full-stack applications using Java, Spring Boot, React, and MySQL. Tested and built 10+ RESTful API endpoints with JWT authentication and proper validation.",
      icon: <Briefcase className="w-5 h-5" />,
      type: "experience",
    },
    {
      year: "Sep 2025 - Mar 2026",
      title: "Full Stack Developer (Intern)",
      institution: "Labmentix",
      desc: "Engineered and deployed 5+ robust full-stack web platforms using MERN Stack and Spring Boot for client contracts. Crafted responsive UIs, optimized MongoDB queries, and worked on real-world systems.",
      icon: <Briefcase className="w-5 h-5" />,
      type: "experience",
    },
    {
      year: "May 2026 - Present",
      title: "ScamShield Security Architect",
      institution: "AI Fraud Protection Platform",
      desc: "Developing an AI-powered pattern recognition tool identifying fraudulent links, mock accounts, and phishing activity in real-time, providing deep security layers for local browsers.",
      icon: <Target className="w-5 h-5" />,
      type: "milestone",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 px-4 relative z-10 select-none">
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
            <Milestone className="w-3.5 h-3.5" />
            My Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            About <span className="gradient-text">Aditya Kumar</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Learn more about my professional background, academic milestones, and engineering philosophy.
          </p>
        </motion.div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed Biography Cards (Left Column) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            {/* Real Professional Profile Picture Card */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  {/* Glowing Ring */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-75 blur-sm animate-pulse" />
                  <img
                    src="https://github.com/adityakumarsahoo.png"
                    alt="Aditya Kumar Sahoo"
                    referrerPolicy="no-referrer"
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://picsum.photos/seed/aditya/300/300";
                    }}
                  />
                  {/* Active Status Badge */}
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </span>
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">Aditya Kumar Sahoo</h3>
                  <p className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">Full Stack & AI Engineer</p>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Based in Odisha, India. Ranked #1 at Nalanda Institute of Technology. Enthusiastic about high-throughput backends and AI-augmented tools.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-sky-400" />
                Who I Am
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I am a highly motivated Full Stack Developer based in India, specializing in Java and the modern MERN Stack. With a deep interest in software architecture and artificial intelligence, I strive to design applications that combine performance, elegant visual interfaces, and security.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                As a Computer Science graduate topper, I have paired solid engineering theory with continuous hands-on project creation—delivering 15+ live web assets independently.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Professional Goals
              </h3>
              <ul className="space-y-3.5 text-slate-400 text-sm leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                  <span>Build high-throughput backend APIs with robust security standards like JWT, Spring Security, and encrypted DB queries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                  <span>Integrate Large Language Models (LLMs) and cognitive AI capabilities into conventional user tools for smarter interactions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                  <span>Mentor upcoming developers and lead engineering squads that foster technical excellence and clean agile practices.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Timeline representation (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 bg-slate-950/40 border border-slate-800 p-6 md:p-8 rounded-3xl text-left"
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Career Journey & Academic Milestones
            </h3>

            <div className="relative border-l border-slate-800 pl-6 sm:pl-8 space-y-10">
              {journey.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline bullet */}
                  <span className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-sky-500/80 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow shadow-sky-500/20">
                    {item.icon}
                  </span>

                  {/* Journey details */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-sky-400 uppercase bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors duration-200">
                      {item.title}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400 font-mono block">
                      {item.institution}
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
