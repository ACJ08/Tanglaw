import { useState, useRef, ChangeEvent } from "react";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { WifiOff, Shield, AlertTriangle, Search, Clock, CheckCircle, Download, RefreshCw, Database, Zap, Upload, Trash2, QrCode, Wifi, Bluetooth } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { PageLayout } from "@/app/components/Layout";
import { toast } from "sonner"; // Added import for toast
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import offlineModeImg from "@/imports/10__Offline_Mode.png";
import { useTheme } from "@/app/context/ThemeContext";
import { useThreatLedger } from "./useThreatLedger";
import { ThreatFilter } from "./threatLedger.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";



const severityConfig = {
  critical: { color: "#EF4444", label: "CRITICAL" },
  high: { color: "#F59E0B", label: "HIGH" },
  medium: { color: "#8B5CF6", label: "MEDIUM" },
  low: { color: "#22C55E", label: "LOW" },
};

const syncStepsConfig = [
  { icon: WifiOff, label: "Device Offline", desc: "Local threat ledger active" },
  { icon: Zap, label: "Connection Detected", desc: "Wi-Fi / mobile data found" },
  { icon: Database, label: "Ledger Update", desc: "Fetching new threat entries" },
  { icon: RefreshCw, label: "Community Sync", desc: "Merging community reports" },
  { icon: CheckCircle, label: "Devices Updated", desc: "Offline cache refreshed" },
];

const filterOptions: { label: string; value: ThreatFilter }[] = [
    { label: "All", value: "all" },
    { label: "Critical", value: "critical" },
    { label: "High", value: "high" },
    { label: "Known", value: "known" },
];

export default function OfflinePage() {
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { isDark } = useTheme();
  const importFileRef = useRef<HTMLInputElement>(null);
  const { threats, totalThreatCount, syncMeta, search, setSearch, filter, setFilter, isOnline, toggleKnownStatus, incrementReportCount, handleSync: runThreatLedgerSync, handleReset, exportLedger, importLedger } = useThreatLedger();

  const startSyncProcess = () => {
    setSyncing(true);
    setSyncProgress(0);
    runThreatLedgerSync((step) => { // Corrected function name
      setSyncProgress(step);
      if (step >= syncStepsConfig.length) {
        setSyncing(false);
      }
    }); // Removed incorrect second argument
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
                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${isOnline ? 'border-green-500/30 bg-green-500/10' : 'border-violet-500/30 bg-violet-500/10'}`}>
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-violet-500'}`} />
                  <span className={`text-xs font-semibold ${isOnline ? 'text-green-400' : 'text-violet-400'}`}>{isOnline ? 'Online' : 'Offline'} · {totalThreatCount} threats cached</span>
                </div>
                <button onClick={startSyncProcess} disabled={syncing}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#F5B800]/30 bg-[#F5B800]/10 text-xs font-semibold hover:bg-[#F5B800]/20 transition-colors ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>
                  <motion.div animate={syncing ? { rotate: 360 } : { rotate: 0 }}
                    transition={syncing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}>
                    <RefreshCw size={13} />
                  </motion.div>
                  {syncing ? "Syncing..." : syncMeta.lastSyncAt ? "Synced" : "Sync Now"}
                </button>
              </div>
              <p className="text-[10px] mt-2" style={{color: "var(--tng-text-3)"}}>
                {syncMeta.lastSyncAt ? `Last sync: ${formatDistanceToNow(new Date(syncMeta.lastSyncAt), { addSuffix: true })}` : 'Ready to sync.'}
              </p>
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
                <div className="flex items-center gap-2">
                    {filterOptions.map(opt => (
                        <button key={opt.value} onClick={() => setFilter(opt.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === opt.value ? 'bg-[#F5B800]/20 text-[#F5B800]' : isDark ? 'bg-white/5 text-blue-200/50 hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
              </div>
              {threats.length === 0 && search === "" && filter === "all" ? ( // Added conditions for empty state
                <div className={`p-8 text-center rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                    <p className="font-semibold" style={{color: "var(--tng-text-1)"}}>No Threats Found</p>
                    <p className="text-sm mt-1" style={{color: "var(--tng-text-3)"}}>Your local ledger is empty. Try importing a ledger or resetting to defaults.</p>
                </div>
              ) : (<div className="flex flex-col gap-3">
                {threats.map((entry, i) => {
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
                        <button onClick={() => incrementReportCount(entry.id)} className={`text-xs flex items-center gap-1 ${isDark ? "text-blue-200/40 hover:text-blue-200/70" : "text-slate-400 hover:text-slate-600"}`}>
                          <AlertTriangle size={11} style={{ color: cfg.color }} />
                          {entry.reports.toLocaleString()} community reports
                        </button>
                        <button onClick={() => toggleKnownStatus(entry.id)} className={`text-xs font-semibold transition-colors flex items-center gap-1 ${entry.known ? 'text-green-400' : isDark ? "text-[#F5B800] hover:text-[#FFD44D]" : "text-[#1B2F6E] hover:text-black"}`}>
                          {entry.known ? <CheckCircle size={12} /> : <Shield size={11} />}
                          {entry.known ? "Known" : "Mark as Known"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>)}
            </div>

            {/* Sync Visualization */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--tng-text-1)" }}>Sync Status</h3>
              <div
                className={`p-5 rounded-2xl border mb-4 ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <div className="flex flex-col gap-3">
                  {syncStepsConfig.map((step, i) => {
                    const Icon = step.icon;
                    const status = syncing ? (i < syncProgress ? "done" : i === syncProgress ? "syncing" : "pending") : (syncMeta.lastSyncAt ? "done" : "pending");
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${status === "done" ? "bg-green-500/20" : status === "syncing" ? "bg-[#F5B800]/20" : isDark ? "bg-white/8" : "bg-slate-100"}`}>
                          <motion.div animate={status === "syncing" ? { rotate: 360 } : {}}
                            transition={status === "syncing" ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}>
                            <Icon size={15} className={status === "done" ? "text-green-500" : status === "syncing" ? "text-[#F5B800]" : isDark ? "text-blue-200/30" : "text-slate-300"} />
                          </motion.div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-semibold transition-colors ${status === "done" ? "text-green-400" : status === "syncing" ? "text-[#F5B800]" : isDark ? "text-blue-200/40" : "text-slate-400"}`}>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className={`py-2 rounded-xl border text-[10px] font-semibold transition-all hover:border-[#D4187E]/40 hover:text-[#F090C0] ${isDark ? "border-white/12 text-blue-200/60" : "border-slate-200 text-slate-500"}`}><QrCode size={12} className="inline-block mr-1"/>QR Code</button>
                    </DialogTrigger>
                    <DialogContent className={isDark ? "bg-[#0C1A3A] border-white/15" : ""}>
                      <DialogHeader><DialogTitle>Share via QR Code</DialogTitle></DialogHeader>
                      <div className="p-4 bg-white rounded-lg mx-auto">
                        <QRCodeCanvas value={JSON.stringify({type: "tanglaw-threat-ledger", version: 1, threats})} size={200} />
                      </div>
                      <p className="text-xs text-center" style={{color: "var(--tng-text-3)"}}>Scan this code with another Tanglaw device to import the ledger.</p>
                    </DialogContent>
                  </Dialog>
                  <button onClick={() => toast.info("P2P sharing via Wi-Fi Direct is a planned feature.")} className={`py-2 rounded-xl border text-[10px] font-semibold transition-all hover:border-[#D4187E]/40 hover:text-[#F090C0] ${isDark ? "border-white/12 text-blue-200/60" : "border-slate-200 text-slate-500"}`}><Wifi size={12} className="inline-block mr-1"/>Wi-Fi Direct</button>
                  <button onClick={() => toast.info("P2P sharing via Bluetooth is a planned feature.")} className={`py-2 rounded-xl border text-[10px] font-semibold transition-all hover:border-[#D4187E]/40 hover:text-[#F090C0] ${isDark ? "border-white/12 text-blue-200/60" : "border-slate-200 text-slate-500"}`}><Bluetooth size={12} className="inline-block mr-1"/>Bluetooth</button>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/6 flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>Ledger Management</p>
                  <p className={`text-[10px] mt-0.5 ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>Export your local ledger or import one from a file.</p>
                </div>
                <div className="flex gap-2">
                    <input type="file" accept=".json" ref={importFileRef} className="hidden" onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && importLedger(e.target.files[0])} />
                    <button onClick={() => importFileRef.current?.click()} className={`p-2 rounded-lg border transition-all ${isDark ? "border-white/10 text-blue-200/60 hover:bg-white/5" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}><Upload size={14} /></button>
                    <button onClick={exportLedger} className={`p-2 rounded-lg border transition-all ${isDark ? "border-white/10 text-blue-200/60 hover:bg-white/5" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}><Download size={14} /></button>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl border border-red-500/20 bg-red-500/8 flex items-start gap-3">
                <Trash2 size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>Reset Ledger</p>
                  <p className={`text-[10px] mt-0.5 ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>This will clear your local data and restore the default threat entries.</p>
                </div>
                <button onClick={handleReset} className="px-3 py-1 rounded-lg border border-red-500/40 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
