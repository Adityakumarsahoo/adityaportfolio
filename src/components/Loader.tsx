import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

const LOGO_URL = "https://github.com/adityakumarsahoo.png";

const logs = [
  "INITIALIZING QUANTUM PORTFOLIO PIPELINE...",
  "ESTABLISHING SECURE WEBGL ENVIRONMENT...",
  "COMPILING 3D CONSTELLATION GRAPHICS NODE...",
  "SYNCHRONIZING MONGODB SECURE BACKEND SOCKETS...",
  "DECRYPTING ADITYA_CORE BIOGRAPHY MEMORY MATRIX...",
  "MOUNTING REVOLUTIONARY USER EXPERIENCE PARADIGM...",
  "CALIBRATING GEMINI AI CHAT TWIN INTERFACE...",
  "SYSTEM PARAMETERS SECURED. RENDERING PORTFOLIO...",
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => onCompleteRef.current(), 900);
          return 100;
        }
        const step = Math.floor(Math.random() * 7) + 3;
        return Math.min(100, prev + step);
      });
    }, 85);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * logs.length),
      logs.length - 1
    );
    setLogIndex(idx);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="premium-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#030712",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            userSelect: "none",
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          }}
        >
          {/* ── Ambient glow blobs ── */}
          <div style={{
            position: "absolute",
            top: "20%", left: "15%",
            width: 420, height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            bottom: "20%", right: "10%",
            width: 360, height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }} />

          {/* ── Grid overlay ── */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }} />

          {/* ── Scanning sweep line ── */}
          <motion.div
            animate={{ y: ["0vh", "100vh"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(56,189,248,0.6), transparent)",
              boxShadow: "0 0 24px 2px rgba(99,102,241,0.3)",
              pointerEvents: "none",
            }}
          />

          {/* ── Main content card ── */}
          <div style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            width: "100%",
            maxWidth: 480,
            padding: "0 24px",
          }}>

            {/* ── Logo + orbital rings ── */}
            <div style={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>

              {/* Outermost ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: -18,
                  borderRadius: "50%",
                  border: "1px dashed rgba(99,102,241,0.25)",
                }}
              />

              {/* Outer ring + dot */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(56,189,248,0.18)",
                }}
              >
                <div style={{
                  position: "absolute",
                  top: -4, left: "50%",
                  width: 8, height: 8,
                  borderRadius: "50%",
                  background: "rgba(56,189,248,0.9)",
                  boxShadow: "0 0 8px 2px rgba(56,189,248,0.6)",
                  transform: "translateX(-50%)",
                }} />
              </motion.div>

              {/* Inner ring + dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: 4,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(168,85,247,0.22)",
                }}
              >
                <div style={{
                  position: "absolute",
                  bottom: -4, left: "50%",
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: "rgba(168,85,247,0.9)",
                  boxShadow: "0 0 8px 2px rgba(168,85,247,0.6)",
                  transform: "translateX(-50%)",
                }} />
              </motion.div>

              {/* Avatar circle */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  padding: 3,
                  background: "linear-gradient(135deg, #38bdf8, #6366f1, #a855f7)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(56,189,248,0.15)",
                }}
              >
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#0f172a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <img
                    src={LOGO_URL}
                    alt="Aditya Kumar Sahoo"
                    onLoad={() => setLogoLoaded(true)}
                    onError={() => setLogoLoaded(true)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                      opacity: logoLoaded ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                  {!logoLoaded && (
                    <span style={{
                      position: "absolute",
                      fontSize: 36,
                      fontWeight: 900,
                      color: "white",
                      letterSpacing: "-1px",
                    }}>A</span>
                  )}
                </div>
              </motion.div>

              {/* Pulse ring behind avatar */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px solid rgba(99,102,241,0.5)",
                }}
              />
            </div>

            {/* ── Name + tagline ── */}
            <div style={{ textAlign: "center" }}>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "linear-gradient(90deg, #38bdf8, #818cf8, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Aditya Kumar Sahoo
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(148,163,184,0.7)",
                  fontWeight: 700,
                }}
              >
                Full Stack Developer · AI Enthusiast
              </motion.p>
            </div>

            {/* ── Progress bar + percentage ── */}
            <div style={{ width: "100%" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}>
                <span style={{
                  fontSize: 9,
                  color: "rgba(99,102,241,0.8)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}>SYSTEM BOOTSTRAP</span>
                <motion.span
                  key={progress}
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: "#e2e8f0",
                    letterSpacing: "0.05em",
                    minWidth: 42,
                    textAlign: "right",
                  }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* Track */}
              <div style={{
                height: 6,
                borderRadius: 99,
                background: "rgba(30,41,59,0.8)",
                border: "1px solid rgba(51,65,85,0.6)",
                overflow: "hidden",
                position: "relative",
              }}>
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #38bdf8, #6366f1, #a855f7)",
                    width: `${progress}%`,
                    boxShadow: "0 0 14px rgba(99,102,241,0.6)",
                    position: "relative",
                  }}
                  transition={{ duration: 0.12 }}
                >
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                      borderRadius: 99,
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* ── Log feed ── */}
            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                background: "rgba(15,23,42,0.7)",
                border: "1px solid rgba(51,65,85,0.5)",
                borderRadius: 12,
                padding: "12px 16px",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                minHeight: 46,
              }}
            >
              <div style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 8px rgba(56,189,248,0.8)",
                flexShrink: 0,
                animation: "pulse 1.2s infinite",
              }} />
              <span style={{
                fontSize: 9,
                color: "rgba(56,189,248,0.9)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontWeight: 700,
                lineHeight: 1.5,
              }}>
                {logs[logIndex]}
              </span>
            </motion.div>

            {/* ── Footer ── */}
            <p style={{
              fontSize: 8,
              color: "rgba(71,85,105,0.7)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: -12,
            }}>
              © 2026 Aditya Kumar Sahoo · Secure Transmission
            </p>
          </div>

          {/* ── Corner accent lines ── */}
          {[
            { top: 20, left: 20, borderTop: "2px solid rgba(99,102,241,0.4)", borderLeft: "2px solid rgba(99,102,241,0.4)" },
            { top: 20, right: 20, borderTop: "2px solid rgba(56,189,248,0.4)", borderRight: "2px solid rgba(56,189,248,0.4)" },
            { bottom: 20, left: 20, borderBottom: "2px solid rgba(168,85,247,0.4)", borderLeft: "2px solid rgba(168,85,247,0.4)" },
            { bottom: 20, right: 20, borderBottom: "2px solid rgba(99,102,241,0.4)", borderRight: "2px solid rgba(99,102,241,0.4)" },
          ].map((style, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 24, height: 24,
                ...style,
                pointerEvents: "none",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
