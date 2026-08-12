import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useTheme } from "@/app/context/ThemeContext";
import truthHubImg from "@/imports/7__Truth_Hub.png";
import mapGuideImg from "@/imports/8__map.png";

const HUB_PINS = [
  { x: 20, y: 30, primary: true },
  { x: 55, y: 45 },
  { x: 75, y: 25 },
  { x: 35, y: 70 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
];

type TruthHubNetworkVisualProps = {
  className?: string;
  showStatusBadge?: boolean;
};

export function TruthHubNetworkVisual({ className = "", showStatusBadge = true }: TruthHubNetworkVisualProps) {
  const { isDark } = useTheme();

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      {/* Map network card */}
      <div
        className={`relative aspect-[4/3] rounded-3xl border overflow-hidden backdrop-blur-sm ${
          isDark
            ? "border-white/12 bg-gradient-to-br from-[#0C1A3A]/95 to-[#050E24]/95"
            : "border-slate-200/80 bg-gradient-to-br from-slate-50 to-white"
        }`}
        style={{ boxShadow: !isDark ? "var(--tng-shadow-xl)" : "0 24px 48px rgba(0,0,0,0.35)" }}
      >
        {/* Grid overlay */}
        <div className={`absolute inset-0 ${isDark ? "opacity-10" : "opacity-[0.07]"}`}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className={`absolute border-t ${isDark ? "border-white/30" : "border-slate-400/40"}`}
              style={{ top: `${(i + 1) * 12.5}%`, left: 0, right: 0 }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className={`absolute border-l ${isDark ? "border-white/30" : "border-slate-400/40"}`}
              style={{ left: `${(i + 1) * 16.6}%`, top: 0, bottom: 0 }}
            />
          ))}
        </div>

        {/* Radial glow behind active hub */}
        <div className="absolute top-[22%] left-[14%] w-28 h-28 rounded-full bg-[#F5B800]/20 blur-2xl pointer-events-none" />

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {CONNECTIONS.map(([from, to], i) => {
            const a = HUB_PINS[from];
            const b = HUB_PINS[to];
            return (
              <motion.line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isDark ? "rgba(245,184,0,0.35)" : "rgba(245,184,0,0.45)"}
                strokeWidth="0.4"
                strokeDasharray="2 1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
            );
          })}
        </svg>

        {/* Hub pins */}
        {HUB_PINS.map(({ x, y, primary }, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2 + i * 0.35, repeat: Infinity, delay: i * 0.45 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-full"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="relative">
              <MapPin
                size={primary ? 22 : 16}
                className={primary ? "text-[#F5B800]" : "text-[#D4187E]/75"}
                fill={primary ? "#F5B80033" : "transparent"}
              />
              {primary && (
                <motion.div
                  animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-[#F5B800]/40"
                />
              )}
            </div>
          </motion.div>
        ))}

        {/* Guide character — points at the network */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute bottom-2 left-3 z-20 w-[38%] max-w-[120px]"
        >
          <ImageWithFallback
            src={mapGuideImg}
            alt="Liyab pointing to nearby Truth Hubs"
            className="w-full object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Status badge */}
        {showStatusBadge && (
          <div
            className={`absolute top-3 left-3 z-30 px-3 py-2 rounded-xl border flex items-center gap-2 ${
              isDark ? "border-[#D4187E]/40 bg-[#0C1A3A]/90" : "border-slate-200/80 bg-white/95"
            }`}
            style={{ boxShadow: !isDark ? "var(--tng-shadow-md)" : "0 0 20px rgba(0,0,0,0.35)" }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold" style={{ color: "var(--tng-text-1)" }}>
              12 Hubs Active
            </span>
          </div>
        )}
      </div>

      {/* Hero character — running toward the network */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 -right-2 sm:right-0 z-30 w-[52%] max-w-[200px] pointer-events-none"
      >
        <ImageWithFallback
          src={truthHubImg}
          alt="Liyab running to a Truth Hub"
          className="w-full object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
