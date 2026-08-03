import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Bell, BookOpen, ChevronLeft, ChevronRight, Clock, Database, LayoutDashboard, LogOut, MapPin, Menu, Moon, Network, Radio, Settings, Shield, Sun, User, Users, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";
import logoImg from "@/imports/logo.png";
import tanglawTextImg from "@/imports/tanglaw_text.png";

type Role = "citizen" | "student" | "official" | "teacher" | "ngo" | "humanitarian";
type NavItem = { label: string; href: string; icon: typeof Shield; roles?: Role[] };
type NavSection = { label: string; items: NavItem[] };

const roleLabel: Record<string, string> = { citizen: "Community Member", student: "Student Advocate", official: "Barangay Official", teacher: "Educator", ngo: "NGO Partner", humanitarian: "Humanitarian Partner" };
const navigation: NavSection[] = [
  { label: "Main", items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }, { label: "Verify", href: "/verify", icon: Shield }, { label: "History", href: "/history", icon: Clock }, { label: "Learn", href: "/learn", icon: BookOpen }] },
  { label: "Community", items: [{ label: "Truth Hubs", href: "/truth-hubs", icon: MapPin }, { label: "Community", href: "/community", icon: Users, roles: ["official", "ngo", "humanitarian"] }] },
  { label: "Intelligence", items: [{ label: "Threat Ledger", href: "/offline", icon: Database }, { label: "Offline Sync", href: "/sync", icon: Network }, { label: "Crisis Mode", href: "/crisis", icon: Radio, roles: ["official", "humanitarian"] }] },
  { label: "Account", items: [{ label: "Profile", href: "/profile", icon: User }, { label: "Settings", href: "/accessibility", icon: Settings }] },
];

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className={`grid h-9 w-9 place-items-center rounded-xl border transition-colors ${isDark ? "border-white/15 text-blue-100 hover:bg-white/10" : "border-slate-200 bg-white text-[#1B2F6E] hover:bg-[#FFF8DC]"}`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>;
}

function Brand({ compact = false }: { compact?: boolean }) {
  const { isDark } = useTheme();
  return <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Tanglaw home"><ImageWithFallback src={logoImg} alt="" className="h-8 w-8 shrink-0 object-contain" />{!compact && <ImageWithFallback src={tanglawTextImg} alt="Tanglaw" className="h-5 max-w-24 object-contain" style={{ filter: isDark ? "brightness(0) invert(1)" : undefined }} />}</Link>;
}

function PublicNavbar() {
  const { openModal } = useAuth();
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const sections = [["Home", "home"], ["Features", "features"], ["How It Works", "workflow"], ["Why Tanglaw", "why-tanglaw"], ["About Us", "about"]] as const;
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);
    updateScroll(); window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  useEffect(() => {
    if (location.pathname !== "/") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] });
    sections.forEach(([, id]) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, [location.pathname]);
  const goHome = (id: string) => { navigate("/"); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); setOpen(false); };
  const linkStyle = isDark ? "text-blue-100/75 hover:text-white" : "text-[#1B2F6E] hover:text-[#C91C3A]";
  const navBg = scrolled || open ? (isDark ? "border-white/10 bg-[#050E24]/92 shadow-lg shadow-black/10" : "border-[#E2D9C4] bg-[#FEFAF2]/92 shadow-lg shadow-[#1B2F6E]/5") : "border-transparent bg-transparent";
  return <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${navBg}`}><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"><Brand /><nav className="hidden items-center gap-4 lg:gap-5 md:flex">{sections.map(([label, id]) => <button key={id} onClick={() => goHome(id)} className={`rounded-lg px-1 py-2 text-sm font-semibold transition-colors ${active === id ? "text-[#D4187E]" : linkStyle}`} aria-current={active === id ? "page" : undefined}>{label}</button>)}</nav><div className="hidden items-center gap-2 md:flex"><ThemeToggle /><button onClick={() => openModal("signIn")} className={`rounded-xl px-3 py-2 text-sm font-semibold ${linkStyle}`}>Sign In</button><button onClick={() => openModal("signUp")} className="rounded-full bg-[#F5B800] px-4 py-2 text-sm font-bold text-[#050E24]">Create Account</button></div><div className="flex items-center gap-2 md:hidden"><ThemeToggle /><button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation" className={linkStyle}>{open ? <X /> : <Menu />}</button></div></div><AnimatePresence>{open && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className={`border-t p-4 md:hidden ${isDark ? "border-white/10 bg-[#0C1A3A]" : "border-slate-200 bg-white"}`}><div className="flex flex-col gap-2">{sections.map(([label, id]) => <button key={id} onClick={() => goHome(id)} className={`rounded-xl px-3 py-2 text-left text-sm font-semibold ${active === id ? "bg-[#F5B800]/15 text-[#1B2F6E]" : linkStyle}`}>{label}</button>)}<button onClick={() => { openModal("signIn"); setOpen(false); }} className="rounded-xl border border-[#1B2F6E]/30 px-3 py-2 text-sm font-bold text-[#1B2F6E]">Sign In</button><button onClick={() => { openModal("signUp"); setOpen(false); }} className="rounded-xl bg-[#F5B800] px-3 py-2 text-sm font-bold text-[#050E24]">Create Account</button></div></motion.nav>}</AnimatePresence></header>;
}

function AppSidebar({ collapsed, closeMobile }: { collapsed: boolean; closeMobile: () => void }) {
  const { userRole, userName, signOut } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation(); const navigate = useNavigate();
  const role = userRole as Role | null;
  const visible = useMemo(() => navigation.map(section => ({ ...section, items: section.items.filter(item => !item.roles || (role !== null && item.roles.includes(role))) })).filter(section => section.items.length), [role]);
  const logout = async () => { await signOut(); closeMobile(); navigate("/"); };
  const base = isDark ? "border-white/10 bg-[#081631] text-blue-100" : "border-[#E2D9C4] bg-[#FEFAF2] text-[#1A2B4A]";
  return <aside className={`flex h-full flex-col border-r ${base}`}><div className={`flex h-16 items-center border-b px-4 ${isDark ? "border-white/10" : "border-[#E2D9C4]"}`}><Brand compact={collapsed} /></div><nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Application navigation">{visible.map(section => <section key={section.label} className="mb-5"><p className={`mb-2 px-2 text-[10px] font-extrabold uppercase tracking-[0.16em] ${collapsed ? "sr-only" : isDark ? "text-blue-200/45" : "text-slate-400"}`}>{section.label}</p><div className="space-y-1">{section.items.map(item => { const Icon = item.icon; const active = location.pathname === item.href; return <Link key={`${section.label}-${item.label}`} to={item.href} onClick={closeMobile} title={collapsed ? item.label : undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#F5B800] ${active ? "bg-[#F5B800] text-[#050E24] shadow-sm" : isDark ? "text-blue-100/65 hover:bg-white/8 hover:text-white" : "text-slate-600 hover:bg-[#FFF8DC] hover:text-[#1B2F6E]"}`}><Icon size={18} className="shrink-0" />{!collapsed && <span>{item.label}</span>}</Link>; })}</div></section>)}</nav><div className={`border-t p-3 ${isDark ? "border-white/10" : "border-[#E2D9C4]"}`}><Link to="/profile" onClick={closeMobile} className={`mb-2 flex items-center gap-3 rounded-xl p-2 ${isDark ? "hover:bg-white/8" : "hover:bg-white"}`}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4187E] text-xs font-extrabold text-white">{(userName || "U").slice(0, 2).toUpperCase()}</span>{!collapsed && <span className="min-w-0"><span className="block truncate text-xs font-bold">{userName || "Tanglaw member"}</span><span className={`block truncate text-[10px] ${isDark ? "text-blue-200/50" : "text-slate-500"}`}>{roleLabel[userRole ?? ""] ?? "Member"}</span></span>}</Link><button onClick={() => void logout()} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${isDark ? "text-blue-100/65 hover:bg-white/8" : "text-slate-500 hover:bg-white"}`}><LogOut size={18} />{!collapsed && "Log out"}</button></div></aside>;
}

function AuthenticatedNavigation() {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("tanglaw-sidebar-collapsed") === "true");
  const [mobileOpen, setMobileOpen] = useState(false); const [noticesOpen, setNoticesOpen] = useState(false);
  const location = useLocation(); const { isDark } = useTheme();
  useEffect(() => { localStorage.setItem("tanglaw-sidebar-collapsed", String(collapsed)); document.documentElement.style.setProperty("--tng-sidebar-width", collapsed ? "5rem" : "16rem"); }, [collapsed]);
  useEffect(() => setMobileOpen(false), [location.pathname]);
  const title = navigation.flatMap(section => section.items).find(item => item.href === location.pathname)?.label ?? "Tanglaw";
  const width = collapsed ? "lg:w-20" : "lg:w-64";
  const headerLeft = collapsed ? "lg:left-20" : "lg:left-64";
  const header = isDark ? "border-white/10 bg-[#050E24]/92 text-white" : "border-[#E2D9C4] bg-[#FEFAF2]/92 text-[#1A2B4A]";
  return <><aside className={`fixed inset-y-0 left-0 z-50 hidden transition-[width] duration-200 lg:block ${width}`}><AppSidebar collapsed={collapsed} closeMobile={() => undefined} /><button onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className={`absolute -right-3 top-20 grid h-6 w-6 place-items-center rounded-full border shadow ${isDark ? "border-white/15 bg-[#0C1A3A] text-white" : "border-slate-200 bg-white text-[#1B2F6E]"}`}>{collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}</button></aside><header className={`fixed right-0 top-0 z-40 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl transition-[left] duration-200 ${headerLeft} ${header}`}><div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="lg:hidden" aria-label="Open sidebar"><Menu /></button><h1 className="text-base font-extrabold">{title}</h1></div><div className="relative flex items-center gap-2"><ThemeToggle /><button onClick={() => setNoticesOpen(!noticesOpen)} aria-label="Notifications" aria-expanded={noticesOpen} className={`relative grid h-9 w-9 place-items-center rounded-xl border ${isDark ? "border-white/15 hover:bg-white/10" : "border-slate-200 bg-white hover:bg-[#FFF8DC]"}`}><Bell size={16} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D4187E]" /></button>{noticesOpen && <div className={`absolute right-0 top-11 w-72 rounded-2xl border p-4 shadow-xl ${isDark ? "border-white/15 bg-[#0C1A3A]" : "border-slate-200 bg-white"}`}><p className="text-sm font-bold">Notifications</p><p className={`mt-2 text-xs leading-relaxed ${isDark ? "text-blue-100/65" : "text-slate-500"}`}>You’re all caught up. New verification and community updates will appear here.</p></div>}</div></header><AnimatePresence>{mobileOpen && <><motion.button aria-label="Close sidebar" onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/55 lg:hidden" /><motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 28, stiffness: 320 }} className="fixed inset-y-0 left-0 z-[60] w-72 lg:hidden"><AppSidebar collapsed={false} closeMobile={() => setMobileOpen(false)} /><button onClick={() => setMobileOpen(false)} aria-label="Close sidebar" className="absolute right-3 top-5 rounded-lg p-1"><X size={18} /></button></motion.aside></>}</AnimatePresence></>;
}

export function Navbar() { const { isAuthenticated, isLoading } = useAuth(); if (isLoading) return null; return isAuthenticated ? <AuthenticatedNavigation /> : <PublicNavbar />; }
export function PageLayout({ children }: { children: ReactNode }) { const { isAuthenticated } = useAuth(); return <main className={isAuthenticated ? "min-h-screen lg:pl-[var(--tng-sidebar-width,16rem)] transition-[padding] duration-200" : "min-h-screen"}>{children}</main>; }
