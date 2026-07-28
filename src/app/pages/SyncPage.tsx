import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Wifi, WifiOff, Database, Network, Share2, CheckCircle, Clock, Zap, Lock, Globe } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { useTheme } from "@/app/context/ThemeContext";

const syncNodes = [
  { id: "device", label: "Your Device", x: 50, y: 50, type: "primary" },
  { id: "hub1", label: "Brgy. 15 Hub", x: 18, y: 20, type: "hub" },
  { id: "hub2", label: "School Library", x: 80, y: 18, type: "hub" },
  { id: "hub3", label: "Community Hub", x: 82, y: 76, type: "hub" },
  { id: "peer1", label: "Neighbor A", x: 22, y: 72, type: "peer" },
  { id: "peer2", label: "Neighbor B", x: 10, y: 46, type: "peer" },
  { id: "cloud", label: "Tanglaw Server", x: 50, y: 10, type: "server" },
];

const edges = [
  { from: "device", to: "hub1" },
  { from: "device", to: "hub2" },
  { from: "device", to: "hub3" },
  { from: "device", to: "peer1" },
  { from: "device", to: "peer2" },
  { from: "device", to: "cloud" },
  { from: "hub1", to: "cloud" },
  { from: "hub2", to: "cloud" },
];

const syncEvents = [
  { time: "Just now", msg: "Received 3 new threat entries from Brgy. 15 Hub", type: "received", icon: Database },
  { time: "2 min ago", msg: "Shared ledger snapshot with 2 nearby devices via Wi-Fi Direct", type: "shared", icon: Share2 },
  { time: "8 min ago", msg: "Cryptographic verification passed — ledger integrity confirmed", type: "success", icon: Lock },
  { time: "14 min ago", msg: "Full sync with Tanglaw server completed (47 new entries)", type: "received", icon: RefreshCw },
  { time: "1h ago", msg: "Offline mode activated — local cache served 12 verifications", type: "offline", icon: WifiOff },
];

const replicationStats = [
  { label: "Nodes in Network", value: "2,847", icon: Network, color: "#F5B800" },
  { label: "Entries Replicated", value: "94,211", icon: Database, color: "#D4187E" },
  { label: "Sync Events Today", value: "1,430", icon: RefreshCw, color: "#4A9EF5" },
  { label: "Verified Integrity", value: "100%", icon: Lock, color: "#22C55E" },
];

const typeColor = {
  received: "#4A9EF5",
  shared: "#F5B800",
  success: "#22C55E",
  offline: "#8B5CF6",
};

export default function SyncPage() {
  const [online, setOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { isDark } = useTheme();

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2800);
  };

  const nodeColor = {
    primary: "#F5B800",
    hub: "#D4187E",
    peer: "#4A9EF5",
    server: "#22C55E",
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B2F6E]/40 blur-[130px] rounded-full pointer-events-none" />}
        {isDark && <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4187E]/15 blur-[120px] rounded-full pointer-events-none" />}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4A9EF5]/40 bg-[#4A9EF5]/10 text-[#4A9EF5] text-xs font-semibold mb-5">
              <Network size={12} />Lightweight Synchronization · Decentralized Replication
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3" style={{ color: "var(--tng-text-1)" }}>
                  Sync &amp; <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Replicate</em>
                </h1>
                <p className={`max-w-xl ${isDark ? "text-blue-200/60" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                  Tanglaw's lightweight sync protocol keeps the threat ledger updated across the entire community network — even when most nodes are offline.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={() => setOnline((v) => !v)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${online ? "border-green-500/40 bg-green-500/10 text-green-400" : "border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#8B5CF6]"}`}>
                  {online ? <Wifi size={14} /> : <WifiOff size={14} />}
                  {online ? "Online" : "Offline"}
                </button>
                <button onClick={triggerSync} disabled={syncing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm disabled:opacity-60 transition-all">
                  <motion.div animate={syncing ? { rotate: 360 } : {}} transition={syncing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}>
                    <RefreshCw size={14} />
                  </motion.div>
                  {syncing ? "Syncing..." : "Sync Now"}
                </button>
              </div>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {replicationStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`p-4 rounded-2xl border flex items-center gap-3 ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                    style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color + "22" }}>
                      <Icon size={16} style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold leading-tight" style={{ color: "var(--tng-text-1)" }}>{s.value}</p>
                      <p className={`text-[10px] ${isDark ? "text-blue-200/45" : "text-slate-400"}`}>{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Network Visualization */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--tng-text-1)" }}>Live Network Graph</h2>
              {/* bg-[#0A1628] in dark, bg-slate-100 in light */}
              <div
                className={`relative rounded-3xl border overflow-hidden ${isDark ? "border-white/12 bg-[#0A1628]" : "border-slate-200 bg-slate-100"}`}
                style={{ paddingBottom: "75%" }}
              >
                <div className="absolute inset-4">
                  {/* SVG edges */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {edges.map((edge, i) => {
                      const from = syncNodes.find((n) => n.id === edge.from)!;
                      const to = syncNodes.find((n) => n.id === edge.to)!;
                      const isActive = activeNode === edge.from || activeNode === edge.to;
                      return (
                        <line key={i}
                          x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                          stroke={isActive ? "#F5B800" : isDark ? "#FFFFFF18" : "#0F1E3820"} strokeWidth={isActive ? 0.8 : 0.4}
                          strokeDasharray={online ? "none" : "2,2"}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                    {/* Animated pulse on active edge */}
                    {syncing && edges.map((edge, i) => {
                      const from = syncNodes.find((n) => n.id === edge.from)!;
                      const to = syncNodes.find((n) => n.id === edge.to)!;
                      return (
                        <motion.circle key={`pulse-${i}`} r="1.2" fill="#F5B800"
                          initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                          animate={{ cx: to.x, cy: to.y, opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                        />
                      );
                    })}
                  </svg>

                  {/* Nodes */}
                  {syncNodes.map((node) => {
                    const color = nodeColor[node.type as keyof typeof nodeColor];
                    const isActive = activeNode === node.id;
                    return (
                      <motion.button key={node.id}
                        onClick={() => setActiveNode(isActive ? null : node.id)}
                        className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        whileHover={{ scale: 1.1 }}>
                        <div className="relative">
                          {isActive && (
                            <motion.div animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 rounded-full border-2"
                              style={{ borderColor: color + "66" }} />
                          )}
                          <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-lg transition-all"
                            style={{ background: color + "33", borderColor: color, boxShadow: isActive ? `0 0 12px ${color}66` : "none" }}>
                            {node.type === "server" && <Globe size={13} style={{ color }} />}
                            {node.type === "hub" && <Database size={11} style={{ color }} />}
                            {node.type === "peer" && <Share2 size={11} style={{ color }} />}
                            {node.type === "primary" && <Zap size={13} style={{ color }} />}
                          </div>
                        </div>
                        <span className={`text-[9px] font-semibold whitespace-nowrap transition-colors ${isDark ? "text-blue-200/60 group-hover:text-white" : "text-slate-500 group-hover:text-slate-800"}`}
                          style={isActive ? { color } : {}}>
                          {node.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  {Object.entries(nodeColor).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className={`text-[9px] capitalize ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protocol specs */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Delta Sync Only", desc: "Only new entries are transmitted — not the full ledger", icon: Zap },
                  { label: "Cryptographic Signatures", desc: "Each entry is signed — tamper-proof across peers", icon: Lock },
                  { label: "Gossip Protocol", desc: "Entries propagate hop-by-hop through offline nodes", icon: Share2 },
                  { label: "Offline Queue", desc: "Changes queue locally and sync when connection restores", icon: Clock },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.label}
                      className={`p-3 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                      style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={12} className="text-[#F5B800]" />
                        <span className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>{f.label}</span>
                      </div>
                      <p className={`text-[10px] leading-snug ${isDark ? "text-blue-200/50" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Sync Event Log */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--tng-text-1)" }}>Sync Event Log</h2>
              <div className="flex flex-col gap-3 mb-6">
                {syncEvents.map((ev, i) => {
                  const Icon = ev.icon;
                  const color = typeColor[ev.type as keyof typeof typeColor];
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className={`flex items-start gap-3 p-4 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                      style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "22" }}>
                        <Icon size={14} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-snug mb-1" style={{ color: "var(--tng-text-1)" }}>{ev.msg}</p>
                        <p className={`text-[10px] ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>{ev.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Decentralized Replication explanation */}
              <div className="p-5 rounded-2xl border border-[#D4187E]/25 bg-gradient-to-br from-[#D4187E]/8 to-transparent">
                <h3 className="font-bold mb-3 text-sm flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Network size={15} className="text-[#D4187E]" />Decentralized Replication
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-blue-200/60" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                  Unlike centralized systems, Tanglaw's ledger replicates across Truth Hubs, community devices, and peer nodes. If the central server is unreachable, the network continues operating — no single point of failure.
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    "No central dependency — any node can serve the ledger",
                    "Truth Hubs act as high-availability relay nodes",
                    "Peer-to-peer sharing via Wi-Fi Direct and Bluetooth",
                    "Merkle tree diff ensures minimal data transfer",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#F5B800] flex-shrink-0 mt-0.5" />
                      <span className={`text-xs ${isDark ? "text-blue-200/70" : "text-slate-600"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connectivity status */}
              <div
                className={`mt-4 p-4 rounded-2xl border flex items-center gap-4 ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <AnimatePresence mode="wait">
                  <motion.div key={String(online)} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                    {online ? (
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Wifi size={18} className="text-green-400" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
                        <WifiOff size={18} className="text-[#8B5CF6]" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "var(--tng-text-1)" }}>{online ? "Fully Connected" : "Offline Mode Active"}</p>
                  <p className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                    {online ? "Syncing with 6 nodes · Last sync: just now" : "Serving from local cache · Queue: 0 pending"}
                  </p>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${online ? "bg-green-500 animate-pulse" : "bg-[#8B5CF6]"}`} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
