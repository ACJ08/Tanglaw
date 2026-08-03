import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  Shield, BookOpen, MapPin, Users, WifiOff, Radio, BarChart2,
  CheckCircle, Clock, ArrowRight, Bell, Database, Zap,
  AlertTriangle, FileCheck, Award, Network, Globe,
  User, ChevronRight, Activity, MessageSquare
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

const dashboardConfigs: Record<string, {
  greeting: string;
  stats: Array<{ label: string; value: string; icon: typeof Shield; color: string; delta?: string }>;
  quickActions: Array<{ label: string; href: string; icon: typeof Shield; color: string; desc: string }>;
  recentActivity: Array<{ action: string; detail: string; time: string; color: string }>;
}> = {
  citizen: {
    greeting: "Stay informed, stay safe.",
    stats: [
      { label: "Verifications Done", value: "11", icon: Shield, color: "#F5B800" },
      { label: "Scams Avoided", value: "3", icon: AlertTriangle, color: "#EF4444", delta: "+1 this week" },
      { label: "Learning Progress", value: "47%", icon: BookOpen, color: "#D4187E" },
      { label: "Offline Cache", value: "214 threats", icon: WifiOff, color: "#4A9EF5" },
    ],
    quickActions: [
      { label: "Verify Information", href: "/verify", icon: Shield, color: "#F5B800", desc: "Check a suspicious claim or message" },
      { label: "Crisis Mode", href: "/crisis", icon: Radio, color: "#EF4444", desc: "View emergency advisories" },
      { label: "Threat Ledger", href: "/offline", icon: Database, color: "#4A9EF5", desc: "Browse known scam patterns" },
      { label: "Learn", href: "/learn", icon: BookOpen, color: "#D4187E", desc: "Continue media literacy lessons" },
      { label: "Find Truth Hub", href: "/truth-hubs", icon: MapPin, color: "#22C55E", desc: "Locate nearest verification center" },
      { label: "Accessibility", href: "/accessibility", icon: Zap, color: "#8B5CF6", desc: "Adjust display and interface settings" },
    ],
    recentActivity: [
      { action: "Verified: GCash scam message", detail: "Result: Confirmed Scam · High confidence", time: "2h ago", color: "#EF4444" },
      { action: "Completed: Fake Headlines module", detail: "Badge earned: Headline Detective 🔍", time: "Yesterday", color: "#F5B800" },
      { action: "Threat ledger synced", detail: "214 threats updated from Brgy. 15 Hub", time: "2 days ago", color: "#22C55E" },
    ],
  },
  student: {
    greeting: "Empower your community with verified truth.",
    stats: [
      { label: "Verifications Done", value: "28", icon: Shield, color: "#F5B800", delta: "+4 this week" },
      { label: "Students Reached", value: "64", icon: Users, color: "#D4187E" },
      { label: "Lessons Completed", value: "9", icon: BookOpen, color: "#4A9EF5" },
      { label: "Reports Submitted", value: "12", icon: FileCheck, color: "#22C55E" },
    ],
    quickActions: [
      { label: "Verify Information", href: "/verify", icon: Shield, color: "#F5B800", desc: "Demonstrate verification to peers" },
      { label: "Community Reports", href: "/community", icon: Users, color: "#D4187E", desc: "Submit and track community reports" },
      { label: "Learning Center", href: "/learn", icon: BookOpen, color: "#4A9EF5", desc: "Explore all media literacy modules" },
      { label: "Truth Hubs", href: "/truth-hubs", icon: MapPin, color: "#22C55E", desc: "Organize community hub events" },
      { label: "Offline Sync", href: "/sync", icon: Network, color: "#8B5CF6", desc: "Sync ledger for campus outreach" },
      { label: "Crisis Mode", href: "/crisis", icon: Radio, color: "#EF4444", desc: "Emergency verification workflows" },
    ],
    recentActivity: [
      { action: "Community report verified", detail: "False DOH statistics — 124 upvotes", time: "1h ago", color: "#D4187E" },
      { action: "Awareness session conducted", detail: "64 students reached — Cebu State University", time: "Yesterday", color: "#4A9EF5" },
      { action: "Badge earned: Scam Shield 🛡️", detail: "Completed Social Media Scams module", time: "3 days ago", color: "#F5B800" },
    ],
  },
  official: {
    greeting: "Protect your barangay with verified information.",
    stats: [
      { label: "Active Advisories", value: "2", icon: AlertTriangle, color: "#EF4444", delta: "1 critical" },
      { label: "Community Reports", value: "89", icon: FileCheck, color: "#F5B800" },
      { label: "Truth Hub Status", value: "Open", icon: MapPin, color: "#22C55E" },
      { label: "Verified This Week", value: "34", icon: Shield, color: "#D4187E" },
    ],
    quickActions: [
      { label: "Community Reports", href: "/community", icon: Users, color: "#F5B800", desc: "Review and verify community reports" },
      { label: "Crisis Coordination", href: "/crisis", icon: Radio, color: "#EF4444", desc: "Manage emergency advisories" },
      { label: "Truth Hub Network", href: "/truth-hubs", icon: MapPin, color: "#22C55E", desc: "Manage local hub operations" },
      { label: "Broadcast Advisory", href: "/community", icon: Bell, color: "#D4187E", desc: "Issue verified community alerts" },
      { label: "Verify Information", href: "/verify", icon: Shield, color: "#4A9EF5", desc: "Official fact verification" },
      { label: "Offline Sync", href: "/sync", icon: Network, color: "#8B5CF6", desc: "Keep ledger updated for barangay" },
    ],
    recentActivity: [
      { action: "Advisory issued: Typhoon relief scam", detail: "Broadcast to 1,240 registered residents", time: "3h ago", color: "#EF4444" },
      { action: "Truth Hub: 12 verifications today", detail: "Brgy. 15 Community Hall — 3 validators on duty", time: "Today", color: "#22C55E" },
      { action: "Report confirmed: Fake DSWD text", detail: "847 community reports aggregated", time: "1 day ago", color: "#F5B800" },
    ],
  },
  teacher: {
    greeting: "Equip your students with critical thinking skills.",
    stats: [
      { label: "Students Enrolled", value: "132", icon: Users, color: "#F5B800" },
      { label: "Lessons Assigned", value: "6", icon: BookOpen, color: "#D4187E" },
      { label: "Avg. Completion", value: "71%", icon: BarChart2, color: "#4A9EF5" },
      { label: "Badges Awarded", value: "48", icon: Award, color: "#22C55E" },
    ],
    quickActions: [
      { label: "Learning Center", href: "/learn", icon: BookOpen, color: "#F5B800", desc: "Browse and assign lessons" },
      { label: "Community", href: "/community", icon: Users, color: "#D4187E", desc: "Classroom verification exercises" },
      { label: "Verify Information", href: "/verify", icon: Shield, color: "#4A9EF5", desc: "Live demonstration tool" },
      { label: "Truth Hubs", href: "/truth-hubs", icon: MapPin, color: "#22C55E", desc: "Schedule field visits" },
      { label: "Offline Threat Ledger", href: "/offline", icon: Database, color: "#8B5CF6", desc: "Classroom reference material" },
      { label: "Accessibility", href: "/accessibility", icon: Zap, color: "#EF4444", desc: "Settings for classroom display" },
    ],
    recentActivity: [
      { action: "Module assigned: Deepfake Awareness", detail: "Grade 10 — Section B · 32 students", time: "Today", color: "#D4187E" },
      { action: "Class completion: Fake Headlines", detail: "29/32 students completed · 91%", time: "Yesterday", color: "#F5B800" },
      { action: "Field visit scheduled: Truth Hub", detail: "Maliwanag Community Library · Next Friday", time: "2 days ago", color: "#22C55E" },
    ],
  },
  ngo: {
    greeting: "Monitor and respond to misinformation patterns.",
    stats: [
      { label: "Active Campaigns", value: "3", icon: Globe, color: "#F5B800" },
      { label: "Threats Monitored", value: "142", icon: AlertTriangle, color: "#EF4444" },
      { label: "Community Reach", value: "8,400", icon: Users, color: "#D4187E" },
      { label: "Reports Analyzed", value: "67", icon: BarChart2, color: "#4A9EF5" },
    ],
    quickActions: [
      { label: "Community Reports", href: "/community", icon: Users, color: "#F5B800", desc: "Monitor and amplify reports" },
      { label: "Threat Ledger", href: "/offline", icon: Database, color: "#EF4444", desc: "Analyze scam pattern trends" },
      { label: "Learning Center", href: "/learn", icon: BookOpen, color: "#D4187E", desc: "Share educational content" },
      { label: "Verify Information", href: "/verify", icon: Shield, color: "#4A9EF5", desc: "Institutional fact verification" },
      { label: "Truth Hub Network", href: "/truth-hubs", icon: MapPin, color: "#22C55E", desc: "Partner hub management" },
      { label: "Offline Sync", href: "/sync", icon: Network, color: "#8B5CF6", desc: "Field team synchronization" },
    ],
    recentActivity: [
      { action: "Campaign launched: #VerifyBeforeShare", detail: "Targeting OFW families — 3 barangays", time: "5h ago", color: "#F5B800" },
      { action: "Threat surge detected: Investment scams", detail: "+34% increase in crypto scam reports", time: "Today", color: "#EF4444" },
      { action: "Partner hub activated: Maliwanag Library", detail: "4 validators trained and ready", time: "3 days ago", color: "#22C55E" },
    ],
  },
  humanitarian: {
    greeting: "Verify critical information when it matters most.",
    stats: [
      { label: "Active Advisories", value: "4", icon: Radio, color: "#EF4444", delta: "2 critical" },
      { label: "Verifications Today", value: "19", icon: Shield, color: "#F5B800" },
      { label: "Communities Monitored", value: "7", icon: Globe, color: "#D4187E" },
      { label: "Sync Status", value: "Live", icon: Network, color: "#22C55E" },
    ],
    quickActions: [
      { label: "Crisis Mode", href: "/crisis", icon: Radio, color: "#EF4444", desc: "Active emergency advisories" },
      { label: "Verify Information", href: "/verify", icon: Shield, color: "#F5B800", desc: "Rapid crisis claim verification" },
      { label: "Community Reports", href: "/community", icon: Users, color: "#D4187E", desc: "Monitor community alerts" },
      { label: "Offline Sync", href: "/sync", icon: Network, color: "#4A9EF5", desc: "Field device synchronization" },
      { label: "Truth Hub Network", href: "/truth-hubs", icon: MapPin, color: "#22C55E", desc: "Activate field centers" },
      { label: "Threat Ledger", href: "/offline", icon: Database, color: "#8B5CF6", desc: "Disaster misinformation patterns" },
    ],
    recentActivity: [
      { action: "CRITICAL: Typhoon advisory verified", detail: "Fake evacuation route — Confirmed False", time: "30 min ago", color: "#EF4444" },
      { action: "Emergency sync completed", detail: "7 field devices updated — 214 entries", time: "1h ago", color: "#22C55E" },
      { action: "Community alert broadcast", detail: "Fake relief goods distribution warning", time: "4h ago", color: "#F5B800" },
    ],
  },
};

const notifications = [
  { msg: "New scam alert in your area: GCash impersonation surge", time: "5 min ago" },
  { msg: "Your community report has been verified by a validator", time: "2h ago" },
  { msg: "Offline sync completed — 12 new threat entries added", time: "6h ago" },
];

export default function DashboardPage() {
  const { isAuthenticated, userName, userRole, openModal } = useAuth();
  const { isDark } = useTheme();
  const [showNotif, setShowNotif] = useState(false);

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--tng-page)" }}>
          <div
            className={`max-w-md w-full text-center p-10 rounded-3xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
            style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F5B800]/15 flex items-center justify-center mx-auto mb-6">
              <Shield size={28} className="text-[#F5B800]" />
            </div>
            <h2 className="text-2xl font-extrabold mb-3" style={{ color: "var(--tng-text-1)" }}>Sign in to continue</h2>
            <p className={`mb-6 text-sm ${isDark ? "text-blue-200/60" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
              Create a free Tanglaw account to access your personalized dashboard, verification history, and role-specific tools.
            </p>
            <button onClick={() => openModal()}
              className="w-full py-3.5 rounded-full font-bold text-[#050E24] bg-gradient-to-r from-[#F5B800] to-[#FFD44D] hover:shadow-lg hover:shadow-[#F5B800]/25 transition-all">
              Create Free Account
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const role = userRole ?? "citizen";
  const config = dashboardConfigs[role] ?? dashboardConfigs.citizen;
  const roleLabel = roleLabelMap[role] ?? role;
  const initials = (userName || "U").slice(0, 2).toUpperCase();

  return (
    <PageLayout>
      <div className="pt-20 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && (
          <>
            <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#1B2F6E]/40 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4187E]/10 blur-[120px] rounded-full pointer-events-none" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Topbar */}
          <div className={`flex items-center justify-between py-6 mb-6 border-b ${isDark ? "border-white/8" : "border-slate-200"}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center text-lg font-extrabold text-white shadow-lg">
                {initials}
              </div>
              <div>
                <h1 className="text-xl font-extrabold" style={{ color: "var(--tng-text-1)" }}>Welcome back, {(userName || "").split(" ")[0] || "User"}</h1>
                <p className={`text-sm ${isDark ? "text-blue-200/55" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                  {roleLabel} · {config.greeting}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setShowNotif(!showNotif)}
                  className={`relative w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${isDark ? "border-white/12 text-blue-200/60 hover:text-white hover:bg-white/8" : "border-slate-200 text-[#5F7AA8] hover:text-[#2E4A7A] hover:bg-slate-100"}`}>
                  <Bell size={17} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D4187E]" />
                </button>
                {showNotif && (
                  <div className={`absolute right-0 top-full mt-2 w-72 border rounded-2xl shadow-2xl overflow-hidden z-20 ${isDark ? "bg-[#0C1A3A] border-white/15" : "bg-white border-slate-200"}`}>
                    <div className={`px-4 py-3 border-b ${isDark ? "border-white/8" : "border-slate-100"}`}>
                      <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>Notifications</p>
                    </div>
                    {notifications.map((n, i) => (
                      <div key={i} className={`px-4 py-3 border-b last:border-0 transition-colors cursor-pointer ${isDark ? "border-white/6 hover:bg-white/4" : "border-slate-100 hover:bg-slate-50"}`}>
                        <p className="text-xs leading-snug" style={{ color: "var(--tng-text-1)" }}>{n.msg}</p>
                        <p className={`text-[10px] mt-1 ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>{n.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/profile"
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${isDark ? "border-white/12 text-blue-200/60 hover:text-white hover:bg-white/8" : "border-slate-200 text-[#5F7AA8] hover:text-[#2E4A7A] hover:bg-slate-100"}`}>
                <User size={17} />
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
            {config.stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className={`p-5 rounded-2xl border transition-all ${isDark ? "border-white/10 bg-white/4 hover:border-white/18" : "border-slate-200 bg-white hover:border-slate-300"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: stat.color + "22" }}>
                      <Icon size={16} style={{ color: stat.color }} />
                    </div>
                    {stat.delta && (
                      <span className="text-[10px] font-semibold text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full">{stat.delta}</span>
                    )}
                  </div>
                  <p className="text-2xl font-extrabold mb-1" style={{ color: "var(--tng-text-1)" }}>{stat.value}</p>
                  <p className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions + Activity */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Zap size={15} className="text-[#F5B800]" />Quick Actions
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {config.quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <Link key={i} to={action.href}
                        className={`group flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 ${isDark ? "border-white/10 bg-white/4 hover:border-white/20 hover:bg-white/7" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                        style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: action.color + "22" }}>
                          <Icon size={17} style={{ color: action.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold" style={{ color: "var(--tng-text-1)" }}>{action.label}</p>
                          <p className={`text-[10px] truncate ${isDark ? "text-blue-200/45" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{action.desc}</p>
                        </div>
                        <ChevronRight size={14} className={`transition-all flex-shrink-0 group-hover:translate-x-1 ${isDark ? "text-blue-200/30 group-hover:text-white" : "text-slate-300 group-hover:text-[#2E4A7A]"}`} />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Activity size={15} className="text-[#F5B800]" />Recent Activity
                </h2>
                <div
                  className={`rounded-2xl border overflow-hidden ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                >
                  {config.recentActivity.map((ev, i) => (
                    <div key={i} className={`flex items-start gap-3 px-5 py-4 ${i < config.recentActivity.length - 1 ? `border-b ${isDark ? "border-white/6" : "border-slate-100"}` : ""} ${isDark ? "hover:bg-white/4" : "hover:bg-slate-50"} transition-colors`}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: ev.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: "var(--tng-text-1)" }}>{ev.action}</p>
                        <p className={`text-xs mt-0.5 ${isDark ? "text-blue-200/50" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{ev.detail}</p>
                      </div>
                      <span className={`text-[10px] whitespace-nowrap flex-shrink-0 mt-0.5 ${isDark ? "text-blue-200/35" : "text-slate-400"}`}>{ev.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Sync Status */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.17 }}
                className="p-5 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/6">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Network size={14} className="text-[#22C55E]" />Sync Status
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400 font-semibold">Connected · Fully Synced</span>
                </div>
                <div className={`flex flex-col gap-2 text-xs ${isDark ? "text-blue-200/55" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                  <div className="flex justify-between"><span>Cached Threats</span><strong style={{ color: "var(--tng-text-1)" }}>214</strong></div>
                  <div className="flex justify-between"><span>Last Sync</span><strong style={{ color: "var(--tng-text-1)" }}>12 min ago</strong></div>
                  <div className="flex justify-between"><span>Nodes Active</span><strong style={{ color: "var(--tng-text-1)" }}>2,847</strong></div>
                </div>
                <Link to="/sync" className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold hover:bg-[#22C55E]/10 transition-colors">
                  View Sync Details <ArrowRight size={12} />
                </Link>
              </motion.div>

              {/* Learning progress */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className={`p-5 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <BookOpen size={14} className="text-[#F5B800]" />Learning Progress
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs ${isDark ? "text-blue-200/55" : "text-[#5F7AA8]"}`}>Overall</span>
                  <span className="text-xs font-bold" style={{ color: "var(--tng-gold-text)" }}>11/45 lessons</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden mb-4 ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                  <div className="h-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] rounded-full" style={{ width: "24%" }} />
                </div>
                {[
                  { title: "Spotting Fake Headlines", pct: 100 },
                  { title: "Visual Misinformation", pct: 67 },
                  { title: "Social Media Scams", pct: 25 },
                ].map((m) => (
                  <div key={m.title} className="mb-2.5">
                    <div className="flex justify-between mb-1">
                      <span className={`text-[10px] truncate pr-2 ${isDark ? "text-blue-200/55" : "text-[#5F7AA8]"}`}>{m.title}</span>
                      <span className="text-[10px] font-bold" style={{ color: "var(--tng-text-1)" }}>{m.pct}%</span>
                    </div>
                    <div className={`h-1 rounded-full ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.pct === 100 ? "#22C55E" : "#F5B800" }} />
                    </div>
                  </div>
                ))}
                <Link to="/learn" className={`mt-3 flex items-center gap-1.5 text-xs font-semibold transition-colors ${isDark ? "hover:text-white" : "hover:text-[#1B2F6E]"}`} style={{ color: "var(--tng-gold-text)" }}>
                  Continue Learning <ArrowRight size={11} />
                </Link>
              </motion.div>

              {/* Community snapshot */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.23 }}
                className={`p-5 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <MessageSquare size={14} className="text-[#D4187E]" />Community Feed
                </h3>
                {[
                  { user: "Angel R.", type: "Report", title: "Fake DOH vitamin statistics on TikTok", votes: 124, color: "#D4187E" },
                  { user: "Maria S.", type: "Alert", title: "GCash suspension scam SMS in Brgy. 15", votes: 47, color: "#EF4444" },
                ].map((item, i) => (
                  <div key={i} className={`py-3 ${i > 0 ? `border-t ${isDark ? "border-white/6" : "border-slate-100"}` : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: item.color + "22", color: item.color }}>{item.type}</span>
                      <span className={`text-[10px] ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>{item.user}</span>
                    </div>
                    <p className="text-xs leading-snug mb-1" style={{ color: "var(--tng-text-1)" }}>{item.title}</p>
                    <span className={`text-[10px] ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>👍 {item.votes} votes</span>
                  </div>
                ))}
                <Link to="/community" className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#D4187E] hover:text-white transition-colors">
                  View All Reports <ArrowRight size={11} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
