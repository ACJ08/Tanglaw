import * as cheerio from "cheerio";
import { lookup } from "node:dns/promises";
const privateIp = (ip: string) => ip === "::1" || ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.") || /^172\.(1[6-9]|2\d|3[01])\./.test(ip);
export async function extractUrlText(value: string) {
  const url = new URL(value); if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP(S) URLs can be checked"); const address = await lookup(url.hostname); if (privateIp(address.address)) throw new Error("This URL cannot be checked");
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 10_000);
  try { const response = await fetch(url, { signal: controller.signal, redirect: "follow", headers: { "User-Agent": "Tanglaw verifier/1.0" } }); if (!response.ok) throw new Error("The page could not be retrieved"); if (!(response.headers.get("content-type") ?? "").includes("text/html")) throw new Error("The URL does not point to a readable webpage"); const $ = cheerio.load((await response.text()).slice(0,1_000_000)); $("script,style,noscript,svg,nav,footer,header").remove(); const text=$("main,article,body").first().text().replace(/\s+/g," ").trim().slice(0,12_000); if (text.length<30) throw new Error("No readable text was found on this page"); return `URL: ${url.href}\n\nPage content:\n${text}`; } finally { clearTimeout(timer); }
}
