import type { BasePackingItem } from "@/lib/types";

export const PACKING_ITEMS: Record<string, BasePackingItem> = {
  // Clothing
  "t-shirts": { id: "t-shirts", name: "T-shirts", category: "clothing", tags: ["core", "warm", "casual"] },
  "long-sleeve-shirts": { id: "long-sleeve-shirts", name: "Long sleeve shirts", category: "clothing", tags: ["core", "cool", "layers"] },
  pants: { id: "pants", name: "Pants", category: "clothing", tags: ["core", "bottoms"] },
  shorts: { id: "shorts", name: "Shorts", category: "clothing", tags: ["hot", "beach", "bottoms"] },
  underwear: { id: "underwear", name: "Underwear", category: "clothing", tags: ["core"] },
  socks: { id: "socks", name: "Socks", category: "clothing", tags: ["core"] },
  sleepwear: { id: "sleepwear", name: "Sleepwear", category: "clothing", tags: ["core"] },
  "sweater-hoodie": { id: "sweater-hoodie", name: "Sweater or hoodie", category: "clothing", tags: ["layers", "cold"] },
  "light-jacket": { id: "light-jacket", name: "Light jacket", category: "clothing", tags: ["layers", "transit"] },
  "warm-coat": { id: "warm-coat", name: "Warm coat", category: "clothing", tags: ["cold", "winter"] },
  swimsuit: { id: "swimsuit", name: "Swimsuit", category: "clothing", tags: ["beach", "cruise"] },
  "dress-outfit": { id: "dress-outfit", name: "Dress outfit", category: "clothing", tags: ["cruise", "dining", "formal"] },
  "business-outfit": { id: "business-outfit", name: "Business outfit", category: "clothing", tags: ["business", "formal"] },
  "walking-shoes": { id: "walking-shoes", name: "Comfortable walking shoes", category: "clothing", tags: ["city", "walking"] },
  sandals: { id: "sandals", name: "Sandals", category: "clothing", tags: ["beach", "hot"] },
  "hiking-shoes": { id: "hiking-shoes", name: "Hiking shoes", category: "clothing", tags: ["hiking", "outdoors"] },
  "breathable-shirts": { id: "breathable-shirts", name: "Breathable shirts", category: "clothing", tags: ["hot", "active"] },

  // Toiletries
  toothbrush: { id: "toothbrush", name: "Toothbrush", category: "toiletries", tags: ["core"] },
  toothpaste: { id: "toothpaste", name: "Toothpaste", category: "toiletries", tags: ["core"] },
  deodorant: { id: "deodorant", name: "Deodorant", category: "toiletries", tags: ["core"] },
  shampoo: { id: "shampoo", name: "Shampoo", category: "toiletries", tags: ["core"] },
  conditioner: { id: "conditioner", name: "Conditioner", category: "toiletries", tags: ["core"] },
  "body-wash": { id: "body-wash", name: "Body wash", category: "toiletries", tags: ["core"] },
  razor: { id: "razor", name: "Razor", category: "toiletries", tags: ["grooming"] },
  "hairbrush-comb": { id: "hairbrush-comb", name: "Hairbrush or comb", category: "toiletries", tags: ["grooming"] },
  sunscreen: { id: "sunscreen", name: "Sunscreen", category: "toiletries", tags: ["hot", "outdoors"] },
  "lip-balm": { id: "lip-balm", name: "Lip balm", category: "toiletries", tags: ["core", "dry"] },
  "tsa-liquids-bag": { id: "tsa-liquids-bag", name: "TSA liquids bag", category: "toiletries", tags: ["carry-on", "airport"] },
  "travel-towel": { id: "travel-towel", name: "Travel towel", category: "toiletries", tags: ["camping", "beach"] },
  "hand-sanitizer": { id: "hand-sanitizer", name: "Hand sanitizer", category: "toiletries", tags: ["health"] },
  "medicine-kit": { id: "medicine-kit", name: "Basic medicine kit", category: "toiletries", tags: ["health", "safety"] },

  // Documents
  id: { id: "id", name: "ID", category: "documents", tags: ["core", "essential"] },
  passport: { id: "passport", name: "Passport", category: "documents", tags: ["international", "essential"] },
  "visa-documents": { id: "visa-documents", name: "Visa documents", category: "documents", tags: ["international"] },
  "boarding-pass": { id: "boarding-pass", name: "Boarding pass", category: "documents", tags: ["airport"] },
  "travel-insurance-documents": { id: "travel-insurance-documents", name: "Travel insurance documents", category: "documents", tags: ["international", "safety"] },
  "hotel-confirmation": { id: "hotel-confirmation", name: "Hotel confirmation", category: "documents", tags: ["lodging"] },
  "emergency-contacts": { id: "emergency-contacts", name: "Emergency contacts", category: "documents", tags: ["safety"] },
  "document-copies": { id: "document-copies", name: "Copies of important documents", category: "documents", tags: ["international", "backup"] },

  // Electronics
  "phone-charger": { id: "phone-charger", name: "Phone charger", category: "electronics", tags: ["core"] },
  "portable-charger": { id: "portable-charger", name: "Portable charger", category: "electronics", tags: ["city", "theme-park", "transit"] },
  headphones: { id: "headphones", name: "Headphones", category: "electronics", tags: ["transit"] },
  camera: { id: "camera", name: "Camera", category: "electronics", tags: ["sightseeing"] },
  laptop: { id: "laptop", name: "Laptop", category: "electronics", tags: ["business"] },
  "laptop-charger": { id: "laptop-charger", name: "Laptop charger", category: "electronics", tags: ["business"] },
  "universal-power-adapter": { id: "universal-power-adapter", name: "Universal power adapter", category: "electronics", tags: ["international"] },
  "europe-plug-adapter": { id: "europe-plug-adapter", name: "Plug adapter for Europe", category: "electronics", tags: ["europe"] },
  "uk-plug-adapter": { id: "uk-plug-adapter", name: "Plug adapter for UK", category: "electronics", tags: ["uk"] },

  // Travel gear
  "packing-cubes": { id: "packing-cubes", name: "Packing cubes", category: "travel-gear", tags: ["carry-on", "organization"] },
  "laundry-bag": { id: "laundry-bag", name: "Laundry bag", category: "travel-gear", tags: ["organization"] },
  "travel-laundry-detergent": { id: "travel-laundry-detergent", name: "Travel laundry detergent", category: "travel-gear", tags: ["long-trip", "laundry"] },
  "luggage-tag": { id: "luggage-tag", name: "Luggage tag", category: "travel-gear", tags: ["core"] },
  "reusable-water-bottle": { id: "reusable-water-bottle", name: "Reusable water bottle", category: "travel-gear", tags: ["hiking", "theme-park", "hot"] },
  daypack: { id: "daypack", name: "Daypack", category: "travel-gear", tags: ["city", "hiking"] },
  "neck-pillow": { id: "neck-pillow", name: "Neck pillow", category: "travel-gear", tags: ["transit"] },
  "eye-mask": { id: "eye-mask", name: "Eye mask", category: "travel-gear", tags: ["transit", "sleep"] },
  earplugs: { id: "earplugs", name: "Earplugs", category: "travel-gear", tags: ["sleep", "transit"] },
  "travel-lock": { id: "travel-lock", name: "Travel lock", category: "travel-gear", tags: ["security"] },

  // Weather
  "packable-rain-jacket": { id: "packable-rain-jacket", name: "Packable rain jacket", category: "weather", tags: ["rain", "hiking"] },
  umbrella: { id: "umbrella", name: "Umbrella", category: "weather", tags: ["rain", "city"] },
  beanie: { id: "beanie", name: "Beanie", category: "weather", tags: ["cold"] },
  gloves: { id: "gloves", name: "Gloves", category: "weather", tags: ["cold"] },
  scarf: { id: "scarf", name: "Scarf", category: "weather", tags: ["cold"] },
  "thermal-base-layer": { id: "thermal-base-layer", name: "Thermal base layer", category: "weather", tags: ["cold"] },
  sunglasses: { id: "sunglasses", name: "Sunglasses", category: "weather", tags: ["hot", "sun"] },
  "sun-hat": { id: "sun-hat", name: "Sun hat", category: "weather", tags: ["hot", "sun"] },

  // Activity
  "beach-bag": { id: "beach-bag", name: "Beach bag", category: "activity", tags: ["beach"] },
  "reef-safe-sunscreen": { id: "reef-safe-sunscreen", name: "Reef-safe sunscreen", category: "activity", tags: ["beach"] },
  "water-shoes": { id: "water-shoes", name: "Water shoes", category: "activity", tags: ["beach"] },
  "hiking-daypack": { id: "hiking-daypack", name: "Hiking daypack", category: "activity", tags: ["hiking"] },
  "bug-spray": { id: "bug-spray", name: "Bug spray", category: "activity", tags: ["hiking", "camping", "tropical"] },
  "formal-shoes": { id: "formal-shoes", name: "Formal shoes", category: "activity", tags: ["business", "formal"] },
  "wrinkle-release-spray": { id: "wrinkle-release-spray", name: "Wrinkle-release spray", category: "activity", tags: ["business", "cruise"] },
  "theme-park-bag": { id: "theme-park-bag", name: "Theme park bag", category: "activity", tags: ["theme-park"] },
  poncho: { id: "poncho", name: "Poncho", category: "activity", tags: ["theme-park", "rain"] },

  // Family / baby
  diapers: { id: "diapers", name: "Diapers", category: "family-baby", tags: ["baby"] },
  wipes: { id: "wipes", name: "Wipes", category: "family-baby", tags: ["baby", "kids"] },
  "baby-bottles": { id: "baby-bottles", name: "Baby bottles", category: "family-baby", tags: ["baby"] },
  pacifier: { id: "pacifier", name: "Pacifier", category: "family-baby", tags: ["baby"] },
  "baby-medication": { id: "baby-medication", name: "Baby medication", category: "family-baby", tags: ["baby", "health"] },
  "changing-pad": { id: "changing-pad", name: "Changing pad", category: "family-baby", tags: ["baby"] },
  "kids-snacks": { id: "kids-snacks", name: "Kids snacks", category: "family-baby", tags: ["kids"] },
  "small-toys": { id: "small-toys", name: "Small toys", category: "family-baby", tags: ["kids"] },
  "travel-stroller": { id: "travel-stroller", name: "Travel stroller", category: "family-baby", tags: ["baby", "kids"] }
};

export const ITEM_LIST = Object.values(PACKING_ITEMS);
