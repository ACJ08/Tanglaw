import type { AnalysisResult, Severity, Verdict } from "../types/verification.js";
const verdicts = new Set(["safe", "false", "misleading", "unverified"]); const severities = new Set(["high", "medium", "low"]);
function deterministicConfidence(verdict: Verdict, indicators: { severity: Severity }[], sources: { credibility: "high" | "medium" }[]) {
  const risk = indicators.reduce((total, indicator) => total + ({ high: 16, medium: 9, low: 4 }[indicator.severity]), 0);
  const evidence = sources.reduce((total, source) => total + (source.credibility === "high" ? 6 : 3), 0);
  const baseline = { false: 58, misleading: 48, safe: 38, unverified: 32 }[verdict];
  return Math.min(98, Math.max(1, baseline + risk + Math.min(18, evidence)));
}
export function normalizeAnalysis(raw: unknown): AnalysisResult {
  if (!raw || typeof raw !== "object") throw new Error("Invalid AI response"); const v = raw as Record<string, unknown>; const classification = String(v.verdict ?? "").toLowerCase(); const verdict: Verdict = verdicts.has(classification) ? classification as Verdict : ["scam", "phishing", "spam"].includes(classification) ? "false" : ["fake news", "manipulated content"].includes(classification) ? "misleading" : "unverified"; const confidence = Number(v.confidence);
  const indicators = Array.isArray(v.indicators) ? v.indicators.slice(0, 8).flatMap(x => { if (!x || typeof x !== "object") return []; const i = x as Record<string, unknown>; const s = String(i.severity).toLowerCase(); return [{ label: String(i.title ?? i.label ?? "Verification signal").slice(0,100), severity: (severities.has(s) ? s : "low") as Severity, detail: String(i.explanation ?? i.detail ?? "Review this claim carefully.").slice(0,500) }]; }) : [];
  const sources = Array.isArray(v.sources) ? v.sources.slice(0,6).flatMap(x => { if (!x || typeof x !== "object") return []; const s = x as Record<string, unknown>; const url=String(s.url??""); return url && !/^https:\/\//i.test(url) ? [] : [{ name:String(s.name??"Trusted reference").slice(0,150),url,credibility:String(s.credibility).toLowerCase()==="medium" ? "medium" as const : "high" as const }]; }) : [];
  const normalizedConfidence = Number.isFinite(confidence) && confidence > 0 ? Math.min(100, Math.round(confidence)) : deterministicConfidence(verdict, indicators, sources);
  return { verdict, confidence: normalizedConfidence, summary:String(v.summary??"No conclusive analysis was available.").slice(0,1000), indicators, sources, recommendation:String(v.recommendation??"Treat this content cautiously and verify it with an official source.").slice(0,1000) };
}
