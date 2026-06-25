import { useState, useEffect } from "react";
import { Award, ShieldAlert, Sparkles, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Certification } from "../types";

const staticBackupCertifications: Certification[] = [
  {
    title: "Oracle Certified - AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    badgeColor: "from-red-500 to-amber-600",
    description: "Core AI concepts including machine learning, neural networks, deep learning, and intelligent system designs.",
  },
  {
    title: "Certified Prompt Engineering & Programming",
    issuer: "OpenAI & DeepLearning.AI",
    year: "2025",
    badgeColor: "from-pink-500 to-rose-600",
    description: "Advanced prompt design techniques, system formatting guidelines, and chaining logic for highly accurate LLM outputs.",
  },
  {
    title: "TATA Data Analytics Certification",
    issuer: "TATA Group / Forage",
    year: "2025",
    badgeColor: "from-blue-500 to-indigo-600",
    description: "Data preparation, exploratory analysis, performance metrics visualization, and corporate dashboard designs.",
  },
  {
    title: "Business Analysis Certification",
    issuer: "LinkedIn Learning",
    year: "2024",
    badgeColor: "from-teal-500 to-emerald-600",
    description: "Functional requirement gathering, workflow mapping, and translating corporate needs into robust system blueprints.",
  },
  {
    title: "Professional Communication Skills",
    issuer: "NIT / Nalanda CSE",
    year: "2024",
    badgeColor: "from-purple-500 to-indigo-600",
    description: "Technical presentation, project management workflows, agile team communication, and mentoring standards.",
  },
];

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>(staticBackupCertifications);

  useEffect(() => {
    fetch("/api/portfolio/certification")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((items: any[]) => {
        if (items && items.length > 0) {
          setCertifications(items.map(it => it.data));
        }
      })
      .catch((err) => console.log("Certifications loaded from static backup"));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="certifications" className="py-24 px-4 relative z-10 bg-slate-900/5 dark:bg-slate-950/10">
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
            <Trophy className="w-3.5 h-3.5" />
            Credentials
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Verified academic credentials, engineering certifications, and corporate analyst specifications.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4 hover:border-sky-500/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Badge Header */}
                <div className="flex justify-between items-start">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-r ${cert.badgeColor} flex items-center justify-center text-white shadow-md`}>
                    <Award className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {cert.year}
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug">{cert.title}</h3>
                  <span className="text-xs font-semibold text-sky-400 font-mono block uppercase tracking-wider">{cert.issuer}</span>
                </div>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 uppercase tracking-wider border-t border-slate-800 pt-3">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>Verified Certification ID</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
