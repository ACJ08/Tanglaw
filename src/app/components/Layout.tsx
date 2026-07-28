import { useState, useEffect, ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown, Shield, WifiOff, BookOpen, MapPin,
  Users, Radio, LayoutDashboard, LogOut, User, Database,
  Network, Bell, Accessibility, Sun, Moon,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";
import logoImg from "@/imports/logo.png";
import tanglawTextImg from "@/imports/tanglaw_text.png";

// ─── Public nav links ─────────────────────────────────────────────────────────

const publicLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#workflow" },
  { label: "Truth Hubs", href: "/truth-hubs" },
  { label: "Accessibility", href: "/#accessibility" },
  { label: "FAQ", href: "/#faq" },
];

// ─── App nav links ────────────────────────────────────────────────────────────

const appLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Verify", href: "/verify", icon: Shield },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Truth Hubs", href: "/truth-hubs", icon: MapPin },
  { label: "Community", href: "/community", icon: Users },
  { label: "Threat Ledger", href: "/offline", icon: Database },
  { label: "Offline Sync", href: "/sync", icon: Network },
  { label: "Crisis Mode", href: "/crisis", icon: Radio },
];

const roleLabelMap: Record<string, string> = {
  citizen: "Community Member",
  student: "Student Advocate",
  official: "Barangay Official",
  teacher: "Educator",
  ngo: "NGO Partner",
  humanitarian: "Humanitarian Partner",
};

// ─── Smooth scroll nav hook ───────────────────────────────────────────────────

function useSmoothNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 180);
      }
    } else {
      navigate(href);
    }
  };
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
        isDark
          ? "border-white/15 text-blue-200/70 hover:text-white hover:bg-white/8 hover:border-white/25"
          : "border-slate-200 text-[#1B2F6E] bg-white hover:bg-[#F5B800]/10 hover:border-[#F5B800]/50 hover:text-[#1B2F6E]"
      }`}
      style={{ boxShadow: !isDark ? "var(--tng-shadow-xs)" : undefined }}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ compact = false }: { compact?: boolean }) {
  const { isDark } = useTheme();
  return (
    <Link to="/" className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl border backdrop-blur transition-all duration-200 ${
      isDark
        ? "bg-white/10 border-white/15 hover:bg-white/15"
        : "bg-white border-slate-200 shadow-sm hover:shadow-md"
    }`}>
      <ImageWithFallback src={logoImg} alt="Tanglaw logo"
        className={`${compact ? "h-6 w-6" : "h-7 w-7"} object-contain`}
        style={{ filter: isDark ? "drop-shadow(0 0 4px rgba(255,255,255,0.25))" : "drop-shadow(0 0 4px rgba(245,184,0,0.3))" }} />
      <ImageWithFallback src={tanglawTextImg} alt="tanglaw"
        className={`${compact ? "h-4" : "h-5"} object-contain`}
        style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }} />
    </Link>
  );
}

// ─── Public Navbar ────────────────────────────────────────────────────────────

function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useAuth();
  const { isDark } = useTheme();
  const smoothNav = useSmoothNav();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled
    ? isDark
      ? "bg-[#050E24]/94 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30"
      : "bg-[#FEFAF2]/97 backdrop-blur-xl border-b border-[#E2D9C4] shadow-md"
    : "bg-transparent";

  const linkCls = isDark
    ? "text-blue-200/70 hover:text-white hover:bg-white/8"
    : "text-[#1E3A6E] hover:text-[#1B2F6E] hover:bg-[#FFF8DC]/80";

  const activeCls = isDark ? "bg-[#F5B800]/15 text-[#F5B800]" : "bg-[#F5B800]/20 text-[#1B2F6E] font-semibold";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {publicLinks.map(({ label, href }) => (
              <button key={href}
                onClick={() => smoothNav(href)}
                className={`text-sm px-3.5 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${linkCls}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Right: theme toggle + auth */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <button onClick={openModal}
              className={`text-sm px-5 py-2.5 rounded-xl font-semibold border transition-all duration-200 ${isDark ? "text-blue-200/70 hover:text-white border-transparent" : "text-[#1B2F6E] border-[#1B2F6E]/25 bg-white hover:border-[#F5B800] hover:bg-slate-50"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-xs)" : undefined }}>
              Sign In
            </button>
            <button onClick={openModal}
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] hover:shadow-lg hover:shadow-[#F5B800]/30 transition-all duration-200 hover:-translate-y-0.5">
              Create Account
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className={`p-2 ${isDark ? "text-white" : "text-[#1A2B4A]"}`}
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${isDark ? "bg-[#0C1A3A] border-white/10" : "bg-[#FEFAF2] border-[#E2D9C4] shadow-lg"}`}>
            <div className="px-6 py-4 flex flex-col gap-2">
              {publicLinks.map(({ label, href }) => (
                <button key={href}
                  onClick={() => { smoothNav(href); setMobileOpen(false); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-all ${isDark ? "text-blue-200/80 hover:text-white hover:bg-white/8" : "text-[#1E3A6E] hover:text-[#1B2F6E] hover:bg-[#FFF8DC]/70"}`}>
                  {label}
                </button>
              ))}
              <div className={`mt-2 pt-2 border-t flex flex-col gap-2 ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <button onClick={() => { openModal(); setMobileOpen(false); }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm">
                  Create Account
                </button>
                <button onClick={() => { openModal(); setMobileOpen(false); }}
                  className={`w-full py-3 rounded-full border text-sm font-semibold ${isDark ? "border-white/20 text-white" : "border-slate-300 text-[#1A2B4A]"}`}>
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── App Navbar (authenticated) ───────────────────────────────────────────────

function AppNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { userRole, userName, signOut } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const roleLabel = roleLabelMap[userRole ?? ""] ?? userRole ?? "User";
  const initials = (userName || "U").slice(0, 2).toUpperCase();

  const navBg = isDark
    ? scrolled
      ? "bg-[#050E24]/96 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30"
      : "bg-[#050E24]/80 backdrop-blur-lg border-b border-white/8"
    : scrolled
      ? "bg-[#FEFAF2]/97 backdrop-blur-xl border-b border-[#E2D9C4] shadow-md"
      : "bg-[#FEFAF2]/92 backdrop-blur-lg border-b border-[#E2D9C4]";

  const linkCls = (active: boolean) => active
    ? isDark ? "bg-[#F5B800]/15 text-[#F5B800]" : "bg-[#F5B800]/20 text-[#1B2F6E] font-semibold"
    : isDark
      ? "text-blue-200/65 hover:text-white hover:bg-white/8"
      : "text-[#1E3A6E] hover:text-[#1B2F6E] hover:bg-[#FFF8DC]/80";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo compact />

          {/* App links */}
          <div className="hidden xl:flex items-center gap-0.5 overflow-x-auto">
            {appLinks.map(({ label, href, icon: Icon }) => (
              <Link key={href} to={href}
                className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${linkCls(location.pathname === href)}`}>
                <Icon size={13} />{label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <button className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${isDark ? "border-white/12 text-blue-200/60 hover:text-white hover:bg-white/8" : "border-slate-200 text-[#1B2F6E]/70 hover:text-[#1B2F6E] bg-white hover:bg-slate-50"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-xs)" : undefined }}>
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D4187E]" />
            </button>
            <Link to="/accessibility"
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${isDark ? "border-white/12 text-blue-200/60 hover:text-white hover:bg-white/8" : "border-slate-200 text-[#1B2F6E]/70 hover:text-[#1B2F6E] bg-white hover:bg-slate-50"}`}
              style={{ boxShadow: !isDark ? "var(--tng-shadow-xs)" : undefined }}>
              <Accessibility size={16} />
            </Link>

            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ml-1 ${isDark ? "border-white/15 bg-white/8 hover:bg-white/12" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                style={{ boxShadow: !isDark ? "var(--tng-shadow-xs)" : undefined }}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-extrabold text-white">{initials}</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className={`text-xs font-bold leading-none ${isDark ? "text-white" : "text-[#1A2B4A]"}`}>{userName || "User"}</span>
                  <span className={`text-[9px] leading-none mt-0.5 ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>{roleLabel}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""} ${isDark ? "text-blue-200/50" : "text-slate-400"}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.15 }}
                    className={`absolute right-0 top-full mt-2 w-56 border rounded-2xl shadow-2xl overflow-hidden ${isDark ? "bg-[#0C1A3A] border-white/15" : "bg-[#FEFAF2] border-[#E2D9C4]"}`}>
                    <div className={`px-4 py-3 border-b ${isDark ? "border-white/8" : "border-slate-100"}`}>
                      <p className={`text-xs font-bold ${isDark ? "text-white" : "text-[#1A2B4A]"}`}>{userName}</p>
                      <p className={`text-[10px] ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>{roleLabel}</p>
                    </div>
                    <div className="p-1">
                      {[
                        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                        { label: "Profile", href: "/profile", icon: User },
                        { label: "Accessibility", href: "/accessibility", icon: Accessibility },
                      ].map(({ label, href, icon: Icon }) => (
                        <button key={href} onClick={() => { navigate(href); setUserMenuOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${isDark ? "hover:bg-white/8" : "hover:bg-slate-50"}`}>
                          <Icon size={14} className="text-[#F5B800]" />
                          <span className={`text-sm ${isDark ? "text-white" : "text-[#1A2B4A]"}`}>{label}</span>
                        </button>
                      ))}
                      <div className={`border-t mt-1 pt-1 ${isDark ? "border-white/8" : "border-slate-100"}`}>
                        <button onClick={() => { signOut(); setUserMenuOpen(false); navigate("/"); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${isDark ? "hover:bg-white/8" : "hover:bg-slate-50"}`}>
                          <LogOut size={14} className={isDark ? "text-blue-200/50" : "text-slate-400"} />
                          <span className={`text-sm ${isDark ? "text-blue-200/70" : "text-slate-500"}`}>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button className={`p-2 ${isDark ? "text-white" : "text-[#1A2B4A]"}`} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t max-h-[80vh] overflow-y-auto ${isDark ? "bg-[#0C1A3A] border-white/10" : "bg-[#FEFAF2] border-[#E2D9C4]"}`}>
            <div className="px-6 py-4 flex flex-col gap-1.5">
              {appLinks.map(({ label, href, icon: Icon }) => (
                <Link key={href} to={href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    location.pathname === href
                      ? "bg-[#F5B800]/12 text-[#F5B800]"
                      : isDark ? "text-blue-200/80 hover:text-white hover:bg-white/8" : "text-[#1E3A6E] hover:text-[#1B2F6E] hover:bg-[#FFF8DC]/70"
                  }`}>
                  <Icon size={16} className={location.pathname === href ? "text-[#F5B800]" : isDark ? "text-[#F5B800]/70" : "text-[#1B2F6E]/50"} />
                  {label}
                </Link>
              ))}
              <div className={`mt-2 pt-2 border-t flex flex-col gap-1 ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isDark ? "text-blue-200/80 hover:text-white hover:bg-white/8" : "text-[#1E3A6E] hover:text-[#1B2F6E] hover:bg-[#FFF8DC]/70"}`}>
                  <User size={16} className={isDark ? "text-blue-200/50" : "text-[#1B2F6E]/50"} />Profile
                </Link>
                <button onClick={() => { signOut(); setMobileOpen(false); navigate("/"); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isDark ? "text-blue-200/50 hover:bg-white/8" : "text-slate-500 hover:bg-slate-50"}`}>
                  <LogOut size={16} />Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Navbar (auto-switches) ───────────────────────────────────────────────────

export function Navbar() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppNavbar /> : <PublicNavbar />;
}

// ─── PageLayout ───────────────────────────────────────────────────────────────

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--tng-page)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      {children}
    </div>
  );
}
