import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { CrisisAdvisory, CrisisChecklistItem, CrisisHotline } from "./crisis.types";

const CRISIS_STORAGE_KEY = "tanglaw.crisisState";

const INITIAL_ADVISORIES: CrisisAdvisory[] = [
  {
    id: "adv-1", severity: "critical", type: "Scam Alert",
    title: "Typhoon Relief Donation Scam — Ongoing",
    body: "Fraudulent GCash numbers and fake NGO pages collecting donations following recent typhoon. Verified relief channels listed below.",
    source: "PNP-ACG", isVerified: true,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    actions: ["Only donate via DSWD official: donate.dswd.gov.ph", "Verify NGO registration at SEC", "Report fake pages to PNP-ACG: 0998-598-8116"],
  },
  {
    id: "adv-2", severity: "high", type: "Health Advisory",
    title: "Fake Medicine Sellers Near Evacuation Centers",
    body: "Reports of unlicensed vendors selling unverified medicines near Barangay 12 evacuation center. FDA advisory in effect.",
    source: "FDA", isVerified: true,
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    actions: ["Accept medicines only from identified Red Cross / DOH personnel", "Report suspicious vendors to Barangay Health Worker"],
  },
  {
    id: "adv-3", severity: "medium", type: "Misinformation Alert",
    title: "Unverified Evacuation Route Circulating on Social Media",
    body: "A viral post showing an alternative evacuation route has not been confirmed by NDRRMC. Follow only official routes.",
    source: "Community Report", isVerified: false,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    actions: ["Follow NDRRMC official routes only: ndrrmc.gov.ph", "Contact your Barangay Emergency Coordinator"],
  },
];

const CHECKLIST_ITEMS: CrisisChecklistItem[] = [
  { id: "chk-1", step: "Is the source identified?", desc: "Anonymous or unverifiable sources are a red flag." },
  { id: "chk-2", step: "Has it been published by official agencies?", desc: "NDRRMC, DOH, DSWD, DILG are primary authorities." },
  { id: "chk-3", step: "Does it pressure you to act immediately?", desc: "Urgency is a manipulation tactic. Pause and verify." },
  { id: "chk-4", step: "Are there identifiable links or contact numbers?", desc: "Cross-reference with official hotlines." },
  { id: "chk-5", step: "Have community members independently confirmed?", desc: "Check with Barangay officials or Truth Hubs." },
];

const HOTLINES: CrisisHotline[] = [
  { name: "NDRRMC Operations Center", number: "(02) 8911-1406" },
  { name: "DOH Emergency Hotline", number: "1555" },
  { name: "PNP Hotline", number: "117" },
  { name: "Red Cross Philippines", number: "143" },
  { name: "DSWD Crisis Hotline", number: "(02) 8931-8101" },
];

interface CrisisState {
  advisories: CrisisAdvisory[];
  checklistProgress: string[];
  lastSyncAt: string | null;
}

export function useCrisisData() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [state, setState] = useState<CrisisState>({
    advisories: [],
    checklistProgress: [],
    lastSyncAt: null,
  });

  const saveState = useCallback((newState: CrisisState) => {
    setState(newState);
    localStorage.setItem(CRISIS_STORAGE_KEY, JSON.stringify(newState));
  }, []);

  useEffect(() => {
    try {
      const savedStateJSON = localStorage.getItem(CRISIS_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON) as CrisisState;
        setState(savedState);
      } else {
        // First time load, use initial data
        saveState({ advisories: INITIAL_ADVISORIES, checklistProgress: [], lastSyncAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Failed to load crisis state from localStorage", error);
      // Fallback to initial data if localStorage fails
      setState({ advisories: INITIAL_ADVISORIES, checklistProgress: [], lastSyncAt: null });
    } finally {
      setIsLoading(false);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [saveState]);

  const handleSync = useCallback(() => {
    if (!isOnline) {
      toast.error("Cannot sync while offline.");
      return;
    }
    setIsSyncing(true);
    toast.info("Syncing crisis advisories...");
    setTimeout(() => {
      const newSyncTime = new Date().toISOString();
      saveState({ ...state, advisories: INITIAL_ADVISORIES, lastSyncAt: newSyncTime });
      setIsSyncing(false);
      toast.success("Advisories updated successfully.");
    }, 1500); // Simulate network delay
  }, [isOnline, state, saveState]);

  const toggleChecklistItem = useCallback((id: string) => {
    const newProgress = new Set(state.checklistProgress);
    if (newProgress.has(id)) newProgress.delete(id);
    else newProgress.add(id);
    saveState({ ...state, checklistProgress: Array.from(newProgress) });
  }, [state, saveState]);

  return { ...state, checklistItems: CHECKLIST_ITEMS, hotlines: HOTLINES, isLoading, isSyncing, isOnline, handleSync, toggleChecklistItem };
}