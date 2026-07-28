import { useState } from "react";
import { motion } from "motion/react";
import {
  User, Mail, Lock, Globe, Bell, Eye, EyeOff, CheckCircle,
  Camera, Shield, Clock, BarChart2, BookOpen, Award, Edit3, Save
} from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";

const roleLabelMap: Record<string, string> = {
  citizen: "Community Member",
  student: "Student Advocate",
  official: "Barangay Official",
  teacher: "Educator",
  ngo: "NGO Partner",
  humanitarian: "Humanitarian Partner",
};

const activityLog = [
  { action: "Verification completed", detail: "GCash scam message — Result: Confirmed Scam", time: "2 hours ago", icon: Shield, color: "#EF4444" },
  { action: "Learning module completed", detail: "Spotting Fake Headlines — Badge earned", time: "Yesterday", icon: BookOpen, color: "#F5B800" },
  { action: "Community report submitted", detail: "Fake DSWD relief text — 47 upvotes", time: "2 days ago", icon: BarChart2, color: "#D4187E" },
  { action: "Offline sync completed", detail: "214 threat entries updated from Brgy. 15 Hub", time: "3 days ago", icon: CheckCircle, color: "#22C55E" },
  { action: "Profile created", detail: "Welcome to Tanglaw P2P!", time: "1 week ago", icon: User, color: "#4A9EF5" },
];

const languages = ["Filipino (Tagalog)", "English", "Taglish", "Cebuano", "Ilocano"];

export default function ProfilePage() {
  const { isDark } = useTheme();
  const { userName, userRole } = useAuth();
  const roleLabel = roleLabelMap[userRole ?? ""] ?? userRole ?? "Community Member";

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: userName || "Juan dela Cruz",
    email: "juan@email.com",
    location: "Barangay Makiling, Laguna",
    language: "Filipino (Tagalog)",
    bio: "Community member using Tanglaw to protect my family from online scams.",
  });
  const [showPw, setShowPw] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    scamAlerts: true,
    communityReports: true,
    learningReminders: false,
    syncStatus: true,
    weeklyDigest: true,
  });

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = (form.name || "U").slice(0, 2).toUpperCase();

  const cardShadow = !isDark ? "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" : undefined;

  return (
    <PageLayout>
      <div className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1B2F6E]/40 blur-[120px] rounded-full pointer-events-none" />}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-extrabold mb-1" style={{ color: "var(--tng-text-1)" }}>Profile</h1>
            <p className="text-sm" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
              Manage your account, preferences, and notification settings.
            </p>
          </motion.div>

          {saved && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-3 px-5 py-3 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm">
              <CheckCircle size={16} />Profile saved successfully.
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: avatar + stats */}
            <div className="flex flex-col gap-5">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className={`p-6 rounded-3xl border flex flex-col items-center gap-4 text-center ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-2xl font-extrabold text-white shadow-xl">
                    {initials}
                  </div>
                  <button className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${isDark ? "bg-[#0C1A3A] border-white/20 hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"}`}>
                    <Camera size={12} className={isDark ? "text-blue-200/70" : "text-slate-400"} />
                  </button>
                </div>
                <div>
                  <h2 className="font-extrabold text-lg" style={{ color: "var(--tng-text-1)" }}>{form.name}</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5B800]/15 font-semibold" style={{ color: "var(--tng-gold-text)" }}>{roleLabel}</span>
                  <p className="text-xs mt-2" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{form.location}</p>
                </div>
                <div className={`w-full border-t pt-4 grid grid-cols-3 gap-2 text-center ${isDark ? "border-white/10" : "border-slate-100"}`}>
                  {[["11", "Verifications"], ["2", "Badges"], ["5", "Reports"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <p className="text-lg font-extrabold" style={{ color: "var(--tng-text-1)" }}>{val}</p>
                      <p className="text-[10px]" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{lbl}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className={`p-5 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Award size={14} className="text-[#F5B800]" />Earned Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Headline Detective", emoji: "🔍" },
                    { label: "Image Verifier", emoji: "🖼️" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#F5B800]/25 bg-[#F5B800]/8">
                      <span className="text-sm">{b.emoji}</span>
                      <span className="text-[10px] font-semibold" style={{ color: "var(--tng-gold-text)" }}>{b.label}</span>
                    </div>
                  ))}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border opacity-40 ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-slate-50"}`}>
                    <span className={`text-[10px] ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>+ 4 locked</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: form sections */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Personal Info */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                className={`p-6 rounded-3xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}><User size={15} className="text-[#F5B800]" />Personal Information</h3>
                  <button onClick={() => editMode ? handleSave() : setEditMode(true)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${editMode ? "bg-[#F5B800] text-[#050E24]" : isDark ? "border border-white/15 text-blue-200/70 hover:text-white hover:bg-white/8" : "border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}>
                    {editMode ? <><Save size={12} />Save</> : <><Edit3 size={12} />Edit</>}
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", key: "name", icon: User },
                    { label: "Email Address", key: "email", icon: Mail },
                    { label: "Location", key: "location", icon: Globe },
                  ].map(({ label, key, icon: Icon }) => (
                    <div key={key} className={key === "location" ? "sm:col-span-2" : ""}>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{label}</label>
                      <div className="relative">
                        <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--tng-text-3)" }} />
                        <input disabled={!editMode}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none ${
                            editMode
                              ? isDark
                                ? "bg-white/8 border border-[#F5B800]/30 text-white focus:border-[#F5B800]/60"
                                : "bg-white border border-[#F5B800]/30 focus:border-[#F5B800]/60"
                              : isDark
                                ? "bg-white/4 border border-white/8 text-blue-200/70"
                                : "bg-slate-50 border border-slate-200"
                          }`}
                          style={{ fontFamily: "'Inter',sans-serif", color: editMode || !isDark ? "var(--tng-text-1)" : undefined }} />
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--tng-text-3)" }}>Bio</label>
                    <textarea disabled={!editMode} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2}
                      className={`w-full px-4 py-3 rounded-xl text-sm resize-none transition-all focus:outline-none ${
                        editMode
                          ? isDark
                            ? "bg-white/8 border border-[#F5B800]/30 text-white"
                            : "bg-white border border-[#F5B800]/30"
                          : isDark
                            ? "bg-white/4 border border-white/8 text-blue-200/70"
                            : "bg-slate-50 border border-slate-200"
                      }`}
                      style={{ fontFamily: "'Inter',sans-serif", color: editMode || !isDark ? "var(--tng-text-1)" : undefined }} />
                  </div>
                </div>
              </motion.div>

              {/* Language + Password */}
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
                  className={`p-5 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                  style={{ boxShadow: cardShadow }}>
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}><Globe size={14} className="text-[#F5B800]" />Language</h3>
                  <div className="flex flex-col gap-2">
                    {languages.map((lang) => (
                      <button key={lang} onClick={() => setForm({ ...form, language: lang })}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${form.language === lang ? "border border-[#F5B800]/40 bg-[#F5B800]/8" : isDark ? "border border-white/8 text-blue-200/60 hover:border-white/18 hover:text-white" : "border border-slate-200 hover:border-slate-300"}`}
                        style={{ color: form.language === lang ? "var(--tng-gold-text)" : isDark ? undefined : "var(--tng-text-2)" }}>
                        {lang}
                        {form.language === lang && <CheckCircle size={13} />}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
                  className={`p-5 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                  style={{ boxShadow: cardShadow }}>
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}><Lock size={14} className="text-[#F5B800]" />Change Password</h3>
                  <div className="flex flex-col gap-3">
                    {[{ label: "Current Password", ph: "••••••••" }, { label: "New Password", ph: "At least 8 chars" }, { label: "Confirm New", ph: "Repeat password" }].map((f) => (
                      <div key={f.label}>
                        <label className="text-[10px] font-semibold mb-1 block" style={{ color: "var(--tng-text-3)" }}>{f.label}</label>
                        <div className="relative">
                          <input type={showPw ? "text" : "password"} placeholder={f.ph}
                            className={`w-full px-3 pr-9 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#F5B800]/40 transition-all ${isDark ? "bg-white/6 border border-white/10 text-white placeholder-blue-200/20" : "bg-white border border-slate-200 placeholder-slate-300"}`}
                            style={{ fontFamily: "'Inter',sans-serif", color: isDark ? undefined : "var(--tng-text-1)" }} />
                          <button onClick={() => setShowPw(!showPw)} className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${isDark ? "text-blue-200/35 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>
                            {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-xs mt-1">
                      Update Password
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Notification Settings */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
                className={`p-6 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                <h3 className="font-bold text-sm mb-5 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}><Bell size={14} className="text-[#F5B800]" />Notification Settings</h3>
                <div className="flex flex-col gap-3">
                  {Object.entries(notifications).map(([key, val]) => {
                    const labels: Record<string, { label: string; desc: string }> = {
                      scamAlerts: { label: "Scam Alerts", desc: "Get notified when new scams are detected in your area" },
                      communityReports: { label: "Community Reports", desc: "Updates when your reports are verified or upvoted" },
                      learningReminders: { label: "Learning Reminders", desc: "Gentle nudges to continue your media literacy journey" },
                      syncStatus: { label: "Sync Status", desc: "Notifications when offline sync completes" },
                      weeklyDigest: { label: "Weekly Digest", desc: "Summary of verification activity in your community" },
                    };
                    const { label, desc } = labels[key] ?? { label: key, desc: "" };
                    return (
                      <div key={key} className={`flex items-center justify-between py-2 border-b last:border-0 ${isDark ? "border-white/6" : "border-slate-100"}`}>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--tng-text-1)" }}>{label}</p>
                          <p className="text-[10px]" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{desc}</p>
                        </div>
                        <button onClick={() => setNotifications((n) => ({ ...n, [key]: !val }))}
                          className={`w-11 h-6 rounded-full border transition-all flex items-center ${val ? "bg-[#F5B800] border-[#F5B800] justify-end" : isDark ? "bg-white/8 border-white/15 justify-start" : "bg-slate-100 border-slate-200 justify-start"}`}>
                          <span className={`w-4 h-4 rounded-full bg-white shadow mx-1 transition-all`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Activity Log */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className={`p-6 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                <h3 className="font-bold text-sm mb-5 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}><Clock size={14} className="text-[#F5B800]" />Recent Activity</h3>
                <div className="flex flex-col gap-0.5">
                  {activityLog.map((ev, i) => {
                    const Icon = ev.icon;
                    return (
                      <div key={i} className={`flex items-start gap-3 py-3 border-b last:border-0 ${isDark ? "border-white/6" : "border-slate-100"}`}>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ev.color + "22" }}>
                          <Icon size={14} style={{ color: ev.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold" style={{ color: "var(--tng-text-1)" }}>{ev.action}</p>
                          <p className="text-xs" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{ev.detail}</p>
                        </div>
                        <span className={`text-[10px] whitespace-nowrap flex-shrink-0 ${isDark ? "text-blue-200/35" : "text-slate-400"}`}>{ev.time}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
