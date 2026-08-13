import { KeyboardEvent, MouseEvent, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  ChevronRight,
  Search,
  Filter,
  Navigation,
  X,
  MapPinOff,
} from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/app/components/Layout";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { TruthHubPartnershipDialog } from "@/app/components/TruthHubPartnershipDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import truthHubImg from "@/imports/7__Truth_Hub.png";
import mapImg from "@/imports/8__map.png";
import { useTheme } from "@/app/context/ThemeContext";
import { getDirectionsUrl, HUB_TYPES, truthHubs, type TruthHub } from "@/app/lib/truthHubData";
import {
  activeFilterCount,
  defaultTruthHubFilters,
  filterTruthHubs,
  hasActiveFilters,
  type HubStatusFilter,
  type HubTypeFilter,
  type TruthHubFilters,
} from "@/app/lib/truthHubFilters";

const HUB_TYPE_OPTIONS: { value: HubTypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...HUB_TYPES.map((type) => ({ value: type as HubTypeFilter, label: type })),
];

const STATUS_OPTIONS: { value: HubStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open Now" },
  { value: "closed", label: "Closed" },
];

export default function TruthHubPage() {
  const { isDark } = useTheme();
  const [filters, setFilters] = useState<TruthHubFilters>(defaultTruthHubFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  const filtered = useMemo(() => filterTruthHubs(truthHubs, filters), [filters]);
  const filterCount = activeFilterCount(filters);
  const cardShadow = !isDark ? "0 2px 6px rgba(15,30,56,0.08), 0 0 0 1px rgba(15,30,56,0.04)" : undefined;

  const toggleNearMe = () => {
    setFilters((prev) => {
      const next = !prev.sortByDistance;
      if (next) {
        toast.success("Sorted by nearest first", {
          description: "Using precomputed distances from your area.",
        });
      }
      return { ...prev, sortByDistance: next };
    });
  };

  const resetFilters = () => {
    setFilters((prev) => ({ ...prev, hubType: "all", status: "all" }));
  };

  const openDirections = (hub: TruthHub, event?: MouseEvent) => {
    event?.stopPropagation();
    window.open(getDirectionsUrl(hub), "_blank", "noopener,noreferrer");
  };

  const toggleHub = (hubId: number) => {
    setSelectedId((prev) => (prev === hubId ? null : hubId));
  };

  const handleHubKeyDown = (event: KeyboardEvent, hubId: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleHub(hubId);
    }
  };

  const filterBtnClass = (active: boolean) =>
    `flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50 ${
      active
        ? "border-[#F5B800]/40 bg-[#F5B800]/15 font-semibold"
        : isDark
          ? "border-white/12 bg-white/5 text-blue-200/60 hover:bg-white/10"
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
    }`;

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-24 pb-10 overflow-hidden" style={{ background: "var(--tng-page)" }}>
        {isDark && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4187E]/15 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1B2F6E]/50 blur-[120px] rounded-full" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4187E]/40 bg-[#D4187E]/10 text-[#F090C0] text-xs font-semibold mb-6">
              <MapPin size={12} className="text-[#D4187E]" aria-hidden />
              Physical Verification Network
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "var(--tng-text-1)" }}>
              Truth Hub<br />
              <em className="not-italic" style={{ background: "linear-gradient(135deg,#F5B800,#D4187E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Network
              </em>
            </h1>
            <p className="leading-relaxed mb-6" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
              Truth Hubs are community-staffed verification centers located in barangay halls, schools, and libraries. Walk in, verify any claim, and get in-person guidance from trained community validators.
            </p>
            <div className="flex gap-6">
              {[["4", "Nearby Hubs"], ["12", "Total Hubs"], ["500+", "Verifications Done"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-extrabold" style={{ color: "var(--tng-text-1)" }}>{v}</p>
                  <p className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center items-center h-72 lg:h-80" aria-hidden>
            <div className={`absolute inset-0 rounded-3xl border overflow-hidden ${isDark ? "border-white/10 bg-gradient-to-br from-[#0C1A3A] to-[#050E24]" : "border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200"}`}>
              <div className="absolute inset-0 opacity-15">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute border-t border-white/20" style={{ top: `${i * 14}%`, left: 0, right: 0 }} />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="absolute border-l border-white/20" style={{ left: `${i * 16.6}%`, top: 0, bottom: 0 }} />
                ))}
              </div>
              {[[20, 30], [55, 45], [75, 25], [35, 70]].map(([x, y], i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="relative">
                    <MapPin size={22} className={i === 0 ? "text-[#F5B800]" : "text-[#D4187E]/70"} fill={i === 0 ? "#F5B80033" : "transparent"} />
                    {i === 0 && (
                      <motion.div
                        animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-[#F5B800]/40"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={`absolute bottom-4 right-4 w-24 h-24 rounded-2xl border border-[#F5B800]/30 backdrop-blur p-2 ${isDark ? "bg-[#0C1A3A]/90" : "bg-white/90"}`}>
              <ImageWithFallback src={mapImg} alt="" className="w-full h-full object-contain" />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
              <ImageWithFallback src={truthHubImg} alt="Liyab running to Truth Hub" className="w-48 sm:w-56 object-contain drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hub Finder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" style={{ background: "var(--tng-page)" }}>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div
            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border ${isDark ? "border-white/12 bg-white/5" : "border-slate-200 bg-white"}`}
            style={{ boxShadow: cardShadow }}
          >
            <Search size={16} className={isDark ? "text-blue-200/40" : "text-slate-400"} aria-hidden />
            <input
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="Search by name, address, or hub type..."
              aria-label="Search Truth Hubs by name, address, or hub type"
              className={`flex-1 min-w-0 bg-transparent text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/40 rounded-md ${isDark ? "text-white placeholder-blue-200/30" : "placeholder-slate-400"}`}
              style={{ fontFamily: "'Inter',sans-serif", color: isDark ? undefined : "var(--tng-text-1)" }}
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                aria-label="Clear search"
                className={`p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50 ${isDark ? "text-blue-200/50 hover:text-white" : "text-slate-400 hover:text-slate-600"}`}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-3 shrink-0">
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-expanded={filterOpen}
                  aria-haspopup="dialog"
                  className={filterBtnClass(filterCount > 0)}
                  style={{ color: filterCount > 0 ? "var(--tng-gold-text)" : undefined }}
                >
                  <Filter size={15} aria-hidden />
                  Filter
                  {filterCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-[#F5B800]/25 text-[10px] font-bold" aria-hidden>
                      {filterCount}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className={`w-72 p-4 ${isDark ? "border-white/12 bg-[#0C1A3A] text-white" : "border-slate-200 bg-white"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold" style={{ color: "var(--tng-text-1)" }}>
                    Filter Hubs
                  </p>
                  {hasActiveFilters(filters) && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs font-semibold text-[#F5B800] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50 rounded"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <fieldset className="mb-4 border-0 p-0 m-0">
                  <legend className="text-xs font-semibold mb-2" style={{ color: "var(--tng-text-2)" }}>
                    Hub Type
                  </legend>
                  <RadioGroup
                    value={filters.hubType}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, hubType: value as HubTypeFilter }))}
                    className="gap-2"
                  >
                    {HUB_TYPE_OPTIONS.map(({ value, label }) => (
                      <div key={value} className="flex items-center gap-2">
                        <RadioGroupItem value={value} id={`hub-type-${value}`} />
                        <Label htmlFor={`hub-type-${value}`} className="text-sm font-normal cursor-pointer" style={{ color: "var(--tng-text-2)" }}>
                          {label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </fieldset>

                <fieldset className="border-0 p-0 m-0">
                  <legend className="text-xs font-semibold mb-2" style={{ color: "var(--tng-text-2)" }}>
                    Status
                  </legend>
                  <RadioGroup
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value as HubStatusFilter }))}
                    className="gap-2"
                  >
                    {STATUS_OPTIONS.map(({ value, label }) => (
                      <div key={value} className="flex items-center gap-2">
                        <RadioGroupItem value={value} id={`hub-status-${value}`} />
                        <Label htmlFor={`hub-status-${value}`} className="text-sm font-normal cursor-pointer" style={{ color: "var(--tng-text-2)" }}>
                          {label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </fieldset>
              </PopoverContent>
            </Popover>

            <button
              type="button"
              onClick={toggleNearMe}
              aria-pressed={filters.sortByDistance}
              className={`${filterBtnClass(filters.sortByDistance)} border-[#F5B800]/30 bg-[#F5B800]/10 hover:bg-[#F5B800]/20 font-semibold ${isDark ? "text-[#F5B800]" : "text-[#1B2F6E]"}`}
            >
              <Navigation size={15} aria-hidden />
              Near Me
            </button>
          </div>
        </div>

        {(hasActiveFilters(filters) || filters.sortByDistance) && (
          <div className="flex flex-wrap items-center gap-2 mb-4" aria-live="polite">
            <span className={`text-xs ${isDark ? "text-blue-200/50" : "text-slate-400"}`}>Active:</span>
            {filters.hubType !== "all" && (
              <span className={`text-xs px-2 py-1 rounded-full border ${isDark ? "border-white/15 text-blue-200/70" : "border-slate-200 text-slate-600"}`}>
                Type: {filters.hubType}
              </span>
            )}
            {filters.status !== "all" && (
              <span className={`text-xs px-2 py-1 rounded-full border ${isDark ? "border-white/15 text-blue-200/70" : "border-slate-200 text-slate-600"}`}>
                Status: {filters.status === "open" ? "Open Now" : "Closed"}
              </span>
            )}
            {filters.sortByDistance && (
              <span className="text-xs px-2 py-1 rounded-full border border-[#F5B800]/30 text-[#F5B800]">
                Nearest first
              </span>
            )}
            {hasActiveFilters(filters) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[#F5B800] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50 rounded"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filtered.length === 0
            ? "No Truth Hubs match your search and filters."
            : `${filtered.length} Truth Hub${filtered.length === 1 ? "" : "s"} found.`}
        </p>

        {filtered.length === 0 ? (
          <div
            role="status"
            className={`py-16 px-6 rounded-2xl border text-center ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}
            style={{ boxShadow: cardShadow }}
          >
            <MapPinOff size={40} className={`mx-auto mb-4 ${isDark ? "text-blue-200/30" : "text-slate-300"}`} aria-hidden />
            <h2 className="font-bold text-lg mb-2" style={{ color: "var(--tng-text-1)" }}>
              No Truth Hubs found
            </h2>
            <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
              {filters.search.trim()
                ? `No hubs match "${filters.search.trim()}". Try a different search term or adjust your filters.`
                : "No hubs match your current filters. Try clearing filters or broadening your search."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {filters.search && (
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50 ${isDark ? "border-white/12 text-blue-200/70 hover:bg-white/5" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  Clear search
                </button>
              )}
              {hasActiveFilters(filters) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#F5B800]/40 text-[#F5B800] hover:bg-[#F5B800]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            {filtered.map((hub, i) => {
              const expanded = selectedId === hub.id;
              return (
                <motion.article
                  key={hub.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${expanded ? "border-[#F5B800]/50 bg-[#F5B800]/8" : isDark ? "border-white/10 bg-white/4 hover:border-white/20" : "border-slate-200 bg-white hover:border-slate-300"}`}
                  style={{ boxShadow: !expanded ? cardShadow : undefined }}
                >
                  <button
                    type="button"
                    onClick={() => toggleHub(hub.id)}
                    onKeyDown={(e) => handleHubKeyDown(e, hub.id)}
                    aria-expanded={expanded}
                    className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]/50 rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isDark ? "border-white/15 text-blue-200/60" : "border-slate-200 text-slate-500"}`}>
                            {hub.type}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hub.status === "open" ? "bg-green-500/15 text-green-400" : isDark ? "bg-white/10 text-blue-200/40" : "bg-slate-100 text-slate-500"}`}
                          >
                            {hub.status === "open" ? "● Open Now" : "● Closed"}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm" style={{ color: "var(--tng-text-1)" }}>
                          {hub.name}
                        </h3>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
                          {hub.address}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold" style={{ color: "var(--tng-gold-text)" }}>
                          {hub.distance}
                        </p>
                        <p className={`text-[10px] ${isDark ? "text-blue-200/40" : "text-slate-400"}`}>away</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tng-text-3)" }}>
                        <Clock size={12} aria-hidden />
                        {hub.hours}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tng-text-3)" }}>
                        <Users size={12} aria-hidden />
                        {hub.volunteers} validators
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--tng-text-3)" }}>
                        <CheckCircle size={12} className="text-green-500" aria-hidden />
                        {hub.verifications} done
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--tng-gold-text)" }}>
                      {expanded ? "Hide details" : "Show details"}
                      <ChevronRight size={12} className={`transition-transform ${expanded ? "rotate-90" : ""}`} aria-hidden />
                    </span>
                  </button>

                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                      <div className={`pt-3 mt-3 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--tng-text-1)" }}>
                          Services Available:
                        </p>
                        <ul className="flex flex-col gap-1.5 mb-4">
                          {hub.services.map((s) => (
                            <li key={s} className="flex items-center gap-2 text-xs" style={{ color: "var(--tng-text-3)" }}>
                              <CheckCircle size={11} className="text-[#F5B800] shrink-0" aria-hidden />
                              {s}
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={(e) => openDirections(hub, e)}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5B800] to-[#FFD44D] text-[#050E24] font-bold text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] focus-visible:ring-offset-2"
                        >
                          <Navigation size={14} aria-hidden />
                          Get Directions
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}

        <div className="mt-8 p-5 rounded-2xl border border-[#D4187E]/20 bg-[#D4187E]/8 text-center">
          <p className="font-bold mb-1" style={{ color: "var(--tng-text-1)" }}>
            Want to become a Truth Hub?
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--tng-text-3)", fontFamily: "'Inter',sans-serif" }}>
            Any barangay hall, school, or community center can apply to host a Truth Hub.
          </p>
          <button
            type="button"
            onClick={() => setPartnershipOpen(true)}
            className="px-6 py-2.5 rounded-full border border-[#D4187E]/50 text-[#F090C0] font-semibold text-sm hover:bg-[#D4187E]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4187E]/50"
          >
            Apply for Partnership
          </button>
        </div>
      </div>

      <TruthHubPartnershipDialog open={partnershipOpen} onOpenChange={setPartnershipOpen} />
    </PageLayout>
  );
}
