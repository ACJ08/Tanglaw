export type Verdict = "safe" | "false" | "misleading" | "unverified";
export type Severity = "high" | "medium" | "low";
export interface AnalysisResult { verdict: Verdict; confidence: number; summary: string; indicators: { label: string; severity: Severity; detail: string }[]; sources: { name: string; url: string; credibility: "high" | "medium" }[]; recommendation: string; }
