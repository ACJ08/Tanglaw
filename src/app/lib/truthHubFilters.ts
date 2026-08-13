import type { HubStatus, HubType, TruthHub } from "./truthHubData";

export type HubTypeFilter = "all" | HubType;
export type HubStatusFilter = "all" | "open" | "closed";

export interface TruthHubFilters {
  search: string;
  hubType: HubTypeFilter;
  status: HubStatusFilter;
  sortByDistance: boolean;
}

export const defaultTruthHubFilters: TruthHubFilters = {
  search: "",
  hubType: "all",
  status: "all",
  sortByDistance: false,
};

export function hubMatchesSearch(hub: TruthHub, search: string): boolean {
  const query = search.trim().toLowerCase();
  if (!query) return true;
  return (
    hub.name.toLowerCase().includes(query) ||
    hub.address.toLowerCase().includes(query) ||
    hub.type.toLowerCase().includes(query)
  );
}

export function hubMatchesTypeFilter(hub: TruthHub, hubType: HubTypeFilter): boolean {
  return hubType === "all" || hub.type === hubType;
}

export function hubMatchesStatusFilter(hub: TruthHub, status: HubStatusFilter): boolean {
  if (status === "all") return true;
  return hub.status === (status as HubStatus);
}

export function filterTruthHubs(hubs: TruthHub[], filters: TruthHubFilters): TruthHub[] {
  let result = hubs.filter(
    (hub) =>
      hubMatchesSearch(hub, filters.search) &&
      hubMatchesTypeFilter(hub, filters.hubType) &&
      hubMatchesStatusFilter(hub, filters.status),
  );

  if (filters.sortByDistance) {
    result = [...result].sort((a, b) => a.distanceKm - b.distanceKm);
  }

  return result;
}

export function hasActiveFilters(filters: TruthHubFilters): boolean {
  return filters.hubType !== "all" || filters.status !== "all";
}

export function activeFilterCount(filters: TruthHubFilters): number {
  let count = 0;
  if (filters.hubType !== "all") count += 1;
  if (filters.status !== "all") count += 1;
  return count;
}
