import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, CheckCircle, Clock, Star, ChevronRight, Play, Lock, Award } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import learnImg from "@/imports/4__Learn.png";
import { useTheme } from "@/app/context/ThemeContext";

const modules = [
  { id: 1, title: "Spotting Fake Headlines", level: "Beginner", duration: "8 min", lessons: 5, completed: 5, locked: false, desc: "Learn how misleading headlines are written and how to identify them at a glance.", badge: "Headline Detective" },
  { id: 2, title: "Understanding Visual Misinformation", level: "Beginner", duration: "12 min", lessons: 6, completed: 4, locked: false, desc: "Discover how images and videos are manipulated to spread false narratives.", badge: "Image Verifier" },
  { id: 3, title: "Social Media Scam Patterns", level: "Intermediate", duration: "15 min", lessons: 8, completed: 2, locked: false, desc: "Recognize common scam tactics on Facebook, TikTok, and messaging apps.", badge: "Scam Shield" },
  { id: 4, title: "Election & Political Misinformation", level: "Intermediate", duration: "18 min", lessons: 9, completed: 0, locked: false, desc: "Understand how political misinformation spreads and how to verify claims.", badge: "Election Guardian" },
  { id: 5, title: "Health & Medical Claims", level: "Intermediate", duration: "14 min", lessons: 7, completed: 0, locked: true, desc: "Evaluate health claims and understand how to find credible medical information.", badge: "Health Verifier" },
  { id: 6, title: "AI and Deepfake Awareness", level: "Advanced", duration: "20 min", lessons: 10, completed: 0, locked: true, desc: "Understand AI-generated content and tools to detect manipulated media.", badge: "Digital Truth Seeker" },
];

const levelColor: Record<string, string> = {
  Beginner: "#22C55E", Intermediate: "#F59E0B", Advanced: "#D4187E",
};

export default function LearnPage() {
  const [active, setActive] = useState<number | null>(null);
  const { isDark } = useTheme();

  const totalProgress = modules.reduce((acc, m) => acc + m.completed, 0);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons, 0);

  return (
    <PageLayout>
      <div className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1B2F6E]/40 blur-[120px] rounded-full pointer-events-none" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F5B800]/40 bg-[#F5B800]/10 text-xs font-semibold mb-5 ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>
                <BookOpen size={12} />Media Literacy Center
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "var(--tng-text-1)" }}>
                Learn with <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Liyab</em>
              </h1>
              <p className={`mb-6 ${isDark ? "text-blue-200/65" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                Short, interactive lessons to sharpen your ability to spot fake news, scams, and manipulation — in Filipino, Taglish, and English.
              </p>

              {/* Overall progress */}
              <div
                className={`p-4 rounded-2xl border ${isDark ? "border-white/12 bg-white/5" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold" style={{ color: "var(--tng-text-1)" }}>Your Progress</span>
                  <span className="text-sm font-bold" style={{ color: "var(--tng-gold-text)" }}>{totalProgress}/{totalLessons} lessons</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(totalProgress / totalLessons) * 100}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] rounded-full" />
                </div>
                <div className="flex gap-4 mt-3">
                  <div className={`flex items-center gap-1.5 text-xs ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>
                    <Award size={12} className="text-[#F5B800]" />2 badges earned
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>
                    <Star size={12} className="text-[#F5B800]" />Level 2 — Fact Finder
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex justify-center">
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <ImageWithFallback src={learnImg} alt="Liyab reading a fact-check book"
                  className="w-56 sm:w-72 object-contain drop-shadow-2xl" />
              </motion.div>
            </motion.div>
          </div>

          {/* Modules */}
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--tng-text-1)" }}>Learning Modules</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, i) => {
              const pct = (m.completed / m.lessons) * 100;
              const isActive = active === m.id;
              return (
                <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => !m.locked && setActive(isActive ? null : m.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    m.locked
                      ? isDark ? "border-white/6 bg-white/2 opacity-60 cursor-not-allowed" : "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                      : isActive
                        ? "border-[#F5B800]/50 bg-[#F5B800]/8 cursor-pointer"
                        : isDark
                          ? "border-white/10 bg-white/4 hover:border-[#F5B800]/30 hover:bg-[#F5B800]/5 cursor-pointer hover:-translate-y-1"
                          : "border-slate-200 bg-white hover:border-[#F5B800]/50 hover:bg-[#F5B800]/5 cursor-pointer hover:-translate-y-1"
                  }`}
                  style={!isDark && !m.locked && !isActive ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: levelColor[m.level] + "22", color: levelColor[m.level] }}>
                      {m.level}
                    </span>
                    {m.locked ? <Lock size={16} className={isDark ? "text-blue-200/30" : "text-slate-300"} /> :
                      m.completed === m.lessons ? <CheckCircle size={16} className="text-green-500" /> :
                      <Play size={16} className="text-[#F5B800]" />}
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "var(--tng-text-1)" }}>{m.title}</h3>
                  <p className={`text-xs mb-4 leading-relaxed ${isDark ? "text-blue-200/50" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{m.desc}</p>

                  <div className={`flex items-center gap-3 mb-3 text-xs ${isDark ? "text-blue-200/45" : "text-slate-400"}`}>
                    <span className="flex items-center gap-1"><Clock size={11} />{m.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen size={11} />{m.lessons} lessons</span>
                  </div>

                  {!m.locked && (
                    <>
                      <div className={`h-1.5 rounded-full overflow-hidden mb-1 ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                        <div className="h-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] rounded-full transition-all"
                          style={{ width: `${pct}%` }} />
                      </div>
                      <p className={`text-[10px] ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>{m.completed}/{m.lessons} completed</p>
                    </>
                  )}

                  {isActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 overflow-hidden">
                      <div className={`pt-4 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
                        <p className={`text-xs mb-3 ${isDark ? "text-blue-200/60" : "text-slate-500"}`}>Badge: <strong className="text-[#F5B800]">{m.badge}</strong></p>
                        <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm">
                          {m.completed > 0 ? "Continue Module" : "Start Module"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
