import React, { useState, useEffect } from "react";
import { Lock, Shield, Trash2, CheckCircle, Mail, Phone, Calendar, ArrowLeft, RefreshCw, LogOut, Search, Filter, Cpu, Database, Activity, Star, Plus, Edit, Image, Layers, User, Award, Briefcase, Server, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Inquiry, Project, Skill, Experience, Certification, Service, Testimonial } from "../types";

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedPasscode, setSavedPasscode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "replied">("all");
  const [dbMode, setDbMode] = useState<string>("Detecting connection...");

  // Portfolio management states
  const [activeTab, setActiveTab] = useState<"inquiries" | "project" | "skill" | "experience" | "certification" | "service" | "testimonial">("inquiries");
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<any>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    setSavedPasscode(passcode);
    setIsAuthenticated(true);
    fetchInquiries(passcode);
    fetchDbMode(passcode);
  };

  const fetchDbMode = async (codeToUse: string) => {
    try {
      const res = await fetch("/api/admin/db-mode", {
        headers: { Authorization: codeToUse }
      });
      if (res.ok) {
        const data = await res.json();
        setDbMode(data.mode);
      } else {
        setDbMode("Local Database fallback");
      }
    } catch {
      setDbMode("Local Database");
    }
  };

  const fetchInquiries = async (codeToUse: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/inquiries", {
        headers: {
          Authorization: codeToUse,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          throw new Error("Invalid admin passcode. Please try again.");
        }
        throw new Error("Failed to load inquiries. Make sure the server is online.");
      }

      const data = await res.json();
      setInquiries(data);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolioItems = async (type: string) => {
    setPortfolioLoading(true);
    try {
      const res = await fetch(`/api/portfolio/${type}`);
      if (res.ok) {
        const data = await res.json();
        setPortfolioItems(data);
      }
    } catch (err) {
      console.error("Failed to load portfolio items", err);
    } finally {
      setPortfolioLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab !== "inquiries") {
      fetchPortfolioItems(activeTab);
    }
  }, [isAuthenticated, activeTab]);

  const handleToggleReplied = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/reply`, {
        method: "PATCH",
        headers: {
          Authorization: savedPasscode,
        },
      });

      if (!res.ok) throw new Error("Failed to update status.");

      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, replied: !item.replied } : item))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: savedPasscode,
        },
      });

      if (!res.ok) throw new Error("Failed to delete inquiry.");

      setInquiries((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // CRUD handlers for Portfolio Items
  const handleOpenAddForm = () => {
    setIsEditing(false);
    setEditingItemId(null);
    
    // Set default fields based on activeTab
    if (activeTab === "project") {
      setFormFields({
        title: "",
        description: "",
        features: "",
        challengesSolved: "",
        techStack: "",
        liveUrl: "",
        githubUrl: "",
        image: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
        category: "Full Stack"
      });
    } else if (activeTab === "skill") {
      setFormFields({
        name: "",
        category: "Frontend",
        level: 85,
        color: "from-blue-500 to-indigo-600",
        iconName: "Code"
      });
    } else if (activeTab === "experience") {
      setFormFields({
        role: "",
        company: "",
        location: "",
        period: "",
        description: "",
        skills: "",
        isInternship: true
      });
    } else if (activeTab === "certification") {
      setFormFields({
        title: "",
        issuer: "",
        year: new Date().getFullYear().toString(),
        badgeColor: "from-sky-500 to-indigo-600",
        description: ""
      });
    } else if (activeTab === "service") {
      setFormFields({
        title: "",
        description: "",
        iconName: "Code2",
        skillsCovered: ""
      });
    } else if (activeTab === "testimonial") {
      setFormFields({
        name: "",
        role: "",
        company: "",
        text: "",
        avatar: "https://picsum.photos/seed/" + Math.floor(Math.random() * 1000) + "/100/100"
      });
    }
    setShowFormModal(true);
  };

  const handleOpenEditForm = (item: any) => {
    setIsEditing(true);
    setEditingItemId(item.id);
    
    const data = item.data;
    const fieldsToSet: any = { ...data };
    
    if (activeTab === "project") {
      fieldsToSet.features = Array.isArray(data.features) ? data.features.join("\n") : "";
      fieldsToSet.techStack = Array.isArray(data.techStack) ? data.techStack.join(", ") : "";
    } else if (activeTab === "experience") {
      fieldsToSet.description = Array.isArray(data.description) ? data.description.join("\n") : "";
      fieldsToSet.skills = Array.isArray(data.skills) ? data.skills.join(", ") : "";
    } else if (activeTab === "service") {
      fieldsToSet.skillsCovered = Array.isArray(data.skillsCovered) ? data.skillsCovered.join(", ") : "";
    }
    
    setFormFields(fieldsToSet);
    setShowFormModal(true);
  };

  const handleSavePortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSave: any = { ...formFields };
    
    if (activeTab === "project") {
      dataToSave.features = typeof formFields.features === "string" 
        ? formFields.features.split("\n").map((f: string) => f.trim()).filter(Boolean)
        : [];
      dataToSave.techStack = typeof formFields.techStack === "string"
        ? formFields.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
    } else if (activeTab === "experience") {
      dataToSave.description = typeof formFields.description === "string"
        ? formFields.description.split("\n").map((d: string) => d.trim()).filter(Boolean)
        : [];
      dataToSave.skills = typeof formFields.skills === "string"
        ? formFields.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
    } else if (activeTab === "service") {
      dataToSave.skillsCovered = typeof formFields.skillsCovered === "string"
        ? formFields.skillsCovered.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
    }
    
    if (activeTab === "skill" && dataToSave.level) {
      dataToSave.level = Number(dataToSave.level);
    }
    
    const url = isEditing 
      ? `/api/admin/portfolio/${activeTab}/${editingItemId}`
      : `/api/admin/portfolio/${activeTab}`;
      
    const method = isEditing ? "PUT" : "POST";
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": savedPasscode
        },
        body: JSON.stringify(dataToSave)
      });
      
      if (!res.ok) {
        throw new Error("Failed to save portfolio item.");
      }
      
      setShowFormModal(false);
      fetchPortfolioItems(activeTab);
    } catch (err: any) {
      alert(err.message || "An error occurred while saving.");
    }
  };

  const handleDeletePortfolioItem = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab}? This action is irreversible.`)) return;
    
    try {
      const res = await fetch(`/api/admin/portfolio/${activeTab}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": savedPasscode
        }
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete item.");
      }
      
      fetchPortfolioItems(activeTab);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    setSavedPasscode("");
    setInquiries([]);
    setPortfolioItems([]);
    setDbMode("Detecting connection...");
  };

  // Compute Statistics metrics for Inquiries
  const totalCount = inquiries.length;
  const repliedCount = inquiries.filter((i) => i.replied).length;
  const pendingCount = totalCount - repliedCount;
  const resolutionPercentage = totalCount > 0 ? Math.round((repliedCount / totalCount) * 100) : 0;

  // Filter inquiries based on search terms and category
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "replied") return matchesSearch && inq.replied;
    if (statusFilter === "unread") return matchesSearch && !inq.replied;
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Login Portal */
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-md bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/30 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Admin Secure Vault</h2>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">Enter passcode credentials to manage whole website data models.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">Passcode Credentials</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter admin passcode..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition duration-200"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-2 text-left">
                  Tip: Enter <span className="text-indigo-400 font-bold">admin123</span> to unlock the system.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-xs text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 hover:opacity-95 text-white rounded-xl font-bold cursor-pointer transition-all duration-300 transform active:scale-95 shadow-lg shadow-sky-500/20"
              >
                Unlock Dashboard
              </button>
            </form>
          </motion.div>
        ) : (
          /* Dashboard Portal */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-6xl bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[650px] flex flex-col justify-between"
          >
            {/* Nav Header */}
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-semibold font-mono text-sky-400 uppercase tracking-widest">Admin Control Center</span>
                    <span className="text-[10px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      {dbMode}
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                    {activeTab === "inquiries" ? "Inquiry Submissions" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Manager`}
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">Manage, add, update, and completely control your dynamic website portfolios.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (activeTab === "inquiries") {
                        fetchInquiries(savedPasscode);
                      } else {
                        fetchPortfolioItems(activeTab);
                      }
                      fetchDbMode(savedPasscode);
                    }}
                    disabled={loading || portfolioLoading}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-4.5 h-4.5 ${(loading || portfolioLoading) ? "animate-spin" : ""}`} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 text-slate-400 hover:text-red-300 transition-all cursor-pointer flex items-center gap-2 text-sm font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Lock Dashboard
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 hover:opacity-95 text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    Back to Website
                  </button>
                </div>
              </div>

              {/* NAVIGATION TABS BAR */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-900 scrollbar-thin">
                {[
                  { id: "inquiries", label: "Inquiries", count: inquiries.length },
                  { id: "project", label: "Projects" },
                  { id: "skill", label: "Skills" },
                  { id: "experience", label: "Experiences" },
                  { id: "certification", label: "Certifications" },
                  { id: "service", label: "Services" },
                  { id: "testimonial", label: "Testimonials" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border-sky-500 text-sky-400"
                        : "bg-slate-900/50 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                    }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-500">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT PANEL */}
            <div className="flex-1 min-h-[400px]">
              {activeTab === "inquiries" ? (
                <>
                  {/* STATISTICS HUD BAR */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Total Inquiries</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-black text-white">{totalCount}</span>
                        <span className="text-xs text-slate-500">tickets</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">Replied Inquiries</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-black text-emerald-400">{repliedCount}</span>
                        <span className="text-xs text-emerald-600/80">processed</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider block">Pending Tickets</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-black text-yellow-400">{pendingCount}</span>
                        <span className="text-xs text-yellow-600/80">awaiting</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                      <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider block">Resolution Rate</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-black text-sky-400">{resolutionPercentage}%</span>
                        <span className="text-xs text-sky-600/80">efficiency</span>
                      </div>
                    </div>
                  </div>

                  {/* SEARCH AND FILTRATION MODULE */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search inquiries by name, email, subject, keyword..."
                        className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 rounded-xl py-2.5 pl-11 pr-4 text-white text-sm outline-none transition duration-200"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-500 shrink-0" />
                      <select
                        value={statusFilter}
                        onChange={(e: any) => setStatusFilter(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-xl py-2.5 px-3 text-sm focus:border-sky-500 outline-none transition duration-200"
                      >
                        <option value="all">Show All Submissions</option>
                        <option value="unread">Show Unread / Pending</option>
                        <option value="replied">Show Marked as Replied</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
                      <p className="text-slate-400 text-sm font-mono">Synchronizing database logs...</p>
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className="py-20 border border-dashed border-slate-800 rounded-3xl text-center">
                      <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-slate-300">No Match Found</h3>
                      <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Try refining your search terms or changing the status filter dropdown.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin">
                      {filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 ${
                            inq.replied
                              ? "bg-slate-900/40 border-slate-900/50 opacity-70 hover:opacity-100"
                              : "bg-slate-900/90 border-slate-800 hover:border-sky-500/30"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base font-bold text-white">{inq.name}</span>
                                <a href={`mailto:${inq.email}`} className="text-xs text-sky-400 font-mono hover:underline">({inq.email})</a>
                                {inq.phone && (
                                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                                    <Phone className="w-3 h-3" /> {inq.phone}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-medium text-sky-400 mt-1 flex items-center gap-1.5">
                                Subject: <span className="text-slate-200">{inq.subject}</span>
                              </h4>
                            </div>

                            <div className="flex items-center gap-3 self-end md:self-auto text-xs text-slate-500 font-mono">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(inq.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed py-2 font-sans">
                            {inq.message}
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                            <button
                              onClick={() => handleToggleReplied(inq.id)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all ${
                                inq.replied
                                  ? "bg-emerald-950/40 border-emerald-900/50 text-emerald-300 hover:bg-emerald-900/40"
                                  : "bg-slate-950 hover:bg-slate-800 border-slate-800 hover:border-sky-500/30 text-slate-300 hover:text-white"
                              }`}
                            >
                              <CheckCircle className={`w-4 h-4 ${inq.replied ? "fill-emerald-400/20 text-emerald-400" : ""}`} />
                              {inq.replied ? "Marked as Replied" : "Mark Replied"}
                            </button>

                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="p-2 rounded-lg bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 text-slate-400 hover:text-red-400 cursor-pointer transition-colors"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* PORTFOLIO MANAGER CRUD */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-mono text-slate-500">
                      Found <span className="text-sky-400 font-bold font-mono">{portfolioItems.length}</span> active elements in database
                    </span>
                    <button
                      onClick={handleOpenAddForm}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </button>
                  </div>

                  {portfolioLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
                      <p className="text-slate-400 text-sm font-mono">Fetching model items from server...</p>
                    </div>
                  ) : portfolioItems.length === 0 ? (
                    <div className="py-16 border border-dashed border-slate-800 rounded-3xl text-center">
                      <Database className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                      <h4 className="text-white font-bold">No Records</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">This dynamic collection is currently empty or unseeded. Click Add New to start building!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                      {portfolioItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between gap-4"
                        >
                          <div className="border-b border-slate-800/80 pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-bold text-white leading-snug">
                                  {item.data.title || item.data.name || item.data.role}
                                </h3>
                                {item.data.issuer && <p className="text-xs text-sky-400 font-medium font-mono">{item.data.issuer}</p>}
                                {item.data.company && <p className="text-xs text-sky-400 font-semibold">{item.data.company}</p>}
                              </div>
                              <span className="text-[10px] font-mono font-bold bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                ID: {item.id}
                              </span>
                            </div>
                            
                            {/* Badges / Extras */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                              {item.data.category && (
                                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full">
                                  {item.data.category}
                                </span>
                              )}
                              {item.data.level && (
                                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-bold">
                                  Proficiency: {item.data.level}%
                                </span>
                              )}
                              {item.data.period && (
                                <span className="text-[10px] font-mono px-2 py-0.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full">
                                  {item.data.period}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-slate-400 text-xs leading-relaxed font-sans flex-1 line-clamp-3">
                            {item.data.description || item.data.text || (Array.isArray(item.data.description) ? item.data.description[0] : "")}
                          </p>

                          <div className="flex items-center justify-end gap-2 border-t border-slate-800/50 pt-3">
                            <button
                              onClick={() => handleOpenEditForm(item)}
                              className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-sky-500/30 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeletePortfolioItem(item.id)}
                              className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-900/50 bg-slate-950 hover:bg-red-950/20 text-slate-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING FORM PANEL FOR portfolio CRUD */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-[60] bg-[#000000]/80 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3 mb-6">
                {isEditing ? `Edit ${activeTab}` : `Add New ${activeTab}`}
              </h3>

              <form onSubmit={handleSavePortfolioItem} className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {/* DYNAMIC FIELD RENDERING */}
                {activeTab === "project" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Title</label>
                      <input
                        type="text"
                        required
                        value={formFields.title || ""}
                        onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Category</label>
                      <select
                        value={formFields.category || "Full Stack"}
                        onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="AI & Other">AI & Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Description</label>
                      <textarea
                        required
                        value={formFields.description || ""}
                        onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Key Features (One per line)</label>
                      <textarea
                        value={formFields.features || ""}
                        onChange={(e) => setFormFields({ ...formFields, features: e.target.value })}
                        rows={3}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Challenges Solved</label>
                      <textarea
                        value={formFields.challengesSolved || ""}
                        onChange={(e) => setFormFields({ ...formFields, challengesSolved: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Tech Stack (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="React.js, Node.js, Spring Boot, MySQL"
                        value={formFields.techStack || ""}
                        onChange={(e) => setFormFields({ ...formFields, techStack: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Github URL</label>
                        <input
                          type="text"
                          value={formFields.githubUrl || ""}
                          onChange={(e) => setFormFields({ ...formFields, githubUrl: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Live Demo URL</label>
                        <input
                          type="text"
                          value={formFields.liveUrl || ""}
                          onChange={(e) => setFormFields({ ...formFields, liveUrl: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">CSS Background / Image Gradient</label>
                      <input
                        type="text"
                        value={formFields.image || ""}
                        onChange={(e) => setFormFields({ ...formFields, image: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm font-mono text-xs"
                      />
                    </div>
                  </>
                )}

                {activeTab === "skill" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Skill Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.name || ""}
                        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Category</label>
                      <select
                        value={formFields.category || "Frontend"}
                        onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      >
                        <option value="Languages">Languages</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Databases">Databases</option>
                        <option value="Tools & DevOps">Tools & DevOps</option>
                        <option value="AI & Security">AI & Security</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Proficiency Level (0-100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={formFields.level || 85}
                        onChange={(e) => setFormFields({ ...formFields, level: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Gradient Colors (Tailwind)</label>
                      <input
                        type="text"
                        required
                        placeholder="from-sky-500 to-indigo-600"
                        value={formFields.color || "from-blue-500 to-indigo-600"}
                        onChange={(e) => setFormFields({ ...formFields, color: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Icon Reference Name</label>
                      <input
                        type="text"
                        placeholder="React / Java / Code"
                        value={formFields.iconName || "Code"}
                        onChange={(e) => setFormFields({ ...formFields, iconName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                  </>
                )}

                {activeTab === "experience" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Job/Role Title</label>
                      <input
                        type="text"
                        required
                        value={formFields.role || ""}
                        onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Company Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.company || ""}
                        onChange={(e) => setFormFields({ ...formFields, company: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Location</label>
                        <input
                          type="text"
                          required
                          value={formFields.location || ""}
                          onChange={(e) => setFormFields({ ...formFields, location: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Duration Period</label>
                        <input
                          type="text"
                          required
                          placeholder="Sep 2025 - Present"
                          value={formFields.period || ""}
                          onChange={(e) => setFormFields({ ...formFields, period: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id="isInternship"
                        checked={formFields.isInternship || false}
                        onChange={(e) => setFormFields({ ...formFields, isInternship: e.target.checked })}
                        className="w-4 h-4 rounded text-sky-500 bg-slate-900 border-slate-800 cursor-pointer"
                      />
                      <label htmlFor="isInternship" className="text-xs font-mono font-bold text-slate-300 cursor-pointer select-none">
                        This is an Internship / Training
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Accomplishments (One per line)</label>
                      <textarea
                        required
                        value={formFields.description || ""}
                        onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                        rows={4}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Skills Covered (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="Java, Spring Boot, React.js"
                        value={formFields.skills || ""}
                        onChange={(e) => setFormFields({ ...formFields, skills: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                  </>
                )}

                {activeTab === "certification" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Certificate Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.title || ""}
                        onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Issuing Institution</label>
                      <input
                        type="text"
                        required
                        value={formFields.issuer || ""}
                        onChange={(e) => setFormFields({ ...formFields, issuer: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Year</label>
                        <input
                          type="text"
                          required
                          value={formFields.year || ""}
                          onChange={(e) => setFormFields({ ...formFields, year: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Gradient Colors</label>
                        <input
                          type="text"
                          required
                          value={formFields.badgeColor || "from-sky-500 to-indigo-600"}
                          onChange={(e) => setFormFields({ ...formFields, badgeColor: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm font-mono text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Key Learnings / Description</label>
                      <textarea
                        required
                        value={formFields.description || ""}
                        onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                  </>
                )}

                {activeTab === "service" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Service Title</label>
                      <input
                        type="text"
                        required
                        value={formFields.title || ""}
                        onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Detailed Description</label>
                      <textarea
                        required
                        value={formFields.description || ""}
                        onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Icon Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.iconName || "Code2"}
                        onChange={(e) => setFormFields({ ...formFields, iconName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Key Skills (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="React, Java, Spring, Auth"
                        value={formFields.skillsCovered || ""}
                        onChange={(e) => setFormFields({ ...formFields, skillsCovered: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                  </>
                )}

                {activeTab === "testimonial" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Client Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.name || ""}
                        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Client Role</label>
                        <input
                          type="text"
                          required
                          value={formFields.role || ""}
                          onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Client Company</label>
                        <input
                          type="text"
                          required
                          value={formFields.company || ""}
                          onChange={(e) => setFormFields({ ...formFields, company: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Client Avatar URL</label>
                      <input
                        type="text"
                        required
                        value={formFields.avatar || ""}
                        onChange={(e) => setFormFields({ ...formFields, avatar: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase">Testimonial Text</label>
                      <textarea
                        required
                        value={formFields.text || ""}
                        onChange={(e) => setFormFields({ ...formFields, text: e.target.value })}
                        rows={4}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Submit button bar */}
                <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-sky-400 to-indigo-500 hover:opacity-95 text-white font-bold rounded-xl text-sm cursor-pointer shadow-lg shadow-sky-500/15"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-sm font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
