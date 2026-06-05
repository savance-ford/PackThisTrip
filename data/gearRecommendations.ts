export type GearRecommendation = {
  id: string;
  name: string;
  category: string;
  recommendedForTags: string[];
  description: string;
  placeholderUrl: string;
  disclosureNote: string;
};

export const GEAR_RECOMMENDATIONS: GearRecommendation[] = [
  {
    id: "compression-packing-cubes",
    name: "Compression packing cubes",
    category: "Organization",
    recommendedForTags: ["packing-cubes", "carry-on", "organization", "long-trip"],
    description: "Useful for separating outfits, compressing soft clothing, and keeping a small bag organized.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "universal-travel-adapter",
    name: "Universal travel adapter",
    category: "Electronics",
    recommendedForTags: ["universal-power-adapter", "international", "europe", "uk"],
    description: "Helpful for international trips where outlet types may differ from the plugs you use at home.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "tsa-approved-toiletry-bag",
    name: "TSA-approved toiletry bag",
    category: "Toiletries",
    recommendedForTags: ["tsa-liquids-bag", "carry-on", "airport"],
    description: "Keeps small liquids together for airport screening and prevents toiletry spills from spreading.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "travel-laundry-detergent-sheets",
    name: "Travel laundry detergent sheets",
    category: "Laundry",
    recommendedForTags: ["travel-laundry-detergent", "laundry", "long-trip"],
    description: "Compact laundry sheets make it easier to rewear core clothing on longer trips.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "portable-charger",
    name: "Portable charger",
    category: "Electronics",
    recommendedForTags: ["portable-charger", "city", "theme-park", "transit", "international"],
    description: "A small battery pack can keep maps, boarding passes, photos, and travel apps available on long days.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "packable-rain-jacket",
    name: "Packable rain jacket",
    category: "Weather",
    recommendedForTags: ["packable-rain-jacket", "rain", "hiking", "cold"],
    description: "A lightweight rain shell adds weather backup without taking over the bag.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "reusable-water-bottle",
    name: "Reusable water bottle",
    category: "Travel Gear",
    recommendedForTags: ["reusable-water-bottle", "hot", "hiking", "theme-park", "beach"],
    description: "Good for hot weather, park days, hiking, and transit days when steady hydration matters.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "neck-pillow",
    name: "Neck pillow",
    category: "Comfort",
    recommendedForTags: ["neck-pillow", "transit", "international", "long-trip"],
    description: "Optional comfort gear for longer flights, trains, drives, or layovers.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  },
  {
    id: "travel-lock",
    name: "Travel lock",
    category: "Security",
    recommendedForTags: ["travel-lock", "security", "international", "checked"],
    description: "A small luggage lock can be useful for checked bags, shared lodging, and transit days.",
    placeholderUrl: "#",
    disclosureNote: "Placeholder recommendation. Affiliate links may be added later."
  }
];
