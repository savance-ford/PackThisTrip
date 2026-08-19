import type { TripType } from "@/lib/types";

export type RainLikelihood = "low" | "medium" | "high";

export type WearGuidanceSection = {
  heading: string;
  body: string;
};

export type ClimateProfile = {
  destinationSlug: string;
  month: string;
  avgTempF?: number;
  typicalTemperature?: string;
  intro?: string;
  rainSummary?: string;
  packingFocus?: string;
  forecastNote?: string;
  wearGuidance?: WearGuidanceSection[];
  weatherSummary: string;
  rainLikelihood: RainLikelihood;
  recommendedTripTypes: TripType[];
  packingNotes: string[];
  metadataTitle?: string;
  metadataDescription?: string;
  hotWeather: boolean;
  coldWeather: boolean;
  rainExpected: boolean;
};

export const APPROVED_DESTINATION_MONTHS = [
  { destination: "italy", month: "june" },
  { destination: "paris", month: "december" },
  { destination: "japan", month: "october" },
  { destination: "london", month: "november" },
  { destination: "new-york", month: "december" },
  { destination: "hawaii", month: "january" },
  { destination: "mexico", month: "july" },
  { destination: "iceland", month: "november" },
  { destination: "costa-rica", month: "february" },
  { destination: "florida", month: "march" }
] as const;

export const CLIMATE_PROFILES: ClimateProfile[] = [
  {
    destinationSlug: "italy",
    month: "june",
    avgTempF: 74,
    weatherSummary: "June in Italy is usually warm, sunny, and comfortable for long city walks, with hotter afternoons in southern regions and coastal areas.",
    rainLikelihood: "low",
    recommendedTripTypes: ["city", "beach", "international"],
    packingNotes: [
      "Warm afternoons make breathable shirts, shorts, sunscreen, sunglasses, and a sun hat useful.",
      "Italy city trips often involve heavy walking, so comfortable shoes matter more than extra outfits.",
      "International essentials like a passport, document copies, and plug adapters should be packed before optional extras."
    ],
    hotWeather: true,
    coldWeather: false,
    rainExpected: false
  },
  {
    destinationSlug: "paris",
    month: "december",
    avgTempF: 43,
    weatherSummary: "December in Paris is chilly and often gray, with damp sidewalks, short daylight hours, and indoor-outdoor sightseeing days.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["city", "international"],
    packingNotes: [
      "Pack a warm layer system for chilly walks between museums, cafes, transit, and hotels.",
      "A packable rain jacket or umbrella is useful for damp December weather.",
      "Bring polished but comfortable shoes because Paris trips often mix walking, restaurants, and nicer indoor plans."
    ],
    hotWeather: false,
    coldWeather: true,
    rainExpected: true
  },
  {
    destinationSlug: "japan",
    month: "october",
    avgTempF: 64,
    weatherSummary: "October in Japan is generally mild and comfortable, with cooler evenings, city walking, and occasional rain depending on the region.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["city", "international"],
    packingNotes: [
      "Mild days and cooler evenings make light layers more useful than bulky cold-weather gear.",
      "Comfortable walking shoes are important for transit, temples, stairs, and full sightseeing days.",
      "Rain is possible, so a compact rain layer helps without taking much carry-on space."
    ],
    hotWeather: false,
    coldWeather: false,
    rainExpected: true
  },
  {
    destinationSlug: "london",
    month: "november",
    avgTempF: 48,
    weatherSummary: "November in London is cool, damp, and changeable, with frequent overcast days and rain possible during city sightseeing.",
    rainLikelihood: "high",
    recommendedTripTypes: ["city", "international"],
    packingNotes: [
      "Rain protection should be easy to reach because showers can interrupt walking and transit days.",
      "Pack warm layers that work indoors and outdoors instead of relying on one heavy coat.",
      "The United Kingdom uses Type G outlets, so a UK plug adapter belongs on the electronics list."
    ],
    hotWeather: false,
    coldWeather: true,
    rainExpected: true
  },
  {
    destinationSlug: "new-york",
    month: "december",
    avgTempF: 39,
    weatherSummary: "December in New York is cold for city walking, with brisk wind, indoor events, and possible rain or snow.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["city", "business"],
    packingNotes: [
      "Cold-weather layers, gloves, a beanie, and a scarf help with long walks and transit waits.",
      "Comfortable walking shoes are still essential, even when the trip includes dinners or work plans.",
      "A rain layer or compact umbrella is useful for mixed winter precipitation."
    ],
    hotWeather: false,
    coldWeather: true,
    rainExpected: true
  },
  {
    destinationSlug: "hawaii",
    month: "january",
    avgTempF: 76,
    weatherSummary: "January in Hawaii is warm and beach-friendly, with tropical sun, mild evenings, and some passing showers depending on the island.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["beach", "hiking"],
    packingNotes: [
      "Sun protection, swimwear, sandals, and a beach bag should be treated as core items.",
      "A light rain layer can help with passing showers and windier coastal walks.",
      "If hiking is on the plan, pack shoes with better grip than beach sandals."
    ],
    hotWeather: true,
    coldWeather: false,
    rainExpected: true
  },
  {
    destinationSlug: "mexico",
    month: "july",
    typicalTemperature: "Hot in many destinations; cooler at elevation",
    intro: "Mexico in July is generally hot, with humidity and seasonal showers common in many destinations, though conditions vary by region and elevation. This customizable checklist prioritizes lightweight clothing, sun protection, compact rain gear, and a practical mix of beach and sightseeing essentials for a seven-day carry-on trip. Use it as a starting point, then adjust the list for your exact city, resort, activities, and forecast.",
    rainSummary: "Seasonal showers or thunderstorms are possible in many regions",
    packingFocus: "Lightweight clothing, sun protection, compact rain gear, and beach-to-city essentials",
    forecastNote: "Conditions vary across Mexico by region, elevation, and itinerary. Check your local forecast shortly before departure.",
    wearGuidance: [
      {
        heading: "Daytime clothing",
        body: "Build most daytime outfits around breathable tops, shorts, or lightweight pants. Linen blends, light cotton, and quick-drying travel fabrics can be more comfortable than heavy denim during hot, humid sightseeing days. Keep a sun hat, sunglasses, and sunscreen easy to reach instead of buried in your luggage."
      },
      {
        heading: "Evenings and indoor spaces",
        body: "One light layer is usually enough for air-conditioned restaurants, flights, hotel spaces, or a cooler evening. A thin overshirt or packable light jacket adds flexibility without treating Mexico in July like a cold-weather trip. Travelers visiting higher-elevation cities should adjust this layer to their exact itinerary and forecast."
      },
      {
        heading: "Beach and pool days",
        body: "Pack a swimsuit, sandals, and a lightweight cover-up or overshirt for beach, resort, cenote, or pool plans. A beach bag keeps sunscreen, water, and wet items together, while optional water shoes can help for rocky shorelines, boat days, or slippery entry points. Check local rules before choosing sunscreen for reef or protected-water activities."
      },
      {
        heading: "City and sightseeing days",
        body: "Choose comfortable walking shoes for airports, city streets, ruins, tours, and long excursions. Pair them with lightweight clothes that can move between outdoor heat and indoor stops. A compact daypack is practical for water, rain protection, documents, and sun essentials, but avoid filling it with duplicate gear you will not use."
      },
      {
        heading: "Rainy periods",
        body: "Seasonal showers do not require bulky rainwear. Carry a packable rain shell or compact umbrella where you can reach it during day trips, especially when you will be away from your lodging for hours. Let the forecast for your specific destination guide whether you need anything more substantial."
      }
    ],
    weatherSummary: "Typical July conditions vary by region and elevation. Many popular destinations in Mexico are hot and humid with strong daytime sun, while seasonal showers or thunderstorms are common in many areas; high-elevation cities can be cooler.",
    rainLikelihood: "high",
    recommendedTripTypes: ["city", "beach", "international"],
    packingNotes: [
      "Prioritize lightweight, breathable shirts, shorts, and light pants for typical hot and humid July conditions in many destinations in Mexico.",
      "Strong daytime sun makes sunscreen, sunglasses, a sun hat, and a reusable water bottle useful for sightseeing and beach days.",
      "Carry a packable rain jacket or compact umbrella for seasonal showers or thunderstorms without adding bulky gear to a carry-on.",
      "Comfortable walking shoes help with airports, city days, ruins, tours, and excursions, while sandals work well for beach or pool time.",
      "Include swimwear and water-friendly items when the itinerary includes a beach, resort, cenote, or pool.",
      "Bug protection is worth considering for humid, tropical, or outdoor-heavy plans.",
      "Keep a passport, confirmations, emergency contacts, and backup copies of important documents organized for international travel.",
      "Skip bulky cold-weather clothing unless the exact itinerary includes cooler high-elevation conditions."
    ],
    metadataTitle: "What to Pack for Mexico in July: Hot Weather Packing List",
    metadataDescription: "Build a smart packing list for Mexico in July with lightweight clothing, rain protection, sun essentials, beach gear, travel documents, and carry-on tips.",
    hotWeather: true,
    coldWeather: false,
    rainExpected: true
  },
  {
    destinationSlug: "iceland",
    month: "november",
    avgTempF: 36,
    weatherSummary: "November in Iceland is cold, windy, wet, and variable, with limited daylight and outdoor conditions that can change quickly.",
    rainLikelihood: "high",
    recommendedTripTypes: ["hiking", "international"],
    packingNotes: [
      "Cold, wind, and rain make thermal layers, a warm coat, gloves, a beanie, and a scarf important.",
      "Outdoor plans need sturdy shoes, a daypack, rain protection, and reusable water gear.",
      "Protect documents and electronics from wet weather while keeping adapters and chargers accessible."
    ],
    hotWeather: false,
    coldWeather: true,
    rainExpected: true
  },
  {
    destinationSlug: "costa-rica",
    month: "february",
    avgTempF: 80,
    weatherSummary: "February in Costa Rica is warm and often drier in many travel regions, with strong sun, beach days, and outdoor activities.",
    rainLikelihood: "low",
    recommendedTripTypes: ["beach", "hiking", "international"],
    packingNotes: [
      "Hot weather and outdoor plans make breathable shirts, shorts, sunscreen, and a reusable water bottle useful.",
      "Beach and hiking plans call for both sandals or swim items and trail-ready shoes.",
      "Bug spray and compact outdoor gear are useful for rainforest, wildlife, and hiking activities."
    ],
    hotWeather: true,
    coldWeather: false,
    rainExpected: false
  },
  {
    destinationSlug: "florida",
    month: "march",
    avgTempF: 72,
    weatherSummary: "March in Florida is warm and active-trip friendly, with sun, beach or theme park days, and occasional rain.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["beach", "disney"],
    packingNotes: [
      "Sun protection and breathable clothing matter for beach days, theme parks, and long outdoor afternoons.",
      "Comfortable walking shoes are important if theme parks, city days, or long boardwalks are planned.",
      "A poncho or light rain layer is useful for passing showers without taking much bag space."
    ],
    hotWeather: true,
    coldWeather: false,
    rainExpected: true
  }
];

export function getClimateProfile(destinationSlug: string, month: string): ClimateProfile | undefined {
  const normalizedSlug = destinationSlug.toLowerCase();
  const normalizedMonth = month.toLowerCase();

  return CLIMATE_PROFILES.find(
    (profile) => profile.destinationSlug === normalizedSlug && profile.month === normalizedMonth
  );
}

export function isApprovedDestinationMonth(destinationSlug: string, month: string): boolean {
  const normalizedSlug = destinationSlug.toLowerCase();
  const normalizedMonth = month.toLowerCase();

  return APPROVED_DESTINATION_MONTHS.some(
    (item) => item.destination === normalizedSlug && item.month === normalizedMonth
  );
}
