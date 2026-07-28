import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Upload, Mic, CheckCircle, XCircle, AlertTriangle, Info,
  Link2, Clock, DollarSign, UserX, Zap, Eye, Shield, ChevronDown, RotateCcw
} from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useTheme } from "@/app/context/ThemeContext";
import processingImg from "@/imports/5__processing.png";
import verificationImg from "@/imports/3__Verification.png";
import successImg from "@/imports/11__Success.png";

type VerifyStatus = "idle" | "analyzing" | "result";
type Verdict = "safe" | "false" | "misleading" | "unverified";

interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  summary: string;
  indicators: { icon: typeof Link2; label: string; severity: "high" | "medium" | "low"; detail: string }[];
  sources: { name: string; url: string; credibility: "high" | "medium" }[];
  recommendation: string;
}

const sampleTexts = [
  { label: "Scam text example", text: "URGENT: Your GCash account is SUSPENDED! Click here immediately to verify: bit.ly/gcash-verify or lose P50,000 government aid. Call 09XX-XXX-XXXX now. LIMITED TIME ONLY!" },
  { label: "Health misinformation", text: "BREAKING: DOH confirms drinking warm lemon water every morning cures COVID-19 variants. Forward this to save lives! Share to 10 contacts before midnight." },
  { label: "Election misinformation", text: "EXCLUSIVE: COMELEC caught manipulating votes in 3 provinces. Video proof leaked. Share before they delete! The mainstream media won't report this." },
];

const mockResults: Record<string, AnalysisResult> = {
  scam: {
    verdict: "false",
    confidence: 97,
    summary: "This message contains multiple hallmarks of a financial scam targeting Filipino mobile users. It uses urgency, impersonation of GCash, and a suspicious shortened link to steal credentials.",
    indicators: [
      { icon: Link2, label: "Suspicious Link", severity: "high", detail: "bit.ly/gcash-verify is not an official GCash domain. Official GCash links use gcash.com only." },
      { icon: Clock, label: "Artificial Urgency", severity: "high", detail: "'URGENT', 'LIMITED TIME' and 'immediately' are classic pressure tactics used in scams to bypass critical thinking." },
      { icon: DollarSign, label: "Financial Pressure", severity: "high", detail: "Mentioning P50,000 government aid is a bait tactic. No government agency sends aid through GCash via SMS." },
      { icon: UserX, label: "Impersonation", severity: "medium", detail: "GCash never sends account suspension notices via SMS with external links. Always verify through the official app." },
    ],
    sources: [
      { name: "GCash Official Security Advisory", url: "#", credibility: "high" },
      { name: "BSP Consumer Protection", url: "#", credibility: "high" },
      { name: "DICT Cybersecurity Advisory", url: "#", credibility: "high" },
    ],
    recommendation: "Do NOT click the link. Block and report the sender. Report to the BSP via their official hotline 1-800-10-BSP-PESO.",
  },
  health: {
    verdict: "false",
    confidence: 99,
    summary: "This claim is completely false. No scientific evidence or DOH advisory supports lemon water as a COVID-19 treatment. This type of health misinformation can cause real harm.",
    indicators: [
      { icon: AlertTriangle, label: "False Attribution", severity: "high", detail: "The DOH has NOT made this statement. Claiming government endorsement for false health info is dangerous." },
      { icon: UserX, label: "Emotional Manipulation", severity: "medium", detail: "'Forward this to save lives' exploits compassion to spread misinformation quickly." },
      { icon: Zap, label: "No Scientific Basis", severity: "high", detail: "Lemon water has no antiviral properties that affect COVID-19 variants per WHO, CDC, and DOH guidelines." },
    ],
    sources: [
      { name: "DOH Official COVID-19 Advisory", url: "#", credibility: "high" },
      { name: "WHO Myth Busters", url: "#", credibility: "high" },
      { name: "Vera Files Fact Check", url: "#", credibility: "high" },
    ],
    recommendation: "Do not share this message. If you or someone you know is concerned about COVID-19, consult your local health center or the DOH hotline at 1555.",
  },
  election: {
    verdict: "misleading",
    confidence: 91,
    summary: "No verified evidence supports vote manipulation claims in these provinces. The 'leaked video' referenced cannot be verified against known COMELEC procedures. This appears to be disinformation spread to undermine election confidence.",
    indicators: [
      { icon: Eye, label: "Unverifiable Claim", severity: "high", detail: "No credible news organization has reported this. The claim relies on 'leaked' content without identifiable sources." },
      { icon: AlertTriangle, label: "Anti-Institution Framing", severity: "medium", detail: "'Mainstream media won't report' is a common tactic to preemptively discredit fact-checks." },
      { icon: Clock, label: "Urgency Without Substance", severity: "medium", detail: "'Share before they delete' exploits fear of censorship rather than providing verifiable facts." },
    ],
    sources: [
      { name: "COMELEC Official Transparency Reports", url: "#", credibility: "high" },
      { name: "PPCRV Election Monitoring", url: "#", credibility: "high" },
      { name: "PCIJ Election Watch", url: "#", credibility: "high" },
    ],
    recommendation: "Do not share unverified election claims. Verify through COMELEC's official transparency servers or accredited citizen arms like PPCRV.",
  },
};

const verdictConfig = {
  safe: { label: "Verified Safe", color: "#22C55E", bg: "bg-green-500/15", border: "border-green-500/30", icon: CheckCircle },
  false: { label: "FALSE / SCAM", color: "#EF4444", bg: "bg-red-500/15", border: "border-red-500/30", icon: XCircle },
  misleading: { label: "MISLEADING", color: "#F59E0B", bg: "bg-amber-500/15", border: "border-amber-500/30", icon: AlertTriangle },
  unverified: { label: "UNVERIFIED", color: "#8B5CF6", bg: "bg-violet-500/15", border: "border-violet-500/30", icon: Info },
};

const severityColor = { high: "#EF4444", medium: "#F59E0B", low: "#22C55E" };

export default function VerifyPage() {
  const { isDark } = useTheme();
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<"text" | "url">("text");

  const detect = (text: string): AnalysisResult => {
    const t = text.toLowerCase();
    if (t.includes("gcash") || t.includes("suspended") || t.includes("government aid")) return mockResults.scam;
    if (t.includes("lemon") || t.includes("covid") || t.includes("cure")) return mockResults.health;
    if (t.includes("comelec") || t.includes("votes") || t.includes("election")) return mockResults.election;
    return {
      verdict: "unverified",
      confidence: 52,
      summary: "Tanglaw could not find sufficient matching sources to verify or disprove this claim in the current local database. This does not mean the claim is true or false.",
      indicators: [{ icon: Info, label: "Insufficient Evidence", severity: "low", detail: "No matching verified or debunked sources found in the local database." }],
      sources: [],
      recommendation: "Treat this claim with caution. Visit your nearest Truth Hub or check back when connectivity allows a full online cross-reference.",
    };
  };

  const handleVerify = () => {
    if (!inputText.trim()) return;
    setStatus("analyzing");
    setResult(null);
    setTimeout(() => {
      setResult(detect(inputText));
      setStatus("result");
    }, 3200);
  };

  const handleReset = () => { setStatus("idle"); setResult(null); setInputText(""); };

  const VConfig = result ? verdictConfig[result.verdict] : null;
  const VIcon = VConfig?.icon ?? Info;

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-28 pb-16 overflow-hidden" style={{ background: "var(--tng-page)" }}>
        <div className="absolute inset-0 pointer-events-none">
          {isDark && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1B2F6E]/50 blur-[140px] rounded-full" />
              <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[#D4187E]/20 blur-[100px] rounded-full" />
            </>
          )}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4187E]/40 bg-[#D4187E]/10 text-[#F090C0] text-xs font-semibold mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4187E] animate-pulse" />
              AI-Powered • Offline Capable
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "var(--tng-text-1)" }}>
              Localized Text<br />
              <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Verification
              </em>
            </h1>
            <p className={`mb-4 leading-relaxed ${isDark ? "text-blue-200/65" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
              Paste any suspicious text, headline, or message. Liyab analyzes it for scam patterns, false claims, and manipulation tactics — and explains every finding clearly.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Scam detection", "Confidence score", "Source citations", "Offline cache"].map((tag) => (
                <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${isDark ? "border-white/12 text-blue-200/60 bg-white/4" : "border-slate-200 text-[#5F7AA8] bg-white"}`}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <ImageWithFallback src={verificationImg} alt="Liyab verifying information"
                className="w-[280px] sm:w-[340px] object-contain drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Tool */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24" style={{ background: "var(--tng-page)" }}>
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Tabs */}
              <div className={`flex gap-2 mb-4 p-1 rounded-xl border w-fit ${isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"}`}>
                {(["text", "url"] as const).map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t ? "bg-[#F5B800] text-[#050E24]" : isDark ? "text-blue-200/60 hover:text-white" : "text-[#5F7AA8] hover:text-[#2E4A7A]"}`}>
                    {t === "text" ? "Paste Text" : "Paste URL"}
                  </button>
                ))}
              </div>

              <div
                className={`p-6 rounded-3xl border backdrop-blur mb-4 ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={activeTab === "text"
                    ? "Paste a suspicious message, headline, or social media post here..."
                    : "Paste a URL or link to check..."}
                  className={`w-full h-36 bg-transparent text-sm resize-none focus:outline-none leading-relaxed ${isDark ? "text-white placeholder-blue-200/30" : "placeholder-slate-300"}`}
                  style={{ fontFamily: "'Inter',sans-serif", color: isDark ? undefined : "var(--tng-text-1)" }}
                />
                <div className={`flex items-center justify-between mt-4 pt-4 border-t ${isDark ? "border-white/10" : "border-slate-100"}`}>
                  <div className="flex gap-2">
                    <button className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${isDark ? "text-blue-200/50 hover:text-blue-200/80 border-white/10 hover:border-white/20" : "text-[#5F7AA8] hover:text-[#2E4A7A] border-slate-200 hover:border-slate-300"}`}>
                      <Upload size={13} />Upload image
                    </button>
                    <button className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${isDark ? "text-blue-200/50 hover:text-blue-200/80 border-white/10 hover:border-white/20" : "text-[#5F7AA8] hover:text-[#2E4A7A] border-slate-200 hover:border-slate-300"}`}>
                      <Mic size={13} />Voice input
                    </button>
                  </div>
                  <button onClick={handleVerify} disabled={!inputText.trim()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${inputText.trim() ? "bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] hover:shadow-lg hover:shadow-[#F5B800]/30 hover:-translate-y-0.5" : isDark ? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-slate-100 text-slate-300 cursor-not-allowed"}`}>
                    <Search size={15} />Verify Now
                  </button>
                </div>
              </div>

              {/* Sample texts */}
              <div>
                <p className={`text-xs mb-3 ${isDark ? "text-blue-200/40" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>Try a sample:</p>
                <div className="flex flex-col gap-2">
                  {sampleTexts.map((s) => (
                    <button key={s.label} onClick={() => setInputText(s.text)}
                      className={`text-left p-4 rounded-2xl border transition-all group ${isDark ? "border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/16" : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300"}`}
                      style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                      <p className="text-xs font-semibold mb-1 transition-colors group-hover:text-[#FFD44D]" style={{ color: "var(--tng-gold-text)" }}>{s.label}</p>
                      <p className={`text-xs line-clamp-2 ${isDark ? "text-blue-200/50" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {status === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-8">
              <div className="relative">
                {/* Speech bubble pulse overlay on processing image */}
                <ImageWithFallback src={processingImg} alt="Liyab analyzing" className="w-56 object-contain" />
                <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[6%] right-[2%] w-[42%] h-[35%] rounded-full bg-[#F5B800]/25 blur-xl pointer-events-none" />
                <div className="absolute top-[14%] right-[10%] flex gap-1.5 items-center">
                  {[0, 0.28, 0.56].map((d, i) => (
                    <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d }}
                      className="w-2 h-2 rounded-full bg-[#F5B800]" />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold mb-2" style={{ color: "var(--tng-text-1)" }}>Liyab is analyzing...</p>
                <p className={`text-sm ${isDark ? "text-blue-200/55" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>Cross-referencing local database and source archives</p>
              </div>
              <div className="flex gap-6">
                {["Parsing text", "Checking sources", "Scoring confidence"].map((step, i) => (
                  <motion.div key={step} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.9, duration: 0.5 }}
                    className="flex flex-col items-center gap-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, delay: i * 0.9, repeat: 1 }}
                      className="w-8 h-8 rounded-full bg-[#F5B800]/20 border border-[#F5B800]/40 flex items-center justify-center">
                      <CheckCircle size={14} className="text-[#F5B800]" />
                    </motion.div>
                    <span className={`text-xs ${isDark ? "text-blue-200/50" : "text-[#5F7AA8]"}`}>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {status === "result" && result && VConfig && (
            <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Verdict header */}
              <div className={`p-6 rounded-3xl border ${VConfig.border} ${VConfig.bg} mb-6 flex items-start gap-5`}>
                <div className="flex-shrink-0">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <VIcon size={40} style={{ color: VConfig.color }} />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xl font-extrabold" style={{ color: VConfig.color }}>{VConfig.label}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: VConfig.color + "33", color: VConfig.color }}>
                      {result.confidence}% confidence
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-blue-200/80" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{result.summary}</p>
                </div>
                {result.verdict !== "false" && (
                  <ImageWithFallback src={successImg} alt="Success" className="hidden sm:block w-20 object-contain flex-shrink-0" />
                )}
              </div>

              {/* Confidence bar */}
              <div
                className={`p-5 rounded-2xl border mb-4 ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: "var(--tng-text-1)" }}>Confidence Score</span>
                  <span className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>{result.confidence}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${VConfig.color}88, ${VConfig.color})` }} />
                </div>
              </div>

              {/* Indicators */}
              <div className="mb-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: "var(--tng-text-1)" }}>Detection Indicators</h3>
                <div className="flex flex-col gap-2">
                  {result.indicators.map((ind, i) => {
                    const IndIcon = ind.icon;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className={`flex items-start gap-4 p-4 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                        style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: severityColor[ind.severity] + "22" }}>
                          <IndIcon size={14} style={{ color: severityColor[ind.severity] }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>{ind.label}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full capitalize font-semibold"
                              style={{ background: severityColor[ind.severity] + "22", color: severityColor[ind.severity] }}>
                              {ind.severity} risk
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed ${isDark ? "text-blue-200/60" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{ind.detail}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Sources */}
              {result.sources.length > 0 && (
                <div
                  className={`mb-4 p-5 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                >
                  <h3 className="text-sm font-bold mb-3" style={{ color: "var(--tng-text-1)" }}>Sources Referenced</h3>
                  <div className="flex flex-col gap-2">
                    {result.sources.map((s, i) => (
                      <div key={i} className={`flex items-center justify-between py-2 border-b last:border-0 ${isDark ? "border-white/8" : "border-slate-100"}`}>
                        <span className={`text-sm ${isDark ? "text-blue-200/70" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{s.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${s.credibility === "high" ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400"}`}>
                          {s.credibility} credibility
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="p-5 rounded-2xl border border-[#F5B800]/25 bg-[#F5B800]/8 mb-6">
                <div className="flex items-start gap-3">
                  <Shield size={18} className="text-[#F5B800] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: "var(--tng-gold-text)" }}>Liyab's Recommendation</p>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-blue-200/80" : "text-[#5F7AA8]"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{result.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleReset}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border font-semibold text-sm transition-all ${isDark ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-[#2E4A7A] hover:bg-slate-50"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}>
                  <RotateCcw size={15} />Verify Another
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm hover:shadow-lg hover:shadow-[#F5B800]/25 transition-all">
                  Save to History
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
