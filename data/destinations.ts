import type { Destination } from "@/lib/types";

export const DESTINATIONS: Destination[] = [
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    climateTags: ["mild", "hot-summer", "rain-winter"],
    isInternationalDefault: true,
    outletType: ["C", "F", "L"],
    commonActivities: ["city", "beach", "food", "history"],
    walkingHeavy: true,
    notes: "Expect lots of walking on cobblestones, churches with modest dress expectations, and warm summers in many regions."
  },
  {
    slug: "france",
    name: "France",
    region: "Europe",
    climateTags: ["mild", "rain", "cool-winter"],
    isInternationalDefault: true,
    outletType: ["C", "E"],
    commonActivities: ["city", "museums", "food", "business"],
    walkingHeavy: true,
    notes: "Pack comfortable walking shoes, layers, and one polished outfit if you plan on restaurants or events."
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    climateTags: ["humid-summer", "cold-winter", "rain"],
    isInternationalDefault: true,
    outletType: ["A", "B"],
    commonActivities: ["city", "hiking", "temples", "food"],
    walkingHeavy: true,
    notes: "Japan trips often include heavy walking and transit days. Easy-off comfortable shoes are useful for temples and traditional stays."
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "United Kingdom",
    climateTags: ["cool", "rain", "mild-summer"],
    isInternationalDefault: true,
    outletType: ["G"],
    commonActivities: ["city", "museums", "hiking"],
    walkingHeavy: true,
    notes: "Rain is common, so a compact rain layer is useful even when the forecast looks mild."
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "North America",
    climateTags: ["hot", "tropical", "sunny"],
    isInternationalDefault: true,
    outletType: ["A", "B"],
    commonActivities: ["beach", "resort", "city", "ruins"],
    walkingHeavy: false,
    notes: "Sun protection, breathable clothes, and water-friendly items are especially useful for coastal and resort trips."
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    region: "North America",
    climateTags: ["hot", "tropical", "beach"],
    isInternationalDefault: false,
    outletType: ["A", "B"],
    commonActivities: ["beach", "hiking", "city"],
    walkingHeavy: false,
    notes: "Beach, hiking, and sun protection items matter more than formal clothing for most Hawaii trips."
  },
  {
    slug: "florida",
    name: "Florida",
    region: "North America",
    climateTags: ["hot", "humid", "rain", "theme-park"],
    isInternationalDefault: false,
    outletType: ["A", "B"],
    commonActivities: ["beach", "disney", "city"],
    walkingHeavy: true,
    notes: "Theme parks and beach days both benefit from comfortable shoes, sun protection, and rain backup."
  },
  {
    slug: "new-york",
    name: "New York",
    region: "North America",
    climateTags: ["cold-winter", "hot-summer", "city"],
    isInternationalDefault: false,
    outletType: ["A", "B"],
    commonActivities: ["city", "business", "museums", "dining"],
    walkingHeavy: true,
    notes: "Expect subway stairs, long walking days, and big seasonal swings."
  },
  {
    slug: "iceland",
    name: "Iceland",
    region: "Europe",
    climateTags: ["cold", "rain", "wind", "hiking"],
    isInternationalDefault: true,
    outletType: ["C", "F"],
    commonActivities: ["hiking", "road-trip", "outdoors"],
    walkingHeavy: true,
    notes: "Wind, rain, and cold layers are often important even outside deep winter."
  },
  {
    slug: "costa-rica",
    name: "Costa Rica",
    region: "Central America",
    climateTags: ["hot", "tropical", "rain", "jungle"],
    isInternationalDefault: true,
    outletType: ["A", "B"],
    commonActivities: ["beach", "hiking", "wildlife"],
    walkingHeavy: false,
    notes: "Plan for humid weather, insects, rain bursts, beaches, and light outdoor gear."
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    climateTags: ["cold-winter", "mild-summer", "outdoors"],
    isInternationalDefault: true,
    outletType: ["A", "B"],
    commonActivities: ["city", "hiking", "business"],
    walkingHeavy: true,
    notes: "Season matters a lot. Winter trips need real cold-weather layers."
  },
  {
    slug: "spain",
    name: "Spain",
    region: "Europe",
    climateTags: ["hot-summer", "mild", "beach"],
    isInternationalDefault: true,
    outletType: ["C", "F"],
    commonActivities: ["city", "beach", "food"],
    walkingHeavy: true,
    notes: "Warm-weather clothes, walking shoes, and one nicer outfit usually cover most Spain trips."
  }
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}
