import { PACKING_ITEMS } from "@/data/items";
import { getDestination } from "@/data/destinations";
import { calculateClothingQuantities } from "@/lib/calculateQuantities";
import type { PackingCategory, PackingItem, TripConfig } from "@/lib/types";

export const CATEGORY_ORDER: PackingCategory[] = [
  "clothing",
  "toiletries",
  "documents",
  "electronics",
  "travel-gear",
  "weather",
  "activity",
  "family-baby"
];

export const CATEGORY_LABELS: Record<PackingCategory, string> = {
  clothing: "Clothing",
  toiletries: "Toiletries",
  documents: "Documents",
  electronics: "Electronics",
  "travel-gear": "Travel Gear",
  weather: "Weather Items",
  activity: "Activity Items",
  "family-baby": "Family / Baby Items"
};

function isEurope(region: string) {
  return region.toLowerCase() === "europe";
}

function isUnitedKingdom(region: string) {
  return region.toLowerCase() === "united kingdom";
}

function prettyMonth(month: string) {
  return month.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function generatePackingList(tripConfig: TripConfig): PackingItem[] {
  const destination = getDestination(tripConfig.destinationSlug);
  const quantities = calculateClothingQuantities(tripConfig);
  const itemsById = new Map<string, PackingItem>();
  const tripTypes = tripConfig.tripTypes;
  const region = destination?.region ?? "";
  const tripLabel = `${tripConfig.destinationName} in ${prettyMonth(tripConfig.month)}`;
  const destinationTags = destination?.climateTags ?? [];
  const isTropicalOrHumid = destinationTags.some((tag) => ["tropical", "humid", "humid-summer", "jungle"].includes(tag));
  const hasOutdoorRainPlan = tripTypes.some((tripType) => ["disney", "hiking", "camping"].includes(tripType));

  const addItem = (id: string, reason: string, optional = false, quantity?: number) => {
    const base = PACKING_ITEMS[id];
    if (!base) return;

    const existing = itemsById.get(id);
    const finalQuantity = quantity ?? quantities[id] ?? existing?.quantity;

    if (existing) {
      const reasonAlreadyIncluded = existing.reason.includes(reason);
      itemsById.set(id, {
        ...existing,
        quantity: finalQuantity,
        optional: existing.optional || optional,
        reason: reasonAlreadyIncluded ? existing.reason : `${existing.reason} ${reason}`
      });
      return;
    }

    itemsById.set(id, {
      ...base,
      quantity: finalQuantity,
      reason,
      optional
    });
  };

  // Core basics
  addItem("phone-charger", "Added because a phone charger is essential for navigation, boarding passes, and communication.");
  addItem("toothbrush", "Added as a daily hygiene essential.");
  addItem("toothpaste", "Added as a daily hygiene essential.");
  addItem("deodorant", "Added as a daily hygiene essential.");
  addItem("underwear", "Quantity is calculated from trip length, laundry access, pack-light mode, and traveler type.");
  addItem("socks", "Quantity is calculated from trip length, laundry access, pack-light mode, and traveler type.");
  addItem("id", "Added because ID is needed for airports, lodging, car rentals, and emergencies.");
  addItem("luggage-tag", "Added to make bags easier to identify if they are separated or checked.");
  addItem("t-shirts", "Added as a versatile core clothing item based on your trip length.");
  addItem("pants", "Added as reusable bottoms with smart quantity capping instead of one pair per day.");
  addItem("sleepwear", "Added for overnight comfort without overpacking.");
  addItem("hand-sanitizer", "Added as a compact hygiene item for flights, transit, and public spaces.", true);
  addItem("medicine-kit", "Added as a small backup for common travel issues like headaches, stomach discomfort, or minor scrapes.", true);

  if (tripConfig.durationDays >= 3) {
    addItem("light-jacket", "Added as a flexible layer for cool planes, evenings, or changing indoor temperatures.", true);
  }

  // International rules
  const international = tripConfig.isInternational || tripTypes.includes("international") || destination?.isInternationalDefault;
  if (international) {
    addItem("passport", `Added because ${tripConfig.destinationName} is treated as an international trip and a passport may be needed for border crossing.`);
    addItem("travel-insurance-documents", "Included as backup documentation for medical care, trip delays, or unexpected international travel issues.", true);
    addItem("universal-power-adapter", "Added because international trips can require a power adapter for charging phones and other electronics.");
    addItem("document-copies", "Included because international travelers should have backup copies of important documents in case originals are lost or stolen.", true);
    addItem("boarding-pass", "Added for airport travel and quick check-in access.");
    addItem("hotel-confirmation", "Added because lodging details can be useful for check-in, immigration questions, or offline backup access.", true);
    addItem("emergency-contacts", "Added as a safety backup for international travel, unfamiliar destinations, and urgent contact needs.", true);
  }

  if (isEurope(region)) {
    addItem("europe-plug-adapter", `Added because ${tripConfig.destinationName} uses European plug types ${destination?.outletType.join("/") || "C/F"}.`);
  }

  if (isUnitedKingdom(region)) {
    addItem("uk-plug-adapter", "Added because United Kingdom outlets use Type G plugs.");
  }

  // Luggage rules
  if (tripConfig.luggageType === "carry-on" || tripConfig.luggageType === "both") {
    addItem("tsa-liquids-bag", "Added because carry-on travelers need liquid toiletries organized for airport screening and quick bag access.");
  }

  if (quantities["packing-cubes"]) {
    addItem("packing-cubes", "Added because packing cubes help manage carry-on space, separate outfits, and keep a compact bag organized.", false, quantities["packing-cubes"]);
  }

  if (quantities["travel-laundry-detergent"]) {
    addItem("travel-laundry-detergent", "Added because trips longer than seven days are easier when you can rewear and wash small clothing items.");
    addItem("laundry-bag", "Added to keep worn clothes separate from clean items on a longer trip.");
  }

  // Destination walking note
  if (destination?.walkingHeavy || tripTypes.includes("city")) {
    addItem("walking-shoes", destination?.walkingHeavy ? `Added because ${tripConfig.destinationName} commonly involves lots of walking, transit, tours, or uneven surfaces.` : "Added because city trips usually involve long walking days, airports, tours, and sightseeing.");
    addItem("daypack", "Added to carry sunscreen, water, documents, and daily items during sightseeing or transit-heavy days.", true);
    addItem("portable-charger", "Added because navigation, photos, translation, and transit apps can drain phone battery during long days.", true);
  }

  // Weather rules
  if (tripConfig.coldWeather) {
    addItem("warm-coat", "Added because you marked this as a cold-weather trip.");
    addItem("thermal-base-layer", "Added because base layers keep you warm without taking up much luggage space.");
    addItem("gloves", "Added for cold-weather hand protection.");
    addItem("beanie", "Added because head warmth matters on cold walking days.");
    addItem("scarf", "Added as a compact cold-weather layer for wind and low temperatures.");
    addItem("long-sleeve-shirts", "Added because cold trips need more layering pieces.");
    addItem("sweater-hoodie", "Added as a mid-layer for cold weather and transit.");
  }

  if (tripConfig.rainExpected) {
    addItem("packable-rain-jacket", `Added because ${tripLabel} can bring quick showers or wet travel days, and a compact rain layer keeps plans flexible.`);
    addItem("umbrella", "Added as a compact rain backup for city walks, hotel transfers, and sightseeing when showers pass through.", true);

    if (hasOutdoorRainPlan) {
      addItem("poncho", "Added because theme parks, hiking, camping, or other outdoor-heavy plans are easier with quick rain coverage.", true);
    }
  }

  if (tripConfig.hotWeather) {
    addItem("sunglasses", `Recommended because ${tripLabel} is typically sunny or bright, and eye protection helps on walking, beach, and transit days.`);
    addItem("sun-hat", "Added for extra sun protection during outdoor meals, beach time, tours, and long walks.");
    addItem("sunscreen", "Added because hot-weather trips increase sun exposure during sightseeing, swimming, and outdoor travel days.");
    addItem("shorts", "Added because hot or beach-style trips need lightweight bottoms that are comfortable in warm weather.");
    addItem("breathable-shirts", `Recommended because ${tripLabel} is typically hot, and breathable shirts are more comfortable for walking and sightseeing.`);
    addItem("reusable-water-bottle", "Added because hot-weather travel requires steady hydration during airports, tours, beach time, and city walks.", true);
    addItem("lip-balm", "Added because sun, heat, flights, and long outdoor days can dry out lips.", true);
  }

  if (isTropicalOrHumid && (tripConfig.hotWeather || tripConfig.rainExpected || tripTypes.includes("beach"))) {
    addItem("bug-spray", "Added because tropical, humid, rainy, or outdoor-heavy destinations can mean mosquitoes and other insects.", true);
  }

  // Activity rules
  if (tripTypes.includes("beach")) {
    addItem("swimsuit", "Added because beach, pool, resort, or coastal plans need swimwear.");
    addItem("sandals", "Added because sandals are useful for beaches, pools, warm casual days, and wet areas.");
    addItem("beach-bag", "Added to carry sunscreen, water, a towel, documents, and beach extras during coastal or pool days.");
    addItem("reef-safe-sunscreen", "Added because reef-safe sunscreen is a better choice for many beach, reef, and coastal destinations.");
    addItem("water-shoes", "Added for rocky beaches, reef areas, boat days, wet docks, or slippery shorelines.", true);
  }

  if (tripTypes.includes("business")) {
    addItem("business-outfit", "Added because business trips need professional clothing.");
    addItem("laptop", "Added because business trips often require work access.");
    addItem("laptop-charger", "Added because your laptop is not useful without its charger.");
    addItem("formal-shoes", "Added because professional outfits often need separate shoes.");
    addItem("wrinkle-release-spray", "Added to freshen folded business clothes without relying on an iron.", true);
  }

  if (tripTypes.includes("hiking")) {
    addItem("hiking-shoes", "Added because hiking needs better grip and support than casual shoes.");
    addItem("hiking-daypack", "Added to carry water, snacks, layers, and trail basics.");
    addItem("bug-spray", "Added because outdoor trails, vegetation, and humid areas often mean insects.", true);
    addItem("reusable-water-bottle", "Added because hiking and outdoor days require reliable hydration.");
    addItem("packable-rain-jacket", "Added because trail weather can change quickly and a light rain shell takes little space.");
  }

  if (tripTypes.includes("camping")) {
    addItem("travel-towel", "Added because camping often needs a compact towel that dries quickly.");
    addItem("bug-spray", "Added because camping areas often have mosquitoes, insects, or damp conditions.");
    addItem("reusable-water-bottle", "Added because camping and outdoor days require steady hydration.");
    addItem("sweater-hoodie", "Added because outdoor nights can get cool even after warm days.");
  }

  if (tripTypes.includes("cruise")) {
    addItem("swimsuit", "Added because cruise ships usually have pools, hot tubs, or beach excursions.");
    addItem("dress-outfit", "Added because cruises often include nicer dinners or formal nights.");
    addItem("sandals", "Added for pool deck, beach excursions, and warm casual days.");
    addItem("sunscreen", "Added because cruises involve strong sun exposure on deck or shore excursions.");
    addItem("travel-insurance-documents", "Added because cruises can involve multiple ports, international logistics, and travel disruption risk.", true);
  }

  if (tripTypes.includes("disney")) {
    addItem("theme-park-bag", "Added to carry water, snacks, charger, poncho, and daily essentials inside the park.");
    addItem("poncho", "Added because theme parks often have water rides or quick rain bursts.");
    addItem("reusable-water-bottle", "Added because park days require constant hydration.");
    addItem("sunscreen", "Added because theme park days usually mean hours outdoors.");
    addItem("walking-shoes", "Added because theme parks involve long walking and standing days.");
    addItem("portable-charger", "Added because park apps, maps, photos, and reservations drain phone battery.");
  }

  if (tripConfig.travelerType === "baby-kids") {
    addItem("diapers", "Added because baby/kids mode is enabled.");
    addItem("wipes", "Added because wipes are useful for diaper changes, spills, and quick cleanups.");
    addItem("baby-bottles", "Added because baby/kids mode is enabled.");
    addItem("pacifier", "Added as a familiar comfort item for babies.", true);
    addItem("baby-medication", "Added so common baby health needs are covered while traveling.", true);
    addItem("changing-pad", "Added because diaper changes during travel are easier with a clean portable surface.");
    addItem("kids-snacks", "Added because snacks are useful during flights, drives, lines, and delays.");
    addItem("small-toys", "Added to keep kids occupied during transit or downtime.", true);
    addItem("travel-stroller", "Added because a compact stroller can make airports and long walking days easier.", true);
  }

  // Useful non-core defaults for most trips
  addItem("headphones", "Added as a useful item for flights, trains, downtime, or calls.", true);
  addItem("neck-pillow", "Added as an optional comfort item for longer travel days.", true);
  addItem("earplugs", "Added as a compact sleep backup for hotels, flights, or noisy lodging.", true);
  addItem("travel-lock", "Added as an optional security item for luggage or shared accommodations.", true);

  return Array.from(itemsById.values()).sort((a, b) => {
    const categoryDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (categoryDiff !== 0) return categoryDiff;
    return a.name.localeCompare(b.name);
  });
}

/* Demo:
const italyJuneCarryOn = generatePackingList({
  destinationSlug: "italy",
  destinationName: "Italy",
  month: "June",
  durationDays: 7,
  luggageType: "carry-on",
  travelerType: "solo",
  tripTypes: ["city", "beach"],
  hasLaundry: false,
  packLight: true,
  rainExpected: false,
  coldWeather: false,
  hotWeather: true,
  isInternational: true
});
*/
