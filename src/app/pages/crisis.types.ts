export type CrisisAdvisorySeverity = "critical" | "high" | "medium";

export interface CrisisAdvisory {
  id: string;
  severity: CrisisAdvisorySeverity;
  type: string;
  title: string;
  body: string;
  source: string;
  isVerified: boolean;
  publishedAt: string; // ISO string
  actions: string[];
}

export interface CrisisChecklistItem {
  id: string;
  step: string;
  desc: string;
}

export interface CrisisHotline {
  name: string;
  number: string;
}