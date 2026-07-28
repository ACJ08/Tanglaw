import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  userName: string;
  signIn: (role: string, name: string) => void;
  signOut: () => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  userRole: null,
  userName: "",
  signIn: () => {},
  signOut: () => {},
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const signIn = (role: string, name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsAuthenticated(true);
    setModalOpen(false);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, userRole, userName,
      signIn, signOut,
      modalOpen, openModal: () => setModalOpen(true), closeModal: () => setModalOpen(false),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
