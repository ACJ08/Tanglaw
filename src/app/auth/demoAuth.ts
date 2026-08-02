export type DemoRole = "citizen" | "student" | "official" | "teacher" | "ngo" | "humanitarian";

export type DemoUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: DemoRole;
  status: "active";
  permissions: string[];
  avatarUrl: null;
  isDemo: true;
};

export const demoAuthEnabled = import.meta.env.VITE_DEMO_AUTH_ENABLED === "true" || (import.meta.env.DEV && import.meta.env.VITE_DEMO_AUTH_ENABLED !== "false");
export const demoSessionStorageKey = "tanglaw-demo-session";

export const demoAccounts: readonly DemoUser[] = [
  { id: "demo-citizen-001", fullName: "Maria Santos", email: "citizen@tanglaw.demo", password: "TanglawCitizen123", role: "citizen", status: "active", permissions: ["verify:claims", "view:learning", "submit:reports"], avatarUrl: null, isDemo: true },
  { id: "demo-student-001", fullName: "Angel Ramos", email: "student@tanglaw.demo", password: "TanglawStudent123", role: "student", status: "active", permissions: ["verify:claims", "view:learning", "submit:reports", "view:education-tools"], avatarUrl: null, isDemo: true },
  { id: "demo-official-001", fullName: "Captain Ramon Cruz", email: "official@tanglaw.demo", password: "TanglawOfficial123", role: "official", status: "active", permissions: ["verify:claims", "view:community", "manage:truth-hubs", "view:analytics"], avatarUrl: null, isDemo: true },
  { id: "demo-teacher-001", fullName: "Liza Villanueva", email: "teacher@tanglaw.demo", password: "TanglawTeacher123", role: "teacher", status: "active", permissions: ["verify:claims", "view:learning", "manage:classroom-resources"], avatarUrl: null, isDemo: true },
  { id: "demo-ngo-001", fullName: "Paolo Reyes", email: "ngo@tanglaw.demo", password: "TanglawNgo123", role: "ngo", status: "active", permissions: ["verify:claims", "view:community", "view:insights", "view:threat-monitoring"], avatarUrl: null, isDemo: true },
  { id: "demo-humanitarian-001", fullName: "Amina Dela Peña", email: "humanitarian@tanglaw.demo", password: "TanglawHumanitarian123", role: "humanitarian", status: "active", permissions: ["verify:claims", "view:crisis", "view:advisories", "view:community-monitoring"], avatarUrl: null, isDemo: true },
];

export function findDemoAccount(email: string, password: string) {
  if (!demoAuthEnabled) return null;
  return demoAccounts.find(account => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password) ?? null;
}

export function readDemoSession(): DemoUser | null {
  if (!demoAuthEnabled) return null;
  try {
    const value = localStorage.getItem(demoSessionStorageKey);
    if (!value) return null;
    const stored = JSON.parse(value) as DemoUser;
    return demoAccounts.find(account => account.id === stored.id && account.email === stored.email) ?? null;
  } catch { return null; }
}

export function writeDemoSession(account: DemoUser) {
  localStorage.setItem(demoSessionStorageKey, JSON.stringify(account));
}

export function clearDemoSession() {
  localStorage.removeItem(demoSessionStorageKey);
}
