import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthCallbackPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center text-white">
    <div><CheckCircle2 className="mx-auto mb-4 text-[#F5B800]" size={42} /><h1 className="text-2xl font-bold">Confirming your account…</h1><p className="mt-2 text-sm text-slate-300">We’re securely signing you in and loading your Tanglaw profile.</p></div>
  </main>;
}
