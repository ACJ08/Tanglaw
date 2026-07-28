import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Clock, Users, CheckCircle, Phone, ChevronRight, Search, Filter, Navigation } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import truthHubImg from "@/imports/7__Truth_Hub.png";
import mapImg from "@/imports/8__map.png";
import { useTheme } from "@/app/context/ThemeContext";

const hubs = [
  { id: 1, name: "Barangay 15 Community Hall", address: "P. Burgos St., Brgy. 15", distance: "0.4 km", status: "open", hours: "8AM – 8PM", volunteers: 3, verifications: 142, services: ["Walk-in verification", "Media literacy class", "Offline kiosk"], type: "Barangay Hall" },
  { id: 2, name: "San Pedro Elementary School Library", address: "Rizal Ave., San Pedro", distance: "1.2 km", status: "open", hours: "7AM – 5PM", volunteers: 2, verifications: 89, services: ["Student fact-checking", "Teacher resources", "Verification kiosk"], type: "School" },
  { id: 3, name: "Maliwanag Community Library", address: "Bonifacio St., Central", distance: "2.1 km", status: "open", hours: "9AM – 6PM", volunteers: 4, verifications: 211, services: ["Walk-in verification", "Media workshop", "QR sharing"], type: "Library" },
  { id: 4, name: "St. Theresa Parish Center", address: "Del Pilar St., Brgy. 22", distance: "3.8 km", status: "closed", hours: "Open tomorrow 8AM", volunteers: 1, verifications: 64, services: ["Community verification", "Elder support"], type: "Community Center" },
];

export default function TruthHubPage() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = hubs.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  const selected = hubs.find((h) => h.id === selectedId) ?? null;

  const cardShadow = !isDark ? "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" : undefined;

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-24 pb-10 overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4187E]/15 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1B2F6E]/50 blur-[120px] rounded-full" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4187E]/40 bg-[#D4187E]/10 text-[#F090C0] text-xs font-semibold mb-6">
              <MapPin size={12} className="text-[#D4187E]" />Physical Verification Network
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "var(--tng-text-1)" }}>
              Truth Hub<br />
              <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Network
              </em>
            </h1>
            <p className="leading-relaxed mb-6" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
              Truth Hubs are community-staffed verification centers located in barangay halls, schools, and libraries. Walk in, verify any claim, and get in-person guidance from trained community validators.
            </p>
            <div className="flex gap-6">
              {[["4", "Nearby Hubs"], ["12", "Total Hubs"], ["500+", "Verifications Done"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-extrabold" style={{ color: "var(--tng-text-1)" }}>{v}</p>
                  <p className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Layered visual — Truth Hub + Map */}
          <div className="relative flex justify-center items-center h-72 lg:h-80">
            {/* Map bg card */}
            <div className={`absolute inset-0 rounded-3xl border overflow-hidden ${isDark ? "border-white/10 bg-gradient-to-br from-[#0C1A3A] to-[#050E24]" : "border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200"}`}>
              <div className="absolute inset-0 opacity-15">
                {/* Simulated map grid */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute border-t border-white/20" style={{ top: `${i * 14}%`, left: 0, right: 0 }} />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="absolute border-l border-white/20" style={{ left: `${i * 16.6}%`, top: 0, bottom: 0 }} />
                ))}
              </div>
              {/* Animated location pins */}
              {[[20, 30], [55, 45], [75, 25], [35, 70]].map(([x, y], i) => (
                <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <div className="relative">
                    <MapPin size={22} className={i === 0 ? "text-[#F5B800]" : "text-[#D4187E]/70"} fill={i === 0 ? "#F5B80033" : "transparent"} />
                    {i === 0 && (
                      <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-[#F5B800]/40" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Map image badge */}
            <div className={`absolute bottom-4 right-4 w-24 h-24 rounded-2xl border border-[#F5B800]/30 backdrop-blur p-2 ${isDark ? "bg-[#0C1A3A]/90" : "bg-white/90"}`}>
              <ImageWithFallback src={mapImg} alt="Location map" className="w-full h-full object-contain" />
            </div>
            {/* Truth Hub character — floats above */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10">
              <ImageWithFallback src={truthHubImg} alt="Liyab running to Truth Hub"
                className="w-48 sm:w-56 object-contain drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hub Finder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" style={{ background: "var(--tng-page)" }}>
        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border ${isDark ? "border-white/12 bg-white/5" : "border-slate-200 bg-white"}`}
            style={{ boxShadow: cardShadow }}>
            <Search size={16} className={isDark ? "text-blue-200/40" : "text-slate-400"} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or address..."
              className={`flex-1 bg-transparent text-sm focus:outline-none ${isDark ? "text-white placeholder-blue-200/30" : "placeholder-slate-400"}`}
              style={{ fontFamily: "'Inter',sans-serif", color: isDark ? undefined : "var(--tng-text-1)" }} />
          </div>
          <button className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm transition-colors ${isDark ? "border-white/12 bg-white/5 text-blue-200/60 hover:bg-white/10" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}>
            <Filter size={15} />Filter
          </button>
          <button className={`flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#F5B800]/30 bg-[#F5B800]/10 text-sm font-semibold hover:bg-[#F5B800]/20 transition-colors ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}>
            <Navigation size={15} />Near Me
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {filtered.map((hub, i) => (
            <motion.div key={hub.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedId(selectedId === hub.id ? null : hub.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedId === hub.id ? "border-[#F5B800]/50 bg-[#F5B800]/8" : isDark ? "border-white/10 bg-white/4 hover:border-white/20" : "border-slate-200 bg-white hover:border-slate-300"}`}
              style={{ boxShadow: selectedId !== hub.id ? cardShadow : undefined }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isDark ? "border-white/15 text-blue-200/60" : "border-slate-200 text-slate-500"}`}>{hub.type}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hub.status === "open" ? "bg-green-500/15 text-green-400" : isDark ? "bg-white/10 text-blue-200/40" : "bg-slate-100 text-slate-400"}`}>
                      {hub.status === "open" ? "● Open Now" : "Closed"}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: "var(--tng-text-1)" }}>{hub.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{hub.address}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: "var(--tng-gold-text)" }}>{hub.distance}</p>
                  <p className={`text-[10px] ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>away</p>
                </div>
              </div>

              <div className="flex gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tng-text-3)" }}>
                  <Clock size={12} />{hub.hours}
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tng-text-3)" }}>
                  <Users size={12} />{hub.volunteers} validators
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tng-text-3)" }}>
                  <CheckCircle size={12} className="text-green-500" />{hub.verifications} done
                </div>
              </div>

              {selectedId === hub.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                  <div className={`pt-3 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <p className="text-xs font-semibold mb-2" style={{ color: "var(--tng-text-1)" }}>Services Available:</p>
                    <div className="flex flex-col gap-1.5 mb-4">
                      {hub.services.map((s) => (
                        <div key={s} className="flex items-center gap-2 text-xs" style={{ color: "var(--tng-text-3)" }}>
                          <CheckCircle size={11} className="text-[#F5B800]" />{s}
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm flex items-center justify-center gap-2">
                      <Navigation size={14} />Get Directions
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl border border-[#D4187E]/20 bg-[#D4187E]/8 text-center">
          <p className="font-bold mb-1" style={{ color: "var(--tng-text-1)" }}>Want to become a Truth Hub?</p>
          <p className="text-sm mb-4" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>Any barangay hall, school, or community center can apply to host a Truth Hub.</p>
          <button className="px-6 py-2.5 rounded-full border border-[#D4187E]/50 text-[#F090C0] font-semibold text-sm hover:bg-[#D4187E]/15 transition-colors">
            Apply for Partnership
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
