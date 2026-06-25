import { useState, useEffect, useRef } from "react";
import { Star, Code, Layout, Database, ShieldAlert, Cpu, Hammer, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Skill } from "../types";

const staticBackupSkills: Skill[] = [
  // Languages
  { name: "Java", category: "Languages", level: 92, color: "from-red-500 to-amber-600", iconName: "Java" },
  { name: "Python", category: "Languages", level: 85, color: "from-blue-400 to-indigo-600", iconName: "Python" },
  { name: "C++", category: "Languages", level: 78, color: "from-sky-500 to-blue-700", iconName: "C++" },
  { name: "JavaScript", category: "Languages", level: 90, color: "from-yellow-400 to-amber-500", iconName: "JavaScript" },
  { name: "TypeScript", category: "Languages", level: 88, color: "from-blue-500 to-indigo-600", iconName: "TypeScript" },

  // Frontend
  { name: "React.js", category: "Frontend", level: 94, color: "from-cyan-400 to-blue-500", iconName: "React" },
  { name: "Redux", category: "Frontend", level: 82, color: "from-purple-500 to-indigo-700", iconName: "Redux" },
  { name: "HTML5", category: "Frontend", level: 95, color: "from-orange-500 to-red-600", iconName: "HTML5" },
  { name: "CSS3", category: "Frontend", level: 92, color: "from-blue-400 to-indigo-500", iconName: "CSS3" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, color: "from-teal-400 to-cyan-500", iconName: "Tailwind" },
  { name: "Bootstrap", category: "Frontend", level: 80, color: "from-purple-600 to-violet-800", iconName: "Bootstrap" },

  // Backend
  { name: "Node.js", category: "Backend", level: 88, color: "from-emerald-500 to-green-600", iconName: "Node" },
  { name: "Express.js", category: "Backend", level: 90, color: "from-slate-600 to-slate-800", iconName: "Express" },
  { name: "Spring Boot", category: "Backend", level: 85, color: "from-green-500 to-emerald-700", iconName: "SpringBoot" },
  { name: "Spring Core", category: "Backend", level: 80, color: "from-lime-500 to-green-600", iconName: "Spring" },

  // Databases
  { name: "MongoDB", category: "Databases", level: 88, color: "from-green-400 to-emerald-600", iconName: "MongoDB" },
  { name: "MySQL", category: "Databases", level: 85, color: "from-sky-500 to-blue-600", iconName: "MySQL" },
  { name: "SQL", category: "Databases", level: 86, color: "from-blue-600 to-indigo-800", iconName: "SQL" },

  // Tools
  { name: "Git", category: "Tools & DevOps", level: 90, color: "from-orange-600 to-red-700", iconName: "Git" },
  { name: "GitHub", category: "Tools & DevOps", level: 92, color: "from-slate-700 to-slate-950", iconName: "GitHub" },
  { name: "Docker", category: "Tools & DevOps", level: 75, color: "from-blue-500 to-sky-600", iconName: "Docker" },
  { name: "Postman", category: "Tools & DevOps", level: 88, color: "from-orange-400 to-orange-600", iconName: "Postman" },
  { name: "Vercel / Netlify", category: "Tools & DevOps", level: 85, color: "from-slate-800 to-slate-950", iconName: "Vercel" },

  // AI & Security
  { name: "Prompt Engineering", category: "AI & Security", level: 95, color: "from-pink-500 to-rose-600", iconName: "Prompt" },
  { name: "Spring AI", category: "AI & Security", level: 78, color: "from-emerald-400 to-green-500", iconName: "SpringAI" },
  { name: "JWT Security", category: "AI & Security", level: 86, color: "from-indigo-500 to-purple-600", iconName: "JWT" },
  { name: "REST APIs", category: "AI & Security", level: 92, color: "from-indigo-600 to-blue-600", iconName: "REST" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [skills, setSkills] = useState<Skill[]>(staticBackupSkills);

  useEffect(() => {
    fetch("/api/portfolio/skill")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((items: any[]) => {
        if (items && items.length > 0) {
          setSkills(items.map(it => it.data));
        }
      })
      .catch((err) => console.log("Skills loaded from static backup"));
  }, []);

  const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "Tools & DevOps", "AI & Security"];

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  // 3D Orbiting Spheres Logic
  const cloudContainerRef = useRef<HTMLDivElement | null>(null);
  const [orbitingSkills, setOrbitingSkills] = useState<any[]>([]);

  useEffect(() => {
    if (!skills || skills.length === 0) return;
    // Generate random orbits coordinates on sphere
    const items = skills.map((skill, index) => {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      // Radius of orbiting field
      const radius = 170;

      return {
        ...skill,
        originalX: radius * Math.sin(phi) * Math.cos(theta),
        originalY: radius * Math.sin(phi) * Math.sin(theta),
        originalZ: radius * Math.cos(phi),
        x: 0,
        y: 0,
        z: 0,
      };
    });
    setOrbitingSkills(items);
  }, [skills]);

  useEffect(() => {
    let angleX = 0.005;
    let angleY = 0.005;
    let animationFrameId: number;

    const rotateCloud = () => {
      setOrbitingSkills((prev) =>
        prev.map((item) => {
          // Rot X
          const cosX = Math.cos(angleX);
          const sinX = Math.sin(angleX);
          const y1 = item.originalY * cosX - item.originalZ * sinX;
          const z1 = item.originalY * sinX + item.originalZ * cosX;

          // Rot Y
          const cosY = Math.cos(angleY);
          const sinY = Math.sin(angleY);
          const x2 = item.originalX * cosY - z1 * sinY;
          const z2 = item.originalX * sinY + z1 * cosY;

          return {
            ...item,
            originalX: x2,
            originalY: y1,
            originalZ: z2,
            x: x2,
            y: y1,
            z: z2,
          };
        })
      );
      animationFrameId = requestAnimationFrame(rotateCloud);
    };

    rotateCloud();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Languages": return <Code className="w-4 h-4" />;
      case "Frontend": return <Layout className="w-4 h-4" />;
      case "Backend": return <Cpu className="w-4 h-4" />;
      case "Databases": return <Database className="w-4 h-4" />;
      case "Tools & DevOps": return <Hammer className="w-4 h-4" />;
      case "AI & Security": return <ShieldAlert className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 relative z-10 select-none bg-slate-900/5 dark:bg-slate-950/20">
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
            <Cpu className="w-3.5 h-3.5" />
            Core Stack
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Categorized skills proficiency map combined with an interactive 3D particle constellation cloud.
          </p>
        </motion.div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold cursor-pointer border flex items-center gap-2 transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 border-transparent text-white shadow-lg shadow-indigo-500/25"
                  : "bg-slate-950/40 backdrop-blur-md border-slate-800 hover:border-sky-500/30 text-slate-400 hover:text-sky-400"
              }`}
            >
              {getCategoryIcon(cat)}
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          {/* Skill Progress indicators (Left Column) */}
          <motion.div
            layout
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  key={skill.name}
                  className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl shadow-2xl space-y-3 hover:border-sky-500/30 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color}`} />
                      <span className="font-bold text-sm text-white">{skill.name}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-sky-400">{skill.level}%</span>
                  </div>

                  {/* Progress bar tracks */}
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Proficiency Level: {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Intermediate"}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 3D Orbiting Spheres Cloud (Right Column) */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[420px]">
            <div
              ref={cloudContainerRef}
              className="relative w-80 h-80 flex items-center justify-center overflow-visible"
            >
              {/* Virtual central glowing core */}
              <div className="absolute w-12 h-12 bg-sky-500/20 blur-2xl rounded-full" />
              <div className="absolute w-28 h-28 border border-sky-500/10 rounded-full" />

              {/* Orbital nodes elements list */}
              {orbitingSkills.map((node, index) => {
                // Calculate perspective scale factor based on depth coordinate Z
                const fov = 350;
                const scale = fov / (fov + node.z);
                const alpha = 0.35 + (1 - node.z / 170) * 0.65; // depth alpha fade

                // Coordinate map to center
                const cx = node.x;
                const cy = node.y;

                return (
                  <div
                    key={index}
                    className="absolute font-mono text-xs font-bold pointer-events-none transition-transform duration-75 select-none"
                    style={{
                      transform: `translate3d(${cx}px, ${cy}px, 0px) scale(${scale})`,
                      zIndex: Math.round(100 - node.z),
                      opacity: alpha,
                    }}
                  >
                    <span className={`px-2.5 py-1.5 rounded-full border border-slate-800 bg-slate-950/60 backdrop-blur-md text-[10px] sm:text-xs shadow-md whitespace-nowrap inline-block text-transparent bg-clip-text bg-gradient-to-r ${node.color}`}>
                      {node.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
