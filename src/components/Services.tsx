import { useState, useEffect } from "react";
import { Code2, Layers, Cpu, Radio, ShieldCheck, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { Service } from "../types";

const staticBackupServices: Service[] = [
  {
    title: "Full Stack Development",
    description: "End-to-end web deployment pairing complex database schemas with high-fidelity, secure backends and elegant responsive frontends.",
    iconName: "FullStack",
    skillsCovered: ["React.js", "Java", "Spring Boot", "MySQL", "MongoDB", "Auth & JWT"],
  },
  {
    title: "MERN Stack Development",
    description: "Robust JavaScript software applications combining Document-Stores, Express routers, client-side rendering engines, and real-time sockets.",
    iconName: "Mern",
    skillsCovered: ["MongoDB", "Express.js", "React.js", "Node.js", "Real-time Sockets"],
  },
  {
    title: "React Application Crafting",
    description: "Building responsive, beautiful state-driven client-side application layouts with smooth transitions, custom hooks, and strict rendering checks.",
    iconName: "React",
    skillsCovered: ["TypeScript", "Tailwind CSS", "Redux", "Framer Motion", "Modular UI"],
  },
  {
    title: "Secure API Development",
    description: "Architecting high-performance restful interfaces incorporating relational/document database optimization, JWT authentication, and structured validation layers.",
    iconName: "Api",
    skillsCovered: ["Spring Boot Core", "RESTful Systems", "SQL Queries", "JSON Schema", "JWT Security"],
  },
  {
    title: "AI Integrations",
    description: "Pairing conventional business applications with Large Language Models, Prompt engineering chains, and custom vector search utilities.",
    iconName: "AI",
    skillsCovered: ["OpenAI Prompting", "Spring AI Tools", "Gemini Node SDK", "Vector Workflows"],
  },
  {
    title: "Website Development",
    description: "Engineering blazing fast responsive presentation layouts optimized for SEO, structured schema data, fast caching, and cross-browser consistency.",
    iconName: "Web",
    skillsCovered: ["SEO Optimizations", "Fluid Bento Grids", "HTML5 Semantics", "Vite Bundles"],
  },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(staticBackupServices);

  useEffect(() => {
    fetch("/api/portfolio/service")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((items: any[]) => {
        if (items && items.length > 0) {
          setServices(items.map(it => it.data));
        }
      })
      .catch((err) => console.log("Services loaded from static backup"));
  }, []);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "FullStack": return <Code2 className="w-6 h-6 text-indigo-500" />;
      case "Mern": return <Layers className="w-6 h-6 text-purple-500" />;
      case "React": return <Monitor className="w-6 h-6 text-cyan-500" />;
      case "Api": return <Radio className="w-6 h-6 text-emerald-500" />;
      case "AI": return <Cpu className="w-6 h-6 text-pink-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-blue-500" />;
    }
  };

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
    <section id="services" className="py-24 px-4 relative z-10 select-none">
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
            <Code2 className="w-3.5 h-3.5" />
            Specialties
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Professional <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Bespoke engineering solutions covering high-integrity software pipelines, microservices, and design systems.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-slate-950/60 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between space-y-6 group hover:shadow-2xl hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <span className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {getServiceIcon(srv.iconName)}
                </span>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors duration-200 leading-snug">{srv.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{srv.description}</p>
                </div>
              </div>

              {/* Tag shelf */}
              <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-800">
                {srv.skillsCovered.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono bg-sky-500/5 text-sky-500 dark:text-sky-300 border border-sky-500/10 px-2.5 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
