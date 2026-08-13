export type HubType = "Barangay Hall" | "School" | "Library" | "Community Center";
export type HubStatus = "open" | "closed";

export interface TruthHub {
  id: number;
  name: string;
  address: string;
  /** Precomputed distance from the user's reference point, e.g. "0.4 km" */
  distance: string;
  /** Numeric distance in kilometers for sorting */
  distanceKm: number;
  status: HubStatus;
  hours: string;
  volunteers: number;
  verifications: number;
  services: string[];
  type: HubType;
}

export const HUB_TYPES: HubType[] = ["Barangay Hall", "School", "Library", "Community Center"];

export const truthHubs: TruthHub[] = [
  {
    id: 1,
    name: "Barangay 15 Community Hall",
    address: "P. Burgos St., Brgy. 15",
    distance: "0.4 km",
    distanceKm: 0.4,
    status: "open",
    hours: "8AM – 8PM",
    volunteers: 3,
    verifications: 142,
    services: ["Walk-in verification", "Media literacy class", "Offline kiosk"],
    type: "Barangay Hall",
  },
  {
    id: 2,
    name: "San Pedro Elementary School Library",
    address: "Rizal Ave., San Pedro",
    distance: "1.2 km",
    distanceKm: 1.2,
    status: "open",
    hours: "7AM – 5PM",
    volunteers: 2,
    verifications: 89,
    services: ["Student fact-checking", "Teacher resources", "Verification kiosk"],
    type: "School",
  },
  {
    id: 3,
    name: "Maliwanag Community Library",
    address: "Bonifacio St., Central",
    distance: "2.1 km",
    distanceKm: 2.1,
    status: "open",
    hours: "9AM – 6PM",
    volunteers: 4,
    verifications: 211,
    services: ["Walk-in verification", "Media workshop", "QR sharing"],
    type: "Library",
  },
  {
    id: 4,
    name: "St. Theresa Parish Center",
    address: "Del Pilar St., Brgy. 22",
    distance: "3.8 km",
    distanceKm: 3.8,
    status: "closed",
    hours: "Open tomorrow 8AM",
    volunteers: 1,
    verifications: 64,
    services: ["Community verification", "Elder support"],
    type: "Community Center",
  },
];

export function getDirectionsUrl(hub: Pick<TruthHub, "name" | "address">): string {
  const query = encodeURIComponent(`${hub.name}, ${hub.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
