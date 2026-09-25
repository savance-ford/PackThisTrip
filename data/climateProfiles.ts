import type { TripType } from "@/lib/types";

export type RainLikelihood = "low" | "medium" | "high";

export type WearGuidanceSection = {
  heading: string;
  body: string;
};

export type RegionalPackingGuidance = {
  heading: string;
  summary: string;
};

export type PackingGuidanceSection = {
  heading: string;
  body: string;
  points?: string[];
  relatedLink?: {
    label: string;
    href: string;
  };
};

export type PackingFaq = {
  question: string;
  answer: string;
};

export type ClimateProfile = {
  destinationSlug: string;
  month: string;
  defaultDurationDays?: number;
  avgTempF?: number;
  typicalTemperature?: string;
  intro?: string;
  rainSummary?: string;
  packingFocus?: string;
  forecastNote?: string;
  wearGuidance?: WearGuidanceSection[];
  weatherHeading?: string;
  regionalGuidance?: RegionalPackingGuidance[];
  checklistIntro?: string;
  footwearGuidance?: PackingGuidanceSection;
  rainGuidance?: PackingGuidanceSection;
  carryOnGuidance?: PackingGuidanceSection;
  tripLengthGuidance?: PackingGuidanceSection;
  travelEssentialsGuidance?: PackingGuidanceSection;
  relatedPackingLists?: Array<{
    label: string;
    href: string;
  }>;
  notToPack?: string[];
  packingTips?: string[];
  faqs?: PackingFaq[];
  showWhyDifferent?: boolean;
  weatherSummary: string;
  rainLikelihood: RainLikelihood;
  recommendedTripTypes: TripType[];
  packingNotes: string[];
  metadataTitle?: string;
  metadataDescription?: string;
  hotWeather: boolean;
  coldWeather: boolean;
  rainExpected: boolean;
  mildWeather?: boolean;
  coolWeather?: boolean;
  coolEvenings?: boolean;
  rainPossible?: boolean;
  dampWeather?: boolean;
  windPossible?: boolean;
  layersRecommended?: boolean;
  variableRegionalClimate?: boolean;
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
    defaultDurationDays: 10,
    typicalTemperature: "Mild in much of central Japan; cooler farther north and at elevation",
    intro: "Packing for Japan in October is mostly about flexible layers. Much of central Japan has comfortable autumn conditions, but northern and mountain areas can be considerably cooler while southern regions may remain warm. Prioritize comfortable walking shoes and light rain protection, then customize the checklist for your trip length, luggage, activities, laundry access, and packing style.",
    rainSummary: "Rain is possible; pack light protection and check each stop's forecast",
    packingFocus: "Flexible fall layers, proven walking shoes, compact rain gear, and transit-ready essentials",
    forecastNote: "Japan's October conditions vary by latitude and elevation. Check each city and day-trip forecast shortly before departure, and pack for the coolest stop on a multi-region itinerary.",
    weatherHeading: "What Is Japan Like in October?",
    regionalGuidance: [
      {
        heading: "Northern and high elevation",
        summary: "Hokkaido, Tohoku, and mountain stops can be substantially cooler, so a warmer mid-layer or outer layer may be needed."
      },
      {
        heading: "Central Japan",
        summary: "Tokyo, Kyoto, and Osaka are generally suited to flexible autumn layers, with cooler mornings and evenings than afternoons."
      },
      {
        heading: "Southern Japan",
        summary: "Kyushu and Okinawa may remain warmer, making lighter, breathable clothing useful beneath any removable layer."
      }
    ],
    checklistIntro: "This checklist starts with a 10-day solo carry-on plan and uses PackThisTrip's real quantity and recommendation rules. Open the generator to change the trip length for 7 days or two weeks, luggage type, traveler type, activities, laundry access, or pack-light preference.",
    wearGuidance: [
      {
        heading: "Daytime sightseeing",
        body: "Start with a breathable shirt or lightweight top and comfortable pants or trousers. Keep one light layer in your day bag instead of dressing for the coolest possible moment all day."
      },
      {
        heading: "Cooler mornings and evenings",
        body: "Keep a light sweater or cardigan and a light jacket available for cooler starts, evenings, air-conditioned transit, and temperature changes between indoor and outdoor stops."
      },
      {
        heading: "Walking and transit days",
        body: "Pair supportive, broken-in walking shoes with practical socks. A lightweight day bag keeps water, a portable battery, documents, and a removable layer within reach."
      },
      {
        heading: "Restaurants and nicer evenings",
        body: "One simple smart-casual outfit can cover a nicer dinner or evening plan. Choose versatile pieces rather than packing several outfits that only work once."
      },
      {
        heading: "Northern Japan and mountain areas",
        body: "Add a warmer mid-layer or outer layer when visiting Hokkaido, Tohoku, alpine routes, or higher elevations. Let the forecast for those specific stops guide how warm it needs to be."
      },
      {
        heading: "Southern Japan",
        body: "Lighter clothing may remain comfortable in Kyushu or Okinawa. Breathable base pieces make it easier to adjust without creating a separate wardrobe for each region."
      },
      {
        heading: "Rainy days",
        body: "A compact umbrella or lightweight rain shell is usually enough for an urban itinerary. Water-resistant walking shoes can help when the forecast looks persistently wet."
      }
    ],
    footwearGuidance: {
      heading: "Best Shoes for Japan in October",
      body: "Japan itineraries often mean hours of walking between attractions, through stations and neighborhoods, around temples or shrines, and during day trips. Make a supportive, broken-in walking shoe your main pair.",
      points: [
        "Limit bulky footwear; one dependable walking pair matters more than several specialized options.",
        "A second lightweight casual pair can be useful on a longer trip, especially if the main pair needs time to dry.",
        "Choose rain-resistant footwear when the itinerary or forecast justifies it, but most urban trips do not require heavy rain boots."
      ]
    },
    carryOnGuidance: {
      heading: "Can You Pack Carry-On Only for Japan in October?",
      body: "Yes, many travelers can pack carry-on only for Japan in October, although it will not suit every itinerary or traveler. Repeatable layers, limited shoes, compact toiletries, and versatile clothing keep a fall wardrobe manageable without packing one outfit per day.",
      points: [
        "Use laundry access or plan one small wash during a 10-day or two-week trip.",
        "Wear the bulkiest shoes and outer layer in transit instead of filling the bag with them.",
        "Leave some room for purchases rather than packing the carry-on to its limit."
      ],
      relatedLink: {
        label: "See the carry-on packing list",
        href: "/carry-on-packing-list"
      }
    },
    notToPack: [
      "Several heavy sweaters or multiple bulky coats for a central-Japan itinerary; removable layers are usually more flexible.",
      "Too many shoes. Begin with one proven walking pair and add one lightweight backup only if the trip length or plans justify it.",
      "A separate outfit for every day. Repeatable tops and bottoms, plus laundry on longer trips, use carry-on space more effectively.",
      "Large quantities of toiletries that your lodging provides or that you can easily replace during the trip.",
      "Clothing chosen for only one city when the itinerary also includes colder northern or high-elevation stops."
    ],
    packingTips: [
      "Use removable layers instead of relying on one very heavy coat for changing October conditions.",
      "Prioritize broken-in walking shoes; stations, neighborhoods, temples, and day trips can add up to long days on foot.",
      "Keep a compact umbrella or lightweight rain shell near the top of your day bag.",
      "Add warmer clothing when Hokkaido, Tohoku, mountain areas, or higher elevations are on the itinerary.",
      "Plan a laundry stop or hand-wash basics to keep a 10-day or two-week wardrobe compact.",
      "Carry portable power for navigation, translation, tickets, and transit information during long days away from your lodging.",
      "Leave a little luggage space for purchases or souvenirs instead of filling every packing cube before departure."
    ],
    faqs: [
      {
        question: "What should I pack for Japan in October?",
        answer: "Pack repeatable lightweight and medium-weight tops, comfortable pants, a sweater or cardigan, a light jacket, proven walking shoes, and compact rain protection. Add travel documents, medications, charging gear, and itinerary-specific items from the checklist."
      },
      {
        question: "What should I wear in Japan in October?",
        answer: "For much of central Japan, wear a lightweight top with comfortable pants and keep a cardigan, sweater, or light jacket available. Adjust toward warmer layers in northern or mountain areas and lighter pieces in the south."
      },
      {
        question: "Is Japan cold in October?",
        answer: "Not everywhere. Central destinations are often comfortable for autumn layering, but mornings and evenings can feel cool. Northern Japan and higher elevations can be significantly colder, while southern Japan may remain warm."
      },
      {
        question: "Does it rain in Japan in October?",
        answer: "Rain is possible, and conditions vary by region and itinerary. A compact umbrella or packable rain shell is a sensible backup, followed by a local forecast check shortly before departure."
      },
      {
        question: "Do I need a jacket in Japan in October?",
        answer: "A light jacket is useful for cooler mornings, evenings, and changing conditions in many itineraries. Choose something warmer for northern or high-elevation stops if their forecast calls for it."
      },
      {
        question: "What shoes should I wear in Japan?",
        answer: "Choose supportive, broken-in walking shoes that stay comfortable through stations, sightseeing, neighborhoods, and day trips. A lightweight second pair can help on longer trips, but avoid packing several bulky options."
      },
      {
        question: "Can I travel to Japan with only a carry-on?",
        answer: "Many travelers can, especially with repeatable layers, one or two pairs of shoes, compact toiletries, and laundry access. Extra equipment, colder regional plans, or personal needs may make checked luggage more practical."
      },
      {
        question: "How should I pack for 10 days or two weeks in Japan?",
        answer: "Do not pack one outfit per day. Use capped quantities of repeatable tops and bottoms, let socks and underwear scale a little further, and plan laundry for a two-week trip. Customize the generator for your exact duration and luggage."
      }
    ],
    showWhyDifferent: false,
    weatherSummary: "October is autumn in Japan. Much of central Japan is often mild, mornings and evenings can feel cooler, rain remains possible, and conditions become cooler in northern or higher-elevation areas while southern Japan can stay warmer.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["city", "international"],
    packingNotes: [
      "Northern Japan, including Hokkaido and parts of Tohoku, can be notably cooler than central-city itineraries in October.",
      "Southern destinations such as Kyushu and Okinawa may remain warmer, so keep the base wardrobe breathable and adaptable.",
      "Layering a light sweater or cardigan under a light jacket is more flexible than relying on one heavy coat for a typical central-Japan itinerary.",
      "Japan trips often involve long walking and transit days, making broken-in comfortable shoes a higher priority than extra outfits.",
      "A compact umbrella or lightweight rain layer is easy to carry during sightseeing when October rain develops.",
      "Mountain and high-elevation day trips can require warmer clothing than nearby cities.",
      "For a multi-region itinerary, pack for the coolest destination and use removable layers elsewhere."
    ],
    metadataTitle: "What to Pack for Japan in October: Complete Packing List",
    metadataDescription: "Build a smart packing list for Japan in October with fall layers, comfortable walking shoes, rain essentials, travel documents, and carry-on tips.",
    hotWeather: false,
    coldWeather: false,
    rainExpected: true,
    mildWeather: true,
    coolEvenings: true,
    layersRecommended: true,
    variableRegionalClimate: true
  },
  {
    destinationSlug: "london",
    month: "november",
    defaultDurationDays: 7,
    typicalTemperature: "Cool to chilly, especially in the morning and after sunset",
    intro: "Packing for London in November is mostly about practical layers, rain protection, and comfortable walking shoes. Cool, damp, or breezy streets can contrast with heated museums, restaurants, shops, and trains, so removable layers are more useful than a suitcase full of bulky winter clothing. The checklist adapts to trip length, luggage, activities, traveler type, laundry access, and packing style.",
    rainSummary: "Showers and damp conditions are possible; steady rain every day is not assumed",
    packingFocus: "Removable layers, a weather-resistant jacket, proven walking shoes, and compact rain protection",
    forecastNote: "This monthly profile is a planning guide, not a live forecast. Check London's forecast shortly before departure, especially if you expect long outdoor days or evening events.",
    weatherHeading: "What Is London Like in November?",
    weatherSummary: "November is late autumn in London. Conditions are generally cool, with colder-feeling mornings and evenings, possible rain, damp pavement, occasional wind, and shorter daylight. Indoor attractions and public transport are often heated, and snow is not treated as a normal expectation for a typical trip. Pack removable layers, compact rain protection, and useful walking shoes rather than defaulting to extreme winter gear.",
    rainLikelihood: "medium",
    recommendedTripTypes: ["city", "international"],
    checklistIntro: "This checklist starts with a seven-day solo carry-on plan and uses PackThisTrip's shared quantity and recommendation rules. Open the generator to test a weekend, a longer trip, checked luggage, laundry access, family travel, or a pack-light preference.",
    wearGuidance: [
      {
        heading: "Daytime sightseeing",
        body: "Build a practical outfit from comfortable trousers or pants, a long-sleeve shirt or other base layer, a sweater or cardigan, a weather-resistant jacket, and broken-in walking shoes. Each piece should work in more than one combination."
      },
      {
        heading: "Cool mornings and evenings",
        body: "Keep an additional mid-layer or scarf available when early starts and evenings feel colder. Light gloves or slightly warmer outerwear are optional for travelers who run cold or expect to spend long periods outdoors."
      },
      {
        heading: "Rainy or damp days",
        body: "Use a water-resistant jacket as the everyday outer layer and keep a compact umbrella available when the forecast warrants it. Reasonably rain-resistant walking shoes are more practical for normal city plans than heavy technical boots."
      },
      {
        heading: "Indoor activities",
        body: "Museums, restaurants, shops, theatres, and public transportation can feel much warmer than the street. Base and mid-layers that are easy to remove help you adjust without carrying a second outfit."
      },
      {
        heading: "Nicer evenings",
        body: "One smart-casual outfit can cover a restaurant, theatre performance, or evening plan. Build it from pieces that also work during the rest of the trip."
      }
    ],
    footwearGuidance: {
      heading: "Best Shoes for London in November",
      body: "London sightseeing can combine long walks, Underground stations, stairs, pavement, museums, attractions, markets, neighborhoods, and day trips. Make a comfortable, broken-in, reasonably rain-resistant walking shoe your main pair.",
      points: [
        "One dependable walking pair is enough for many short trips and carry-on travelers.",
        "A second lightweight pair can help on a longer trip if the main pair gets wet, but avoid packing several bulky options.",
        "Ordinary urban sightseeing rarely requires heavy technical rain boots."
      ]
    },
    rainGuidance: {
      heading: "Do You Need a Rain Jacket or Umbrella in London in November?",
      body: "Rain is possible, but the list does not assume constant wet weather. A compact umbrella is small and easy to carry for city sightseeing, while a water-resistant jacket keeps your hands free and doubles as an everyday outer layer when conditions feel windy or changeable.",
      points: [
        "Minimalist packers can choose the option that best fits the forecast and their preferred way of sightseeing rather than automatically bringing both.",
        "Keep whichever rain option you choose easy to reach in a day bag."
      ]
    },
    carryOnGuidance: {
      heading: "Can You Pack Carry-On Only for London in November?",
      body: "Yes, many travelers can, depending on trip duration and personal needs. Repeatable base layers, one or two mid-layers, one weather-resistant jacket, and limited footwear keep a cool-weather wardrobe compact without making carry-on-only the right choice for everyone.",
      points: [
        "Wear the bulkiest shoes and outer layer during travel.",
        "Choose mix-and-match pieces instead of packing a separate outfit for every day.",
        "Use laundry on a 10- to 14-day trip instead of scaling every clothing quantity with trip length.",
        "Keep a second pair of shoes optional and use travel-size toiletries."
      ],
      relatedLink: {
        label: "See the carry-on packing list",
        href: "/carry-on-packing-list"
      }
    },
    tripLengthGuidance: {
      heading: "Packing for a Weekend, a Week, or 10 Days in London",
      body: "Trip length changes quantities, not the basic layering strategy. The generated checklist remains responsible for the exact counts.",
      points: [
        "Weekend: keep the wardrobe minimal with repeatable layers, one main walking pair, and compact toiletries.",
        "5-7 days: use a slightly larger base-layer rotation while repeating trousers, sweaters, and the same outer layer.",
        "10-14 days: plan laundry instead of packing 10-14 unique outfits, and add a lightweight second shoe pair only if luggage space and personal needs justify it."
      ],
      relatedLink: {
        label: "Customize trip length and quantities",
        href: "/packing-list-generator"
      }
    },
    travelEssentialsGuidance: {
      heading: "UK Travel and Power Essentials",
      body: "Keep the international basics together: passport, travel documents, phone, charging cable, portable power bank, medications, and toiletries. International travelers whose plugs differ from UK outlets should pack the appropriate Type G plug adapter and check their own device requirements.",
      relatedLink: {
        label: "See the international travel packing list",
        href: "/international-travel-packing-list"
      }
    },
    relatedPackingLists: [
      { label: "Iceland November Packing List", href: "/packing-list/iceland/november" },
      { label: "New York December Packing List", href: "/packing-list/new-york/december" }
    ],
    notToPack: [
      "An extreme winter coat by default. A weather-resistant outer layer plus removable layers is more flexible for a typical urban itinerary.",
      "Several bulky coats or sweaters. One weather-resistant outer layer and one or two repeatable mid-layers usually work better.",
      "Too many shoes. Prioritize one proven walking pair and add a lightweight backup only when trip length and luggage space justify it.",
      "Heavy technical rain gear for ordinary sightseeing. A practical jacket and compact umbrella usually provide a more useful city setup.",
      "A separate outfit for every day. Rewear trousers and mid-layers, and use laundry on longer trips.",
      "Oversized toiletries, specialized outdoor equipment, or inflexible single-use clothing unless the itinerary genuinely requires them."
    ],
    packingNotes: [
      "Removable base, mid, and outer layers make it easier to adjust between cool streets and heated indoor spaces.",
      "A water-resistant jacket and compact umbrella provide useful backup for November showers without assuming rain every day.",
      "Comfortable, broken-in walking shoes matter because sightseeing and public transport can add up to long days on foot.",
      "A scarf adds useful warmth in breezy or damp conditions without taking much suitcase space.",
      "Carry-on travelers should keep footwear minimal and make one versatile walking pair the priority.",
      "Outdoor sightseeing can feel cooler after sunset, so keep a removable layer accessible during shorter November days.",
      "Travelers planning long outdoor days or who run cold can add a lightweight thermal layer or gloves.",
      "The United Kingdom uses Type G outlets, so international travelers should check their devices and pack the appropriate plug adapter."
    ],
    packingTips: [
      "Build outfits from a base layer, repeatable mid-layer, and one weather-resistant outer layer.",
      "Wear the bulkiest shoes and outer layer during travel to protect carry-on space.",
      "Keep a compact umbrella near the top of your day bag instead of buried in your luggage.",
      "Prioritize broken-in walking shoes and avoid adding extra pairs without a clear use.",
      "Plan laundry for a 10- to 14-day trip so shirts, underwear, and socks do not scale one-for-one with every day.",
      "Carry a portable charger for navigation, tickets, photos, and transit information during long days away from your lodging.",
      "Leave some luggage room for purchases instead of filling every packing cube before departure."
    ],
    faqs: [
      {
        question: "What should I pack for London in November?",
        answer: "Pack repeatable base layers, comfortable trousers, a sweater or cardigan, a water-resistant jacket, proven walking shoes, and compact rain protection. Add travel documents, medications, charging gear, and the personal items shown in the generated checklist."
      },
      {
        question: "What should I wear in London in November?",
        answer: "A practical daytime combination is a long-sleeve top, comfortable trousers, a removable sweater or cardigan, a weather-resistant jacket, and broken-in walking shoes. Keep a scarf handy and adjust the warmth for your forecast and time outdoors."
      },
      {
        question: "Is London cold in November?",
        answer: "London is generally cool to chilly in November, and damp or windy conditions can make mornings and evenings feel colder. Most city trips benefit from flexible layers rather than automatically requiring extreme winter clothing."
      },
      {
        question: "Does it rain a lot in London in November?",
        answer: "Rain and damp conditions are possible, but this guide does not assume it rains constantly. Bring compact protection and check the forecast shortly before departure."
      },
      {
        question: "Do I need a winter coat in London in November?",
        answer: "Not every traveler needs a heavy winter coat. A water-resistant outer layer over removable base and mid-layers is more flexible for a typical city itinerary; choose something warmer if you run cold or expect long outdoor periods."
      },
      {
        question: "Should I bring an umbrella to London in November?",
        answer: "A compact umbrella is a useful city-friendly backup. Minimalist travelers may prefer a water-resistant jacket instead, particularly when wind or hands-free convenience matters."
      },
      {
        question: "What shoes should I wear in London in November?",
        answer: "Choose comfortable, broken-in walking shoes with dependable grip and some rain resistance. One main pair is often enough for a short trip; a lightweight second pair can help on longer itineraries."
      },
      {
        question: "Can I pack carry-on only for London?",
        answer: "Many travelers can, depending on duration and personal needs. Wear bulky pieces in transit, limit shoes, use travel-size toiletries, repeat versatile layers, and plan laundry for a longer trip."
      },
      {
        question: "How should I pack for a week in London in November?",
        answer: "For a week, use a modest rotation of base layers and underwear while repeating trousers, sweaters, and one outer layer. The generated checklist starts with a seven-day carry-on setup and can be customized for luggage, laundry, activities, and packing style."
      }
    ],
    showWhyDifferent: false,
    metadataTitle: "What to Pack for London in November: Complete Packing List",
    metadataDescription: "Build a smart London November packing list with practical layers, rain protection, comfortable walking shoes, travel essentials, and carry-on tips.",
    hotWeather: false,
    coldWeather: false,
    rainExpected: false,
    rainPossible: true,
    coolWeather: true,
    coolEvenings: true,
    dampWeather: true,
    windPossible: true,
    layersRecommended: true
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
