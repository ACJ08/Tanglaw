import * as cheerio from "cheerio";
import { lookup } from "node:dns/promises";
import { normalizeAnalysis } from "../backend/src/services/verificationService.js";
import { SYSTEM_PROMPT } from "../backend/src/utils/groqPrompt.js";

type ApiRequest = { method?: string; body?: unknown; socket?: { remoteAddress?: string } };
type ApiResponse = { status: (status: number) => ApiResponse; json: (body: unknown) => void; setHeader: (name: string, value: string) => void };

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_INPUT_LENGTH = 15_000;

function send(res: ApiResponse, status: number, body: unknown) { res.status(status).json(body); }
function isPrivateAddress(address: string) {
  const value = address.toLowerCase();
  return value === "::1" || value === "::" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80:") || value.startsWith("127.") || value.startsWith("10.") || value.startsWith("192.168.") || /^172\.(1[6-9]|2\d|3[01])\./.test(value) || value === "169.254.169.254" || value.startsWith("169.254.");
}
async function assertPublicUrl(url: URL) {
  if (!/^https?:$/.test(url.protocol)) throw new Error("Only HTTP(S) URLs can be checked.");
  const addresses = await lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) throw new Error("This URL cannot be checked.");
}
async function extractUrlText(value: string) {
  let url = new URL(value);
  for (let redirects = 0; redirects < 4; redirects += 1) {
    await assertPublicUrl(url);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch(url, { signal: controller.signal, redirect: "manual", headers: { "User-Agent": "Tanglaw verifier/1.0" } });
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) throw new Error("The page could not be retrieved.");
        url = new URL(location, url);
        continue;
      }
      if (!response.ok) throw new Error("The page could not be retrieved.");
      if (!(response.headers.get("content-type") ?? "").includes("text/html")) throw new Error("The URL does not point to a readable webpage.");
      const $ = cheerio.load((await response.text()).slice(0, 1_000_000));
      $("script,style,noscript,svg,nav,footer,header").remove();
      const text = $("main,article,body").first().text().replace(/\s+/g, " ").trim().slice(0, 12_000);
      if (text.length < 30) throw new Error("No readable text was found on this page.");
      return `URL: ${url.href}\n\nPage content:\n${text}`;
    } finally { clearTimeout(timeout); }
  }
  throw new Error("Too many redirects.");
}
async function requestGroq(content: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Groq is not configured.");
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", signal: controller.signal, headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile", temperature: 0.15, response_format: { type: "json_object" }, messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content }] }) });
    if (!response.ok) throw new Error(`Groq request failed (${response.status}).`);
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const output = data.choices?.[0]?.message?.content;
    if (!output) throw new Error("Groq returned no analysis.");
    return normalizeAnalysis(JSON.parse(output), content);
  } finally { clearTimeout(timeout); }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(res, 405, { error: "Method not allowed." }); }
  const ip = req.socket?.remoteAddress ?? "unknown"; const now = Date.now(); const current = requestCounts.get(ip);
  if (!current || current.resetAt < now) requestCounts.set(ip, { count: 1, resetAt: now + 15 * 60_000 });
  else if (current.count >= 30) return send(res, 429, { error: "Too many verification requests. Please try again later." });
  else current.count += 1;
  const body = req.body as { text?: unknown; type?: unknown } | undefined;
  if (!body || typeof body.text !== "string" || !body.text.trim()) return send(res, 400, { error: "Please provide text or a URL to verify." });
  if (body.text.length > MAX_INPUT_LENGTH) return send(res, 413, { error: "Please limit the input to 15,000 characters." });
  if (body.type !== undefined && body.type !== "text" && body.type !== "url") return send(res, 400, { error: "Invalid verification type." });
  try { const content = body.type === "url" ? await extractUrlText(body.text.trim()) : body.text.trim(); return send(res, 200, { result: await requestGroq(content) }); }
  catch (error) { const message = error instanceof Error ? error.message : "Verification is temporarily unavailable."; const status = /URL|page|readable|redirects|HTTP\(S\)/i.test(message) ? 422 : 503; return send(res, status, { error: status === 503 ? "Online verification is unavailable. Using offline analysis." : message }); }
}
