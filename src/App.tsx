import { useState, useEffect } from "react";
import { Sun, Moon, Sparkles, Menu, X, ArrowUp, Code2, ShieldCheck, Cpu, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Canvas3D from "./components/Canvas3D";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ExperienceSection from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import AIAssistant from "./components/AIAssistant";
import AdminDashboard from "./components/AdminDashboard";
import Loader from "./components/Loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Animated Statistics Stats
  const stats = [
    { value: "15+", label: "Deployed Apps", desc: "Live web builds" },
    { value: "2+", label: "Internships Completed", desc: "Enterprise experience" },
    { value: "#1", label: "CSE Batch Rank", desc: "Academic topper" },
    { value: "100+", label: "Workshop Attendees", desc: "Tech Club Coordinator" },
  ];

  useEffect(() => {
    // Handle dark mode class on document element
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Back to top visible threshold
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Credentials" },
    { id: "services", label: "Services" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const handleScrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 select-none bg-[#050505] text-white`}>
      
      {/* Mesh background ambient radial gradients for Sleek Interface */}
      {isDarkMode && <div className="mesh-bg" />}

      {/* Interactive Canvas Particle constellator background */}
      <Canvas3D isDarkMode={isDarkMode} />

      {/* Custom lagging physics cursor */}
      <CustomCursor />

      {/* Floating Smart Assistant */}
      <AIAssistant />

      {/* Scroll Progress Bar Indicator (Top Edge) */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header Bar */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-slate-950/75 backdrop-blur-md border-b border-slate-900/60 z-40 flex items-center justify-between px-6 sm:px-12">
        {/* Brand Logo */}
        <button
          onClick={() => handleScrollToSection("home")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 p-[1.5px] flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <img
              src="https://github.com/adityakumarsahoo.png"
              alt="Aditya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-[10px]"
              onError={(e) => {
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  parent.innerHTML = "A";
                  parent.className = "w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-black shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300";
                }
              }}
            />
          </div>
          <div className="text-left leading-none">
            <span className="text-sm font-black tracking-tight block text-white group-hover:text-indigo-400 transition-colors">Aditya Sahoo</span>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mt-0.5">Full Stack DEV</span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollToSection(link.id)}
              className="text-xs font-bold uppercase tracking-widest font-mono text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggler */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 cursor-pointer transition-all duration-300 shadow-sm"
            title={isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Secure Admin Portal Entry */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/30 text-indigo-400 hover:text-white cursor-pointer transition-all duration-300 shadow-sm flex items-center justify-center"
            title="Access Secure Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 cursor-pointer transition-all duration-300 shadow-sm lg:hidden"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu Sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 inset-x-0 bg-slate-950 border-b border-slate-900 z-30 shadow-2xl overflow-hidden lg:hidden flex flex-col p-6 space-y-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollToSection(link.id)}
                className="text-left py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-left py-2 font-mono text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-2 border-t border-slate-900 pt-4"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Sections container */}
      <main className="relative z-10 w-full pt-20">
        
        {/* HERO INTRO */}
        <Hero
          onHireMeClick={() => handleScrollToSection("contact")}
          onViewResumeClick={() => handleScrollToSection("resume")}
        />

        {/* STATISTICS STRIP COUNTER SECTION (Sits right after Hero) */}
        <section className="py-12 px-4 relative z-10 select-none">
          <div className="w-full max-w-7xl mx-auto bg-slate-950/60 border border-slate-800 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {stats.map((item, idx) => (
              <div key={idx} className="text-center space-y-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 block">
                  {item.value}
                </span>
                <span className="text-xs font-bold text-white block uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT TIMELINE */}
        <About />

        {/* SKILLS */}
        <Skills />

        {/* EXPERIENCE */}
        <ExperienceSection />

        {/* PROJECTS */}
        <Projects />

        {/* CERTIFICATIONS */}
        <Certifications />

        {/* SERVICES */}
        <Services />

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* RESUME VIEW */}
        <Resume />

        {/* CONTACT SHEET */}
        <Contact onOpenAdminDashboard={() => setIsAdminOpen(true)} />

      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-900 bg-slate-950/40 backdrop-blur py-12 px-6 text-center select-none z-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs sm:text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-[10px]">A</span>
            <span className="font-bold text-white">Aditya Kumar Sahoo © 2026</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors">LinkedIn</a>
            <a href="mailto:toadityakumarsahoo@gmail.com" className="hover:text-indigo-500 transition-colors">Email</a>
          </div>

          <p className="text-[10px] text-slate-400">Designed with sleek futuristic parameters.</p>
        </div>
      </footer>

      {/* Back to Top button floating trigger */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 cursor-pointer rounded-xl transition-all shadow-xl hover:shadow-indigo-500/10 active:scale-95"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ADMINISTRATOR INQUIRIES VAULT DIALOG PANEL */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  </>
  );
}
