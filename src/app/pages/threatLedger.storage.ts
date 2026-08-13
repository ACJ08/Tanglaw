import { ThreatEntry, SyncMetadata } from "./threatLedger.types";

const THREATS_KEY = "tanglaw_threat_ledger_threats";
const SYNC_KEY = "tanglaw_threat_ledger_sync";
const VERSION_KEY = "tanglaw_threat_ledger_version";
const STORAGE_VERSION = 1;

// The initial seed data from the original component
const seedThreats: ThreatEntry[] = [
  { id: 1, type: "Financial Scam", title: "GCash Account Suspension Scam", severity: "critical", pattern: "Fake SMS claiming GCash account suspension with external link", lastSeen: "2 days ago", reports: 847, known: false, sourceType: "seed" },
  { id: 2, type: "Health Misinformation", title: "Miracle Cure Claims", severity: "high", pattern: "Claims of miraculous cures for chronic diseases using local herbs", lastSeen: "1 week ago", reports: 312, known: false, sourceType: "seed" },
  { id: 3, type: "Government Impersonation", title: "Fake DSWD Cash Aid Messages", severity: "critical", pattern: "Texts or posts claiming DSWD, SSS, or PhilHealth cash distribution via GCash", lastSeen: "3 days ago", reports: 1204, known: false, sourceType: "seed" },
  { id: 4, type: "Election Disinformation", title: "Manipulated Candidate Endorsements", severity: "medium", pattern: "AI-generated images or videos showing celebrities endorsing candidates", lastSeen: "2 weeks ago", reports: 189, known: false, sourceType: "seed" },
  { id: 5, type: "Disaster Scam", title: "Typhoon Relief Donation Fraud", severity: "high", pattern: "Fake NGO collection pages appearing after major typhoons", lastSeen: "5 days ago", reports: 523, known: false, sourceType: "seed" },
  { id: 6, type: "Investment Fraud", title: "Ponzi & Crypto Scam Patterns", severity: "critical", pattern: "High-return investment promises via social media with celebrity endorsements", lastSeen: "1 day ago", reports: 2891, known: false, sourceType: "seed" },
];

const defaultSyncMetadata: SyncMetadata = {
  lastSyncAt: null,
  syncCount: 0,
};

const getInitialThreats = (): ThreatEntry[] => {
  console.log("Initializing threat ledger with seed data.");
  return seedThreats;
};

const checkVersion = () => {
  const version = localStorage.getItem(VERSION_KEY);
  if (!version || Number(version) !== STORAGE_VERSION) {
    localStorage.removeItem(THREATS_KEY);
    localStorage.removeItem(SYNC_KEY);
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
  }
};

export const getThreats = (): ThreatEntry[] => {
  checkVersion();
  try {
    const stored = localStorage.getItem(THREATS_KEY);
    if (!stored) {
      const initial = getInitialThreats();
      saveThreats(initial);
      return initial;
    }
    return JSON.parse(stored) as ThreatEntry[];
  } catch (e) {
    console.error("Failed to parse threats from localStorage, resetting.", e);
    const initial = getInitialThreats();
    saveThreats(initial);
    return initial;
  }
};

export const saveThreats = (threats: ThreatEntry[]): void => {
  localStorage.setItem(THREATS_KEY, JSON.stringify(threats));
};

export const getSyncMetadata = (): SyncMetadata => {
  try {
    const stored = localStorage.getItem(SYNC_KEY);
    return stored ? JSON.parse(stored) as SyncMetadata : defaultSyncMetadata;
  } catch (e) {
    console.error("Failed to parse sync metadata, using default.", e);
    return defaultSyncMetadata;
  }
};

export const saveSyncMetadata = (metadata: SyncMetadata): void => {
  localStorage.setItem(SYNC_KEY, JSON.stringify(metadata));
};

export const resetLedger = (): { threats: ThreatEntry[], sync: SyncMetadata } => {
  const initialThreats = getInitialThreats();
  const initialSync = defaultSyncMetadata;
  saveThreats(initialThreats);
  saveSyncMetadata(initialSync);
  return { threats: initialThreats, sync: initialSync };
};