import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WifiOff, Shield, AlertTriangle, Search, Clock, CheckCircle, Download, RefreshCw, Database, Zap } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import offlineModeImg from "@/imports/10__Offline_Mode.png";
import { useTheme } from "@/app/context/ThemeContext";

const threatEntries = [
  { id: 1, type: "Financial Scam", title: "GCash Account Suspension Scam", severity: "critical", pattern: "Fake SMS claiming GCash account suspension with external link", lastSeen: "2 days ago", reports: 847 },
  { id: 2, type: "Health Misinformation", title: "Miracle Cure Claims", severity: "high", pattern: "Claims of miraculous cures for chronic diseases using local herbs", lastSeen: "1 week ago", reports: 312 },
  { id: 3, type: "Government Impersonation", title: "Fake DSWD Cash Aid Messages", severity: "critical", pattern: "Texts or posts claiming DSWD, SSS, or PhilHealth cash distribution via GCash", lastSeen: "3 days ago", reports: 1204 },
  { id: 4, type: "Election Disinformation", title: "Manipulated Candidate Endorsements", severity: "medium", pattern: "AI-generated images or videos showing celebrities endorsing candidates", lastSeen: "2 weeks ago", reports: 189 },
  { id: 5, type: "Disaster Scam", title: "Typhoon Relief Donation Fraud", severity: "high", pattern: "Fake NGO collection pages appearing after major typhoons", lastSeen: "5 days ago", reports: 523 },
  { id: 6, type: "Investment Fraud", title: "Ponzi & Crypto Scam Patterns", severity: "critical", pattern: "High-return investment promises via social media with celebrity endorsements", lastSeen: "1 day ago", reports: 2891 },
];

const syncSteps = [
  { icon: WifiOff, label: "Device Offline", status: "done", desc: "Local threat ledger active" },
  { icon: Zap, label: "Connection Detected", status: "done", desc: "Wi-Fi / mobile data found" },
  { icon: Database, label: "Ledger Update", status: "active", desc: "Fetching new threat entries" },
  { icon: RefreshCw, label: "Community Sync", status: "pending", desc: "Merging community reports" },
  { icon: CheckCircle, label: "Devices Updated", status: "pending", desc: "Offline cache refreshed" },
];

const severityConfig = {
  critical: { color: "#EF4444", label: "CRITICAL" },
  high: { color: "#F59E0B", label: "HIGH" },
  medium: { color: "#8B5CF6", label: "MEDIUM" },
};

export default function OfflinePage() {
  const [search, setSearch] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const { isDark } = useTheme();

  const filtered = threatEntries.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setSyncDone(true); }, 2500);
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#1B2F6E]/50 blur-[120px] rounded-full pointer-events-none" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F5B800]/40 bg-[#F5B800]/10 text-xs font-semibold mb-5 ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>
                <WifiOff size={12} />Offline-First · Always Available
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "var(--tng-text-1)" }}>
                Offline Threat<br />
                <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Ledger
                </em>
              </h1>
              <p className={`mb-6 ${isDark ? "text-blue-200/65" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                Tanglaw caches a verified database of known scams, misinformation patterns, and threats locally on your device — so you're protected even without internet.
              </p>

              {/* Cache status */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-green-500/30 bg-green-500/10">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold text-green-400">214 threats cached</span>
                </div>
                <button onClick={handleSync} disabled={syncing}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#F5B800]/30 bg-[#F5B800]/10 text-xs font-semibold hover:bg-[#F5B800]/20 transition-colors ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>
                  <motion.div animate={syncing ? { rotate: 360 } : { rotate: 0 }}
                    transition={syncing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}>
                    <RefreshCw size={13} />
                  </motion.div>
                  {syncing ? "Syncing..." : syncDone ? "Synced ✓" : "Sync Now"}
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex justify-center">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <ImageWithFallback src={offlineModeImg} alt="Liyab sleeping while offline sync happens"
                  className="w-56 sm:w-72 object-contain drop-shadow-2xl" />
              </motion.div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Threat Ledger */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border ${isDark ? "border-white/12 bg-white/5" : "border-slate-200 bg-white"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                >
                  <Search size={15} className={isDark ? "text-blue-200/40" : "text-slate-400"} />
                  <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search threats by name or type..."
                    className={`flex-1 bg-transparent text-sm focus:outline-none ${isDark ? "text-white placeholder-blue-200/30" : "placeholder-slate-400"}`}
                    style={{ fontFamily: "'Inter',sans-serif", color: isDark ? undefined : "var(--tng-text-1)" }} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {filtered.map((entry, i) => {
                  const cfg = severityConfig[entry.severity as keyof typeof severityConfig];
                  return (
                    <motion.div key={entry.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`p-5 rounded-2xl border transition-all group ${isDark ? "border-white/10 bg-white/4 hover:border-white/18" : "border-slate-200 bg-white hover:border-slate-300"}`}
                      style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                    >
                      <div className="flex items-start gap-3 mb-2 flex-wrap">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                          style={{ background: cfg.color + "22", color: cfg.color }}>
                          {cfg.label}
                        </span>
                        <span className={`text-xs border px-2 py-0.5 rounded-full ${isDark ? "text-blue-200/50 border-white/10" : "text-slate-500 border-slate-200"}`}>{entry.type}</span>
                        <span className={`ml-auto text-xs flex items-center gap-1 ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>
                          <Clock size={11} />Last seen: {entry.lastSeen}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm mb-1.5" style={{ color: "var(--tng-text-1)" }}>{entry.title}</h3>
                      <p className={`text-xs mb-3 leading-relaxed ${isDark ? "text-blue-200/55" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{entry.pattern}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs flex items-center gap-1 ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>
                          <AlertTriangle size={11} style={{ color: cfg.color }} />
                          {entry.reports.toLocaleString()} community reports
                        </span>
                        <button className={`text-xs font-semibold hover:text-[#FFD44D] transition-colors flex items-center gap-1 ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>
                          <Shield size={11} />Mark as Known
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sync Visualization */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--tng-text-1)" }}>Sync Status</h3>
              <div
                className={`p-5 rounded-2xl border mb-4 ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <div className="flex flex-col gap-3">
                  {syncSteps.map((step, i) => {
                    const Icon = step.icon;
                    const status = syncing && step.status === "active" ? "syncing" : step.status;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${status === "done" ? "bg-green-500/20" : status === "syncing" ? "bg-[#F5B800]/20" : isDark ? "bg-white/8" : "bg-slate-100"}`}>
                          <motion.div animate={status === "syncing" ? { rotate: 360 } : {}}
                            transition={status === "syncing" ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}>
                            <Icon size={15} className={status === "done" ? "text-green-500" : status === "syncing" ? "text-[#F5B800]" : isDark ? "text-blue-200/30" : "text-slate-300"} />
                          </motion.div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-semibold ${status === "done" ? "text-green-400" : status === "syncing" ? "text-[#F5B800]" : isDark ? "text-blue-200/40" : "text-slate-400"}`}>
                            {step.label}
                          </p>
                          <p className={`text-[10px] ${isDark ? "text-blue-200/35" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* P2P Sharing */}
              <div className="p-5 rounded-2xl border border-[#D4187E]/20 bg-[#D4187E]/8">
                <h4 className="font-bold mb-2 text-sm" style={{ color: "var(--tng-text-1)" }}>P2P Sharing</h4>
                <p className={`text-xs mb-4 leading-relaxed ${isDark ? "text-blue-200/55" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                  Share the threat ledger with nearby devices via QR code — no internet needed.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["QR Code", "Wi-Fi Direct", "Bluetooth"].map((method) => (
                    <button key={method} className={`py-2 rounded-xl border text-[10px] font-semibold transition-all hover:border-[#D4187E]/40 hover:text-[#F090C0] ${isDark ? "border-white/12 text-blue-200/60" : "border-slate-200 text-slate-500"}`}>
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/6 flex items-start gap-3">
                <Download size={16} className="text-[#F5B800] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>Auto-Download</p>
                  <p className={`text-[10px] mt-0.5 ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>New threats sync automatically when you connect. Last update: 12 min ago.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
