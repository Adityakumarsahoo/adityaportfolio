import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm Aditya's AI Assistant. Ask me anything about my internships, technical skills, academic projects, or hireability! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    "What are Aditya's core skills?",
    "Tell me about the Labmentix internship.",
    "Detail the NavVaSeconds project.",
    "Is Aditya available for work?",
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setError(null);
    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare history formatted correctly
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          chatHistory,
        }),
      });

      if (!res.ok) {
        if (res.status === 503) {
          throw new Error("AI Assistant is offline (missing GEMINI_API_KEY). Please contact me directly using the contact form below!");
        }
        let errMsg = "Failed to get response from AI model.";
        try {
          const errData = await res.json();
          if (errData && errData.error) {
            errMsg = errData.error;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="ai-assistant-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:opacity-95 text-white rounded-full shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10 animate-pulse" />}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg border border-slate-700/50 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-medium">
            Ask my AI Twin ✨
          </span>
        </button>
      </div>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 w-full max-w-md h-[550px] dark:glass border border-slate-800/80 rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/90 dark:glass border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-1.5 text-sm">
                    Aditya Sahoo AI Twin
                    <Sparkles className="w-3.5 h-3.5 text-sky-400 fill-sky-400 animate-pulse" />
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Powered by Gemini 3.5</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                      m.role === "user"
                        ? "bg-sky-500"
                        : "bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/50"
                    }`}
                  >
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-white rounded-tr-none"
                        : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none font-sans"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-slate-400 animate-spin" />
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <span className="font-semibold block mb-0.5">Assistant Notification</span>
                    {error}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts shelf */}
            {messages.length === 1 && (
              <div className="p-3 bg-slate-950 border-t border-slate-900">
                <p className="text-[11px] font-semibold text-sky-400 mb-2 font-mono uppercase tracking-wider">Suggested Questions:</p>
                <div className="flex flex-col gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-left text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-sky-500/40 py-2 px-3 rounded-lg text-slate-300 hover:text-white cursor-pointer transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-slate-900 border-t border-slate-800/80 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about Aditya's skills, experience, projects..."
                className="flex-1 bg-slate-950 text-white text-sm py-2.5 px-4 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition duration-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 text-white p-2.5 rounded-xl cursor-pointer transition-colors duration-200 flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
