import { SYSTEM_PROMPT } from "../utils/groqPrompt.js";
export async function requestGroq(text: string): Promise<unknown> {
  if (!process.env.GROQ_API_KEY) throw new Error("Groq is not configured");
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 12_000);
  try { const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", signal: controller.signal, headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile", temperature: .15, response_format: { type: "json_object" }, messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: text }] }) }); if (!response.ok) throw new Error(`Groq request failed (${response.status})`); const data = await response.json() as { choices?: { message?: { content?: string } }[] }; const content = data.choices?.[0]?.message?.content; if (!content) throw new Error("Groq returned no analysis"); return JSON.parse(content) as unknown; } finally { clearTimeout(timer); }
}
