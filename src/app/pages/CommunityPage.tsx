import { useState } from "react";
import { motion } from "motion/react";
import { Users, ThumbsUp, Flag, CheckCircle, Clock, MapPin, TrendingUp, Shield, Award, Plus } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { useTheme } from "@/app/context/ThemeContext";

const reports = [
  { id: 1, user: "Maria S.", role: "Community Member", location: "Brgy. 15", time: "2h ago", type: "Scam", title: "Fake DSWD Relief Text Blast", body: "Received SMS claiming DSWD is giving P10,000 cash aid via GCash. Number is 09XX-XXXX-XXX. DO NOT CLICK.", votes: 47, verified: true, status: "Confirmed Scam" },
  { id: 2, user: "Teacher Lorna", role: "Educator", location: "San Pedro Elem.", time: "5h ago", type: "Health", title: "Fake Medicine Vendor Near School", body: "Unknown vendor selling unpackaged vitamins near school gate claiming to prevent dengue. Reported to barangay.", votes: 32, verified: true, status: "Under Investigation" },
  { id: 3, user: "Roberto C.", role: "Senior Citizen", location: "Brgy. 22", time: "1d ago", type: "Election", title: "Fake Candidate Facebook Page", body: "Facebook page impersonating local councilor asking for donations. The real councilor confirmed this is fake.", votes: 89, verified: false, status: "Unverified" },
  { id: 4, user: "Angel Reyes", role: "Student Advocate", location: "State University", time: "2d ago", type: "Misinformation", title: "False Statistics Circulating on TikTok", body: "Video claiming 'DOH says 90% of Filipinos lack Vitamin D' has been shared 50,000 times. DOH has NOT published this statistic.", votes: 124, verified: true, status: "Confirmed False" },
];

const contributors = [
  { name: "Angel Reyes", role: "Student Advocate", reports: 24, verified: 19, badge: "Top Contributor" },
  { name: "Maria Santos", role: "Community Member", reports: 18, verified: 15, badge: "Verified Voice" },
  { name: "Teacher Lorna", role: "Educator", reports: 12, verified: 12, badge: "Truth Champion" },
];

const typeColor: Record<string, string> = {
  Scam: "#EF4444", Health: "#8B5CF6", Election: "#F59E0B", Misinformation: "#D4187E",
};

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  "Confirmed Scam": { color: "#EF4444", icon: Shield },
  "Confirmed False": { color: "#EF4444", icon: Shield },
  "Under Investigation": { color: "#F59E0B", icon: Clock },
  "Unverified": { color: "#8B5CF6", icon: Clock },
};

export default function CommunityPage() {
  const { isDark } = useTheme();
  const [votes, setVotes] = useState<Record<number, boolean>>({});

  const handleVote = (id: number) => setVotes((v) => ({ ...v, [id]: !v[id] }));

  const cardShadow = !isDark ? "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" : undefined;

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
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold" style={{ color: "var(--tng-text-1)" }}>Latest Reports</h2>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-xs">
                  <Plus size={13} />Submit Report
                </button>
              </div>
              {reports.map((r, i) => {
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
                      <span className={`ml-auto flex items-center gap-1 text-xs ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>
                        <MapPin size={11} />{r.location} · {r.time}
                      </span>
                    </div>

                    <h3 className="font-bold mb-2 text-sm" style={{ color: "var(--tng-text-1)" }}>{r.title}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>{r.body}</p>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1.5 text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-[10px] font-bold text-white">
                          {r.user[0]}
                        </div>
                        {r.user} · {r.role}
                        {r.verified && <CheckCircle size={11} className="text-green-500 ml-1" />}
                      </div>
                      <button onClick={() => handleVote(r.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${votes[r.id] ? "bg-[#F5B800]/20 text-[#F5B800]" : isDark ? "border border-white/15 text-blue-200/50 hover:border-[#F5B800]/30 hover:text-[#F5B800]" : "border border-slate-200 text-slate-400 hover:border-[#F5B800]/30 hover:text-[#F5B800]"}`}>
                        <ThumbsUp size={12} />{r.votes + (votes[r.id] ? 1 : 0)}
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
                  { label: "Reports Submitted", value: "89", delta: "+12%" },
                  { label: "Verified & Confirmed", value: "61", delta: "+8%" },
                  { label: "Scams Prevented", value: "34", delta: "+21%" },
                ].map(({ label, value, delta }) => (
                  <div key={label} className={`flex items-center justify-between py-2.5 border-b last:border-0 ${isDark ? "border-white/8" : "border-slate-100"}`}>
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
                  {contributors.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>{c.name}</p>
                        <p className="text-[10px]" style={{ color: "var(--tng-text-3)" }}>{c.badge} · {c.verified} verified</p>
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
                <button className="w-full py-2.5 rounded-xl border border-[#D4187E]/50 text-[#F090C0] font-semibold text-sm hover:bg-[#D4187E]/15 transition-colors">
                  Submit a Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
