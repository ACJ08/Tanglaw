import { describe, expect, it } from "vitest";
import { truthHubs } from "@/app/lib/truthHubData";
import {
  activeFilterCount,
  defaultTruthHubFilters,
  filterTruthHubs,
  hasActiveFilters,
  hubMatchesSearch,
} from "@/app/lib/truthHubFilters";

describe("hubMatchesSearch", () => {
  const hub = truthHubs[0];

  it("matches by name", () => {
    expect(hubMatchesSearch(hub, "barangay 15")).toBe(true);
  });

  it("matches by address", () => {
    expect(hubMatchesSearch(hub, "burgos")).toBe(true);
  });

  it("matches by hub type", () => {
    expect(hubMatchesSearch(hub, "barangay hall")).toBe(true);
  });

  it("returns all hubs for empty search", () => {
    expect(hubMatchesSearch(hub, "   ")).toBe(true);
  });

  it("returns false when nothing matches", () => {
    expect(hubMatchesSearch(hub, "nonexistent place")).toBe(false);
  });
});

describe("filterTruthHubs", () => {
  it("returns all hubs with default filters", () => {
    expect(filterTruthHubs(truthHubs, defaultTruthHubFilters)).toHaveLength(truthHubs.length);
  });

  it("filters by hub type", () => {
    const result = filterTruthHubs(truthHubs, { ...defaultTruthHubFilters, hubType: "School" });
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("School");
  });

  it("filters by open status", () => {
    const result = filterTruthHubs(truthHubs, { ...defaultTruthHubFilters, status: "open" });
    expect(result.every((h) => h.status === "open")).toBe(true);
    expect(result).toHaveLength(3);
  });

  it("filters by closed status", () => {
    const result = filterTruthHubs(truthHubs, { ...defaultTruthHubFilters, status: "closed" });
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("closed");
  });

  it("combines search and filters", () => {
    const result = filterTruthHubs(truthHubs, {
      ...defaultTruthHubFilters,
      search: "library",
      hubType: "Library",
      status: "open",
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain("Library");
  });

  it("returns empty array when search and filters exclude all hubs", () => {
    const result = filterTruthHubs(truthHubs, {
      ...defaultTruthHubFilters,
      search: "school",
      status: "closed",
    });
    expect(result).toHaveLength(0);
  });

  it("sorts by distance when sortByDistance is true", () => {
    const result = filterTruthHubs(truthHubs, { ...defaultTruthHubFilters, sortByDistance: true });
    const distances = result.map((h) => h.distanceKm);
    expect(distances).toEqual([...distances].sort((a, b) => a - b));
    expect(result[0].distanceKm).toBe(0.4);
  });

  it("preserves filter order when not sorting by distance", () => {
    const result = filterTruthHubs(truthHubs, defaultTruthHubFilters);
    expect(result.map((h) => h.id)).toEqual(truthHubs.map((h) => h.id));
  });
});

describe("active filter helpers", () => {
  it("detects active filters", () => {
    expect(hasActiveFilters(defaultTruthHubFilters)).toBe(false);
    expect(hasActiveFilters({ ...defaultTruthHubFilters, hubType: "School" })).toBe(true);
    expect(activeFilterCount({ ...defaultTruthHubFilters, hubType: "School", status: "open" })).toBe(2);
  });
});

describe("getDirectionsUrl", () => {
  it("builds a Google Maps search URL", async () => {
    const { getDirectionsUrl } = await import("@/app/lib/truthHubData");
    const url = getDirectionsUrl(truthHubs[0]);
    expect(url).toContain("google.com/maps/search");
    expect(url).toContain(encodeURIComponent("Barangay 15 Community Hall"));
  });
});
