import type { TripConfig } from "@/lib/types";

type QuantityMap = Record<string, number>;

function travelerMultiplier(travelerType: TripConfig["travelerType"]): number {
  switch (travelerType) {
    case "couple":
      return 2;
    case "family":
      return 4;
    case "baby-kids":
      return 2;
    default:
      return 1;
  }
}

export function calculateClothingQuantities(tripConfig: TripConfig): QuantityMap {
  const {
    durationDays,
    hasLaundry,
    packLight,
    hotWeather,
    coldWeather,
    luggageType,
    tripTypes,
    travelerType,
    layersRecommended
  } = tripConfig;

  const tripDays = Math.max(durationDays, 1);
  const compactReduction = (luggageType === "carry-on" ? 1 : 0) + (packLight ? 1 : 0);
  const wardrobeCap = hasLaundry ? 5 : 8;
  const essentialsCap = hasLaundry ? 7 : 10;
  const effectiveDays = Math.max(
    Math.min(tripDays, 3),
    Math.min(tripDays, wardrobeCap) - compactReduction
  );
  const essentialsDays = Math.max(
    Math.min(tripDays, 4),
    Math.min(tripDays, essentialsCap) - compactReduction
  );

  const multiplier = travelerMultiplier(travelerType);
  const isBeach = tripTypes.includes("beach") || tripTypes.includes("cruise");
  const isBusiness = tripTypes.includes("business");
  const isCompactWardrobe = packLight || luggageType === "carry-on";
  const pantsQuantity = hotWeather || isBeach
    ? isCompactWardrobe
      ? 1
      : Math.max(1, Math.min(2, Math.ceil(effectiveDays / 3)))
    : isCompactWardrobe
      ? Math.max(1, Math.ceil(effectiveDays / 3))
      : Math.max(1, Math.min(3, Math.ceil(effectiveDays / 2)));

  const quantities: QuantityMap = {
    underwear: (essentialsDays + (tripDays > 1 ? 1 : 0)) * multiplier,
    socks: (essentialsDays + (tripDays > 1 ? 1 : 0)) * multiplier,
    pants: pantsQuantity * multiplier,
    sleepwear: Math.max(1, Math.ceil(effectiveDays / 5)) * multiplier
  };

  if (coldWeather) {
    quantities["long-sleeve-shirts"] = Math.max(2, Math.ceil(effectiveDays / 2)) * multiplier;
    quantities["t-shirts"] = Math.max(1, Math.floor(effectiveDays / 2)) * multiplier;
    quantities["sweater-hoodie"] = (isCompactWardrobe ? 1 : Math.max(1, Math.min(2, Math.ceil(effectiveDays / 4)))) * multiplier;
  } else if (hotWeather) {
    const breathableShirts = Math.max(2, Math.ceil(effectiveDays * 0.6));
    quantities["breathable-shirts"] = breathableShirts * multiplier;
    quantities["t-shirts"] = Math.max(1, effectiveDays - breathableShirts) * multiplier;
  } else if (layersRecommended) {
    const longSleeveShirts = Math.max(1, Math.ceil(effectiveDays / 3));
    quantities["long-sleeve-shirts"] = longSleeveShirts * multiplier;
    quantities["t-shirts"] = Math.max(2, effectiveDays - longSleeveShirts) * multiplier;
    quantities["sweater-hoodie"] = 1 * multiplier;
  } else {
    quantities["t-shirts"] = effectiveDays * multiplier;
  }

  if (hotWeather || isBeach) {
    quantities.shorts = (isCompactWardrobe
      ? Math.max(1, Math.ceil(effectiveDays / 3))
      : Math.max(2, Math.ceil(effectiveDays / 2))) * multiplier;
    quantities["breathable-shirts"] = Math.max(quantities["breathable-shirts"] ?? 0, Math.max(1, Math.ceil(effectiveDays / 2)) * multiplier);
  }

  if (isBusiness) {
    quantities["business-outfit"] = Math.max(1, Math.min(3, Math.ceil(tripDays / 3))) * multiplier;
  }

  if (tripDays > 7) {
    quantities["travel-laundry-detergent"] = 1;
    quantities["laundry-bag"] = 1;
  }

  if (luggageType === "carry-on" || luggageType === "both" || tripDays > 5) {
    quantities["packing-cubes"] = 1;
  }

  return quantities;
}
