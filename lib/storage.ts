import type { TripConfig } from "@/lib/types";

const TRIP_CONFIG_KEY = "packthistrip:trip-config";
const CHECKED_ITEMS_KEY = "packthistrip:checked-items";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function saveTripConfig(config: TripConfig): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(TRIP_CONFIG_KEY, JSON.stringify(config));
}

export function loadTripConfig(): TripConfig | null {
  if (!canUseStorage()) return null;
  const value = window.localStorage.getItem(TRIP_CONFIG_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as TripConfig;
  } catch {
    return null;
  }
}

export function saveCheckedItems(itemIds: string[]): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CHECKED_ITEMS_KEY, JSON.stringify(itemIds));
}

export function loadCheckedItems(): string[] {
  if (!canUseStorage()) return [];
  const value = window.localStorage.getItem(CHECKED_ITEMS_KEY);
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function clearSavedChecklist(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TRIP_CONFIG_KEY);
  window.localStorage.removeItem(CHECKED_ITEMS_KEY);
}
