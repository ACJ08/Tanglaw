import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "../../supabaseClient"; // Adjust path as needed

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  // 1. Add signUp to the interface definition
  signUp: (email: string, password: string, options?: any) => Promise<{ error: any, data: any, success: boolean }>;
  signOut: () => Promise<void>;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  signIn: async () => ({ error: null }),
  // 2. Add a default empty function here
  signUp: async () => ({ error: null, data: null, success: false }),
  signOut: async () => {},
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setModalOpen(false);
    }
    return { error };
  };

    // 3. Add the signUp function here, right next to signIn
  const signUp = async (email: string, password: string, options?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: options // This passes the metadata to Supabase
    });
    
    if (!error) {
      console.log("User signed up successfully!", data);
      // Optional: uncomment the line below to close the modal after successful sign up
      // setModalOpen(false); 
    } else {
      console.error("Error signing up:", error.message);
    }
    
    return { success: !error, data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAuthenticated = !!session;
  const user = session?.user ?? null;

  return (
    <AuthContext.Provider value={{
      isAuthenticated, 
      user,
      signIn, 
      signUp, // 4. Expose signUp to the rest of the app
      signOut,
      modalOpen, 
      openModal: () => setModalOpen(true),
      closeModal: () => setModalOpen(false),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);