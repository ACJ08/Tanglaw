import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, Mail, Send, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/context/AuthContext";
import { demoAccounts, demoAuthEnabled, type DemoUser } from "@/app/auth/demoAuth";
import { DemoAccountsPanel } from "./DemoAccountsPanel";

const roles = ["citizen", "student", "official", "teacher", "ngo", "humanitarian"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthModal() {
  const { modalOpen, modalMode, closeModal, openModal, signIn, signUp, resendVerificationEmail, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("citizen");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!modalOpen) {
      setError("");
      setMessage("");
      setBusy(false);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen && modalMode === "verify" && !email && user?.email) {
      setEmail(user.email);
    }
  }, [email, modalMode, modalOpen, user?.email]);

  if (!modalOpen) return null;

  const validEmail = emailPattern.test(email);
  const passwordHint = password.length >= 8 ? "Password strength: ready" : "Use at least 8 characters.";
  const close = () => {
    if (!busy) closeModal();
  };

  const useDemoAccount = async (demo: DemoUser) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
    setMessage("");
    setBusy(true);
    const { error: authError } = await signIn(demo.email, demo.password);
    setBusy(false);
    if (authError) {
      setError("Unable to start the local demo session. Please try again.");
    } else {
      navigate("/dashboard");
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!validEmail) {
      return setError("Enter a valid email address.");
    }
    setBusy(true);

    if (modalMode === "signIn") {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message.includes("Email not confirmed") ? "Verify your email before signing in. You can resend the verification email below." : "Email or password is incorrect. Please try again.");
      } else {
        navigate("/dashboard");
      }
    } else if (modalMode === "signUp") {
      if (!fullName.trim()) {
        setError("Enter your full name.");
      } else if (password.length < 8) {
        setError("Your password must be at least 8 characters.");
      } else if (password !== confirm) {
        setError("Passwords do not match.");
      } else {
        const { error: authError, requiresEmailConfirmation } = await signUp({ email, password, fullName, role });
        if (authError) {
          setError(authError.message);
        } else if (requiresEmailConfirmation) {
          openModal("verify");
        } else {
          navigate("/dashboard");
        }
      }
    } else if (modalMode === "verify") {
      const { error: authError } = await resendVerificationEmail(email);
      if (authError) {
        setError(authError.message);
      } else {
        setMessage("A new verification email has been sent. Check your inbox and spam folder.");
      }
    } else if (modalMode === "forgotPassword") {
      const { error: authError } = await resetPassword(email);
      if (authError) {
        setError(authError.message);
      } else {
        setMessage("If an account exists for this email, a password-reset link has been sent.");
      }
    } else {
      setError("The requested authentication screen is unavailable. Please choose Sign in or Create account.");
    }
    setBusy(false);
  };

  const title = modalMode === "signIn" ? "Welcome back" : modalMode === "verify" ? "Verify your email" : modalMode === "forgotPassword" ? "Reset your password" : "Create your account";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button aria-label="Close authentication dialog" onClick={close} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
      <div className={`relative w-full ${modalMode === 'signIn' ? 'max-w-lg lg:max-w-5xl xl:max-w-7xl' : 'max-w-lg'} rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:bg-slate-900 dark:border-slate-700 transition-all duration-300`}>
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">
            <button onClick={close} disabled={busy} className="absolute right-5 top-5 rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Close">
              <X size={20} />
            </button>
            {modalMode === "verify" ? <CheckCircle2 className="mb-4 text-green-600" size={40} /> : <Mail className="mb-4 text-[#1B2F6E] dark:text-blue-300" size={36} />}
            <h2 id="auth-title" className="text-2xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
          </div>

          <div className="flex-grow overflow-y-auto -mx-6 px-6 mt-4" style={{ maxHeight: "calc(100vh - 20rem)" }}>
            {modalMode === "verify" && <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Your email has not been verified yet. We sent a confirmation link to <strong>{email || user?.email || "your email address"}</strong>. Check your inbox and spam folder, then open the link. Keep this page open if you like, but you may return and sign in after verification.</p>}
            {modalMode !== 'signIn' && modalMode === "signUp" && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">You’ll need to verify your email before signing in.</p>}
            {modalMode !== 'signIn' && modalMode === "forgotPassword" && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">We’ll send a secure link to reset your password.</p>}
            
            <div className={modalMode === 'signIn' ? 'grid lg:grid-cols-[1fr,1.5fr] xl:grid-cols-[1fr,2fr] lg:gap-x-12 items-start' : ''}>
              <div className="space-y-4">
                <form onSubmit={submit} className="mt-6 space-y-4">
                  {modalMode === "signUp" && (
                    <>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Full name<input required value={fullName} onChange={e => setFullName(e.target.value)} autoComplete="name" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#1B2F6E] dark:bg-slate-800 dark:border-slate-600 dark:text-white" /></label>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Role<select value={role} onChange={e => setRole(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 dark:bg-slate-800 dark:border-slate-600 dark:text-white">{roles.map(item => <option key={item} value={item}>{item === "ngo" ? "NGO / Organization" : item[0].toUpperCase() + item.slice(1)}</option>)}</select></label>
                    </>
                  )}
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#1B2F6E] dark:bg-slate-800 dark:border-slate-600 dark:text-white" /></label>
                  {(modalMode === "signIn" || modalMode === "signUp") && (
                    <>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password
                        <span className="relative mt-1.5 block">
                          <input required type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete={modalMode === "signIn" ? "current-password" : "new-password"} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 outline-none focus:border-[#1B2F6E] dark:bg-slate-800 dark:border-slate-600 dark:text-white" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-3 text-slate-500 dark:text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </span>
                      </label>
                      {modalMode === "signUp" && (
                        <>
                          <p className="-mt-2 text-xs text-slate-500 dark:text-slate-400">{passwordHint}</p>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm password<input required type="password" value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#1B2F6E] dark:bg-slate-800 dark:border-slate-600 dark:text-white" /></label>
                        </>
                      )}
                    </>
                  )}
                  {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">{error}</p>}
                  {message && <p className="rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300" role="status">{message}</p>}
                  <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5B800] px-4 py-3 font-bold text-[#050E24] disabled:cursor-wait disabled:opacity-60 dark:hover:bg-amber-400">{busy ? "Please wait…" : modalMode === "verify" ? <><Send size={16}/>Resend verification email</> : modalMode === "forgotPassword" ? <><KeyRound size={16}/>Send reset link</> : modalMode === "signIn" ? "Sign in" : "Create account"}</button>
                </form>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[#1B2F6E] dark:text-blue-300">
                  {modalMode === "verify" ? (
                    <>
                      <button onClick={() => openModal("signUp")}>Change email address</button>
                      <button onClick={() => openModal("signIn")}>Back to sign in</button>
                    </>
                  ) : modalMode === "signIn" ? (
                    <>
                      <button onClick={() => openModal("forgotPassword")}>Forgot password?</button>
                      <button onClick={() => openModal("signUp")}>Create an account</button>
                    </>
                  ) : (
                    <button onClick={() => openModal("signIn")}>Already have an account? Sign in</button>
                  )}
                </div>
              </div>
              
              {modalMode === "signIn" && demoAuthEnabled && (
                <div className="hidden lg:block">
                  <DemoAccountsPanel accounts={demoAccounts} onSelect={useDemoAccount} busy={busy} />
                </div>
              )}
            </div>

            {modalMode === "signIn" && demoAuthEnabled && (
              <div className="lg:hidden">
                <DemoAccountsPanel accounts={demoAccounts} onSelect={useDemoAccount} busy={busy} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
