import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Activity, CheckCircle2, Clock3, RefreshCw, Server, TriangleAlert } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";

interface HealthData { status: "Operational" | "Error"; message: string; timestamp: string; version: string; }
type RequestState = "loading" | "success" | "error" | "empty";

function isHealthData(value: unknown): value is HealthData {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return (data.status === "Operational" || data.status === "Error") && typeof data.message === "string" && typeof data.timestamp === "string" && typeof data.version === "string";
}

export default function HealthCheckPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [state, setState] = useState<RequestState>("loading");
  const activeRequest = useRef<AbortController | null>(null);

  const checkHealth = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    setState("loading"); setData(null);
    try {
      const response = await fetch("/api/health", { signal: controller.signal, headers: { Accept: "application/json" } });
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) throw new Error("Health status is unavailable.");
      const result: unknown = await response.json();
      if (result === null) setState("empty");
      else if (!isHealthData(result)) throw new Error("Health status format is invalid.");
      else { setData(result); setState("success"); }
    } catch {
      if (!controller.signal.aborted) setState("error");
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }, []);

  useEffect(() => { void checkHealth(); return () => activeRequest.current?.abort(); }, [checkHealth]);

  return <PageLayout><main className="min-h-screen px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-10" style={{ background: "var(--tng-page)", color: "var(--tng-text-1)" }}><div className="mx-auto max-w-5xl"><div className="mb-8 max-w-2xl"><p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] tng-label-gold">Public system status</p><h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tanglaw Health Check</h1><p className="mt-3 text-sm leading-relaxed tng-text-2 sm:text-base">A safe, live check of Tanglaw&apos;s public application endpoint. No account or personal information is required.</p></div>{state === "loading" && <LoadingState />}{state === "error" && <Notice icon={<TriangleAlert className="text-[#C91C3A]" />} title="We could not retrieve the current status." action={checkHealth} />}{state === "empty" && <Notice icon={<Activity className="tng-gold-text" />} title="The health endpoint returned no status data." action={checkHealth} />}{state === "success" && data && <SuccessState data={data} onRefresh={checkHealth} />}</div></main></PageLayout>;
}

function LoadingState() { return <div aria-live="polite" aria-busy="true" className="grid gap-4 sm:grid-cols-3"><div className="sm:col-span-3 h-24 animate-pulse rounded-2xl tng-surface-2" />{[1, 2, 3].map((item) => <div key={item} className="h-36 animate-pulse rounded-2xl tng-surface-2" />)}</div>; }
function Notice({ icon, title, action }: { icon: ReactNode; title: string; action: () => void }) { return <section role="alert" className="rounded-2xl border p-6 sm:p-8 tng-card tng-border"><div className="flex items-start gap-4">{icon}<div><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm tng-text-2">Please try again shortly. This page never displays internal error details or credentials.</p><button onClick={() => void action()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F5B800] px-4 py-2.5 text-sm font-bold text-[#050E24] transition-transform hover:-translate-y-0.5"><RefreshCw size={16} />Try again</button></div></div></section>; }
function SuccessState({ data, onRefresh }: { data: HealthData; onRefresh: () => void }) { const checkedAt = new Date(data.timestamp); const timestamp = Number.isNaN(checkedAt.getTime()) ? "Unavailable" : checkedAt.toLocaleString(); return <><section className="rounded-2xl border p-5 sm:p-6 tng-card tng-border"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-500/15"><CheckCircle2 className="text-emerald-600" aria-hidden="true" /></span><div><p className="text-sm font-bold">System status</p><p className="text-sm tng-text-2">{data.message}</p></div></div><span className="w-fit rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm font-extrabold text-emerald-700">{data.status}</span></div></section><section className="mt-4 grid gap-4 sm:grid-cols-3"><HealthCard icon={<Server />} label="Endpoint" value="Available" /><HealthCard icon={<Clock3 />} label="Last checked" value={timestamp} /><HealthCard icon={<Activity />} label="Release" value={data.version} /></section><button onClick={() => void onRefresh()} className="mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors tng-border tng-text-1 hover:bg-black/5 dark:hover:bg-white/10"><RefreshCw size={16} />Refresh status</button></>; }
function HealthCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <article className="min-w-0 rounded-2xl border p-5 tng-card tng-border"><div className="mb-5 tng-gold-text">{icon}</div><p className="text-xs font-extrabold uppercase tracking-[0.12em] tng-text-3">{label}</p><p className="mt-2 break-words text-sm font-bold tng-text-1">{value}</p></article>; }
