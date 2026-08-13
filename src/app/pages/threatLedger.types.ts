export type ThreatSeverity = "critical" | "high" | "medium" | "low";

export type ThreatFilter = "all" | "known" | ThreatSeverity;

export interface ThreatEntry {
  id: number; // Using number for simplicity, UUID could be used for real apps
  type: string; // e.g., "Financial Scam", "Health Misinformation"
  title: string;
  severity: ThreatSeverity;
  pattern: string; // Description of the threat pattern
  lastSeen: string; // ISO string or relative time
  reports: number; // Community reports
  known: boolean; // Whether the user has marked this as 'known'
  sourceType: "seed" | "local" | "community"; // Origin of the threat
}

export interface SyncMetadata {
  lastSyncAt: string | null; // ISO string of last sync
  syncCount: number;
}