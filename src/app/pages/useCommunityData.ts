import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { CommunityReport, ContributorStats, ReportCategory, ReportStatus } from "./community.types";

const COMMUNITY_STORAGE_KEY = "tanglaw.communityState";

const SEED_REPORTS: Omit<CommunityReport, 'id' | 'userId' | 'createdAt' | 'votes'>[] = [
  { user: "Maria S.", role: "Community Member", location: "Brgy. 15", type: "Scam", title: "Fake DSWD Relief Text Blast", body: "Received SMS claiming DSWD is giving P10,000 cash aid via GCash. Number is 09XX-XXXX-XXX. DO NOT CLICK.", isVerified: true, status: "Confirmed Scam" },
  { user: "Teacher Lorna", role: "Educator", location: "San Pedro Elem.", type: "Health", title: "Fake Medicine Vendor Near School", body: "Unknown vendor selling unpackaged vitamins near school gate claiming to prevent dengue. Reported to barangay.", isVerified: true, status: "Under Investigation" },
  { user: "Roberto C.", role: "Senior Citizen", location: "Brgy. 22", type: "Election", title: "Fake Candidate Facebook Page", body: "Facebook page impersonating local councilor asking for donations. The real councilor confirmed this is fake.", isVerified: false, status: "Unverified" },
  { user: "Angel Reyes", role: "Student Advocate", location: "State University", type: "Misinformation", title: "False Statistics Circulating on TikTok", body: "Video claiming 'DOH says 90% of Filipinos lack Vitamin D' has been shared 50,000 times. DOH has NOT published this statistic.", isVerified: true, status: "Confirmed False" },
];

interface CommunityState {
  reports: CommunityReport[];
  localUserId: string;
}

function getInitialState(): CommunityState {
  try {
    const savedStateJSON = localStorage.getItem(COMMUNITY_STORAGE_KEY);
    if (savedStateJSON) {
      const savedState = JSON.parse(savedStateJSON) as CommunityState;
      // Basic validation
      if (savedState.reports && savedState.localUserId) {
        return savedState;
      }
    }
  } catch (error) {
    console.error("Failed to load community state from localStorage", error);
    localStorage.removeItem(COMMUNITY_STORAGE_KEY);
  }

  // If no valid state, create initial state with seed data
  const localUserId = `local-user-${crypto.randomUUID()}`;
  const reports: CommunityReport[] = SEED_REPORTS.map((r, i) => ({
    ...r,
    id: `seed-${i + 1}`,
    userId: `seed-user-${i + 1}`,
    createdAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
    votes: [],
  }));

  return { reports, localUserId };
}

export function useCommunityData() {
  const [state, setState] = useState<CommunityState>(getInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to confirm loading is done.
    // getInitialState is synchronous, so we can set loading to false immediately.
    setIsLoading(false);
  }, []);

  const saveState = useCallback((newState: CommunityState) => {
    setState(newState);
    try {
      localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to save community state to localStorage", error);
      toast.error("Could not save changes. Your browser storage might be full.");
    }
  }, []);

  const addReport = useCallback((newReportData: { title: string; body: string; type: ReportCategory; location: string; }) => {
    const newReport: CommunityReport = {
      ...newReportData,
      id: crypto.randomUUID(),
      userId: state.localUserId,
      user: "You", // Or fetch from a local profile if one exists
      role: "Community Member",
      createdAt: new Date().toISOString(),
      votes: [],
      isVerified: false,
      status: "Under Investigation",
    };

    saveState({
      ...state,
      reports: [newReport, ...state.reports],
    });

    toast.success("Report submitted successfully!");
  }, [state, saveState]);

  const toggleVote = useCallback((reportId: string) => {
    const newReports = state.reports.map(report => {
      if (report.id === reportId) {
        const currentVotes = new Set(report.votes);
        if (currentVotes.has(state.localUserId)) {
          currentVotes.delete(state.localUserId);
          toast.info("Vote removed.");
        } else {
          currentVotes.add(state.localUserId);
          toast.success("Voted successfully!");
        }
        return { ...report, votes: Array.from(currentVotes) };
      }
      return report;
    });

    saveState({ ...state, reports: newReports });
  }, [state, saveState]);

  const updateReportStatus = useCallback((reportId: string, newStatus: ReportStatus) => {
    const newReports = state.reports.map(report =>
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    saveState({ ...state, reports: newReports });
    toast.success(`Report status updated to "${newStatus}".`);
  }, [state, saveState]);

  const statsThisWeek = useMemo(() => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const reportsThisWeek = state.reports.filter(r => new Date(r.createdAt) > oneWeekAgo);

    const verifiedAndConfirmed = reportsThisWeek.filter(r =>
      r.status === "Confirmed Scam" || r.status === "Confirmed False"
    ).length;

    const scamsPrevented = reportsThisWeek.filter(r => r.type === "Scam" && r.status === "Confirmed Scam").length;

    return {
      reportsSubmitted: reportsThisWeek.length,
      verifiedAndConfirmed,
      scamsPrevented,
    };
  }, [state.reports]);

  const topContributors = useMemo(() => {
    const contributorMap = new Map<string, ContributorStats>();

    state.reports.forEach(report => {
      if (!contributorMap.has(report.userId)) {
        contributorMap.set(report.userId, {
          userId: report.userId,
          name: report.user,
          role: report.role,
          reportsSubmitted: 0,
          reportsVerified: 0,
        });
      }
      const stats = contributorMap.get(report.userId)!;
      stats.reportsSubmitted += 1;
      if (report.status === "Confirmed Scam" || report.status === "Confirmed False") {
        stats.reportsVerified += 1;
      }
    });

    return Array.from(contributorMap.values())
      .sort((a, b) => b.reportsVerified - a.reportsVerified || b.reportsSubmitted - a.reportsSubmitted)
      .slice(0, 3)
      .map(c => {
        let badge = "Contributor";
        if (c.reportsVerified >= 10) badge = "Truth Champion";
        else if (c.reportsVerified >= 5) badge = "Verified Contributor";
        else if (c.reportsSubmitted >= 5) badge = "Top Contributor";
        return { ...c, badge };
      });
  }, [state.reports]);

  const resetData = useCallback(() => {
    const confirmed = window.confirm("Are you sure you want to reset all community data? This will restore the initial seed reports and clear all your submissions and votes.");
    if (confirmed) {
      localStorage.removeItem(COMMUNITY_STORAGE_KEY);
      // Re-run initial state logic
      const initialState = getInitialState();
      // Force a re-render by setting a new object
      setState({ ...initialState });
      toast.success("Community data has been reset to default.");
    }
  }, []);

  return {
    ...state,
    isLoading,
    addReport,
    toggleVote,
    updateReportStatus,
    statsThisWeek,
    topContributors,
    resetData,
  };
}