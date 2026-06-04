import type { TravelerType } from "@/lib/types";

export const TRAVELER_OPTIONS: { value: TravelerType; label: string; description: string }[] = [
  { value: "solo", label: "Solo", description: "One traveler." },
  { value: "couple", label: "Couple", description: "Two adult travelers." },
  { value: "family", label: "Family", description: "Family/group packing assumptions." },
  { value: "baby-kids", label: "Baby/kids", description: "Adds baby and kid-specific essentials." }
];
