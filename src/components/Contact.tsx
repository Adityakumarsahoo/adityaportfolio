import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  onOpenAdminDashboard: () => void;
}

export default function Contact({ onOpenAdminDashboard }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | null>(null);

  // Simple math spam protection challenge
  const [spamCode, setSpamCode] = useState(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    return { a, b, answer: a + b, userInput: "" };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Full name is required.";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please input a valid email address.";
    }

    if (!formData.subject.trim()) errors.subject = "Subject line is required.";
    if (!formData.message.trim()) errors.message = "Message body is required.";

    // Spam check
    const userAns = parseInt(spamCode.userInput.trim());
    if (!spamCode.userInput.trim() || isNaN(userAns) || userAns !== spamCode.answer) {
      errors.spam = "Incorrect spam verification answer.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccess(false);
    setEmailPreviewUrl(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Server error saving message. Please check server logs.");
      }

      const data = await res.json();
      setSuccess(true);
      if (data.emailPreview) {
        setEmailPreviewUrl(data.emailPreview);
      }

      // Reset Form
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSpamCode(() => {
        const a = Math.floor(Math.random() * 8) + 2;
        const b = Math.floor(Math.random() * 8) + 2;
        return { a, b, answer: a + b, userInput: "" };
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative z-10 select-none">
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono rounded-full font-medium tracking-wide uppercase">
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Drop me a line or request an interview. I reply to all inquiries within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">Let's Discuss Your Project</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Whether you need a scalable MERN application, secure Java Restful endpoints, prompt engineered workflows, or a complete digital transformation strategy, I'm here to build it.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                <span className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Email Address</span>
                  <a href="mailto:toadityakumarsahoo@gmail.com" className="text-slate-200 font-bold hover:underline">
                    toadityakumarsahoo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                <span className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Current Location</span>
                  <span className="text-slate-200 font-bold">Bangalore, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Admin Vault Portal Trigger */}
            <div className="p-5 bg-gradient-to-r from-slate-950/90 to-slate-900/80 border border-slate-800/90 rounded-2xl flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                  Inquiries Dashboard
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                </h4>
                <p className="text-slate-400 text-xs font-sans">Are you the portfolio administrator? Authenticate to manage logs.</p>
              </div>
              <button
                onClick={onOpenAdminDashboard}
                className="py-2 px-3.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/30 text-indigo-400 hover:text-white font-semibold font-mono text-xs rounded-xl cursor-pointer transition-all"
              >
                Access Portal
              </button>
            </div>
          </div>

          {/* Contact Form Container (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950/60 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-slate-950 text-sm py-2.5 px-4 rounded-xl border outline-none text-white transition duration-200 ${
                        formErrors.name ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-sky-500/80"
                      }`}
                    />
                    {formErrors.name && <span className="text-[10px] text-red-500 font-semibold">{formErrors.name}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full bg-slate-950 text-sm py-2.5 px-4 rounded-xl border outline-none text-white transition duration-200 ${
                        formErrors.email ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-sky-500/80"
                      }`}
                    />
                    {formErrors.email && <span className="text-[10px] text-red-500 font-semibold">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Phone Number (Optional)</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 99999 99999"
                      className="w-full bg-slate-950 text-sm py-2.5 px-4 rounded-xl border border-slate-800 focus:border-sky-500/80 outline-none text-white transition duration-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Subject Line *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Partnership proposal"
                      className={`w-full bg-slate-950 text-sm py-2.5 px-4 rounded-xl border outline-none text-white transition duration-200 ${
                        formErrors.subject ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-sky-500/80"
                      }`}
                    />
                    {formErrors.subject && <span className="text-[10px] text-red-500 font-semibold">{formErrors.subject}</span>}
                  </div>
                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Message Description *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, role opportunities, or proposal details here..."
                    className={`w-full bg-slate-950 text-sm py-2.5 px-4 rounded-xl border outline-none text-white transition duration-200 resize-none ${
                      formErrors.message ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-sky-500/80"
                    }`}
                  />
                  {formErrors.message && <span className="text-[10px] text-red-500 font-semibold">{formErrors.message}</span>}
                </div>

                {/* Spam Protection Check */}
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      Spam Prevention Check
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                    </span>
                    <p className="text-xs text-slate-400">Please solve: {spamCode.a} + {spamCode.b} = ?</p>
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={spamCode.userInput}
                      onChange={(e) => {
                        setSpamCode((prev) => ({ ...prev, userInput: e.target.value }));
                        if (formErrors.spam) setFormErrors((prev) => ({ ...prev, spam: "" }));
                      }}
                      placeholder="Input sum..."
                      className={`w-32 bg-slate-950 text-center text-sm py-2 rounded-xl border outline-none text-white transition duration-200 ${
                        formErrors.spam ? "border-red-500/50" : "border-slate-800 focus:border-sky-500/80"
                      }`}
                    />
                    {formErrors.spam && <span className="text-[9px] text-red-500 font-semibold block text-center">{formErrors.spam}</span>}
                  </div>
                </div>

                {/* Notifications & Previews */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex gap-3 text-sm text-slate-800 dark:text-emerald-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div className="space-y-1 text-left">
                        <span className="font-bold block text-emerald-600 dark:text-emerald-400">Inquiry Transmitted Successfully!</span>
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                          Your submission has been safely written to our database logs, and an email notification has been queued.
                        </p>
                        {emailPreviewUrl && (
                          <a
                            href={emailPreviewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-indigo-500 hover:underline inline-flex items-center gap-1 mt-2.5"
                          >
                            View Simulated SMTP Preview Inbox
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-red-950/20 border border-red-900/40 rounded-2xl flex gap-3 text-sm text-red-300"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <div>
                        <span className="font-bold block mb-0.5">Transmission Failed</span>
                        {errorMsg}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:opacity-95 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-400 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 transform active:scale-95 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Transmitting credentials...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
