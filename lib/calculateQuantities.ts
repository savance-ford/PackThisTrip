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
    travelerType
  } = tripConfig;

  const baseCap = hasLaundry ? 5 : 7;
  const cappedDays = Math.min(Math.max(durationDays, 1), baseCap);
  let effectiveDays = cappedDays;

  if (packLight || luggageType === "carry-on") {
    effectiveDays = Math.max(3, effectiveDays - 1);
  }

  const multiplier = travelerMultiplier(travelerType);
  const isBeach = tripTypes.includes("beach") || tripTypes.includes("cruise");
  const isBusiness = tripTypes.includes("business");
  const pantsQuantity = hotWeather || isBeach
    ? Math.max(1, Math.min(2, Math.ceil(effectiveDays / 3)))
    : Math.max(1, Math.ceil(effectiveDays / 2));

  const quantities: QuantityMap = {
    underwear: (effectiveDays + 1) * multiplier,
    socks: (effectiveDays + 1) * multiplier,
    pants: pantsQuantity * multiplier,
    sleepwear: Math.max(1, Math.ceil(effectiveDays / 5)) * multiplier
  };

  if (coldWeather) {
    quantities["long-sleeve-shirts"] = Math.max(2, Math.ceil(effectiveDays / 2)) * multiplier;
    quantities["t-shirts"] = Math.max(1, Math.floor(effectiveDays / 2)) * multiplier;
    quantities["sweater-hoodie"] = Math.max(1, Math.ceil(effectiveDays / 4)) * multiplier;
  } else if (hotWeather) {
    const breathableShirts = Math.max(2, Math.ceil(effectiveDays * 0.6));
    quantities["breathable-shirts"] = breathableShirts * multiplier;
    quantities["t-shirts"] = Math.max(1, effectiveDays - breathableShirts) * multiplier;
  } else {
    quantities["t-shirts"] = effectiveDays * multiplier;
  }

  if (hotWeather || isBeach) {
    quantities.shorts = Math.max(2, Math.ceil(effectiveDays / 2)) * multiplier;
    quantities["breathable-shirts"] = Math.max(quantities["breathable-shirts"] ?? 0, Math.max(1, Math.ceil(effectiveDays / 2)) * multiplier);
  }

  if (isBusiness) {
    quantities["business-outfit"] = Math.max(1, Math.ceil(durationDays / 3)) * multiplier;
  }

  if (durationDays > 7) {
    quantities["travel-laundry-detergent"] = 1;
    quantities["laundry-bag"] = 1;
  }

  if (luggageType === "carry-on" || luggageType === "both" || durationDays > 5) {
    quantities["packing-cubes"] = 1;
  }

  return quantities;
}
