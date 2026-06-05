import type { LuggageType, TravelerType, TripConfig, TripType } from "@/lib/types";

const TRIP_CONFIG_KEY = "packthistrip:trip-config";
const CHECKED_ITEMS_KEY = "packthistrip:checked-items";
const LAST_SAVED_AT_KEY = "packthistrip:last-saved-at";

const LUGGAGE_TYPES: LuggageType[] = ["carry-on", "checked", "both"];
const TRAVELER_TYPES: TravelerType[] = ["solo", "couple", "family", "baby-kids"];
const TRIP_TYPES: TripType[] = ["city", "beach", "business", "cruise", "camping", "hiking", "international", "disney"];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTripConfig(value: unknown): value is TripConfig {
  if (!isRecord(value)) return false;

  return (
    typeof value.destinationSlug === "string" &&
    typeof value.destinationName === "string" &&
    typeof value.month === "string" &&
    typeof value.durationDays === "number" &&
    LUGGAGE_TYPES.includes(value.luggageType as LuggageType) &&
    TRAVELER_TYPES.includes(value.travelerType as TravelerType) &&
    Array.isArray(value.tripTypes) &&
    value.tripTypes.every((tripType) => TRIP_TYPES.includes(tripType as TripType)) &&
    typeof value.hasLaundry === "boolean" &&
    typeof value.packLight === "boolean" &&
    typeof value.rainExpected === "boolean" &&
    typeof value.coldWeather === "boolean" &&
    typeof value.hotWeather === "boolean" &&
    typeof value.isInternational === "boolean"
  );
}

function updateLastSavedAt(): string | null {
  if (!canUseStorage()) return null;

  const timestamp = new Date().toISOString();
  window.localStorage.setItem(LAST_SAVED_AT_KEY, timestamp);
  return timestamp;
}

export function saveTripConfig(config: TripConfig): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(TRIP_CONFIG_KEY, JSON.stringify(config));
  updateLastSavedAt();
}

export function loadTripConfig(): TripConfig | null {
  if (!canUseStorage()) return null;
  const value = window.localStorage.getItem(TRIP_CONFIG_KEY);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);
    return isTripConfig(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveCheckedItems(itemIds: string[]): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CHECKED_ITEMS_KEY, JSON.stringify(itemIds));
  updateLastSavedAt();
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

export function loadLastSavedAt(): string | null {
  if (!canUseStorage()) return null;
  const value = window.localStorage.getItem(LAST_SAVED_AT_KEY);
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : value;
}

export function clearSavedChecklist(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TRIP_CONFIG_KEY);
  window.localStorage.removeItem(CHECKED_ITEMS_KEY);
  window.localStorage.removeItem(LAST_SAVED_AT_KEY);
}
