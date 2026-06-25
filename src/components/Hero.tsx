import { useState, useEffect } from "react";
import { ArrowRight, Download, Mail, Linkedin, Github, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onHireMeClick: () => void;
  onViewResumeClick: () => void;
}

export default function Hero({ onHireMeClick, onViewResumeClick }: HeroProps) {
  const roles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Java Developer",
    "AI Enthusiast",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 40);
    } else {
      timer = window.setTimeout(() => {
        setDisplayText((prev) => currentRole.slice(0, prev.length + 1));
      }, 70);
    }

    if (!isDeleting && displayText === currentRole) {
      timer = window.setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden z-10 select-none">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
            Portfolio Website v2.0
          </motion.div>

          {/* Headline */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
            >
              Hi, I am <span className="gradient-text">Aditya Kumar</span>
            </motion.h1>

            {/* Role Changer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 md:h-12 flex items-center"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-mono text-slate-700 dark:text-slate-300 font-medium">
                {displayText}
                <span className="animate-pulse font-sans text-indigo-500 ml-1">|</span>
              </p>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
          >
            I build highly scalable, full-stack applications specializing in MERN Stack, Java Spring Boot, and AI-driven solutions. Batch topper in CSE and certified AI prompt engineer.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={onHireMeClick}
              className="px-6 py-3.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:opacity-90 text-white rounded-xl font-medium cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Hire Me Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewResumeClick}
              className="px-6 py-3.5 bg-slate-200 dark:bg-slate-950/40 dark:backdrop-blur-md hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 rounded-xl font-medium cursor-pointer transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-md"
          >
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Connect:</span>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-indigo-500/10 hover:text-indigo-500 dark:hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 cursor-pointer border border-slate-200 dark:border-slate-800/80 transition-all duration-300"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-indigo-500/10 hover:text-indigo-500 dark:hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 cursor-pointer border border-slate-200 dark:border-slate-800/80 transition-all duration-300"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="mailto:toadityakumarsahoo@gmail.com"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-indigo-500/10 hover:text-indigo-500 dark:hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 cursor-pointer border border-slate-200 dark:border-slate-800/80 transition-all duration-300"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side 3D Tech Hologram Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
          >
            {/* Cyber Scan Grid Background */}
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%) animate-pulse pointer-events-none" />

            {/* Glowing Orbit Rings */}
            <div className="absolute w-[110%] h-[110%] border border-indigo-500/10 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[120%] h-[120%] border border-dashed border-purple-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute w-[90%] h-[90%] border-2 border-indigo-500/5 rounded-full" />

            {/* Premium Cyber Glass Frame */}
            <div className="absolute inset-0 rounded-3xl bg-slate-500/5 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-2xl p-4 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40" />

              {/* Grid dots overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Custom Tech Hologram Portrait representing Aditya */}
              <div className="w-full h-full relative rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950/90 border border-slate-800/50 overflow-hidden flex flex-col justify-between p-5 items-center">
                
                {/* Header Info Lines */}
                <div className="w-full flex justify-between items-center z-10">
                  <div className="bg-slate-950/85 border border-slate-800/80 px-2.5 py-1 rounded text-[9px] font-mono text-indigo-400 shadow-md">
                    SYS: ADITYA_CORE
                  </div>
                  <div className="bg-slate-950/85 border border-slate-800/80 px-2.5 py-1 rounded text-[9px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    ENGINE ACTIVE
                  </div>
                </div>

                {/* Centered Glowing Hologram Circular Portrait */}
                <div className="relative my-auto flex items-center justify-center">
                  {/* Rotating outer sci-fi dashes */}
                  <div className="absolute w-[140px] h-[140px] sm:w-[190px] sm:h-[190px] border border-dashed border-indigo-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
                  {/* Outer breathing glow ring */}
                  <div className="absolute w-[130px] h-[130px] sm:w-[178px] sm:h-[178px] rounded-full bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 blur-md animate-pulse" />
                  
                  {/* Main circular image boundary */}
                  <div className="w-[115px] h-[115px] sm:w-[160px] sm:h-[160px] rounded-full border-[3px] border-slate-800/90 shadow-[0_0_25px_rgba(99,102,241,0.25)] relative overflow-hidden group-hover:border-indigo-500/50 transition-colors duration-500 z-10">
                    <img
                      src="https://github.com/adityakumarsahoo.png"
                      alt="Aditya Kumar Sahoo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-115"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://picsum.photos/seed/aditya/400/400";
                      }}
                    />
                  </div>

                  {/* Left Side Floating Tag */}
                  <div className="absolute -left-12 sm:-left-16 top-1/4 bg-slate-950/90 border border-indigo-500/30 px-2 py-1 rounded shadow-lg transform -rotate-6 z-20 text-[8px] sm:text-[9px] font-mono text-slate-300">
                    <div className="font-bold text-white">B.TECH CSE</div>
                    <div className="text-[7px] text-indigo-400">NIT ODISHA</div>
                  </div>

                  {/* Right Side Floating Tag */}
                  <div className="absolute -right-12 sm:-right-16 bottom-1/4 bg-slate-950/90 border border-purple-500/30 px-2 py-1 rounded shadow-lg transform rotate-3 z-20 text-[8px] sm:text-[9px] font-mono text-slate-300">
                    <div className="font-bold text-white">RANK #1</div>
                    <div className="text-[7px] text-purple-400">BATCH TOPPER</div>
                  </div>
                </div>

                {/* Bottom HUD Name & Role Console Card */}
                <div className="w-full relative z-10 space-y-1 text-center bg-slate-950/90 border border-slate-800/80 p-3 sm:p-3.5 rounded-xl shadow-xl">
                  <div className="text-[8px] sm:text-[9px] font-bold text-indigo-400 tracking-widest font-mono uppercase">Full Stack Architect</div>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-wide">Aditya Kumar Sahoo</h4>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-0.5">
                    <span className="text-[7px] sm:text-[8px] bg-slate-900 border border-slate-800 py-0.5 px-1.5 rounded text-slate-400 font-mono">MERN Stack</span>
                    <span className="text-[7px] sm:text-[8px] bg-slate-900 border border-slate-800 py-0.5 px-1.5 rounded text-slate-400 font-mono">Java Spring</span>
                    <span className="text-[7px] sm:text-[8px] bg-indigo-950/60 border border-indigo-500/20 py-0.5 px-1.5 rounded text-indigo-300 font-mono">AI Integrator</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
