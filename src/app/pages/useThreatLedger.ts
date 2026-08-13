import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { ThreatEntry, SyncMetadata, ThreatFilter } from "./threatLedger.types";
import * as ledgerStorage from "./threatLedger.storage";

export const useThreatLedger = () => {
  const [threats, setThreats] = useState<ThreatEntry[]>([]);
  const [syncMeta, setSyncMeta] = useState<SyncMetadata>({ lastSyncAt: null, syncCount: 0 });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ThreatFilter>("all");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Load initial data from storage
    setThreats(ledgerStorage.getThreats());
    setSyncMeta(ledgerStorage.getSyncMetadata());

    // Listen for online/offline status changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const filteredThreats = useMemo(() => {
    return threats
      .filter((entry) => {
        // Filter logic
        if (filter === "all") return true;
        if (filter === "known") return entry.known;
        return entry.severity === filter;
      })
      .filter((entry) => {
        // Search logic
        const s = search.toLowerCase();
        if (!s) return true;
        return (
          entry.title.toLowerCase().includes(s) ||
          entry.type.toLowerCase().includes(s) ||
          entry.pattern.toLowerCase().includes(s) ||
          entry.severity.toLowerCase().includes(s)
        );
      });
  }, [threats, search, filter]);

  const toggleKnownStatus = (id: number) => {
    const updatedThreats = threats.map((t) =>
      t.id === id ? { ...t, known: !t.known } : t
    );
    setThreats(updatedThreats);
    ledgerStorage.saveThreats(updatedThreats);
    const threat = updatedThreats.find(t => t.id === id);
    toast.success(threat?.known ? "Threat marked as known." : "Threat marked as unknown.");
  };

  const incrementReportCount = (id: number) => {
    const updatedThreats = threats.map((t) =>
      t.id === id ? { ...t, reports: t.reports + 1 } : t
    );
    setThreats(updatedThreats);
    ledgerStorage.saveThreats(updatedThreats);
    toast.info("Report count incremented locally.");
  };

  const handleSync = (onProgress: (step: number) => void) => {
    const steps = 5;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      onProgress(currentStep);
      if (currentStep >= steps) {
        clearInterval(interval);
        const newMeta = {
          lastSyncAt: new Date().toISOString(),
          syncCount: syncMeta.syncCount + 1,
        };
        setSyncMeta(newMeta);
        ledgerStorage.saveSyncMetadata(newMeta);
        toast.success("Local ledger synchronized successfully.");
      }
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your local threat ledger? This cannot be undone.")) {
      const { threats, sync } = ledgerStorage.resetLedger();
      setThreats(threats);
      setSyncMeta(sync);
      toast.success("Threat ledger has been reset to default.");
    }
  };

  const exportLedger = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      threats,
      syncMeta,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tanglaw-threat-ledger.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Ledger exported successfully.");
  };

  const importLedger = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File is not readable.");
        const data = JSON.parse(text);
        if (data.version !== 1 || !Array.isArray(data.threats)) {
          throw new Error("Invalid ledger format.");
        }
        // Simple replace strategy for this demo
        setThreats(data.threats);
        ledgerStorage.saveThreats(data.threats);
        if (data.syncMeta) {
            setSyncMeta(data.syncMeta);
            ledgerStorage.saveSyncMetadata(data.syncMeta);
        }
        toast.success(`${data.threats.length} threats imported successfully.`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to import ledger.");
      }
    };
    reader.readAsText(file);
  };

  return {
    threats: filteredThreats,
    totalThreatCount: threats.length,
    syncMeta,
    search,
    setSearch,
    filter,
    setFilter,
    isOnline,
    toggleKnownStatus,
    incrementReportCount,
    handleSync,
    handleReset,
    exportLedger,
    importLedger,
  };
};