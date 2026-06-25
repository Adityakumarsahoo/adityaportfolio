import { Printer, Download, GraduationCap, Briefcase, Award, ShieldCheck, Sparkles, Phone, Mail, Globe, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  const skillsList = {
    languages: ["Java", "Python", "C++", "JavaScript", "TypeScript"],
    frontend: ["React.js", "Redux", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Node.js", "Express.js", "Spring Boot", "Spring Core"],
    databases: ["MongoDB", "MySQL", "SQL"],
    tools: ["Git", "GitHub", "Vercel", "Netlify", "Postman", "Docker", "Maven", "Gradle"],
    ai_tech: ["Prompt Engineering", "Spring AI", "REST APIs", "JWT Security", "Web Security"],
  };

  return (
    <section id="resume" className="py-24 px-4 relative z-10 select-none">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono rounded-full font-medium tracking-wide uppercase">
            <Award className="w-3.5 h-3.5" />
            Curriculum Vitae
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Online <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Review my ATS-optimized professional resume sheet, download the PDF, or print directly for recruiter review.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap justify-center gap-4 items-center print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:opacity-95 text-white rounded-xl text-sm font-semibold cursor-pointer transition-all flex items-center gap-2 shadow shadow-indigo-500/20"
          >
            <Printer className="w-4 h-4" /> Print Resume
          </button>
          <a
            href="https://drive.google.com/file/d/1dxDcPWwZFoShY4_b-VfnNkyLBu3UOsrA/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-sm font-semibold cursor-pointer transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Request PDF File
          </a>
        </div>

        {/* ATS resume sheet */}
        <div className="bg-slate-950/60 text-slate-300 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl text-left max-w-4xl mx-auto font-sans leading-normal tracking-normal print:bg-white print:text-slate-900 print:p-0 print:border-none print:shadow-none">
          {/* Header Block */}
          <div className="border-b-2 border-indigo-500 print:border-indigo-600 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white print:text-slate-900 uppercase">Aditya Kumar Sahoo</h1>
              <p className="text-sm font-bold text-indigo-400 print:text-indigo-600 tracking-wider uppercase mt-1">Full Stack Developer | Java & MERN Specialist</p>
            </div>

            <div className="text-xs space-y-1.5 text-slate-400 print:text-slate-600 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 print:text-indigo-500 shrink-0" /> Bangalore, Karnataka, India
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400 print:text-indigo-500 shrink-0" /> toadityakumarsahoo@gmail.com
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400 print:text-indigo-500 shrink-0" /> www.aditya.com
              </span>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="py-6 border-b border-slate-800 print:border-slate-200 space-y-3">
            <h3 className="text-sm font-black text-indigo-400 print:text-indigo-600 uppercase tracking-widest font-mono">Summary Profile</h3>
            <p className="text-sm text-slate-300 print:text-slate-700 leading-relaxed">
              Results-driven Full Stack Developer with 2+ years of hands-on experience building and deploying scalable web applications using the MERN Stack and Java Spring Boot. Proven ability to design and consume REST APIs, implement real-time features via WebSockets, and deliver responsive, high-performance UIs. Completed 2 industry internships prior to graduation, independently deployed 15+ live full-stack projects, and ranked #1 in the Computer Science department.
            </p>
          </div>

          {/* Technical Skills Section */}
          <div className="py-6 border-b border-slate-800 print:border-slate-200 space-y-4">
            <h3 className="text-sm font-black text-indigo-400 print:text-indigo-600 uppercase tracking-widest font-mono">Technical Core</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-white print:text-slate-900 block">Languages:</span>
                <span className="text-slate-400 print:text-slate-600">{skillsList.languages.join(", ")}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white print:text-slate-900 block">Frontend:</span>
                <span className="text-slate-400 print:text-slate-600">{skillsList.frontend.join(", ")}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white print:text-slate-900 block">Backend:</span>
                <span className="text-slate-400 print:text-slate-600">{skillsList.backend.join(", ")}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white print:text-slate-900 block">Databases:</span>
                <span className="text-slate-400 print:text-slate-600">{skillsList.databases.join(", ")}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white print:text-slate-900 block">Tools & DevOps:</span>
                <span className="text-slate-400 print:text-slate-600">{skillsList.tools.slice(0, 7).join(", ")}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white print:text-slate-900 block">AI & Security:</span>
                <span className="text-slate-400 print:text-slate-600">{skillsList.ai_tech.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="py-6 border-b border-slate-800 print:border-slate-200 space-y-6">
            <h3 className="text-sm font-black text-indigo-400 print:text-indigo-600 uppercase tracking-widest font-mono">Professional Experience</h3>

            {/* Experience Card 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-start text-sm">
                <div>
                  <span className="font-bold text-white print:text-slate-900 text-base">Full Stack Developer Intern</span>
                  <span className="text-slate-400 print:text-slate-500 font-mono block text-xs">Labmentix, Bangalore, India</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 print:text-indigo-600">Sep 2025 - Mar 2026</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-300 print:text-slate-700 space-y-1.5 leading-relaxed">
                <li>Engineered and deployed 5+ full-stack web applications using MERN Stack and Java Spring Boot, delivering production-ready client systems.</li>
                <li>Built responsive, accessible user interfaces using React.js and Tailwind CSS, reducing reported UI bugs by 25%.</li>
                <li>Designed and consumed RESTful APIs integrated with MongoDB and MySQL databases, optimizing query performance.</li>
              </ul>
            </div>

            {/* Experience Card 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-start text-sm">
                <div>
                  <span className="font-bold text-white print:text-slate-900 text-base">Full Stack Java Developer Intern</span>
                  <span className="text-slate-400 print:text-slate-500 font-mono block text-xs">ExcelR, Bangalore, India</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 print:text-indigo-600">Jul 2025 - Nov 2025</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-300 print:text-slate-700 space-y-1.5 leading-relaxed">
                <li>Developed enterprise-grade full-stack applications using Java, Spring Boot, React.js, and MySQL.</li>
                <li>Designed and tested 10+ RESTful API endpoints with JWT authentication and proper validation filters.</li>
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="py-6 border-b border-slate-800 print:border-slate-200 space-y-3">
            <h3 className="text-sm font-black text-indigo-400 print:text-indigo-600 uppercase tracking-widest font-mono">Academic Background</h3>
            <div className="flex justify-between items-start text-xs sm:text-sm">
              <div>
                <span className="font-bold text-white print:text-slate-900 text-base block">Bachelor of Technology in Computer Science & Engineering</span>
                <span className="text-slate-400 print:text-slate-500 font-mono text-xs block">Nalanda Institute of Technology, Bhubaneswar, India</span>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-400 print:text-indigo-600 shrink-0">2022 - 2026</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-slate-300 print:text-slate-700 space-y-1">
              <li>Batch topper with department rank #1 (Highest SGPA in batch).</li>
              <li>Served as Tech Club Coordinator, hosting workshops on MERN and AI for 100+ students.</li>
            </ul>
          </div>

          {/* Projects and Certifications */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300 print:text-slate-700">
            <div className="space-y-3">
              <h3 className="text-sm font-black text-indigo-400 print:text-indigo-600 uppercase tracking-widest font-mono">Highlighted Projects</h3>
              <ul className="space-y-2 list-none pl-0">
                <li>
                  <span className="font-bold text-white print:text-slate-900 block">NavVaSeconds Medical Appointment System</span>
                  <span>MERN system featuring specialized patient booking channels and JWT authorization.</span>
                </li>
                <li>
                  <span className="font-bold text-white print:text-slate-900 block">Aditya Prime Healthcare</span>
                  <span>Spring Boot clinical management portal incorporating role-based access control.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-black text-indigo-400 print:text-indigo-600 uppercase tracking-widest font-mono">Certifications</h3>
              <ul className="space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>Oracle Certified - AI Foundations Associate (2025)</li>
                <li>Certified Prompt Engineering & Programming (OpenAI)</li>
                <li>TATA Data Analytics Certification</li>
                <li>Business Analysis Professional (LinkedIn)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
