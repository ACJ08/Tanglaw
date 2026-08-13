import { useState } from "react";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { Users, ThumbsUp, Flag, CheckCircle, Clock, MapPin, TrendingUp, Shield, Award, Plus, Search, Trash2 } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { useTheme } from "@/app/context/ThemeContext";
import { useCommunityData } from "./useCommunityData";
import { SubmitReportDialog } from "./SubmitReportDialog";
import { CommunityReport } from "./community.types";

const typeColor: Record<string, string> = {
  Scam: "#EF4444", Health: "#8B5CF6", Election: "#F59E0B", Misinformation: "#D4187E",
};

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  "Confirmed Scam": { color: "#EF4444", icon: Shield },
  "Confirmed False": { color: "#EF4444", icon: Shield },
  "Under Investigation": { color: "#F59E0B", icon: Clock },
  "Unverified": { color: "#8B5CF6", icon: Clock },
  "Disputed": { color: "#D4187E", icon: Flag },
};

export default function CommunityPage() {
  const { isDark } = useTheme();
  const { reports, localUserId, isLoading, toggleVote, addReport, statsThisWeek, topContributors, resetData } = useCommunityData();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.body.toLowerCase().includes(search.toLowerCase()) ||
    r.user.toLowerCase().includes(search.toLowerCase())
  );

  const cardShadow = !isDark ? "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" : undefined;

  if (isLoading) {
    return <PageLayout><div className="pt-24 text-center" style={{ color: "var(--tng-text-2)" }}>Loading community data...</div></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1B2F6E]/50 blur-[120px] rounded-full pointer-events-none" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4187E]/40 bg-[#D4187E]/10 text-[#F090C0] text-xs font-semibold mb-5">
              <Users size={12} />Community-Powered Verification
            </span>
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "var(--tng-text-1)" }}>
              Community <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reports</em>
            </h1>
            <p className="max-w-xl" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
              Every Filipino can flag misinformation. Reports are cross-verified by trained community validators and Tanglaw's AI before receiving a verdict.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Feed */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className={`flex-1 flex items-center gap-3 px-4 py-2 rounded-full border ${isDark ? "border-white/12 bg-white/5" : "border-slate-200 bg-white"}`}>
                  <Search size={15} className={isDark ? "text-blue-200/40" : "text-slate-500"} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search reports by title, user, or content..."
                    className={`w-full bg-transparent text-sm focus:outline-none ${isDark ? "placeholder-blue-200/40" : "placeholder-slate-500"}`}
                  />
                </div>
                <button onClick={() => setIsSubmitOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-xs">
                  <Plus size={13} />Submit Report
                </button>
              </div>
              {filteredReports.map((r, i) => {
                const sConfig = statusConfig[r.status];
                const SIcon = sConfig?.icon ?? Clock;
                return (
                  <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`p-5 rounded-2xl border transition-all ${isDark ? "border-white/10 bg-white/4 hover:border-white/18" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    style={{ boxShadow: cardShadow }}>
                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: (typeColor[r.type] ?? "#8B5CF6") + "22", color: typeColor[r.type] ?? "#8B5CF6" }}>
                        {r.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold"
                        style={{ color: sConfig?.color ?? "#8B5CF6" }}>
                        <SIcon size={11} />{r.status}
                      </span>
                      <span className={`ml-auto flex items-center gap-1 text-xs ${isDark ? "text-blue-200/40" : "text-slate-500"}`}>
                        <MapPin size={11} />{r.location} · {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}
                      </span>
                    </div>

                    <h3 className="font-bold mb-2 text-sm" style={{ color: "var(--tng-text-1)" }}>{r.title}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{r.body}</p>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1.5 text-xs ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-[10px] font-bold text-white">
                          {r.user[0]}
                        </div>
                        {r.user} {r.userId === localUserId && "(You)"} · {r.role}
                        {r.isVerified && <CheckCircle size={11} className="text-green-500 ml-1">
                          <title>Officially Verified</title>
                        </CheckCircle>}
                      </div>
                      <button onClick={() => toggleVote(r.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${r.votes.includes(localUserId) ? "bg-[#F5B800]/20 text-[#F5B800]" : isDark ? "border border-white/15 text-blue-200/50 hover:border-[#F5B800]/30 hover:text-[#F5B800]" : "border border-slate-200 text-slate-500 hover:border-[#F5B800]/30 hover:text-[#F5B800]"}`}>
                        <ThumbsUp size={12} />{r.votes.length}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Trend Stats */}
              <div className={`p-5 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <TrendingUp size={16} className="text-[#F5B800]" />This Week
                </h3>
                {[
                  { label: "Reports Submitted", value: statsThisWeek.reportsSubmitted, delta: "" },
                  { label: "Verified & Confirmed", value: statsThisWeek.verifiedAndConfirmed, delta: "" },
                  { label: "Scams Prevented", value: statsThisWeek.scamsPrevented, delta: "" },
                ].map(({ label, value, delta }) => (
                  <div key={label} className={`flex items-center justify-between py-2 border-b last:border-0 ${isDark ? "border-white/8" : "border-slate-100"}`}>
                    <span className="text-xs" style={{ color: "var(--tng-text-3)" }}>{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: "var(--tng-text-1)" }}>{value}</span>
                      <span className="text-[10px] text-green-400">{delta}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Contributors */}
              <div className={`p-5 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={{ boxShadow: cardShadow }}>
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Award size={16} className="text-[#F5B800]" />Top Contributors
                </h3>
                <div className="flex flex-col gap-3">
                  {topContributors.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>{c.name}</p>
                        <p className="text-[10px]" style={{ color: "var(--tng-text-3)" }}>{c.badge} · {c.reportsVerified} verified</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report a scam */}
              <div className="p-5 rounded-2xl border border-[#D4187E]/25 bg-[#D4187E]/8">
                <Flag size={20} className="text-[#D4187E] mb-3" />
                <p className="font-bold mb-1 text-sm" style={{ color: "var(--tng-text-1)" }}>Spot something suspicious?</p>
                <p className="text-xs mb-4" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
                  Your report could protect hundreds of community members from a scam.
                </p>
                <button onClick={() => setIsSubmitOpen(true)} className="w-full py-2.5 rounded-xl border border-[#D4187E]/50 text-[#F090C0] font-semibold text-sm hover:bg-[#D4187E]/15 transition-colors">
                  Submit a Report
                </button>
              </div>

              {/* Dev only reset */}
              <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/8 flex items-start gap-3">
                <Trash2 size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>Reset Data</p>
                  <p className={`text-[10px] mt-0.5 ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>For testing only. This clears all local community data.</p>
                </div>
                <button onClick={resetData} className="px-3 py-1 rounded-lg border border-red-500/40 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubmitReportDialog isOpen={isSubmitOpen} onOpenChange={setIsSubmitOpen} onSubmit={addReport} />
    </PageLayout>
  );
}
