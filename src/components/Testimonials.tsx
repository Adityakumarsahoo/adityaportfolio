import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../types";

const staticBackupTestimonials: Testimonial[] = [
  {
    name: "Rohan Das",
    role: "Lead Software Architect",
    company: "Labmentix Contracts Division",
    text: "Aditya displayed outstanding capabilities during his Full Stack internship. He single-handedly developed two MERN interfaces, showing great logic with DB schema optimization. His proactive approach and clean modular styling exceeded our expectations.",
    avatar: "https://picsum.photos/seed/rohan/100/100",
  },
  {
    name: "Sneha Mohanty",
    role: "Senior Consultant",
    company: "ExcelR Internships Program",
    text: "An exceptionally fast learner who engineered secure backend endpoints with ease. Aditya's mastery over Java Spring Boot and his discipline with REST guidelines was impressive. He is ready for highly complex software roles.",
    avatar: "https://picsum.photos/seed/sneha/100/100",
  },
  {
    name: "Dr. P. K. Sahu",
    role: "Head of Computer Science",
    company: "Nalanda Institute of Technology",
    text: "Aditya is an exemplary student, topping his CSE department batch with the highest academic marks. As our Tech Club Coordinator, he successfully hosted technical seminars, mentored dozens of juniors in full-stack engineering, and proved himself as an excellent team leader.",
    avatar: "https://picsum.photos/seed/pksahu/100/100",
  },
];

export default function Testimonials() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(staticBackupTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  useEffect(() => {
    fetch("/api/portfolio/testimonial")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((items: any[]) => {
        if (items && items.length > 0) {
          setTestimonialsList(items.map(it => it.data));
        }
      })
      .catch((err) => console.log("Testimonials loaded from static backup"));
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const current = testimonialsList[activeIndex] || testimonialsList[0] || staticBackupTestimonials[0];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section id="testimonials" className="py-24 px-4 relative z-10 select-none bg-slate-900/5 dark:bg-slate-950/10">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono rounded-full font-medium tracking-wide uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            Endorsements
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Client & Peer <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Feedback and recommendations from company internship directors, technical leads, and university advisors.
          </p>
        </motion.div>

        {/* Carousel Slider Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-slate-950/60 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto text-center space-y-6 overflow-hidden"
        >
          <Quote className="w-12 h-12 text-sky-500/30 mx-auto relative z-10" />

          {/* Text fade animation frame */}
          <div className="min-h-[160px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full space-y-6 flex flex-col justify-between"
              >
                <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-medium italic px-4">
                  "{current.text}"
                </p>

                {/* Reviewer Details */}
                <div className="space-y-3 pt-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full border-2 border-sky-500/50 mx-auto shadow-md object-cover"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">{current.name}</h4>
                    <p className="text-xs font-semibold text-slate-400 font-mono">
                      {current.role} at <span className="text-sky-400">{current.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 pt-4 relative z-10">
            <button
              onClick={handlePrev}
              className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/35 text-slate-400 hover:text-sky-400 cursor-pointer rounded-xl transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    activeIndex === idx ? "w-6 bg-sky-400" : "w-2 bg-slate-800 hover:bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/35 text-slate-400 hover:text-sky-400 cursor-pointer rounded-xl transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
