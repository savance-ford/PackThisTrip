import { getClimateProfile } from "@/data/climateProfiles";
import { getDestination } from "@/data/destinations";
import type { TripConfig } from "@/lib/types";

export function getDestinationMonthTripConfig(destinationSlug: string, month: string): TripConfig | null {
  const destination = getDestination(destinationSlug);
  const climateProfile = getClimateProfile(destinationSlug, month);

  if (!destination || !climateProfile) {
    return null;
  }

  return {
    destinationSlug: destination.slug,
    destinationName: destination.name,
    month: climateProfile.month,
    durationDays: 7,
    luggageType: "carry-on",
    travelerType: "solo",
    tripTypes: climateProfile.recommendedTripTypes,
    hasLaundry: false,
    packLight: true,
    rainExpected: climateProfile.rainExpected,
    coldWeather: climateProfile.coldWeather,
    hotWeather: climateProfile.hotWeather,
    isInternational: destination.isInternationalDefault
  };
}
