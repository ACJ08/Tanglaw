import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Accessibility, Sun, Volume2, Globe, Zap, Eye, Type, Minimize2, CheckCircle } from "lucide-react";
import { PageLayout } from "@/app/components/Layout";
import { useTheme } from "@/app/context/ThemeContext";

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  voiceGuidance: boolean;
  simplifiedInterface: boolean;
  reducedMotion: boolean;
  colorBlindMode: string;
  fontSize: number;
  language: string;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  voiceGuidance: false,
  simplifiedInterface: false,
  reducedMotion: false,
  colorBlindMode: "none",
  fontSize: 100,
  language: "Filipino (Tagalog)",
};

const colorBlindModes = [
  { id: "none", label: "Default", desc: "Standard color palette" },
  { id: "protanopia", label: "Protanopia", desc: "Red-blind support" },
  { id: "deuteranopia", label: "Deuteranopia", desc: "Green-blind support" },
  { id: "tritanopia", label: "Tritanopia", desc: "Blue-blind support" },
  { id: "monochromacy", label: "Monochromacy", desc: "Grayscale mode" },
];

const languages = [
  "Filipino (Tagalog)", "English", "Taglish", "Cebuano", "Ilocano",
];

export default function AccessibilityPage() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [previewText] = useState("Ito ay isang halimbawa ng teksto — This is a preview of the interface text size and contrast.");
  const { isDark } = useTheme();

  const set = (key: keyof AccessibilitySettings, value: unknown) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => setSettings(defaultSettings);

  // Preview classes driven by settings — INTENTIONALLY dark preview card
  const previewBg = settings.highContrast ? "bg-black" : "bg-[#0C1A3A]";
  const previewText_ = settings.highContrast ? "text-white" : "text-blue-200/80";
  const previewBorder = settings.highContrast ? "border-white" : "border-white/15";
  const fontScale = settings.fontSize / 100;

  const toggles: Array<{ key: keyof AccessibilitySettings; icon: typeof Eye; label: string; desc: string; color: string }> = [
    { key: "highContrast", icon: Sun, label: "High Contrast Mode", desc: "Increases text and UI contrast for better visibility in bright environments.", color: "#F5B800" },
    { key: "largeText", icon: Type, label: "Large Text Mode", desc: "Increases base font size across the entire application.", color: "#D4187E" },
    { key: "voiceGuidance", icon: Volume2, label: "Voice Guidance", desc: "Liyab will narrate key actions, results, and navigation items aloud.", color: "#4A9EF5" },
    { key: "simplifiedInterface", icon: Minimize2, label: "Simplified Interface", desc: "Hides advanced options and shows only essential actions — ideal for first-time users.", color: "#22C55E" },
    { key: "reducedMotion", icon: Zap, label: "Reduce Motion", desc: "Disables animations and transitions for users with motion sensitivity.", color: "#8B5CF6" },
  ];

  return (
    <PageLayout>
      <div className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D4187E]/15 blur-[120px] rounded-full pointer-events-none" />}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4187E]/40 bg-[#D4187E]/10 text-[#F090C0] text-xs font-semibold mb-4">
              <Accessibility size={12} />Accessibility Settings
            </span>
            <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--tng-text-1)" }}>Accessibility & Display</h1>
            <p className={`text-sm max-w-xl ${isDark ? "text-blue-200/55" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
              Customize Tanglaw to suit your needs. All settings apply immediately — no page reload required.
            </p>
          </motion.div>

          {saved && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-3 px-5 py-3 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm">
              <CheckCircle size={16} />Settings saved successfully.
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Settings column */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Toggle switches */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className={`p-6 rounded-3xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <h2 className="font-bold mb-5 text-sm" style={{ color: "var(--tng-text-1)" }}>Display & Interaction</h2>
                <div className="flex flex-col gap-0.5">
                  {toggles.map(({ key, icon: Icon, label, desc, color }) => {
                    const val = settings[key] as boolean;
                    return (
                      <div key={key} className={`flex items-center gap-4 py-4 border-b last:border-0 ${isDark ? "border-white/6" : "border-slate-100"}`}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "20" }}>
                          <Icon size={16} style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold" style={{ color: "var(--tng-text-1)" }}>{label}</p>
                          <p className={`text-xs mt-0.5 ${isDark ? "text-blue-200/45" : "text-slate-400"}`} style={{ fontFamily: "'Inter',sans-serif" }}>{desc}</p>
                        </div>
                        <button onClick={() => set(key, !val)}
                          className={`w-12 h-6 rounded-full transition-all duration-300 flex items-center flex-shrink-0 ${val ? "justify-end" : "justify-start"}`}
                          style={{ background: val ? color : isDark ? "rgba(255,255,255,0.1)" : "rgba(15,30,56,0.08)", border: `1px solid ${val ? color : isDark ? "rgba(255,255,255,0.15)" : "rgba(15,30,56,0.12)"}` }}>
                          <span className="w-4 h-4 rounded-full bg-white shadow mx-1 transition-all" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Font size slider */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <h2 className="font-bold mb-4 text-sm flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Type size={14} className="text-[#F5B800]" />Font Size
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>A</span>
                  <input type="range" min={80} max={140} step={10} value={settings.fontSize}
                    onChange={(e) => set("fontSize", Number(e.target.value))}
                    className="flex-1 accent-[#F5B800] cursor-pointer" />
                  <span className="text-lg font-bold" style={{ color: "var(--tng-text-1)" }}>A</span>
                </div>
                <div className="flex justify-between">
                  {[80, 90, 100, 110, 120, 130, 140].map((v) => (
                    <button key={v} onClick={() => set("fontSize", v)}
                      className={`text-xs px-2 py-1 rounded-lg transition-all ${settings.fontSize === v ? "bg-[#F5B800]/20 text-[#F5B800] font-bold" : isDark ? "text-blue-200/40 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>
                      {v}%
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Color blind mode */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
                className={`p-6 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <h2 className="font-bold mb-4 text-sm flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Eye size={14} className="text-[#F5B800]" />Color Vision Support
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {colorBlindModes.map((mode) => (
                    <button key={mode.id} onClick={() => set("colorBlindMode", mode.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${settings.colorBlindMode === mode.id ? "border-[#F5B800]/50 bg-[#F5B800]/10" : isDark ? "border-white/10 bg-white/4 hover:border-white/20" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}>
                      <p className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>{mode.label}</p>
                      <p className={`text-[9px] mt-0.5 ${isDark ? "text-blue-200/45" : "text-slate-400"}`}>{mode.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Language */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className={`p-6 rounded-2xl border ${isDark ? "border-white/12 bg-white/4" : "border-slate-200 bg-white"}`}
                style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
              >
                <h2 className="font-bold mb-4 text-sm flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Globe size={14} className="text-[#F5B800]" />Language / Wika
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button key={lang} onClick={() => set("language", lang)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${settings.language === lang ? "border-[#F5B800]/40 bg-[#F5B800]/8 text-[#F5B800] font-semibold" : isDark ? "border-white/10 text-blue-200/60 hover:border-white/20 hover:text-white" : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"}`}>
                      {lang}
                      {settings.language === lang && <CheckCircle size={13} />}
                    </button>
                  ))}
                </div>
              </motion.div>

              <div className="flex gap-3">
                <button onClick={handleSave}
                  className="flex-1 py-3.5 rounded-xl font-bold text-[#050E24] bg-gradient-to-r from-[#F5B800] to-[#FFD44D] hover:shadow-lg hover:shadow-[#F5B800]/25 transition-all text-sm">
                  Save Settings
                </button>
                <button onClick={handleReset}
                  className={`px-5 py-3.5 rounded-xl border text-sm transition-all font-semibold ${isDark ? "border-white/15 text-blue-200/70 hover:text-white hover:bg-white/8" : "border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}>
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* Live preview */}
            <div className="flex flex-col gap-5">
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="sticky top-24">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--tng-text-1)" }}>
                  <Eye size={13} className="text-[#F5B800]" />Live Preview
                </h3>
                {/* Preview card — INTENTIONALLY always dark to show accessibility preview */}
                <div className={`rounded-2xl border ${previewBorder} ${previewBg} p-5 transition-all duration-300 overflow-hidden`}>
                  <div className={`text-[10px] font-bold ${settings.highContrast ? "text-yellow-400" : "text-[#F5B800]"} mb-2 uppercase tracking-widest`}>
                    Verification Result
                  </div>
                  <p className={`font-extrabold mb-3 transition-all ${settings.highContrast ? "text-white" : "text-white"}`}
                    style={{ fontSize: `${Math.max(14, 18 * fontScale)}px` }}>
                    ✓ Confirmed Scam
                  </p>
                  <p className={`text-xs leading-relaxed mb-4 transition-all ${previewText_}`}
                    style={{ fontSize: `${Math.max(10, 12 * fontScale)}px`, fontFamily: "'Inter',sans-serif" }}>
                    {previewText}
                  </p>
                  <div className={`flex gap-2 flex-wrap`}>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-semibold`}
                      style={{ background: settings.highContrast ? "#FFDD00" : "#F5B800", color: "#050E24", fontSize: `${Math.max(9, 10 * fontScale)}px` }}>
                      High Confidence
                    </span>
                    <span className="text-[10px] px-2 py-1 rounded-full border border-white/20 text-white/70"
                      style={{ fontSize: `${Math.max(9, 10 * fontScale)}px` }}>
                      3 Sources Checked
                    </span>
                  </div>
                  {settings.voiceGuidance && (
                    <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#4A9EF5]/15 border border-[#4A9EF5]/30">
                      <Volume2 size={13} className="text-[#4A9EF5]" />
                      <span className="text-[10px] text-[#4A9EF5]">Voice guidance active</span>
                    </div>
                  )}
                </div>

                {/* Current settings summary */}
                <div
                  className={`mt-4 p-4 rounded-2xl border ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
                  style={!isDark ? { boxShadow: "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" } : undefined}
                >
                  <p className="text-xs font-bold mb-3" style={{ color: "var(--tng-text-1)" }}>Active Settings</p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      ["High Contrast", settings.highContrast],
                      ["Large Text", settings.largeText],
                      ["Voice Guidance", settings.voiceGuidance],
                      ["Simplified UI", settings.simplifiedInterface],
                      ["Reduced Motion", settings.reducedMotion],
                    ].map(([label, active]) => (
                      <div key={label as string} className="flex items-center justify-between">
                        <span className={`text-[10px] ${isDark ? "text-blue-200/55" : "text-slate-400"}`}>{label as string}</span>
                        <span className={`text-[10px] font-bold ${active ? "text-green-400" : isDark ? "text-blue-200/30" : "text-slate-300"}`}>
                          {active ? "On" : "Off"}
                        </span>
                      </div>
                    ))}
                    <div className={`flex items-center justify-between pt-1 border-t mt-1 ${isDark ? "border-white/8" : "border-slate-100"}`}>
                      <span className={`text-[10px] ${isDark ? "text-blue-200/55" : "text-slate-400"}`}>Font Size</span>
                      <span className="text-[10px] font-bold" style={{ color: "var(--tng-gold-text)" }}>{settings.fontSize}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] ${isDark ? "text-blue-200/55" : "text-slate-400"}`}>Language</span>
                      <span className="text-[10px] font-bold" style={{ color: "var(--tng-text-1)" }}>{settings.language.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>

                {/* WCAG note */}
                <div className="mt-4 p-4 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/8">
                  <p className="text-xs font-bold text-[#22C55E] mb-1">WCAG AA Compliant</p>
                  <p className={`text-[10px] leading-snug ${isDark ? "text-blue-200/55" : "text-slate-500"}`} style={{ fontFamily: "'Inter',sans-serif" }}>
                    Tanglaw is designed to meet WCAG 2.1 Level AA accessibility standards across all views.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
