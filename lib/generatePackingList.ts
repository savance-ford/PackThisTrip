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

export function generatePackingList(tripConfig: TripConfig): PackingItem[] {
  const destination = getDestination(tripConfig.destinationSlug);
  const quantities = calculateClothingQuantities(tripConfig);
  const itemsById = new Map<string, PackingItem>();
  const tripTypes = tripConfig.tripTypes;
  const region = destination?.region ?? "";

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
    addItem("passport", "Added because this trip is marked as international or the destination commonly requires a passport.");
    addItem("travel-insurance-documents", "Added as a backup for medical, trip delay, or emergency documentation.", true);
    addItem("universal-power-adapter", "Added because international trips often require a power adapter for electronics.");
    addItem("document-copies", "Added so you have backups if important travel documents are lost or stolen.", true);
    addItem("boarding-pass", "Added for airport travel and quick check-in access.");
    addItem("hotel-confirmation", "Added for check-in, immigration questions, or backup access when offline.", true);
    addItem("emergency-contacts", "Added as a simple safety backup for international or unfamiliar destinations.", true);
  }

  if (isEurope(region)) {
    addItem("europe-plug-adapter", `Added because ${tripConfig.destinationName} uses European plug types ${destination?.outletType.join("/") || "C/F"}.`);
  }

  if (isUnitedKingdom(region)) {
    addItem("uk-plug-adapter", "Added because United Kingdom outlets use Type G plugs.");
  }

  // Luggage rules
  if (tripConfig.luggageType === "carry-on" || tripConfig.luggageType === "both") {
    addItem("tsa-liquids-bag", "Added because carry-on travelers need to keep liquids organized for airport screening.");
  }

  if (quantities["packing-cubes"]) {
    addItem("packing-cubes", "Added because packing cubes help organize carry-on bags, both-bag trips, or trips longer than five days.", false, quantities["packing-cubes"]);
  }

  if (quantities["travel-laundry-detergent"]) {
    addItem("travel-laundry-detergent", "Added because trips longer than seven days are easier when you can rewear and wash small clothing items.");
    addItem("laundry-bag", "Added to keep worn clothes separate from clean items on a longer trip.");
  }

  // Destination walking note
  if (destination?.walkingHeavy || tripTypes.includes("city")) {
    addItem("walking-shoes", destination?.walkingHeavy ? `Added because ${tripConfig.destinationName} commonly involves lots of walking.` : "Added because city trips usually involve long walking days.");
    addItem("daypack", "Added to carry daily items during sightseeing or transit-heavy days.", true);
    addItem("portable-charger", "Added because long walking or city days can drain phone battery.", true);
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
    addItem("packable-rain-jacket", "Added because you marked rain as expected or likely.");
    addItem("umbrella", "Added as a compact rain backup for city days.", true);
  }

  if (tripConfig.hotWeather) {
    addItem("sunglasses", "Added because hot or sunny trips need eye protection.");
    addItem("sun-hat", "Added for extra sun protection during outdoor days.");
    addItem("sunscreen", "Added because hot-weather trips increase sun exposure.");
    addItem("shorts", "Added because you marked this as a hot-weather or warm-weather trip.");
    addItem("breathable-shirts", "Added because breathable shirts are more comfortable in heat and humidity.");
    addItem("reusable-water-bottle", "Added because hot-weather trips require frequent hydration.", true);
  }

  // Activity rules
  if (tripTypes.includes("beach")) {
    addItem("swimsuit", "Added because beach trips need swimwear.");
    addItem("sandals", "Added because sandals are useful for beaches, pools, and warm casual days.");
    addItem("beach-bag", "Added to carry sunscreen, towel, water, and beach extras.");
    addItem("reef-safe-sunscreen", "Added because reef-safe sunscreen is better for many beach destinations.");
    addItem("water-shoes", "Added for rocky beaches, reef areas, boat days, or slippery docks.", true);
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
    addItem("bug-spray", "Added because outdoor trails often mean insects.", true);
    addItem("reusable-water-bottle", "Added because hiking requires reliable hydration.");
    addItem("packable-rain-jacket", "Added because trail weather can change quickly.");
  }

  if (tripTypes.includes("camping")) {
    addItem("travel-towel", "Added because camping often needs a compact towel that dries quickly.");
    addItem("bug-spray", "Added because camping areas often have mosquitoes and insects.");
    addItem("reusable-water-bottle", "Added because camping requires steady hydration.");
    addItem("sweater-hoodie", "Added because outdoor nights can get cool even after warm days.");
  }

  if (tripTypes.includes("cruise")) {
    addItem("swimsuit", "Added because cruise ships usually have pools, hot tubs, or beach excursions.");
    addItem("dress-outfit", "Added because cruises often include nicer dinners or formal nights.");
    addItem("sandals", "Added for pool deck, beach excursions, and warm casual days.");
    addItem("sunscreen", "Added because cruises involve strong sun exposure on deck or shore excursions.");
    addItem("travel-insurance-documents", "Added because cruises can involve multiple ports and travel logistics.", true);
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
