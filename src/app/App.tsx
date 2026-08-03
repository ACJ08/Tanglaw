import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Shield, WifiOff, MapPin, BookOpen, AlertTriangle, CheckCircle,
  ChevronDown, ArrowRight, X, Users, Globe, Zap, Eye, Heart,
  Accessibility, BarChart2, Clock, Volume2,
  Lock, Radio, FileCheck, Layers,
  Github, Twitter, Facebook, Youtube, Instagram,
  Search, Fingerprint, MessageSquare, Mail, Linkedin,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";
import { Navbar } from "@/app/components/Layout";
import { AuthModal } from "@/app/components/AuthModal";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { VerificationEntryButton } from "@/app/components/VerificationEntryButton";

import logoImg from "@/imports/logo.png";
import tanglawTextImg from "@/imports/tanglaw_text.png";
import welcomeImg from "@/imports/1__Welcome.png";
import homeImg from "@/imports/2__Home.png";
import verificationImg from "@/imports/3__Verification.png";
import learnImg from "@/imports/4__Learn.png";
import processingImg from "@/imports/5__processing.png";
import scamAlertImg from "@/imports/6__Scam_alert.png";
import truthHubImg from "@/imports/7__Truth_Hub.png";
import mapImg from "@/imports/8__map.png";
import appreciationImg from "@/imports/9__Appreciation.png";
import offlineModeImg from "@/imports/10__Offline_Mode.png";
import successImg from "@/imports/11__Success.png";
import jacobPortrait from "@/imports/team/jacob.jpg";
import raphPortrait from "@/imports/team/raph.jpg";
import carolPortrait from "@/imports/team/carol.jpg";

import VerifyPage from "@/app/pages/VerifyPage";
import CrisisPage from "@/app/pages/CrisisPage";
import DashboardPage from "@/app/pages/DashboardPage";
import HistoryPage from "@/app/pages/HistoryPage";
import TruthHubPage from "@/app/pages/TruthHubPage";
import CommunityPage from "@/app/pages/CommunityPage";
import LearnPage from "@/app/pages/LearnPage";
import OfflinePage from "@/app/pages/OfflinePage";
import SyncPage from "@/app/pages/SyncPage";
import ProfilePage from "@/app/pages/ProfilePage";
import AccessibilityPage from "@/app/pages/AccessibilityPage";
import AuthCallbackPage from "@/app/pages/AuthCallbackPage";
import { Toaster } from "@/app/components/ui/sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Sign Up Modal ────────────────────────────────────────────────────────────

const roles = [
  { id: "citizen", icon: "🌍", title: "Community Member", for: "Low-income households, rural residents, seniors", features: ["Verify Information", "Offline Threat Ledger", "Crisis Mode", "Truth Hubs", "Learning Center"] },
  { id: "student", icon: "🎒", title: "Student Advocate", for: "Student journalists, class officers, youth orgs", features: ["All Community Access", "Education Toolkit", "Learning Modules", "Verification Demos"] },
  { id: "official", icon: "🏛️", title: "Barangay Official", for: "Barangay captains, LGU officials, community leaders", features: ["Community Reports", "Truth Hub Management", "Crisis Coordination", "Analytics"] },
  { id: "teacher", icon: "📚", title: "Educator / School", for: "Teachers, school administrators, librarians", features: ["Classroom Resources", "Media Literacy Lessons", "Progress Tracking"] },
  { id: "ngo", icon: "🤝", title: "NGO / Organization", for: "NGOs, civic organizations, media groups", features: ["Awareness Dashboard", "Community Insights", "Threat Monitoring"] },
  { id: "humanitarian", icon: "🌐", title: "Humanitarian Partner", for: "Disaster response orgs, emergency responders", features: ["Crisis Verification", "Emergency Advisories", "Community Monitoring"] },
];

// Superseded by AuthModal. This legacy declaration is not rendered.
function SignUpModal() {
  const { modalOpen, closeModal, signIn, signUp } = useAuth(); // Keep signIn for the login toggle if needed later
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleClose = () => { 
    setStep(1); 
    setSelectedRole(""); 
    setAuthError("");
    closeModal(); 
  };

  const handleJoin = () => {
      setIsLoading(true);
      setAuthError("");

      if (form.password !== form.confirm) {
        setAuthError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      signUp({ email: form.email, password: form.password, fullName: form.name || "User", role: selectedRole }).then(({ error }) => {
        
        setIsLoading(false);

        if (error) {
          setAuthError(error.message);
        } else {
          handleClose();
        }
        
      });
    };

  const modalBg = isDark ? "bg-[#0C1A3A] border-white/15" : "bg-white border-slate-200";
  const inputCls = isDark
    ? "bg-white/6 border border-white/12 text-white placeholder-blue-200/25 focus:border-[#F5B800]/50"
    : "bg-slate-50 border border-slate-200 text-[#1A2B4A] placeholder-slate-400 focus:border-[#F5B800]/60 focus:bg-white";
  const labelCls = isDark ? "text-blue-200/65" : "text-slate-500";
  const subCls = isDark ? "text-blue-200/55" : "text-slate-400";
  const roleCardBase = isDark ? "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white";
  const roleCardSel = isDark ? "border-[#F5B800] bg-[#F5B800]/10" : "border-[#F5B800] bg-[#F5B800]/8 shadow-md shadow-[#F5B800]/10";

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full max-w-xl border rounded-3xl overflow-hidden ${modalBg}`}
            style={{ boxShadow: !isDark ? "var(--tng-shadow-xl), 0 0 0 1px rgba(15,30,56,0.06)" : "0 25px 50px rgba(0,0,0,0.7)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5B800] via-[#D4187E] to-[#1B2F6E]" />
            <div className={`px-8 pt-8 pb-5 border-b ${isDark ? "border-white/10" : "border-slate-100"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageWithFallback src={logoImg} alt="Tanglaw" className="h-8 w-8 object-contain" />
                  <span className={`font-extrabold ${isDark ? "text-white" : "text-[#1A2B4A]"}`} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                    {step === 1 ? "Create your account" : "Choose your role"}
                  </span>
                </div>
                <button onClick={handleClose} className={`transition-colors ${isDark ? "text-blue-200/50 hover:text-white" : "text-slate-400 hover:text-[#1A2B4A]"}`}><X size={20} /></button>
              </div>
              <div className="flex gap-2 mt-5">
                {[1, 2].map((s) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-all ${step >= s ? "bg-gradient-to-r from-[#F5B800] to-[#FFD44D]" : isDark ? "bg-white/12" : "bg-slate-200"}`} />
                ))}
              </div>
            </div>
            <div className="px-8 py-6 max-h-[68vh] overflow-y-auto">
              
              {/* Error Message Display */}
              {authError && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-600 text-sm font-semibold">
                  {authError}
                </div>
              )}

              {step === 1 ? (
                <div className="flex flex-col gap-4">
                  <p className={`text-sm ${subCls}`}>Free forever. No credit card required.</p>
                  {[
                    { label: "Full Name", key: "name", type: "text", ph: "Juan dela Cruz" },
                    { label: "Email Address", key: "email", type: "email", ph: "juan@email.com" },
                    { label: "Password", key: "password", type: "password", ph: "At least 8 characters" },
                    { label: "Confirm Password", key: "confirm", type: "password", ph: "Repeat password" },
                  ].map((f) => (
                    <div key={f.key} className="flex flex-col gap-1.5">
                      <label className={`text-xs font-semibold ${labelCls}`}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${inputCls}`} />
                    </div>
                  ))}
                  <button onClick={() => setStep(2)}
                    disabled={!form.email || !form.password}
                    className="mt-2 w-full py-3.5 rounded-xl font-bold text-[#050E24] bg-gradient-to-r from-[#F5B800] to-[#FFD44D] hover:shadow-lg hover:shadow-[#F5B800]/25 transition-all text-sm disabled:opacity-50">
                    Continue →
                  </button>
                  <p className={`text-center text-xs ${subCls}`}>
                    Already have an account? <button className={`hover:underline ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>Sign in</button>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className={`text-sm ${subCls}`}>Your dashboard and tools will be tailored to your role.</p>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map((r) => {
                      const sel = selectedRole === r.id;
                      return (
                        <button key={r.id} onClick={() => setSelectedRole(r.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${sel ? roleCardSel : roleCardBase}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{r.icon}</span>
                            {sel && <span className="ml-auto text-[#F5B800]"><CheckCircle size={13} /></span>}
                          </div>
                          <p className={`text-xs font-bold mb-0.5 ${isDark ? "text-white" : "text-[#1A2B4A]"}`}>{r.title}</p>
                          <p className={`text-[9px] leading-snug ${subCls}`}>{r.for}</p>
                        </button>
                      );
                    })}
                  </div>
                  <AnimatePresence mode="wait">
                    {selectedRole && (() => {
                      const r = roles.find(x => x.id === selectedRole)!;
                      return (
                        <motion.div key={selectedRole} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className={`p-4 rounded-2xl border ${isDark ? "border-[#F5B800]/25 bg-[#F5B800]/6" : "border-[#F5B800]/30 bg-[#F5B800]/5"}`}>
                          <p className="text-xs font-bold mb-2" style={{ color: isDark ? "#F5B800" : "#1B2F6E" }}>{r.title} — What you'll have access to:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {r.features.map((f) => (
                              <span key={f} className={`text-[10px] px-2 py-0.5 rounded-full border ${isDark ? "border-white/12 text-blue-200/70 bg-white/5" : "border-slate-200 text-slate-600 bg-white"}`}>{f}</span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                  <button onClick={handleJoin} disabled={!selectedRole || isLoading}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${selectedRole ? "text-[#050E24] bg-gradient-to-r from-[#F5B800] to-[#FFD44D] hover:shadow-lg" : isDark ? "text-blue-200/30 bg-white/5 cursor-not-allowed" : "text-slate-300 bg-slate-100 cursor-not-allowed"} ${isLoading ? "opacity-75 cursor-wait" : ""}`}>
                    {isLoading ? "Creating account..." : selectedRole ? `Join as ${roles.find(r => r.id === selectedRole)?.title} →` : "Select a role to continue"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const phrases = [
  "Trusted Information",
  "Verified Truth",
  "Reliable Facts",
  "Safer Sharing",
  "Digital Confidence",
  "Community Power",
  "Informed Decisions",
  "Media Literacy",
];

// Per-phrase gradient identity — light mode uses deep accessible tones, dark uses vivid
const phraseGradients: Record<string, { light: string; dark: string; shimmer?: boolean }> = {
  "Trusted Information": {
    // Navy deep → rich indigo → gold highlight at tail
    light: "linear-gradient(110deg, #0F1E38 0%, #1B2F6E 55%, #7A5A00 100%)",
    dark:  "linear-gradient(110deg, #93C5FD 0%, #60A5FA 50%, #F5B800 100%)",
  },
  "Verified Truth": {
    // Navy → vibrant gold
    light: "linear-gradient(115deg, #1B2F6E 0%, #2E4A7A 40%, #8B6800 100%)",
    dark:  "linear-gradient(115deg, #F5B800 0%, #FFD44D 60%, #93C5FD 100%)",
    shimmer: true,
  },
  "Reliable Facts": {
    // Navy → red — authority + urgency
    light: "linear-gradient(120deg, #1B2F6E 0%, #3A2060 50%, #A31428 100%)",
    dark:  "linear-gradient(120deg, #818CF8 0%, #C084FC 45%, #D4187E 100%)",
  },
  "Safer Sharing": {
    // Gold → navy — warmth grounding into trust
    light: "linear-gradient(115deg, #8B6800 0%, #B87A00 40%, #1B2F6E 100%)",
    dark:  "linear-gradient(115deg, #F5B800 0%, #FFD44D 45%, #60A5FA 100%)",
    shimmer: true,
  },
  "Digital Confidence": {
    // Gold → red — innovation + protection
    light: "linear-gradient(105deg, #C47B00 0%, #D4920A 25%, #B8511C 60%, #A31428 100%)",
    dark:  "linear-gradient(105deg, #F5B800 0%, #FFD44D 30%, #FF8C42 65%, #D4187E 100%)",
    shimmer: true,
  },
  "Community Power": {
    // Navy → gold — solidarity to hope
    light: "linear-gradient(115deg, #1B2F6E 0%, #243D8A 45%, #9A7200 100%)",
    dark:  "linear-gradient(115deg, #60A5FA 0%, #93C5FD 45%, #F5B800 100%)",
    shimmer: true,
  },
  "Informed Decisions": {
    // Gold → navy → red accent at tip
    light: "linear-gradient(110deg, #8B6800 0%, #5C4200 35%, #1B2F6E 70%, #7A1020 100%)",
    dark:  "linear-gradient(110deg, #F5B800 0%, #FFD44D 30%, #93C5FD 65%, #D4187E 100%)",
    shimmer: true,
  },
  "Media Literacy": {
    // Navy → deep red — knowledge + vigilance
    light: "linear-gradient(115deg, #1B2F6E 0%, #2E1A6E 40%, #8B1020 100%)",
    dark:  "linear-gradient(115deg, #818CF8 0%, #A78BFA 45%, #D4187E 100%)",
  },
};

function Hero() {
  const { openModal } = useAuth();
  const { isDark } = useTheme();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {!isDark && (
          <>
            <div className="absolute top-[-10%] left-[-8%] w-[800px] h-[800px] rounded-full blur-[180px]"
              style={{ background: "radial-gradient(circle, rgba(245,184,0,0.16) 0%, rgba(255,220,100,0.07) 60%, transparent 100%)" }} />
            <div className="absolute top-[15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px]"
              style={{ background: "radial-gradient(circle, rgba(201,28,58,0.06) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-5%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px]"
              style={{ background: "radial-gradient(circle, rgba(27,47,110,0.06) 0%, transparent 70%)" }} />
          </>
        )}
        {isDark && (
          <>
            <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]"
              style={{ background: "var(--tng-blob-1)" }} />
            <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/4 right-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]"
              style={{ background: "var(--tng-blob-2)" }} />
            <motion.div animate={{ x: [0, 15, 0], y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px]"
              style={{ background: "var(--tng-blob-3)" }} />
          </>
        )}
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 w-full py-16 lg:py-8">
        {/* Asymmetric grid: left content 5 cols, right Liyab 7 cols */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* ── Left: content ──────────────────────────────────────────── */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">

            <motion.div variants={fadeUp}>
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${isDark ? "border-[#D4187E]/40 bg-[#D4187E]/10 text-[#D4187E]" : "border-[#C91C3A]/30 bg-[#C91C3A]/8 text-[#C91C3A]"}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-[#D4187E]" : "bg-[#C91C3A]"}`} />
                UNESCO Youth Hackathon 2026
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-0.5">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.06] tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
                Every Community<br />Deserves
              </h1>
              <div className="relative" style={{ minHeight: "clamp(52px, 9vw, 88px)" }}>
                <AnimatePresence mode="wait">
                  {(() => {
                    const phrase = phrases[idx];
                    const config = phraseGradients[phrase] ?? {
                      light: "linear-gradient(115deg, #1B2F6E 0%, #2E4A7A 50%, #C91C3A 100%)",
                      dark: "linear-gradient(115deg, #F5B800 0%, #FFD44D 50%, #D4187E 100%)",
                    };
                    const gradient = isDark ? config.dark : config.light;
                    const useShimmer = !isDark && config.shimmer;
                    return (
                      <motion.p key={idx}
                        initial={{ y: 32, opacity: 0, scale: 0.975 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -32, opacity: 0, scale: 0.975, position: "absolute", top: 0, left: 0, width: "100%" }}
                        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.06] tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                        <span style={{
                          background: gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          display: "inline",
                          ...(useShimmer ? { backgroundSize: "200% 100%", animation: "tng-shimmer 3.5s ease-in-out infinite" } : {}),
                        }}>
                          {phrase}
                        </span>
                      </motion.p>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-sm sm:text-base max-w-sm leading-relaxed"
              style={{ fontFamily: "'Inter',sans-serif", color: "var(--tng-text-2)" }}>
              Tanglaw is an AI-powered misinformation verification platform built for Filipino communities —{" "}
              <em className="not-italic font-bold" style={{ color: isDark ? "var(--tng-text-1)" : "#1B2F6E" }}>even offline</em>. Meet Liyab, your guide to verified truth.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button onClick={() => openModal()}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 text-sm ${isDark ? "text-[#050E24] bg-gradient-to-r from-[#F5B800] to-[#FFD44D] hover:shadow-xl hover:shadow-[#F5B800]/30" : "text-white bg-[#1B2F6E] hover:bg-[#243D8A]"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-navy)" : undefined }}>
                Get Started Free <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <VerificationEntryButton
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 text-sm ${isDark ? "text-white border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10" : "text-[#0F1E38] bg-gradient-to-r from-[#F5B800] via-[#FBCF2C] to-[#F0A500] hover:from-[#F0A500] hover:to-[#F5B800]"}`}
                style={!isDark ? { boxShadow: "0 4px 20px rgba(245,184,0,0.35), 0 1px 4px rgba(245,184,0,0.20)" } : undefined} />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2 w-full max-w-xs">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Shield, value: "100%", label: "Free & Open", sub: "No hidden costs, ever" },
                  { icon: WifiOff, value: "Offline", label: "Capable", sub: "Works without internet" },
                ].map(({ icon: Icon, value, label, sub }) => (
                  <div key={label}
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${isDark ? "border-white/12 bg-white/5 hover:border-[#F5B800]/30" : "border-[#E8D48A] bg-gradient-to-br from-[#FFFBEA] to-[#FFF4CC]"}`}
                    style={!isDark ? { boxShadow: "0 3px 12px rgba(245,184,0,0.18), 0 1px 3px rgba(245,184,0,0.12), 0 0 0 1px rgba(245,184,0,0.12)" } : undefined}>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isDark ? "bg-[#F5B800]/15" : "bg-[#F5B800]/25"}`}>
                      <Icon size={13} className={isDark ? "text-[#F5B800]" : "text-[#8B6800]"} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold leading-tight" style={{ color: isDark ? "var(--tng-text-1)" : "#0F1E38" }}>{value} <span className="font-semibold">{label}</span></p>
                      <p className="text-[10px]" style={{ color: isDark ? "var(--tng-text-3)" : "#5A4A2A" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border ${isDark ? "border-[#F5B800]/25 bg-[#F5B800]/8" : "border-[#F5B800]/40 bg-[#FFF8DC]"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-gold)" : "0 8px 32px rgba(245,184,0,0.12)" }}>
                <div className="w-7 h-7 rounded-xl bg-[#F5B800]/20 flex items-center justify-center flex-shrink-0">
                  <Zap size={13} className="text-[#F5B800]" />
                </div>
                <div>
                  <p className="text-xs font-extrabold leading-tight" style={{ color: "var(--tng-text-1)" }}>AI-Powered <span className="font-semibold">Explainable Verification</span></p>
                  <p className="text-[10px]" style={{ color: "var(--tng-text-3)" }}>Transparent, source-cited results</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Liyab — larger, dominant ────────────────────────── */}
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative flex justify-center lg:justify-end items-center"
            style={{ minHeight: "clamp(380px, 60vw, 720px)" }}>

            {/* Decorative rings — scaled up to surround larger Liyab */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[480px] h-[480px] rounded-full border animate-ping"
                style={{ animationDuration: "5s", borderColor: isDark ? "rgba(245,184,0,0.08)" : "rgba(245,184,0,0.28)" }} />
              <div className="absolute w-[420px] h-[420px] rounded-full"
                style={{ background: isDark ? "transparent" : "radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 70%)", border: `2px solid ${isDark ? "rgba(212,24,126,0.13)" : "rgba(245,184,0,0.25)"}` }} />
              <div className="absolute w-[350px] h-[350px] rounded-full border"
                style={{ borderColor: isDark ? "rgba(27,47,110,0.22)" : "rgba(27,47,110,0.14)" }} />
              <div className="absolute w-[280px] h-[280px] rounded-full border"
                style={{ borderColor: isDark ? "rgba(212,24,126,0.18)" : "rgba(201,28,58,0.14)" }} />
              <div className="absolute w-[300px] h-[300px] rounded-full blur-3xl"
                style={{ background: isDark ? "rgba(27,47,110,0.45)" : "radial-gradient(circle, rgba(245,184,0,0.18) 0%, rgba(255,200,60,0.07) 60%, transparent 100%)" }} />
              {!isDark && (
                <div className="absolute w-[260px] h-[260px] rounded-full blur-3xl"
                  style={{ background: "rgba(27,47,110,0.05)", transform: "translateY(60px)" }} />
              )}
            </div>

            {/* Liyab illustration — significantly larger */}
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10">
              <ImageWithFallback src={welcomeImg} alt="Liyab welcoming users to Tanglaw"
                className="w-[340px] sm:w-[460px] lg:w-[540px] xl:w-[620px] 2xl:w-[680px] object-contain drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-300 hover:opacity-100 opacity-70">
        <span className="text-xs tracking-widest uppercase font-semibold transition-colors duration-300"
          style={{ color: isDark ? "var(--tng-text-4)" : "#8B6800" }}>
          Discover the Platform
        </span>
        <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-1"
          style={{ color: isDark ? "var(--tng-text-4)" : "#8B6800" }} />
      </motion.button>
    </section>
  );
}

// ─── Statistics ───────────────────────────────────────────────────────────────

const researchInsights = [
  { icon: Globe, headline: "Persistent Connectivity Gaps", detail: "Connectivity remains uneven across geographically isolated and disadvantaged areas (GIDAs), rural barangays, and island communities.", source: "Problem Statement", color: "#D4187E" },
  { icon: AlertTriangle, headline: "Disasters Amplify Misinformation", detail: "During typhoons and emergencies, communities must make time-critical decisions while communication infrastructure is disrupted.", source: "Problem Statement", color: "#F59E0B" },
  { icon: Shield, headline: "Rising Scams Target Vulnerable Groups", detail: "Phishing, impersonation, and fake advisories increasingly target seniors, low-income households, students, and OFW families.", source: "Problem Statement", color: "#4A9EF5" },
];

function Statistics() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();

  const StatCount = () => {
    const count = useCountUp(488, 2000, inView);
    return (
      <span style={{ background: "linear-gradient(135deg,#F5B800,#FFD44D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {(count / 10).toFixed(1)}%
      </span>
    );
  };

  return (
    <section id="stats" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, var(--tng-section-alt), transparent)` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">The Problem We Solve</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              Why Tanglaw is <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>necessary</em>
            </h2>
            <p className="mt-2 max-w-xl mx-auto text-sm" style={{ color: "var(--tng-text-3)" }}>
              Grounded in evidence from the Problem Statement — not marketing claims.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div variants={fadeUp}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3 ${isDark ? "border-[#F5B800]/25 bg-gradient-to-br from-[#F5B800]/8 to-transparent hover:border-[#F5B800]/40" : "border-[#F5B800]/30 bg-[#F5B800]/5"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
              <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 flex items-center justify-center">
                <Globe size={18} className="text-[#F5B800]" />
              </div>
              <div>
                <div className="text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  <StatCount />
                </div>
                <p className="text-sm font-bold mt-1" style={{ color: "var(--tng-text-1)" }}>Household Internet Access</p>
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--tng-text-3)" }}>
                of Philippine households had internet at home in 2024 — the majority rely on costly, unstable prepaid data.
              </p>
              <span className="text-[10px] border px-2 py-0.5 rounded-full w-fit" style={{ color: "var(--tng-text-4)", borderColor: "var(--tng-border)" }}>PSA, 2026</span>
            </motion.div>

            {researchInsights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={fadeUp}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3 ${isDark ? "bg-white/4 hover:border-white/20" : "bg-white"}`}
                  style={{ borderColor: item.color + "22", boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.color + "20" }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: item.color + "22", color: item.color }}>Key Finding</span>
                    <p className="text-sm font-bold mt-2" style={{ color: "var(--tng-text-1)" }}>{item.headline}</p>
                  </div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--tng-text-3)" }}>{item.detail}</p>
                  <span className="text-[10px] border px-2 py-0.5 rounded-full w-fit" style={{ color: "var(--tng-text-4)", borderColor: "var(--tng-border)" }}>{item.source}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Feature Marquee ──────────────────────────────────────────────────────────

const marqueeItems = [
  { icon: WifiOff, label: "Offline Verification" }, { icon: Zap, label: "AI Assistant — Liyab" },
  { icon: MapPin, label: "Truth Hub Network" }, { icon: AlertTriangle, label: "Scam Detection" },
  { icon: BookOpen, label: "Learning Center" }, { icon: Clock, label: "Verification History" },
  { icon: Users, label: "Community Reports" }, { icon: Eye, label: "Media Literacy" },
  { icon: Accessibility, label: "Accessibility First" },
  { icon: Globe, label: "Taglish Support" }, { icon: BarChart2, label: "Confidence Scoring" },
];

function FeatureMarquee() {
  const { isDark } = useTheme();
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <section id="features" className={`py-16 overflow-hidden border-y ${isDark ? "border-white/8" : "border-slate-200"}`}>
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--tng-label-gold)" }}>Platform Capabilities</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, var(--tng-marquee-fade), transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, var(--tng-marquee-fade), transparent)` }} />
        <motion.div className="flex gap-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {doubled.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`flex-shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full border cursor-default hover:border-[#F5B800]/30 hover:bg-[#F5B800]/5 transition-all ${isDark ? "border-white/12 bg-white/5" : "border-slate-200 bg-white shadow-sm"}`}>
                <Icon size={15} className="text-[#F5B800]" />
                <span className="text-sm font-medium whitespace-nowrap transition-colors" style={{ color: "var(--tng-text-2)" }}>{item.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Feature Block ────────────────────────────────────────────────────────────

function FeatureBlock({ image, alt, title, subtitle, description, benefits, cta, ctaHref, imageRight, badge, animateBubble = false }: {
  image: string; alt: string; title: string; subtitle: string; description: string;
  benefits: string[]; cta: string; ctaHref?: string; imageRight?: boolean; badge?: string; animateBubble?: boolean;
}) {
  const { ref, inView } = useInView(0.15);
  const { isDark } = useTheme();
  return (
    <div ref={ref} className="py-20 lg:py-28">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${imageRight ? "lg:grid-flow-dense" : ""}`}>
        <motion.div initial={{ opacity: 0, x: imageRight ? 40 : -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex justify-center ${imageRight ? "lg:col-start-2" : ""}`}>
          <div className="relative">
            <div className={`absolute inset-0 rounded-3xl blur-2xl scale-95 ${isDark ? "bg-gradient-to-br from-[#1B2F6E]/60 to-[#D4187E]/20" : "bg-gradient-to-br from-[#F5B800]/15 to-[#D4187E]/10"}`} />
            <div className={`relative border rounded-3xl p-6 lg:p-8 overflow-hidden ${isDark ? "bg-gradient-to-br from-white/6 to-white/2 border-white/12" : "bg-white border-slate-200"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-xl)" : undefined }}>
              {animateBubble && (
                <>
                  <motion.div animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.92, 1.08, 0.92] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[5%] right-[3%] w-[44%] h-[36%] rounded-full bg-[#F5B800]/20 blur-2xl pointer-events-none" />
                  <div className="absolute top-[13%] right-[10%] flex gap-1.5">
                    {[0, 0.28, 0.56].map((d, i) => (
                      <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2], y: [0, -5, 0] }}
                        transition={{ duration: 0.85, repeat: Infinity, delay: d }}
                        className="w-2 h-2 rounded-full bg-[#F5B800]" />
                    ))}
                  </div>
                </>
              )}
              <ImageWithFallback src={image} alt={alt} className="w-full max-w-[300px] mx-auto object-contain relative z-10" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: imageRight ? -40 : 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col gap-6 ${imageRight ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          {badge && <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-[#D4187E]/15 border border-[#D4187E]/30 text-[#D4187E] text-xs font-semibold">{badge}</span>}
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--tng-gold-text)" }}>{subtitle}</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              {title.split("\n").map((l, i) => <span key={i}>{l}{i < title.split("\n").length - 1 && <br />}</span>)}
            </h3>
          </div>
          <p className="leading-relaxed" style={{ color: "var(--tng-text-2)" }}>{description}</p>
          <ul className="flex flex-col gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-[#F5B800] mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--tng-text-2)" }}>{b}</span>
              </li>
            ))}
          </ul>
          {ctaHref ? (
            <Link to={ctaHref} className="w-fit flex items-center gap-2 text-sm font-semibold hover:text-[#D4187E] group transition-colors" style={{ color: "var(--tng-gold-text)" }}>
              {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span className="text-sm font-semibold" style={{ color: "var(--tng-text-4)" }}>{cta}</span>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Truth Hub Feature ────────────────────────────────────────────────────────

function TruthHubFeature() {
  const { ref, inView } = useInView(0.15);
  const { isDark } = useTheme();
  return (
    <div ref={ref} className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative flex justify-center">
          <div className="relative w-full max-w-sm">
            <div className={`absolute inset-0 rounded-3xl border overflow-hidden ${isDark ? "bg-gradient-to-br from-[#0C1A3A] to-[#050E24] border-white/12" : "bg-white border-slate-200"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-xl)" : undefined }}>
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 6 }).map((_, i) => <div key={`h${i}`} className={`absolute border-t ${isDark ? "border-white/30" : "border-slate-400/30"}`} style={{ top: `${i * 18}%`, left: 0, right: 0 }} />)}
                {Array.from({ length: 5 }).map((_, i) => <div key={`v${i}`} className={`absolute border-l ${isDark ? "border-white/30" : "border-slate-400/30"}`} style={{ left: `${i * 20}%`, top: 0, bottom: 0 }} />)}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#F5B800]/15 blur-2xl" />
            </div>
            <div className="relative z-10 p-6 flex justify-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                <ImageWithFallback src={truthHubImg} alt="Truth Hub" className="w-48 sm:w-60 object-contain drop-shadow-2xl" />
              </motion.div>
            </div>
            {[[8, 20], [85, 15], [75, 70], [12, 75]].map(([x, y], i) => (
              <motion.div key={i} animate={{ y: [0, -7, 0] }} transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, delay: i * 0.6 }}
                className="absolute z-20" style={{ left: `${x}%`, top: `${y}%` }}>
                <MapPin size={i === 0 ? 24 : 18} style={{ color: i === 0 ? "#F5B800" : "#D4187E" }} />
              </motion.div>
            ))}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className={`absolute -bottom-3 -right-3 z-30 w-24 h-24 rounded-2xl border p-2 ${isDark ? "border-[#F5B800]/35 bg-[#0C1A3A]/90" : "border-slate-200 bg-white"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-lg)" : "0 0 24px rgba(0,0,0,0.4)" }}>
              <ImageWithFallback src={mapImg} alt="Map" className="w-full h-full object-contain" />
            </motion.div>
            <div className={`absolute -top-3 -left-3 z-30 px-3 py-2 rounded-xl border flex items-center gap-2 ${isDark ? "border-[#D4187E]/40 bg-[#0C1A3A]/90" : "border-slate-200 bg-white"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-md)" : "0 0 20px rgba(0,0,0,0.35)" }}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>12 Hubs Active</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-6">
          <span className="inline-flex w-fit px-3 py-1 rounded-full bg-[#D4187E]/15 border border-[#D4187E]/30 text-[#D4187E] text-xs font-semibold">Truth Hub Network</span>
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--tng-gold-text)" }}>Physical Verification Centers</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              Find your nearest<br />Truth Hub
            </h3>
          </div>
          <p className="leading-relaxed" style={{ color: "var(--tng-text-2)" }}>
            Truth Hubs are community-staffed verification centers in barangay halls, schools, and libraries — forming a physical network for citizens who need in-person guidance.
          </p>
          <ul className="flex flex-col gap-3">
            {["Interactive map of all Truth Hub locations", "Walk-in verification with trained validators", "Media literacy workshops and community events", "Offline kiosks for citizens without smartphones"].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-[#F5B800] mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--tng-text-2)" }}>{b}</span>
              </li>
            ))}
          </ul>
          <Link to="/truth-hubs" className="w-fit flex items-center gap-2 text-sm font-semibold hover:text-[#D4187E] group transition-colors" style={{ color: "var(--tng-gold-text)" }}>
            Find a Truth Hub <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureShowcase() {
  const { isDark } = useTheme();
  const features = [
    { image: homeImg, alt: "Liyab holding phone", imageRight: true, badge: "Home", subtitle: "Smart Dashboard", title: "Everything at\nyour fingertips", description: "The Tanglaw home screen gives quick access to verification, recent checks, and community alerts — designed for clarity, even for first-time users.", benefits: ["One-tap verification entry", "Personalized news feed from verified sources", "Community scam alerts in real-time", "Role-based quick actions"], cta: "See the dashboard", ctaHref: "/dashboard" },
    { image: verificationImg, alt: "Liyab holding checkmark", imageRight: false, badge: "Verification", subtitle: "AI Verification Engine", title: "Let's check this\ntogether", description: "Paste a headline, upload an image, or speak a claim — Liyab cross-references it against verified local and international sources.", benefits: ["Text, image, and voice input support", "Multi-source cross-reference in seconds", "Confidence score with evidence links", "Offline cache for recent verifications"], cta: "Try verification", ctaHref: "/verify" },
    { image: learnImg, alt: "Liyab reading", imageRight: true, badge: "Learning Center", subtitle: "Media Literacy", title: "Learn with\nLiyab", description: "Short, interactive modules on spotting fake news, understanding bias, and sharing responsibly — in Filipino and English, for all ages.", benefits: ["Bite-sized lessons with quizzes", "Taglish content for wider reach", "Earn community badges", "Teacher and parent dashboards"], cta: "Explore lessons", ctaHref: "/learn" },
    { image: processingImg, alt: "Liyab thinking", imageRight: false, badge: "Processing", animateBubble: true, subtitle: "Real-Time Analysis", title: "Processing your\nverification", description: "While Liyab thinks, our AI pipeline cross-checks your claim through multiple layers — archived sources, fact-checker databases, and local Truth Hub records.", benefits: ["Sub-5 second online processing", "Background sync when offline", "Transparent step-by-step audit trail", "Human reviewer escalation when needed"], cta: "Learn how it works", ctaHref: "/verify" },
    { image: scamAlertImg, alt: "Liyab raising scam alert", imageRight: true, badge: "Scam Detection", subtitle: "Community Safety", title: "Stop scams\nbefore they spread", description: "Tanglaw monitors viral content and alerts the community when dangerous misinformation is trending in your area.", benefits: ["Geo-targeted scam notifications", "Community flagging and upvoting", "Barangay-level broadcast capability", "Link scanner for phishing sites"], cta: "See community alerts", ctaHref: "/community" },
    { image: offlineModeImg, alt: "Liyab sleeping — offline sync", imageRight: false, badge: "Offline Mode", subtitle: "Always Available", title: "Verify even when\nyou're offline", description: "Liyab never sleeps — even when your connection does. Tanglaw caches verified data locally and syncs silently the moment you reconnect.", benefits: ["Local cache of recent verifications", "Background sync on reconnect", "Works on 2G, 3G, and low-bandwidth", "Full functionality automatically restored"], cta: "Explore offline mode", ctaHref: "/offline" },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-[150px]" style={{ background: "var(--tng-blob-1)" }} />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "var(--tng-blob-2)" }} />
      </div>
      <div className="relative">
        <div className="text-center pt-20 pb-4">
          <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">Feature Deep-Dive</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
            Built for every <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>moment</em>
          </h2>
        </div>
        {features.map((f, i) => <FeatureBlock key={i} {...(f as any)} />)}
        <TruthHubFeature />
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const workflowSteps = [
  { num: 1, icon: MessageSquare, color: "#F5B800", title: "Submit a Claim", desc: "Paste a suspicious message, upload a screenshot, or speak the claim to Liyab. Text, image, and voice all accepted — in Filipino, Taglish, or English.", image: verificationImg },
  { num: 2, icon: Zap, color: "#D4187E", title: "Liyab Analyzes It", desc: "Liyab's AI pipeline checks the claim against your local offline threat cache and runs language pattern analysis to detect manipulation techniques.", image: processingImg },
  { num: 3, icon: Shield, color: "#4A9EF5", title: "Sources Are Verified", desc: "The system cross-references trusted databases — AFP Fact Check, Vera Files, PCIJ, and international partners — alongside community reports.", image: homeImg },
  { num: 4, icon: CheckCircle, color: "#22C55E", title: "You Get an Explanation", desc: "A clear verdict with a confidence score, full evidence trail, detected manipulation techniques, and a plain-language recommendation.", image: successImg },
  { num: 5, icon: Users, color: "#F59E0B", title: "Community Grows Stronger", desc: "Your verified report contributes to the shared threat database. Every check makes the network smarter for every Filipino who uses Tanglaw.", image: appreciationImg },
];

function HowItWorks() {
  const { ref, inView } = useInView(0.08);
  const { isDark } = useTheme();
  return (
    <section id="workflow" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, var(--tng-section-alt), transparent, var(--tng-section-alt))` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--tng-label-gold)" }}>How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              Five steps from suspicion to <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>clarity</em>
            </h2>
            <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "var(--tng-text-2)" }}>
              Tanglaw guides you through every verification — online or offline, in under 10 seconds.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              return (
                <motion.div key={step.num} variants={fadeUp}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 lg:py-14 ${i < workflowSteps.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "var(--tng-border)" }}>
                  <div className={`flex flex-col gap-5 ${isRight ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: step.color + "20", border: `2px solid ${step.color}40` }}>
                          <Icon size={22} style={{ color: step.color }} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center shadow-md">
                          <span className="text-[10px] font-extrabold text-white">{step.num}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: step.color }}>Step {step.num}</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed" style={{ color: "var(--tng-text-2)" }}>{step.desc}</p>
                  </div>
                  <div className={`flex justify-center ${isRight ? "lg:order-1" : ""}`}>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl blur-2xl scale-90 opacity-60" style={{ background: `radial-gradient(circle, ${step.color}30, transparent 70%)` }} />
                      <div className={`relative rounded-3xl border p-6 flex items-center justify-center ${isDark ? "bg-white/4 border-white/10" : "bg-white border-slate-200"}`}
                        style={{ borderColor: step.color + "30", boxShadow: !isDark ? "var(--tng-shadow-lg)" : undefined }}>
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}>
                          <ImageWithFallback src={step.image} alt={step.title} className="w-44 sm:w-56 object-contain" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} className="mt-16 text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border ${isDark ? "bg-[#F5B800]/8 border-[#F5B800]/25" : "bg-[#F5B800]/6 border-[#F5B800]/30 shadow-sm"}`}>
              <Zap size={16} className="text-[#F5B800]" />
              <span className="text-sm font-semibold" style={{ color: "var(--tng-text-1)" }}>
                Average verification time: <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>under 5 seconds online</em>, instant offline.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Ecosystem ────────────────────────────────────────────────────────────────

const ecosystem = [
  { icon: Shield, label: "Verification Engine", desc: "AI-powered claim verification with explainable results and source citations.", color: "#F5B800" },
  { icon: BookOpen, label: "Learning Center", desc: "Interactive media literacy modules for students, parents, and communities.", color: "#D4187E" },
  { icon: MapPin, label: "Truth Hub Network", desc: "Physical community hubs staffed by trained validators for in-person help.", color: "#4A9EF5" },
  { icon: WifiOff, label: "Offline Sync", desc: "Cache verifications locally and sync automatically when connectivity returns.", color: "#F5B800" },
  { icon: Zap, label: "AI Assistant — Liyab", desc: "Friendly conversational guide for every step of the verification journey.", color: "#D4187E" },
  { icon: Users, label: "Community Reporting", desc: "Crowd-sourced flagging and upvoting to surface local threats.", color: "#4A9EF5" },
  { icon: FileCheck, label: "Fact Checking", desc: "Cross-reference claims against AFP, Vera Files, PCIJ, and global databases.", color: "#F5B800" },
  { icon: Clock, label: "Verification History", desc: "Personal log of all past verifications with timestamps and evidence.", color: "#D4187E" },
  { icon: AlertTriangle, label: "Scam Alerts", desc: "Real-time geo-targeted alerts when dangerous misinformation trends locally.", color: "#4A9EF5" },
  { icon: Globe, label: "Multi-Language", desc: "Taglish, Filipino, and English — meeting communities where they speak.", color: "#F5B800" },
  { icon: Accessibility, label: "Accessibility", desc: "Voice guidance, large icons, simple language — designed for everyone.", color: "#D4187E" },
];

const tanglawPrinciples = [
  ["T", "Trustworthy Verification", Shield],
  ["A", "Accessible Offline Platform", WifiOff],
  ["N", "Networked Community Sharing", Users],
  ["G", "Guided Media Literacy", BookOpen],
  ["L", "Local Threat Ledger", Layers],
  ["A", "Adaptive Synchronization", Radio],
  ["W", "Without Internet", Globe],
] as const;

function WhyTanglaw() {
  const { ref, inView } = useInView(0.12);
  const { isDark } = useTheme();
  return (
    <section id="why-tanglaw" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, var(--tng-section-alt), transparent 55%, rgba(245,184,0,0.09))" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#D4187E]">Why Tanglaw</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--tng-text-1)" }}>Why the name <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>“Tanglaw”?</em></h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--tng-text-2)" }}><strong style={{ color: "var(--tng-text-1)" }}>Tanglaw</strong> is a Filipino word meaning light, guiding light, or beacon—something that illuminates the truth and helps communities navigate misinformation.</p>
          </motion.div>
          <motion.div variants={fadeUp} className={`mx-auto mt-10 max-w-5xl rounded-3xl border p-6 sm:p-9 ${isDark ? "border-white/12 bg-white/5" : "border-[#E2D9C4] bg-white/80"}`} style={{ boxShadow: !isDark ? "var(--tng-shadow-lg)" : undefined }}>
            <p className="mb-6 text-center text-xs font-bold tracking-[0.35em]" style={{ color: "var(--tng-gold-text)" }}>T.A.N.G.L.A.W.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tanglawPrinciples.map(([letter, meaning, Icon], index) => <motion.div key={`${letter}-${meaning}`} variants={fadeUp} whileHover={{ y: -5, scale: 1.01 }} className={`group rounded-2xl border p-4 transition-colors ${isDark ? "border-white/10 bg-[#081631]/60 hover:border-[#F5B800]/45" : "border-slate-200 bg-[#FFFEFA] hover:border-[#F5B800]/60"}`}>
                <div className="mb-3 flex items-center justify-between"><span className="text-3xl font-extrabold" style={{ color: index % 2 ? "#D4187E" : "#F5B800" }}>{letter}</span><Icon size={18} className="text-[#1B2F6E] opacity-60 transition-transform group-hover:scale-110" /></div>
                <p className="text-xs font-bold leading-relaxed" style={{ color: "var(--tng-text-1)" }}>{meaning}</p>
              </motion.div>)}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed" style={{ color: "var(--tng-text-2)" }}>Tanglaw brings trustworthy information to every community—even where connectivity is limited. Community-driven verification, offline-first technology, and media literacy work together as a beacon of truth where reliable information is needed most.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const team = [
  { name: "Carl Jacob Mateo", role: "Backend Developer & Database Developer", initials: "CJ", portrait: jacobPortrait, bio: "Designs scalable backend systems, API architecture, database optimization, authentication workflows, and reliable data synchronization across Tanglaw.", email: "carljacob.mateo@gmail.com", network: "LinkedIn", href: "https://www.linkedin.com/in/carl-jacob-mateo-367b41256/", Icon: Linkedin },
  { name: "Raphiel Anne Roslin", role: "Graphic Designer", initials: "RA", portrait: raphPortrait, bio: "Shapes Tanglaw’s visual identity, branding, illustrations, and user-centered graphics so information is clear, welcoming, and effective.", email: "raphielanneroslin@gmail.com", network: "Facebook", href: "https://www.facebook.com/share/18tTazaDbv/?mibextid=wwXIfr", Icon: Facebook },
  { name: "Anne Carol G. Jonson", role: "Frontend Developer · Backend Developer · AI Integration Engineer · Researcher", initials: "AC", portrait: carolPortrait, bio: "Leads Tanglaw’s frontend experience, backend integration, AI-powered verification workflows, and research to deliver a seamless, intelligent platform.", email: "annecaroljonson1108@gmail.com", network: "LinkedIn", href: "https://www.linkedin.com/in/annecaroljonson/", Icon: Linkedin },
];

function TeamProfileImage({ src, name, initials }: { src: string; name: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={`Portrait of ${name} unavailable`} className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#F5B800] via-[#F3A52A] to-[#D4187E] text-sm font-extrabold text-[#050E24]">{initials}</div>;
  return <img src={src} alt={`Portrait of ${name}`} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-16 w-16 shrink-0 rounded-2xl border-2 border-white/70 object-cover object-top shadow-sm transition-transform duration-300 group-hover:scale-105" />;
}

function AboutSection() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  const emailStyle = isDark ? "border-[#FB7185]/45 bg-[#FB7185]/15 text-[#FDA4AF] hover:bg-[#FB7185]/25 hover:shadow-[0_8px_20px_rgba(251,113,133,0.2)]" : "border-[#FDA4AF]/65 bg-[#FFF1F2] text-[#BE123C] hover:bg-[#FFE4E6] hover:shadow-[0_8px_20px_rgba(190,24,93,0.15)]";
  const socialStyle = (network: string) => isDark
    ? network === "LinkedIn" ? "border-[#60A5FA]/45 bg-[#3B82F6]/15 text-[#93C5FD] hover:bg-[#3B82F6]/25 hover:shadow-[0_8px_20px_rgba(96,165,250,0.2)]" : "border-[#60A5FA]/45 bg-[#2563EB]/15 text-[#93C5FD] hover:bg-[#2563EB]/25 hover:shadow-[0_8px_20px_rgba(96,165,250,0.2)]"
    : network === "LinkedIn" ? "border-[#93C5FD] bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE] hover:shadow-[0_8px_20px_rgba(37,99,235,0.14)]" : "border-[#93C5FD] bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE] hover:shadow-[0_8px_20px_rgba(37,99,235,0.14)]";
  const controlBase = "grid h-10 w-10 place-items-center rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] focus-visible:ring-offset-2";

  return <section id="about" className="relative overflow-hidden py-24">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 90% 10%, rgba(212,24,126,0.1), transparent 30%)" }} />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#D4187E]">About Tanglaw</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--tng-text-1)" }}>Technology with a community <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>at its heart</em></h2>
          <p className="mt-5 text-sm leading-relaxed sm:text-base" style={{ color: "var(--tng-text-2)" }}>Tanglaw is an offline-first community verification platform built to combat misinformation through trustworthy verification, media literacy, and resilient technology. Our interdisciplinary team combines software engineering, artificial intelligence, user experience, and visual communication.</p>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-14 flex items-end justify-between gap-6"><h3 className="text-2xl font-extrabold" style={{ color: "var(--tng-text-1)" }}>Meet the team</h3><span className="hidden text-xs font-semibold sm:block" style={{ color: "var(--tng-text-3)" }}>Building clarity, together</span></motion.div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {team.map(({ Icon, ...member }) => <motion.article key={member.name} variants={fadeUp} whileHover={{ y: -7 }} className={`group flex flex-col rounded-3xl border p-6 transition-shadow ${isDark ? "border-white/10 bg-white/5 hover:border-white/20" : "border-slate-200 bg-white hover:shadow-xl"}`} style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
            <div className="mb-5 flex items-center gap-4"><TeamProfileImage src={member.portrait} name={member.name} initials={member.initials} /><div><h4 className="font-bold" style={{ color: "var(--tng-text-1)" }}>{member.name}</h4><p className="mt-1 text-[11px] font-semibold leading-relaxed text-[#D4187E]">{member.role}</p></div></div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--tng-text-2)" }}>{member.bio}</p>
            <div className="mt-6 flex items-center gap-2 border-t pt-5" style={{ borderColor: "var(--tng-border)" }}>
              <a href={`mailto:${member.email}`} title="Send Email" aria-label={`Send email to ${member.name}`} className={`${controlBase} ${emailStyle}`}><Mail size={17} strokeWidth={2.25} /></a>
              <a href={member.href} target="_blank" rel="noreferrer" title={`Open ${member.network}`} aria-label={`${member.name} on ${member.network}`} className={`${controlBase} ${socialStyle(member.network)}`}><Icon size={17} strokeWidth={2.25} /></a>
              <a href={`mailto:${member.email}`} aria-label={`Send email to ${member.name}`} className={`ml-auto rounded-lg px-2 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] ${isDark ? "text-[#FDE68A] hover:bg-[#F5B800]/10" : "text-[#1B2F6E] hover:bg-[#FFF8DC] hover:text-[#BE123C]"}`}>Send email</a>
            </div>
          </motion.article>)}
        </div>
      </motion.div>
    </div>
  </section>;
}

function EcosystemSection() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: !isDark ? "var(--tng-section-navy)" : undefined }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">Complete Ecosystem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>One platform, every tool you need</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ecosystem.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-default ${isDark ? "border-white/10 bg-white/4 hover:bg-white/6" : "border-slate-200 bg-white"}`}
                  style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: item.color + "20" }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <h4 className="font-bold mb-2 text-sm" style={{ color: "var(--tng-text-1)" }}>{item.label}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--tng-text-3)" }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Personas ─────────────────────────────────────────────────────────────────

const personas = [
  { name: "Maria", role: "Rural Mother, 38", location: "Barangay Makiling, Laguna", challenge: "Maria receives dozens of health and financial scam messages via Facebook Messenger daily. With no way to verify claims and limited data, she often shares misinformation without realizing it.", solution: "Tanglaw's offline-first verification and Taglish interface lets Maria check any message before sharing. The scam alert system protects her family.", accessibility: ["Taglish content", "Voice guidance", "Simple language", "Low bandwidth mode"], workflow: ["Receives suspicious message", "Opens Tanglaw", "Pastes text to verify", "Gets plain-language result", "Shares safely — or doesn't share"], image: "👩‍👧" },
  { name: "Roberto", role: "Senior Citizen, 67", location: "Barangay 15, Manila", challenge: "Roberto is frequently targeted by investment scams and fake government aid messages. He lacks digital literacy to identify red flags.", solution: "Roberto visits his local Truth Hub where a trained volunteer runs verifications for him. He also uses Tanglaw's large-icon mode and voice guidance.", accessibility: ["Large icons", "Voice guidance", "Truth Hub walk-in", "Simple 3-step flow"], workflow: ["Receives suspicious call or message", "Visits Truth Hub", "Volunteer verifies on his behalf", "Gets clear verdict and advice", "Reports to barangay if scam confirmed"], image: "👴" },
  { name: "Angel", role: "Student Advocate, 19", location: "State University, Cebu", challenge: "Angel sees viral misinformation spreading in her dormitory group chats. She wants to educate her peers but lacks trusted tools.", solution: "Angel uses Tanglaw's Community Reporting feature and the Learning Center to share media literacy modules. She earns badges as a Verified Contributor.", accessibility: ["Learning modules", "Community toolkit", "Badge recognition", "Shareable fact-check cards"], workflow: ["Spots viral misinformation", "Verifies via Tanglaw AI", "Submits community report", "Shares result with classmates", "Earns contributor badge"], image: "👩‍🎓" },
];

function PersonasSection() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  return (
    <section id="community-impact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, var(--tng-section-alt), transparent)` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">User Personas</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              Real people, real <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>stories</em>
            </h2>
          </motion.div>
          <div className="flex flex-col gap-8">
            {personas.map((p, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div key={p.name} variants={fadeUp}
                  className={`grid lg:grid-cols-2 gap-8 items-start p-8 rounded-3xl border transition-all ${isDark ? "border-white/10 bg-white/3 hover:border-[#F5B800]/20" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-md)" : undefined }}>
                  <div className={`${isRight ? "lg:order-2" : ""} flex flex-col gap-5`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B2F6E] to-[#D4187E]/60 flex items-center justify-center text-3xl shadow-lg">{p.image}</div>
                      <div>
                        <h3 className="text-xl font-extrabold" style={{ color: "var(--tng-text-1)" }}>{p.name}</h3>
                        <p className="text-sm" style={{ color: "var(--tng-gold-text)" }}>{p.role}</p>
                        <p className="text-xs" style={{ color: "var(--tng-text-3)" }}>{p.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#D4187E] uppercase tracking-wide mb-2">Challenge</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--tng-text-2)" }}>{p.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--tng-gold-text)" }}>Tanglaw Solution</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--tng-text-2)" }}>{p.solution}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.accessibility.map((a) => <span key={a} className="text-xs px-3 py-1 rounded-full border border-[#F5B800]/25 bg-[#F5B800]/8" style={{ color: isDark ? "#F5B800" : "#1B2F6E" }}>{a}</span>)}
                    </div>
                  </div>
                  <div className={`${isRight ? "lg:order-1" : ""}`}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: "var(--tng-text-1)" }}>How {p.name} uses Tanglaw</p>
                    <div className="flex flex-col gap-2">
                      {p.workflow.map((step, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">{j + 1}</div>
                          <p className="text-sm py-2.5 border-b last:border-0 flex-1" style={{ color: "var(--tng-text-2)", borderColor: "var(--tng-border)" }}>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Who Is It For ────────────────────────────────────────────────────────────

const stakeholders = [
  { icon: "🎒", role: "Students", desc: "Access fact-checking for school projects and learn media literacy with Liyab.", features: ["Verification history", "Learning badges", "Teacher-assigned modules"] },
  { icon: "📚", role: "Teachers & Educators", desc: "Assign lessons, monitor student progress, and run classroom exercises.", features: ["Class dashboard", "Progress tracking", "Curated lesson plans"] },
  { icon: "👨‍👩‍👧", role: "Parents & Families", desc: "Protect your family from viral scams with easy verification and alerts.", features: ["Scam alerts", "Simple language", "Voice guidance"] },
  { icon: "🏛️", role: "Barangay Officials", desc: "Broadcast verified announcements and monitor local misinformation trends.", features: ["Community broadcasts", "Trend dashboard", "Truth Hub access"] },
  { icon: "🤝", role: "Community Volunteers", desc: "Help validate local claims, staff Truth Hubs, and assist community members.", features: ["Volunteer portal", "Validation tools", "Community reporting"] },
  { icon: "📰", role: "Journalists", desc: "Fast-track fact-checking with AI-assisted claim analysis and source access.", features: ["Source database", "AI analysis", "Audit trail"] },
  { icon: "🔬", role: "Researchers", desc: "Access anonymized misinformation trend data and verification patterns.", features: ["Data insights", "Trend exports", "Research API"] },
  { icon: "🌍", role: "General Citizens", desc: "Verify any claim anytime — online or offline — with Liyab guiding the way.", features: ["One-tap verify", "Offline mode", "Taglish support"] },
];

function WhoIsItFor() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: !isDark ? "var(--tng-section-gold)" : undefined }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px]" style={{ background: "var(--tng-blob-2)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">Who It's For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>Built for every member of the community</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stakeholders.map((s, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${isDark ? "border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-[#F5B800]/30" : "border-slate-200 bg-white"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h4 className="font-bold mb-2" style={{ color: "var(--tng-text-1)" }}>{s.role}</h4>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--tng-text-3)" }}>{s.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--tng-text-2)" }}>
                      <span className="w-1 h-1 rounded-full bg-[#F5B800] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Safety + Ethics ──────────────────────────────────────────────────────────

const safetyPrinciples = [
  { icon: Shield, title: "Verified-Source Checking", desc: "Every claim cross-referenced against AFP, Vera Files, PCIJ, and global fact-checkers." },
  { icon: Eye, title: "Explainable AI", desc: "Verdicts are never issued without showing which sources were used and why the conclusion was reached." },
  { icon: WifiOff, title: "Offline-First Processing", desc: "Core verification works without internet using locally cached verified content." },
  { icon: Users, title: "Human-in-the-Loop", desc: "Ambiguous claims are escalated to trained human reviewers before a verdict is issued." },
  { icon: FileCheck, title: "Evidence Transparency", desc: "Every result includes a full evidence card — sources, timestamps, and contradiction flags." },
  { icon: MapPin, title: "Truth Hub Validation", desc: "Physical hubs provide a ground-truth layer that pure AI cannot replicate." },
  { icon: BarChart2, title: "Confidence Scoring", desc: "Results include a confidence percentage and plain-language uncertainty explanation." },
  { icon: Radio, title: "Emergency Response", desc: "Crisis mode activates an emergency broadcast channel for rapid community alerts." },
];

const guardrails = [
  { icon: AlertTriangle, title: "Neutral / Unknown Protocol", desc: "When evidence is insufficient, Tanglaw returns 'Unverified' — never false certainty." },
  { icon: Lock, title: "Cryptographic Ledger Integrity", desc: "The offline threat ledger uses cryptographic signatures to prevent tampering." },
  { icon: Shield, title: "Privacy-Preserving Processing", desc: "Verification happens locally on-device first. No PII sent without explicit consent." },
  { icon: Eye, title: "Explainable Verification", desc: "Every verdict comes with a full evidence trail. No black-box outputs." },
  { icon: Heart, title: "Human-Centered Recommendations", desc: "Liyab always recommends a next action in plain language — not just a label." },
  { icon: Users, title: "Human-in-the-Loop Escalation", desc: "Ambiguous claims are escalated to community validators before a final verdict." },
  { icon: CheckCircle, title: "Trusted Authority Verification", desc: "Only sources from verified fact-checking organizations, with public accountability." },
  { icon: Fingerprint, title: "No Black-Box Decisions", desc: "Tanglaw will never issue a verdict it cannot explain. Every analysis is auditable." },
];

function SafetySection() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px]" style={{ background: "var(--tng-blob-1)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">AI Safety & Ethical Guardrails</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              Trustworthy by <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>design</em>
            </h2>
          </motion.div>
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-wide mb-4 text-center" style={{ color: "var(--tng-text-3)" }}>Safety Principles</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {safetyPrinciples.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                    className={`p-6 rounded-2xl border transition-all group ${isDark ? "border-white/10 bg-gradient-to-br from-[#0C1A3A] to-[#050E24] hover:border-[#F5B800]/25" : "border-slate-200 bg-white"}`}
                    style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                    <div className="w-10 h-10 rounded-xl bg-[#F5B800]/10 flex items-center justify-center mb-4 group-hover:bg-[#F5B800]/20 transition-colors">
                      <Icon size={18} className="text-[#F5B800]" />
                    </div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: "var(--tng-text-1)" }}>{p.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--tng-text-3)" }}>{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-4 text-center" style={{ color: "var(--tng-text-3)" }}>Ethical Guardrails</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guardrails.map((g, i) => {
                const Icon = g.icon;
                return (
                  <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                    className={`p-6 rounded-2xl border transition-all ${isDark ? "border-[#F5B800]/15 bg-gradient-to-br from-[#F5B800]/5 to-transparent hover:border-[#F5B800]/30" : "border-[#F5B800]/20 bg-[#F5B800]/4"}`}
                    style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                    <div className="w-10 h-10 rounded-xl bg-[#F5B800]/12 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[#F5B800]" />
                    </div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: "var(--tng-text-1)" }}>{g.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--tng-text-3)" }}>{g.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Accessibility Section ────────────────────────────────────────────────────

const accessFeatures = [
  { icon: WifiOff, title: "Offline-First", desc: "Works without internet using locally cached data and background sync." },
  { icon: Globe, title: "Taglish Communication", desc: "Content blended naturally in Filipino and English for authentic reach." },
  { icon: Volume2, title: "Voice Guidance", desc: "Full voice interaction — ask Liyab questions without typing." },
  { icon: Eye, title: "Simple Language", desc: "All verdicts use plain Grade 4 reading level language." },
  { icon: Layers, title: "Large Icons & Text", desc: "Scalable icons and adjustable font sizes throughout the app." },
  { icon: Heart, title: "Color Accessibility", desc: "WCAG AA compliant, colorblind-friendly palette and both light and dark modes." },
  { icon: MapPin, title: "Community Kiosks", desc: "Truth Hub kiosks at barangay halls for citizens without smartphones." },
  { icon: Radio, title: "Low Bandwidth Mode", desc: "Compressed data mode optimized for 2G/3G and feature phones." },
];

function AccessibilitySection() {
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  return (
    <section id="accessibility" className="py-24 relative overflow-hidden"
      style={{ background: !isDark ? "var(--tng-section-navy)" : undefined }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">Radical Accessibility</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              No one gets left <em className="not-italic" style={{ color: "var(--tng-gold-text)" }}>behind</em>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--tng-text-2)" }}>
              Tanglaw is designed from the ground up to reach every Filipino — regardless of connectivity, device, or ability.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl border transition-all ${isDark ? "border-[#D4187E]/20 bg-gradient-to-br from-[#D4187E]/8 to-transparent hover:border-[#D4187E]/40" : "border-[#D4187E]/20 bg-[#D4187E]/4"}`}
                  style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                  <div className="w-10 h-10 rounded-xl bg-[#D4187E]/15 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#D4187E]" />
                  </div>
                  <h4 className="font-bold text-sm mb-2" style={{ color: "var(--tng-text-1)" }}>{f.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--tng-text-3)" }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  { q: "How does offline verification work?", a: "Tanglaw caches recently verified claims and a local threat database on your device. When offline, Liyab checks your query against this local cache. Full cross-reference runs automatically when you reconnect." },
  { q: "What is a Truth Hub?", a: "A Truth Hub is a physical community center — in barangay halls, schools, or libraries — staffed by trained validators. They provide in-person verification assistance and host media literacy workshops." },
  { q: "Can I verify information without internet?", a: "Yes. Tanglaw is built offline-first. Core verification against cached sources works without any connection. The app queues your verification and runs a full cross-reference automatically once you reconnect." },
  { q: "Who manages verified sources in Tanglaw?", a: "Sources are curated by editorial staff and partner organizations including AFP Fact Check, Vera Files, and PCIJ. Community members can suggest sources through Community Reporting." },
  { q: "Is Tanglaw free to use?", a: "Yes. Tanglaw is completely free for all users — a civic technology initiative funded through the UNESCO Youth Hackathon program." },
  { q: "What languages does Tanglaw support?", a: "Tanglaw currently supports Filipino, Taglish, and English. Content and Liyab's guidance are available in all three, with more Philippine languages planned." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, inView } = useInView(0.1);
  const { isDark } = useTheme();
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#D4187E] uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>Common questions</h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className={`border rounded-2xl overflow-hidden ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${isDark ? "hover:bg-white/4" : "hover:bg-slate-50"}`}>
                  <span className="text-sm font-semibold pr-4" style={{ color: "var(--tng-text-1)" }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={17} className="text-[#F5B800] flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="px-6 pb-5">
                        <p className="text-sm leading-relaxed" style={{ color: "var(--tng-text-2)" }}>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  const { openModal } = useAuth();
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.15);
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: isDark ? "linear-gradient(135deg, rgba(27,47,110,0.60), rgba(5,14,36,1), rgba(212,24,126,0.20))" : "linear-gradient(135deg, rgba(245,184,0,0.08), transparent, rgba(212,24,126,0.08))" }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{ background: "var(--tng-blob-3)" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-end">
          <motion.div variants={fadeUp} className="hidden lg:flex justify-end items-end pb-4">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <ImageWithFallback src={appreciationImg} alt="Liyab saying thank you" className="w-[260px] xl:w-[300px] object-contain drop-shadow-2xl" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center text-center gap-6">
            <motion.div variants={fadeUp}>
              <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border backdrop-blur ${isDark ? "bg-white/10 border-white/15" : "bg-white border-slate-200"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-md)" : undefined }}>
                <ImageWithFallback src={logoImg} alt="Tanglaw" className="h-10 w-10 object-contain" />
                <ImageWithFallback src={tanglawTextImg} alt="tanglaw" className="h-7 object-contain" style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }} />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--tng-text-1)" }}>
              Join the movement for<br />
              <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#FFD44D 40%,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>verified truth</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg max-w-lg" style={{ color: "var(--tng-text-2)" }}>
              Every verified fact is a step toward a more informed, resilient community. Start today — it's <em className="not-italic font-semibold" style={{ color: "var(--tng-text-1)" }}>free, always</em>.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => openModal()}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#050E24] bg-gradient-to-r from-[#F5B800] to-[#FFD44D] hover:shadow-2xl hover:shadow-[#F5B800]/30 transition-all hover:-translate-y-1">
                Sign Up Free <ArrowRight size={18} />
              </button>
              <Link to="/learn"
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all hover:-translate-y-1 ${isDark ? "text-white border-white/20 bg-white/5 hover:bg-white/10" : "text-[#1B2F6E] border-[#1B2F6E]/25 bg-white hover:border-[#F5B800] hover:bg-slate-50"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-sm)" : undefined }}>
                Learn More
              </Link>
              <Link to="/truth-hubs"
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all hover:-translate-y-1 ${isDark ? "text-[#F5B800] border-[#F5B800]/30 bg-[#F5B800]/8 hover:bg-[#F5B800]/15" : "text-[#1B2F6E] border-[#F5B800]/50 bg-[#FFF8DC] hover:bg-[#FFE87A]/50"}`}>
                Become a Truth Hub
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="lg:hidden mt-4">
              <ImageWithFallback src={appreciationImg} alt="Liyab" className="w-48 mx-auto object-contain" />
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="hidden lg:flex justify-start items-end pb-4">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              <ImageWithFallback src={successImg} alt="Liyab celebrating" className="w-[240px] xl:w-[280px] object-contain drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { isDark } = useTheme();
  const cols = [
    { heading: "Platform", links: [["Verify Information", "/verify"], ["Learning Center", "/learn"], ["Truth Hubs", "/truth-hubs"], ["Community", "/community"], ["Crisis Mode", "/crisis"]] },
    { heading: "Offline & Sync", links: [["Threat Ledger", "/offline"], ["Offline Sync", "/sync"], ["Dashboard", "/dashboard"], ["Profile", "/profile"], ["Accessibility", "/accessibility"]] },
    { heading: "Community", links: [["Volunteer Portal", "#"], ["Barangay Partners", "#"], ["Schools Program", "#"], ["GitHub", "#"], ["Contact Us", "#"]] },
  ];
  const socials = [Twitter, Facebook, Instagram, Youtube, Github];
  return (
    <footer className="relative border-t pt-16 pb-8 overflow-hidden" style={{ borderColor: "var(--tng-border)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, var(--tng-section-alt), transparent)` }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-2xl border w-fit ${isDark ? "bg-white/8 border-white/12" : "bg-white border-slate-200 shadow-sm"}`}>
              <ImageWithFallback src={logoImg} alt="Tanglaw" className="h-8 w-8 object-contain" style={{ filter: "drop-shadow(0 0 4px rgba(245,184,0,0.3))" }} />
              <ImageWithFallback src={tanglawTextImg} alt="tanglaw" className="h-5 object-contain" style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }} />
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--tng-text-3)" }}>
              AI-powered misinformation verification for every Filipino community — online and <em className="not-italic font-semibold" style={{ color: "var(--tng-text-1)" }}>offline</em>.
            </p>
            <div className="flex items-center gap-2.5 mt-1">
              {socials.map((Icon, i) => (
                <button key={i} className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${isDark ? "border-white/10 text-blue-200/40 hover:text-white hover:border-white/25" : "border-slate-200 text-slate-400 hover:text-[#1A2B4A] bg-white shadow-sm"}`}>
                  <Icon size={14} />
                </button>
              ))}
            </div>
            <span className="text-xs text-[#D4187E]/70 border border-[#D4187E]/30 px-3 py-1 rounded-full w-fit">🏆 UNESCO Youth Hackathon 2026</span>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold mb-4 tracking-wide" style={{ color: "var(--tng-text-1)" }}>{col.heading}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-sm transition-colors hover:text-[#F5B800]" style={{ color: "var(--tng-text-3)" }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--tng-border)" }}>
          <p className="text-xs" style={{ color: "var(--tng-text-4)" }}>© 2026 Tanglaw. Built for communities. Free forever.</p>
          <p className="text-xs flex items-center gap-1" style={{ color: "var(--tng-text-4)" }}>
            Made with <Heart size={10} className="text-[#D4187E] fill-[#D4187E]" /> for the Filipino community
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

function LandingPage() {
  return (
    <div>
      <Hero />
      <Statistics />
      <FeatureMarquee />
      <FeatureShowcase />
      <HowItWorks />
      <WhyTanglaw />
      <EcosystemSection />
      <PersonasSection />
      <WhoIsItFor />
      <SafetySection />
      <AccessibilitySection />
      <FAQ />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function AppInner() {
  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--tng-page)", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/verify" element={<ProtectedRoute><VerifyPage /></ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
        <Route path="/truth-hubs" element={<TruthHubPage />} />
        <Route path="/community" element={<ProtectedRoute roles={["official", "ngo", "humanitarian"]}><CommunityPage /></ProtectedRoute>} />
        <Route path="/crisis" element={<ProtectedRoute roles={["official", "humanitarian"]}><CrisisPage /></ProtectedRoute>} />
        <Route path="/offline" element={<ProtectedRoute><OfflinePage /></ProtectedRoute>} />
        <Route path="/sync" element={<ProtectedRoute><SyncPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
      </Routes>
      <AuthModal />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppInner />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
