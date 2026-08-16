import { analyzeLocally, normalizeConfidence, type DetectionIndicator, type VerificationResult, type Verdict } from "../../../src/app/lib/verification.js";

const verdicts = new Set<Verdict>(["safe", "false", "misleading", "unverified"]);
const severity = new Set(["critical", "high", "medium", "low"]);

function readVerdict(value: unknown): Verdict {
  const raw = String(value ?? "").toLowerCase().trim();
  if (verdicts.has(raw as Verdict)) return raw as Verdict;
  if (["scam", "phishing", "spam", "fraud"].includes(raw)) return "false";
  if (["fake news", "manipulated content"].includes(raw)) return "misleading";
  return "unverified";
}

function readIndicators(value: unknown): DetectionIndicator[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const itemValue = item as Record<string, unknown>;
    const itemSeverity = String(itemValue.severity ?? "").toLowerCase();
    return [{
      label: String(itemValue.title ?? itemValue.label ?? "Verification signal").slice(0, 100),
      severity: (severity.has(itemSeverity) ? itemSeverity : "low") as DetectionIndicator["severity"],
      detail: String(itemValue.explanation ?? itemValue.detail ?? "Review this content carefully.").slice(0, 500),
    }];
  });
}

/** Combines the model's calibrated confidence with independent local evidence. */
export function normalizeAnalysis(raw: unknown, input: string): VerificationResult {
  const local = analyzeLocally(input);
  if (!raw || typeof raw !== "object") return local;
  const value = raw as Record<string, unknown>;
  const verdict = readVerdict(value.verdict ?? value.classification);
  const aiIndicators = readIndicators(value.indicators);
  const hasAiConfidence = Number.isFinite(Number(value.confidence));
  const modelConfidence = normalizeConfidence(value.confidence, local.confidence);
  const agreement = verdict === local.verdict || local.verdict === "unverified";
  const confidence = hasAiConfidence
    ? normalizeConfidence((modelConfidence * 0.7) + (local.confidence * 0.3) + (agreement ? 3 : -5), local.confidence)
    : local.confidence;
  const indicators = [...aiIndicators, ...local.indicators].filter((item, index, array) => array.findIndex((candidate) => candidate.label.toLowerCase() === item.label.toLowerCase()) === index).slice(0, 8);
  const highRiskIndicators = indicators.filter((item) => item.severity === "critical" || item.severity === "high").length;
  return {
    verdict, confidence, confidenceSource: hasAiConfidence ? "hybrid" : "local", indicators,
    // AI-provided citations are intentionally ignored until a source-validation pipeline exists.
    sources: [], sourceStatus: "not_verified",
    summary: String(value.summary ?? value.explanation ?? local.summary).slice(0, 1000),
    recommendation: String(value.recommendation ?? local.recommendation).slice(0, 1000),
    analysisMetadata: { aiAvailable: true, deterministicSignals: local.indicators.length, highRiskIndicators },
  };
}
