import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { clearDemoSession, findDemoAccount, readDemoSession, type DemoUser, writeDemoSession } from "@/app/auth/demoAuth";

export type AuthModalMode = "signIn" | "signUp" | "verify" | "forgotPassword";

type SignUpInput = { email: string; password: string; fullName: string; role: string };
type Profile = { id: string; email: string; fullName: string; username: string | null; role: string | null; avatarUrl: string | null };

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | DemoUser | null;
  profile: Profile | null;
  userName: string | null;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (input: SignUpInput) => Promise<{ error: AuthError | null; requiresEmailConfirmation: boolean }>;
  resendVerificationEmail: (email: string) => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  checkEmailVerification: () => Promise<{ verified: boolean; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  modalOpen: boolean;
  modalMode: AuthModalMode;
  openModal: (mode?: AuthModalMode) => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function isDemoUser(user: User | DemoUser): user is DemoUser {
  return "isDemo" in user && user.isDemo === true;
}

function toProfile(user: User | DemoUser | null): Profile | null {
  if (!user) return null;
  if (isDemoUser(user)) return { id: user.id, email: user.email, fullName: user.fullName, username: null, role: user.role, avatarUrl: user.avatarUrl };
  const metadata = user.user_metadata ?? {};
  const fullName = typeof metadata.full_name === "string" && metadata.full_name.trim()
    ? metadata.full_name.trim()
    : user.email?.split("@")[0] ?? "Tanglaw member";
  return {
    id: user.id,
    email: user.email ?? "",
    fullName,
    username: typeof metadata.username === "string" ? metadata.username : null,
    role: typeof metadata.role === "string" ? metadata.role : null,
    avatarUrl: typeof metadata.avatar_url === "string" ? metadata.avatar_url : null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(() => readDemoSession());
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthModalMode>("signUp");

  useEffect(() => {
    let active = true;
    const initialize = async () => {
      const { data } = await supabase.auth.getSession();
      if (active) {
        setSession(data.session);
        if (data.session) { clearDemoSession(); setDemoUser(null); }
        setIsLoading(false);
      }
    };
    void initialize();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        if (nextSession) { clearDemoSession(); setDemoUser(null); }
        setIsLoading(false);
      }
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  const signIn = async (email: string, password: string) => {
    const demoAccount = findDemoAccount(email, password);
    if (demoAccount) {
      // A demo login never calls Supabase or creates an auth/database record.
      writeDemoSession(demoAccount);
      setSession(null);
      setDemoUser(demoAccount);
      setModalOpen(false);
      return { error: null };
    }
    clearDemoSession();
    setDemoUser(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (!error) setModalOpen(false);
    return { error };
  };

  const signUp = async ({ email, password, fullName, role }: SignUpInput) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(), password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: fullName.trim(), role },
      },
    });
    return { error, requiresEmailConfirmation: !data.session };
  };

  const resendVerificationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({ type: "signup", email: email.trim(), options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth/callback` });
    return { error };
  };

  const checkEmailVerification = async () => {
    if (demoUser) return { verified: true, error: null };
    const { data, error } = await supabase.auth.getUser();
    return { verified: Boolean(data.user?.email_confirmed_at), error };
  };

  const signOut = async () => {
    // Scope local makes account switching deterministic even if another device is offline.
    if (demoUser) {
      clearDemoSession();
      setDemoUser(null);
      return { error: null };
    }
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (!error) setSession(null);
    return { error };
  };

  const activeUser = demoUser ?? session?.user ?? null;
  const profile = useMemo(() => toProfile(activeUser), [activeUser]);
  const value: AuthState = {
    isAuthenticated: Boolean(activeUser), isLoading, user: activeUser, profile,
    userName: profile?.fullName ?? null, userRole: profile?.role ?? null,
    signIn, signUp, resendVerificationEmail, resetPassword, checkEmailVerification, signOut,
    modalOpen, modalMode,
    openModal: (mode = "signUp") => { setModalMode(mode); setModalOpen(true); },
    closeModal: () => setModalOpen(false),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
