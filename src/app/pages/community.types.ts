export type ReportCategory = "Scam" | "Health" | "Election" | "Misinformation" | "Other";

export const REPORT_CATEGORIES: ReportCategory[] = ["Scam", "Health", "Election", "Misinformation", "Other"];

export type ReportStatus = "Confirmed Scam" | "Confirmed False" | "Under Investigation" | "Unverified" | "Disputed";

export interface CommunityReport {
  id: string;
  userId: string;
  user: string;
  role: string;
  location: string;
  createdAt: string; // ISO string
  type: ReportCategory;
  title: string;
  body: string;
  votes: string[]; // Array of userIds who voted
  isVerified: boolean; // Official verification status (from a trusted source)
  status: ReportStatus;
}

export interface ContributorStats {
  userId: string;
  name: string;
  role: string;
  reportsSubmitted: number;
  reportsVerified: number;
}