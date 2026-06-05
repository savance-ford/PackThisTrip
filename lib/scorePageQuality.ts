import { getClimateProfile, isApprovedDestinationMonth } from "@/data/climateProfiles";
import { getDestination } from "@/data/destinations";
import { generatePackingList } from "@/lib/generatePackingList";
import { getDestinationMonthTripConfig } from "@/lib/getDestinationMonthTripConfig";

const CORE_BASIC_ITEM_IDS = new Set([
  "phone-charger",
  "toothbrush",
  "toothpaste",
  "deodorant",
  "underwear",
  "socks",
  "id",
  "luggage-tag",
  "t-shirts",
  "pants",
  "sleepwear",
  "hand-sanitizer",
  "medicine-kit",
  "headphones",
  "neck-pillow",
  "earplugs",
  "travel-lock"
]);

export type PageQualityScore = {
  indexable: boolean;
  score: number;
  reasons: string[];
};

export function scorePageQuality(destinationSlug: string, month: string): PageQualityScore {
  const normalizedDestinationSlug = destinationSlug.toLowerCase();
  const normalizedMonth = month.toLowerCase();
  const destination = getDestination(normalizedDestinationSlug);
  const climateProfile = getClimateProfile(normalizedDestinationSlug, normalizedMonth);
  const tripConfig = getDestinationMonthTripConfig(normalizedDestinationSlug, normalizedMonth);
  const reasons: string[] = [];
  let score = 0;

  if (destination) {
    score += 20;
  } else {
    reasons.push("Destination does not exist.");
  }

  if (climateProfile) {
    score += 20;
  } else {
    reasons.push("Climate profile does not exist.");
  }

  if (isApprovedDestinationMonth(normalizedDestinationSlug, normalizedMonth)) {
    score += 20;
  } else {
    reasons.push("Destination/month combination is not in the approved starter list.");
  }

  if ((climateProfile?.packingNotes.length ?? 0) >= 3) {
    score += 15;
  } else {
    reasons.push("Page has fewer than 3 packing notes.");
  }

  if (tripConfig) {
    const items = generatePackingList(tripConfig);
    const nonCoreItems = items.filter((item) => !CORE_BASIC_ITEM_IDS.has(item.id));

    if (items.length >= 25) {
      score += 15;
    } else {
      reasons.push("Generated checklist has fewer than 25 items.");
    }

    if (nonCoreItems.length >= 5) {
      score += 10;
    } else {
      reasons.push("Generated checklist has fewer than 5 non-core items.");
    }
  } else {
    reasons.push("Trip config could not be generated.");
  }

  return {
    indexable: reasons.length === 0,
    score,
    reasons
  };
}
