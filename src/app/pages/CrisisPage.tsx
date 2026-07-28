import { useState } from "react";
import { motion } from "motion/react";
import { Radio, AlertTriangle, CheckCircle, Info, Clock, MapPin, Phone, Shield, ChevronRight, Wifi } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { useTheme } from "@/app/context/ThemeContext";

const advisories = [
  {
    id: 1, severity: "critical", type: "Scam Alert",
    title: "Typhoon Relief Donation Scam — Ongoing",
    body: "Fraudulent GCash numbers and fake NGO pages collecting donations following recent typhoon. Verified relief channels listed below.",
    time: "2 hours ago", verified: true,
    actions: ["Only donate via DSWD official: donate.dswd.gov.ph", "Verify NGO registration at SEC", "Report fake pages to PNP-ACG: 0998-598-8116"],
  },
  {
    id: 2, severity: "high", type: "Health Advisory",
    title: "Fake Medicine Sellers Near Evacuation Centers",
    body: "Reports of unlicensed vendors selling unverified medicines near Barangay 12 evacuation center. FDA advisory in effect.",
    time: "5 hours ago", verified: true,
    actions: ["Accept medicines only from identified Red Cross / DOH personnel", "Report suspicious vendors to Barangay Health Worker"],
  },
  {
    id: 3, severity: "medium", type: "Misinformation Alert",
    title: "Unverified Evacuation Route Circulating on Social Media",
    body: "A viral post showing an alternative evacuation route has not been confirmed by NDRRMC. Follow only official routes.",
    time: "8 hours ago", verified: false,
    actions: ["Follow NDRRMC official routes only: ndrrmc.gov.ph", "Contact your Barangay Emergency Coordinator"],
  },
];

const checklist = [
  { step: "Is the source identified?", desc: "Anonymous or unverifiable sources are a red flag.", done: true },
  { step: "Has it been published by official agencies?", desc: "NDRRMC, DOH, DSWD, DILG are primary authorities.", done: true },
  { step: "Does it pressure you to act immediately?", desc: "Urgency is a manipulation tactic. Pause and verify.", done: false },
  { step: "Are there identifiable links or contact numbers?", desc: "Cross-reference with official hotlines.", done: false },
  { step: "Have community members independently confirmed?", desc: "Check with Barangay officials or Truth Hubs.", done: false },
];

const hotlines = [
  { name: "NDRRMC Operations Center", number: "(02) 8911-1406" },
  { name: "DOH Emergency Hotline", number: "1555" },
  { name: "PNP Hotline", number: "117" },
  { name: "Red Cross Philippines", number: "143" },
  { name: "DSWD Crisis Hotline", number: "(02) 8931-8101" },
];

const severityConfig = {
  critical: { color: "#EF4444", bg: "bg-red-500/12", border: "border-red-500/30", label: "CRITICAL" },
  high: { color: "#F59E0B", bg: "bg-amber-500/12", border: "border-amber-500/25", label: "HIGH" },
  medium: { color: "#8B5CF6", bg: "bg-violet-500/12", border: "border-violet-500/25", label: "MEDIUM" },
};

export default function CrisisPage() {
  const [agreed, setAgreed] = useState(false);
  const [checklistState, setChecklistState] = useState(checklist.map((c) => c.done));
  const { isDark } = useTheme();

  return (
    <PageLayout>
      <div style={{ background: "var(--tng-page)" }}>
        {/* Emergency Banner — keep red, works both modes */}
        <div className="pt-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-red-600/90 to-red-700/90 border-b border-red-500/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 flex-wrap">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <Radio size={22} className="text-white flex-shrink-0" />
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">CRISIS VERIFICATION MODE ACTIVE</p>
                <p className="text-red-200 text-xs" style={{ fontFamily: "'Inter',sans-serif" }}>
                  Showing only verified advisories from NDRRMC, DOH, and accredited community partners.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-red-200">
                <Wifi size={13} /><span>Last sync: 2 min ago</span>
              </div>
            </div>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Advisories */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-extrabold" style={{ color: "var(--tng-text-1)" }}>Active Advisories</h2>
                  <span className={`text-xs flex items-center gap-1 ${isDark ? "text-blue-200/50" : "text-slate-400"}`}><Clock size={12} />Auto-updating</span>
                </div>
                <div className="flex flex-col gap-4">
                  {advisories.map((adv, i) => {
                    const cfg = severityConfig[adv.severity as keyof typeof severityConfig];
                    return (
                      <motion.div key={adv.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-5 rounded-2xl border ${cfg.border} ${cfg.bg}`}>
                        <div className="flex items-start gap-3 mb-3 flex-wrap">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full"
                            style={{ background: cfg.color + "25", color: cfg.color }}>
                            {cfg.label}
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${isDark ? "border-white/12 text-blue-200/60" : "border-slate-200 text-slate-500"}`}>
                            {adv.type}
                          </span>
                          {adv.verified && (
                            <span className="flex items-center gap-1 text-[10px] text-green-400 font-semibold">
                              <CheckCircle size={11} />Verified
                            </span>
                          )}
                          <span className={`ml-auto text-xs ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>{adv.time}</span>
                        </div>
                        <h3 className="font-bold mb-2 text-sm" style={{ color: "var(--tng-text-1)" }}>{adv.title}</h3>
                        <p className={`text-xs mb-4 leading-relaxed ${isDark ? "text-blue-200/65" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{adv.body}</p>
                        <div className="flex flex-col gap-1.5">
                          {adv.actions.map((a, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <ChevronRight size={13} style={{ color: cfg.color }} className="mt-0.5 flex-shrink-0" />
                              <span className={`text-xs ${isDark ? "text-blue-200/70" : "text-slate-600"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{a}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Checklist + Hotlines */}
              <div className="flex flex-col gap-5">
                {/* Verification Checklist */}
                <div
                  className={`p-5 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                >
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                    <Shield size={16} className="text-[#F5B800]" />Verification Checklist
                  </h3>
                  <div className="flex flex-col gap-3">
                    {checklist.map((item, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group">
                        <button onClick={() => {
                          const next = [...checklistState];
                          next[i] = !next[i];
                          setChecklistState(next);
                        }} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checklistState[i] ? "bg-[#F5B800] border-[#F5B800]" : isDark ? "border-white/25 hover:border-[#F5B800]/50" : "border-slate-300 hover:border-[#F5B800]/50"}`}>
                          {checklistState[i] && <CheckCircle size={12} className="text-[#050E24]" />}
                        </button>
                        <div>
                          <p className={`text-xs font-semibold ${checklistState[i] ? isDark ? "text-blue-200/50 line-through" : "text-slate-400 line-through" : ""}`}
                            style={!checklistState[i] ? { color: "var(--tng-text-1)" } : undefined}>{item.step}</p>
                          <p className={`text-[10px] mt-0.5 ${isDark ? "text-blue-200/40" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{item.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className={`mt-4 pt-4 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={isDark ? "text-blue-200/50" : "text-slate-400"}>Checklist progress</span>
                      <span className="font-bold" style={{ color: "var(--tng-text-1)" }}>{checklistState.filter(Boolean).length}/{checklist.length}</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                      <motion.div animate={{ width: `${(checklistState.filter(Boolean).length / checklist.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                        className="h-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Emergency Hotlines */}
                <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/8">
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                    <Phone size={16} className="text-red-400" />Emergency Hotlines
                  </h3>
                  <div className="flex flex-col gap-2">
                    {hotlines.map((h) => (
                      <div key={h.name} className={`flex items-center justify-between py-2 border-b last:border-0 ${isDark ? "border-white/8" : "border-slate-200/60"}`}>
                        <span className={`text-xs ${isDark ? "text-blue-200/65" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{h.name}</span>
                        <span className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>{h.number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Truth Hub */}
                <div className="p-5 rounded-2xl border border-[#F5B800]/25 bg-[#F5B800]/8">
                  <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                    <MapPin size={16} className="text-[#F5B800]" />Nearest Truth Hub
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: "var(--tng-text-1)" }}>Barangay 15 Hall</p>
                  <p className={`text-xs mb-3 ${isDark ? "text-blue-200/55" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>0.4 km · Open Now · 8AM–8PM</p>
                  <button className="w-full py-2.5 rounded-xl bg-[#F5B800] text-[#050E24] font-bold text-sm hover:bg-[#FFD44D] transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Safety note */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-8 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/8 flex items-start gap-3">
              <Info size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <p className={`text-sm leading-relaxed ${isDark ? "text-blue-200/70" : "text-slate-600"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                <strong style={{ color: "var(--tng-text-1)" }}>Tanglaw's Neutral Protocol:</strong> During crises, Tanglaw labels any unconfirmed information as "Unverified" rather than "False" to prevent additional confusion. Only confirmed agency statements receive "Verified" status.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
