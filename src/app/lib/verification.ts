export type Verdict = "safe" | "false" | "misleading" | "unverified";
export type Severity = "critical" | "high" | "medium" | "low";
export type ConfidenceSource = "ai" | "hybrid" | "local" | "fallback";

export interface DetectionIndicator {
  label: string;
  severity: Severity;
  detail: string;
}

export interface VerificationResult {
  verdict: Verdict;
  /** Liyab's confidence in the verdict, on an inclusive 0–100 scale. */
  confidence: number;
  confidenceSource: ConfidenceSource;
  summary: string;
  indicators: DetectionIndicator[];
  /** Sources are populated only by a separately verified source pipeline. */
  sources: { name: string; url: string; credibility: "high" | "medium" }[];
  sourceStatus: "not_verified" | "verified";
  recommendation: string;
  analysisMetadata: { aiAvailable: boolean; deterministicSignals: number; highRiskIndicators: number };
}

const rules: Array<{ pattern: RegExp; label: string; severity: Severity; detail: string }> = [
  { pattern: /\b(urgent|immediately|act now|limited time|last chance|within \d+ *(minutes?|hours?)|before \d|agad|ngayon na|mabilis)\b/i, label: "Artificial urgency", severity: "high", detail: "The message pressures you to act before you can independently verify it." },
  { pattern: /\b(otp|one[- ]time password|password|passcode|pin)\b/i, label: "Request for account secret", severity: "critical", detail: "Legitimate organizations should not ask for an OTP, password, or PIN through a message or link." },
  { pattern: /\b(suspend(ed|ion)?|block(ed)?|restrict(ed|ion)?|close your account|mawala ang balance|permanent)\b/i, label: "Account-threat language", severity: "high", detail: "Threats of account loss or restriction are commonly used to create panic." },
  { pattern: /\b(pay|payment|fee|settle|shipping fee|cash assistance|claim.*(?:prize|cash)|nanalo|p[\s]*[₱p]?\d{2,}|₱\s*\d+)\b/i, label: "Financial request or incentive", severity: "high", detail: "The message uses money, a fee, or a reward to prompt action." },
  { pattern: /\b(verify|confirm|secure|login|identity|details|full name|gcash number|account number)\b/i, label: "Sensitive-information call to action", severity: "medium", detail: "The recipient is directed to disclose or confirm account or identity information." },
  { pattern: /\b(congratulations|selected|only \d+ slots|slot.*given|winner|prize)\b/i, label: "Scarcity or prize tactic", severity: "medium", detail: "A limited offer or unexpected prize can be used to bypass careful judgment." },
];

const urlPattern = /https?:\/\/[^\s<>()]+|\b(?:[a-z0-9-]+\.)+(?:com|net|org|ph|xyz|top|site|info|link)\b[^\s<>()]*/gi;
const brands = ["gcash", "bdo", "j&t", "j&t express", "jtexpress", "shopee", "lazada", "dswd"];

function urlIndicators(text: string): DetectionIndicator[] {
  const urls: string[] = text.match(urlPattern) ?? [];
  const indicators: DetectionIndicator[] = [];
  for (const raw of urls) {
    const host = raw.replace(/^https?:\/\//i, "").split("/")[0].toLowerCase();
    const claimed = brands.find((brand) => text.toLowerCase().includes(brand));
    const mentionsClaimedBrand = claimed && host.includes(claimed.replace(/[^a-z]/g, ""));
    const suspiciousShape = /(?:verify|secure|login|payment|claim)/.test(host) || host.includes("-") || /\.example\.com$/.test(host);
    if (mentionsClaimedBrand && suspiciousShape) indicators.push({ label: "Brand/domain mismatch", severity: "high", detail: `The link host (${host}) uses the claimed brand in an unofficial-looking domain, rather than proving it belongs to that organization.` });
    else if (suspiciousShape) indicators.push({ label: "Suspicious URL pattern", severity: "medium", detail: `The link (${host}) has a pattern often used in credential or payment lures. Verify it through an official channel before opening it.` });
    else indicators.push({ label: "Link requires independent verification", severity: "low", detail: `A link is present (${host}); its presence alone does not establish that it is malicious.` });
    if (indicators.length === 3) break;
  }
  return indicators;
}

const weight: Record<Severity, number> = { critical: 28, high: 17, medium: 9, low: 3 };

export function normalizeConfidence(value: unknown, fallback = 50): number {
  const numeric = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : NaN;
  if (!Number.isFinite(numeric)) return Math.round(Math.min(100, Math.max(0, fallback)));
  // The API contract is 0–100. Decimal probabilities are accepted for resilient parsing.
  const normalized = numeric >= 0 && numeric < 1 ? numeric * 100 : numeric;
  return Math.round(Math.min(100, Math.max(0, normalized)));
}

export function analyzeLocally(text: string): VerificationResult {
  const indicators = [...rules.filter((rule) => rule.pattern.test(text)).map(({ pattern: _pattern, ...indicator }) => indicator), ...urlIndicators(text)].slice(0, 8);
  const risk = indicators.reduce((sum, item) => sum + weight[item.severity], 0);
  const highRiskIndicators = indicators.filter((item) => item.severity === "high" || item.severity === "critical").length;
  const isLikelyScam = highRiskIndicators >= 2 || (highRiskIndicators >= 1 && indicators.length >= 3);
  const confidence = isLikelyScam ? Math.min(88, 52 + Math.round(risk * 0.48)) : indicators.length ? Math.min(68, 42 + Math.round(risk * 0.34)) : 42;
  const verdict: Verdict = isLikelyScam ? "false" : "unverified";
  return {
    verdict, confidence, confidenceSource: "local", indicators, sources: [], sourceStatus: "not_verified",
    summary: isLikelyScam
      ? "Offline analysis found multiple independent phishing or social-engineering signals. This is a risk assessment, not confirmation of the sender's identity."
      : "Offline analysis does not have enough evidence to verify this content. A brand name or unfamiliar link alone is not proof of a scam.",
    recommendation: isLikelyScam
      ? "Do not use the link or share credentials. Open the organization’s official app or website yourself and contact its official support channel."
      : "Treat the content cautiously and verify important claims through the organization’s official channels or a reputable independent source.",
    analysisMetadata: { aiAvailable: false, deterministicSignals: indicators.length, highRiskIndicators },
  };
}
