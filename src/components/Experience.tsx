import { useState, useEffect } from "react";
import { Briefcase, Calendar, MapPin, Award, Shield, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Experience } from "../types";

const staticBackupExperiences: Experience[] = [
  {
    id: "exp_1",
    role: "Full Stack Java Developer (Intern)",
    company: "Labmentix",
    location: "Bangalore, India",
    period: "Sep 2025 - Mar 2026",
    isInternship: true,
    description: [
      "Engineered and deployed 5+ full-stack web applications using MERN Stack and Java Spring Boot, delivering scalable, production-ready solutions for real-world client projects.",
      "Built responsive, accessible UIs using React.js and Tailwind CSS, reducing reported UI bugs by collaborating closely with QA teams.",
      "Designed and consumed RESTful APIs integrated with MongoDB and MySQL databases, improving data retrieval efficiency through optimized query design.",
    ],
    skills: ["Java", "Spring Boot", "React.js", "Express.js", "MongoDB", "MySQL", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp_2",
    role: "Full Stack Java Developer (Intern)",
    company: "ExcelR",
    location: "Bangalore, India",
    period: "Jul 2025 - Nov 2025",
    isInternship: true,
    description: [
      "Developed enterprise-grade full-stack applications using Java, Spring Boot, React.js, and MySQL, focusing on scalable architecture and high-performance output.",
      "Built and tested 10+ RESTful API endpoints with proper authentication (JWT) and error handling, ensuring secure and reliable data exchange.",
    ],
    skills: ["Java", "Spring Boot", "Spring Core", "React.js", "MySQL", "REST APIs", "JWT Security"],
  },
];

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>(staticBackupExperiences);

  useEffect(() => {
    fetch("/api/portfolio/experience")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((items: any[]) => {
        if (items && items.length > 0) {
          setExperiences(items.map(it => it.data));
        }
      })
      .catch((err) => console.log("Experiences loaded from static backup"));
  }, []);

  const achievements = [
    {
      title: "Academic Excellence Rank #1",
      desc: "Ranked #1 in the Computer Science & Engineering Department with the highest SGPA in the graduating batch.",
      metric: "CSE Top Topper",
    },
    {
      title: "15+ Deployed Web Assets",
      desc: "Independently launched and provisioned 15+ complex production-grade software applications across Vercel, Netlify, and Github Pages.",
      metric: "Independent Architect",
    },
    {
      title: "Tech Club Coordinator",
      desc: "Coordinated local engineering symposiums, hosted 10+ MERN & Spring workshops for 100+ students, and mentored 50+ junior devs.",
      metric: "Developer Mentor",
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
    <section id="experience" className="py-24 px-4 relative z-10 select-none bg-slate-950/20">
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
            <Briefcase className="w-3.5 h-3.5" />
            Background
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Hands-on developer tenure spanning enterprise internships, mentor coordination, and active product creation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Work experience timeline (Left Column) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-white mb-2 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-sky-400" />
              Internship Timeline
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="bg-slate-950/60 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl space-y-4 hover:border-sky-500/30 transition-all duration-300 relative group"
                >
                  {/* Glowing border node */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-500 rounded-l-2xl group-hover:scale-y-110 transition-transform duration-300" />

                  {/* Header metadata */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-bold text-white">{exp.role}</span>
                        <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/25 px-2 py-0.5 rounded font-mono font-bold tracking-wide uppercase">
                          Internship
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-slate-400 font-mono">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-slate-500 font-mono gap-1.5 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description bullets */}
                  <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags footer */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 py-1 px-2.5 rounded-lg transition-colors duration-200 hover:border-sky-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Key accomplishments (Right Column) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-white mb-2 flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-amber-500" />
              Achievements
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 gap-4"
            >
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-3 hover:border-sky-500/25 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-sky-400 uppercase bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded">
                      {ach.metric}
                    </span>
                    <Shield className="w-4.5 h-4.5 text-sky-400" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-wide">{ach.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{ach.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
