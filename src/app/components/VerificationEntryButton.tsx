import { useState, type CSSProperties } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/context/AuthContext";

export function VerificationEntryButton({ className, style }: { className: string; style?: CSSProperties }) {
  const { isAuthenticated, checkEmailVerification, openModal } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const onClick = async () => {
    if (!isAuthenticated) { openModal("signIn"); return; }
    setChecking(true);
    const { verified } = await checkEmailVerification();
    setChecking(false);
    if (verified) navigate("/verify");
    else openModal("verify");
  };
  return <button onClick={() => void onClick()} disabled={checking} className={className} style={style}>
    {checking ? "Checking account…" : <>Try Verification <Search size={14} className="group-hover:scale-110 transition-transform" /></>}
  </button>;
}
