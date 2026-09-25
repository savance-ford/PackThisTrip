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
  const hasStrongSun = destinationTags.some((tag) => ["sunny", "hot-summer", "tropical"].includes(tag));
  const hasOutdoorRainPlan = tripTypes.some((tripType) => ["disney", "hiking", "camping"].includes(tripType));
  const cityOrWalking = Boolean(destination?.walkingHeavy || tripTypes.includes("city"));
  const diningRelevant = Boolean(destination?.commonActivities.some((activity) => ["food", "dining"].includes(activity)));
  const rainRelevant = tripConfig.rainExpected || tripConfig.rainPossible;
  const coolLayeredWeather = Boolean(tripConfig.coolWeather);

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
  addItem("phone", "Essential for navigation, tickets, reservations, translation, and communication while traveling.");
  addItem("phone-charger", "Added because a phone charger is essential for navigation, boarding passes, and communication.");
  addItem("toothbrush", "Added as a daily hygiene essential.");
  addItem("toothpaste", "Added as a daily hygiene essential.");
  addItem("deodorant", "Added as a daily hygiene essential.");
  addItem("underwear", "Quantity is calculated from trip length, laundry access, pack-light mode, and traveler type.");
  addItem("socks", cityOrWalking
    ? "Practical socks help keep long walking and transit days comfortable; quantity accounts for trip length, laundry, and packing style."
    : "Quantity is calculated from trip length, laundry access, pack-light mode, and traveler type.");
  addItem("id", "Added because ID is needed for airports, lodging, car rentals, and emergencies.");
  addItem("luggage-tag", "Added to make bags easier to identify if they are separated or checked.");
  addItem("t-shirts", tripConfig.hotWeather
    ? `Included as versatile lightweight tops for typical hot-weather days during ${tripLabel}.`
    : tripConfig.coolWeather
      ? "T-shirts work as repeatable base layers beneath a sweater and outer layer, and can be worn alone in heated indoor spaces."
    : tripConfig.mildWeather
      ? `Lightweight or medium-weight tops form a repeatable base for mild ${prettyMonth(tripConfig.month)} days.`
      : "Added as a versatile core clothing item based on your trip length.");
  addItem("pants", tripConfig.hotWeather
    ? "A small number of lightweight pants adds coverage for travel, sightseeing, or dining while keeping a warm-weather wardrobe compact."
    : tripConfig.coolWeather
      ? "Comfortable trousers or pants can be reworn across cool-weather sightseeing days, keeping the wardrobe compact."
    : "Added as reusable bottoms with smart quantity capping instead of one pair per day.");
  addItem("sleepwear", "Added for overnight comfort without overpacking.");
  addItem("hand-sanitizer", "Added as a compact hygiene item for flights, transit, and public spaces.", true);
  addItem("medicine-kit", "Added as a small backup for common travel issues like headaches, stomach discomfort, or minor scrapes.", true);
  addItem("personal-medications", "Keep required medications accessible, with enough for the trip and reasonable delay time.");

  if (tripConfig.durationDays >= 3 && !(rainRelevant && coolLayeredWeather)) {
    addItem("light-jacket", tripConfig.coolEvenings
      ? `Useful for cooler ${prettyMonth(tripConfig.month)} mornings and evenings without taking up much suitcase space.`
      : "Added as a flexible layer for cool planes, evenings, or changing indoor temperatures.", true);
  }

  if (tripConfig.layersRecommended && !tripConfig.coldWeather) {
    addItem("long-sleeve-shirts", `Long-sleeve tops create a comfortable base layer when ${tripLabel} shifts between indoor and outdoor conditions.`);
    addItem("sweater-hoodie", "A sweater or cardigan works as a repeatable mid-layer that can be removed in heated indoor spaces.");

    if (tripConfig.coolWeather && (tripConfig.windPossible || tripConfig.coolEvenings)) {
      addItem("thermal-base-layer", "A lightweight thermal can add warmth for long outdoor days or travelers who run cold without requiring a bulky coat.", true);
    }
  }

  // International rules
  const international = tripConfig.isInternational || tripTypes.includes("international") || destination?.isInternationalDefault;
  if (international) {
    addItem("passport", `Added because ${tripConfig.destinationName} is treated as an international trip and a passport may be needed for border crossing.`);
    addItem("travel-insurance-documents", "Included as backup documentation for medical care, trip delays, or unexpected international travel issues.", true);
    addItem("document-copies", "Included because international travelers should have backup copies of important documents in case originals are lost or stolen.", true);
    addItem("boarding-pass", "Added for airport travel and quick check-in access.");
    addItem("hotel-confirmation", "Added because lodging details can be useful for check-in, immigration questions, or offline backup access.", true);
    addItem("emergency-contacts", "Added as a safety backup for international travel, unfamiliar destinations, and urgent contact needs.", true);
  }

  if (international && isUnitedKingdom(region)) {
    addItem("uk-plug-adapter", "Added because United Kingdom outlets use Type G plugs.");
  } else if (international && isEurope(region)) {
    addItem("europe-plug-adapter", `Added because ${tripConfig.destinationName} uses European plug types ${destination?.outletType.join("/") || "C/F"}.`);
  } else if (international && destination?.outletType.some((outlet) => !["A", "B"].includes(outlet))) {
    addItem("universal-power-adapter", `Added because ${tripConfig.destinationName} uses outlet types that can differ from common North American A/B plugs.`);
  } else if (international) {
    addItem("power-adapter-if-needed", `${tripConfig.destinationName} uses ${destination?.outletType.join("/") || "destination-specific"} outlets; verify plug shape, voltage, and device compatibility before deciding whether an adapter is needed.`, true);
  }

  // Luggage rules
  if (tripConfig.luggageType === "carry-on" || tripConfig.luggageType === "both") {
    addItem("tsa-liquids-bag", "Added because carry-on travelers need liquid toiletries organized for airport screening and quick bag access.");
  }

  if (quantities["packing-cubes"]) {
    addItem("packing-cubes", "Added because packing cubes help manage carry-on space, separate outfits, and keep a compact bag organized.", false, quantities["packing-cubes"]);
  }

  if (quantities["travel-laundry-detergent"]) {
    addItem("travel-laundry-detergent", "Useful on trips longer than seven days if you plan to hand-wash basics or use a laundromat.", true);
  }

  if (quantities["laundry-bag"]) {
    addItem("laundry-bag", "Added to keep worn clothes separate from clean items on a longer trip.");
  }

  // Destination walking note
  if (cityOrWalking) {
    addItem("walking-shoes", destination?.walkingHeavy ? `${tripConfig.destinationName} sightseeing can involve long walking and transit days, so comfortable broken-in shoes are worth prioritizing.` : "City trips usually involve long walking days, airports, tours, and sightseeing.");
    addItem("daypack", "Useful for carrying water, documents, a portable battery, and weather protection during long sightseeing days.", !destination?.walkingHeavy);
    addItem("portable-charger", "Navigation, photos, translation, and transit apps can drain a phone battery during a full day away from your lodging.", !destination?.walkingHeavy);
    addItem("reusable-water-bottle", "Keeps water handy during long walking, sightseeing, and transit days.", true);
    addItem("reusable-tote", "A compact reusable tote adds useful space for shopping, snacks, or items picked up during the day.", true);

    const secondPairFits = tripConfig.luggageType === "carry-on"
      ? tripConfig.durationDays >= 10 && !tripConfig.packLight
      : tripConfig.durationDays >= 8;

    if (secondPairFits) {
      addItem("casual-shoes", "An optional second casual pair lets walking shoes dry or rest on a longer trip; skip it if carry-on space is tight.", true);
    }

    if (diningRelevant) {
      addItem("smart-casual-outfit", "One slightly nicer outfit can cover dinners or evening plans without adding several single-use pieces.", true);
    }
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

  if (rainRelevant) {
    if (coolLayeredWeather && cityOrWalking) {
      addItem("weather-resistant-jacket", `A water-resistant jacket helps with possible ${prettyMonth(tripConfig.month)} showers while still working as an everyday outer layer.`);
    } else {
      addItem("packable-rain-jacket", `Useful because ${tripLabel} can bring showers or wet travel days, and a compact rain layer keeps plans flexible.`);
    }

    addItem(
      "umbrella",
      "A compact umbrella provides rain protection without taking much room in a day bag.",
      !(coolLayeredWeather && cityOrWalking)
    );

    if (cityOrWalking) {
      addItem("walking-shoes", "Choose a reasonably rain-resistant pair with dependable grip for damp pavement instead of packing bulky technical rain boots.");
    }

    if (hasOutdoorRainPlan) {
      addItem("poncho", "Added because theme parks, hiking, camping, or other outdoor-heavy plans are easier with quick rain coverage.", true);
    }
  }

  if (tripConfig.coolWeather) {
    addItem("scarf", "A scarf adds compact warmth when damp or breezy conditions make outdoor sightseeing feel cooler.");
    addItem("gloves", "Light gloves can help travelers who run cold or expect long outdoor periods, especially in the morning or after sunset.", true);
  }

  if (tripConfig.hotWeather) {
    addItem("sunglasses", hasStrongSun
      ? `Useful for strong daytime sun during outdoor sightseeing, beach time, and transit days in ${tripConfig.destinationName}.`
      : `Recommended because ${tripLabel} can be bright during walking, beach, and transit days.`);
    addItem("sun-hat", "Added for extra sun protection during outdoor meals, beach time, tours, and long walks.");
    addItem("sunscreen", hasStrongSun
      ? "Useful for strong daytime sun during outdoor sightseeing, swimming, and extended beach days."
      : "Useful for outdoor sightseeing, swimming, and extended daytime exposure.");
    addItem("shorts", "Added because hot or beach-style trips need lightweight bottoms that are comfortable in warm weather.");
    addItem("breathable-shirts", `Lightweight shirts are useful for typical ${isTropicalOrHumid ? "hot and humid" : "hot"} conditions during ${tripLabel}, especially on long sightseeing days.`);
    addItem("reusable-water-bottle", "Keeps water handy during airports, tours, beach time, and long city walks in hot weather.", true);
    addItem("lip-balm", "Added because sun, heat, flights, and long outdoor days can dry out lips.", true);
  }

  if (isTropicalOrHumid && (tripConfig.hotWeather || rainRelevant || tripTypes.includes("beach"))) {
    addItem("bug-spray", "Added because tropical, humid, rainy, or outdoor-heavy destinations can mean mosquitoes and other insects.", true);
  }

  // Activity rules
  if (tripTypes.includes("beach")) {
    addItem("swimsuit", "Added because beach, pool, resort, or coastal plans need swimwear.");
    addItem("sandals", "Added because sandals are useful for beaches, pools, warm casual days, and wet areas.");
    addItem("lightweight-cover-up", "A lightweight cover-up or overshirt adds quick coverage between the beach, pool, resort, and indoor spaces.", true);
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
