import type { TripConfig } from "@/lib/types";
import {
  babyTravelPackingList,
  beachVacationPackingList,
  businessTripPackingList,
  carryOnPackingList,
  cruisePackingList,
  familyVacationPackingList,
  internationalTravelPackingList,
  sevenDayTripPackingList,
  summerTravelPackingList,
  weekendTripPackingList,
  winterTravelPackingList
} from "@/data/presetTripConfigs";

export type RelatedLink = {
  label: string;
  href: string;
};

export type SeoPackingListPageData = {
  title: string;
  metadataTitle: string;
  description: string;
  intro: string;
  tripConfig: TripConfig;
  tips: string[];
  relatedLinks: RelatedLink[];
};

const related = {
  carryOn: { label: "Carry-On Packing List", href: "/carry-on-packing-list" },
  beach: { label: "Beach Vacation Packing List", href: "/beach-vacation-packing-list" },
  cruise: { label: "Cruise Packing List", href: "/cruise-packing-list" },
  business: { label: "Business Trip Packing List", href: "/business-trip-packing-list" },
  international: { label: "International Travel Packing List", href: "/international-travel-packing-list" },
  family: { label: "Family Vacation Packing List", href: "/family-vacation-packing-list" },
  baby: { label: "Baby Travel Packing List", href: "/baby-travel-packing-list" },
  sevenDay: { label: "7-Day Trip Packing List", href: "/7-day-trip-packing-list" },
  weekend: { label: "Weekend Trip Packing List", href: "/weekend-trip-packing-list" },
  winter: { label: "Winter Travel Packing List", href: "/winter-travel-packing-list" },
  summer: { label: "Summer Travel Packing List", href: "/summer-travel-packing-list" },
  mexicoJuly: { label: "What to pack for Mexico in July", href: "/packing-list/mexico/july" }
};

export const seoPackingListPages = {
  carryOnPackingList: {
    title: "Carry-On Packing List",
    metadataTitle: "Carry-On Packing List - PackThisTrip",
    description: "Use this smart carry-on packing list to pack lighter for flights, weekend trips, and international travel.",
    intro: "A strong carry-on list is about keeping the essentials close while cutting anything that only feels useful in theory. This preset assumes a light international city trip with warm weather and no checked bag, so it prioritizes compact clothing, airport-friendly toiletries, travel documents, adapters, and day-to-day gear you can actually fit.",
    tripConfig: carryOnPackingList,
    tips: [
      "Keep liquids in one clear TSA-ready bag before you leave for the airport.",
      "Choose clothing pieces that can repeat across travel days, dinners, and sightseeing.",
      "Put documents, medication, chargers, and one change of clothes where they are easy to reach."
    ],
    relatedLinks: [related.weekend, related.international, related.sevenDay, related.business]
  },
  beachVacationPackingList: {
    title: "Beach Vacation Packing List",
    metadataTitle: "Beach Vacation Packing List - PackThisTrip",
    description: "Pack for sun, sand, swimming, and resort days with a beach vacation checklist generated from realistic warm-weather trip details.",
    intro: "Beach packing works best when sun protection, swimwear, and casual clothing are balanced with a few practical travel basics. This list assumes a warm Hawaii beach vacation with laundry access, so it adds water-friendly items and sun gear without overloading the bag with duplicate outfits.",
    tripConfig: beachVacationPackingList,
    tips: [
      "Pack swimwear and sandals where you can reach them before hotel check-in.",
      "Use a dedicated beach bag so sunscreen, water, and wet items stay separate from clean clothes.",
      "Bring sun protection even when the forecast looks cloudy; beach exposure adds up quickly."
    ],
    relatedLinks: [related.mexicoJuly, related.summer, related.family, related.cruise, related.carryOn]
  },
  cruisePackingList: {
    title: "Cruise Packing List",
    metadataTitle: "Cruise Packing List - PackThisTrip",
    description: "Use this cruise packing list for ship days, pool time, excursions, nicer dinners, and international port stops.",
    intro: "Cruises combine several trip styles in one suitcase: airport travel, pool decks, shore excursions, casual days, and nicer dinners. This preset assumes a seven-day warm-weather Mexico cruise with both carry-on and checked luggage, so the generated list includes documents, swim items, sun protection, and dinner-ready clothing.",
    tripConfig: cruisePackingList,
    tips: [
      "Keep your first-day swimsuit, sunscreen, medication, and documents in your carry-on.",
      "Plan one nicer outfit that can work for dinner more than once.",
      "Print or save key confirmations offline before boarding, since connectivity can be limited."
    ],
    relatedLinks: [related.beach, related.international, related.sevenDay, related.summer]
  },
  businessTripPackingList: {
    title: "Business Trip Packing List",
    metadataTitle: "Business Trip Packing List - PackThisTrip",
    description: "Pack efficiently for meetings, work travel, flights, and short hotel stays with this business trip packing list.",
    intro: "A business trip checklist needs to protect your workday first: laptop, chargers, polished clothes, comfortable transit gear, and a small set of weather backups. This preset assumes a short carry-on business trip to New York with rain expected, so it favors professional essentials and compact organization.",
    tripConfig: businessTripPackingList,
    tips: [
      "Pack one work outfit more carefully than the rest so you have a clean option if travel runs late.",
      "Keep laptop, charger, headphones, and documents together in your personal item.",
      "Use wrinkle-release spray or hotel steam to refresh packed business clothing."
    ],
    relatedLinks: [related.carryOn, related.weekend, related.international, related.sevenDay]
  },
  internationalTravelPackingList: {
    title: "International Travel Packing List",
    metadataTitle: "International Travel Packing List - PackThisTrip",
    description: "Use this international travel packing list for passports, adapters, long flights, walking days, and weather-aware essentials.",
    intro: "International packing has more failure points than a domestic trip: passport requirements, outlet differences, longer transit days, document backups, and destination-specific weather. This preset uses a ten-day Japan trip with city walking, laundry access, and rain expected, so the list emphasizes documents, adapters, comfortable shoes, and flexible clothing.",
    tripConfig: internationalTravelPackingList,
    tips: [
      "Store passport copies, hotel details, insurance documents, and emergency contacts offline.",
      "Check outlet types and voltage before packing electronics that need more than a USB charger.",
      "Build around comfortable shoes; international city trips often include more walking than expected."
    ],
    relatedLinks: [related.mexicoJuly, related.carryOn, related.sevenDay, related.winter, related.summer]
  },
  familyVacationPackingList: {
    title: "Family Vacation Packing List",
    metadataTitle: "Family Vacation Packing List - PackThisTrip",
    description: "Plan a family vacation packing list for warm weather, beach days, theme parks, kids, and shared luggage.",
    intro: "Family packing is less about packing everything and more about preventing the predictable friction: sun exposure, rain bursts, snacks, walking days, laundry, and keeping shared bags organized. This preset assumes a warm Florida family vacation with beach and theme park days, so the generated list covers weather, activity gear, and flexible basics.",
    tripConfig: familyVacationPackingList,
    tips: [
      "Group shared items like sunscreen, first aid, chargers, and snacks into one easy-access bag.",
      "Plan for rain and heat on the same day if theme parks or coastal activities are involved.",
      "Use laundry access to reduce duplicate clothing for everyone."
    ],
    relatedLinks: [related.baby, related.beach, related.summer, related.carryOn]
  },
  babyTravelPackingList: {
    title: "Baby Travel Packing List",
    metadataTitle: "Baby Travel Packing List - PackThisTrip",
    description: "Use this baby travel packing list for diapers, wipes, bottles, stroller needs, snacks, weather, and family travel basics.",
    intro: "Traveling with a baby changes the packing priority from minimalism to reliability. This preset assumes a short warm-weather Florida trip with baby and kids mode enabled, so the generated checklist adds diapers, wipes, bottles, comfort items, health backups, and practical gear alongside the normal travel essentials.",
    tripConfig: babyTravelPackingList,
    tips: [
      "Pack more diapers and wipes in your personal item than the travel day technically requires.",
      "Keep medication, bottles, snacks, and comfort items separate from checked luggage.",
      "Choose a stroller or carrier plan based on airports, sidewalks, naps, and lodging access."
    ],
    relatedLinks: [related.family, related.weekend, related.beach, related.carryOn]
  },
  sevenDayTripPackingList: {
    title: "7-Day Trip Packing List",
    metadataTitle: "7-Day Trip Packing List - PackThisTrip",
    description: "Pack a practical one-week travel checklist for flights, city days, warm weather, beach time, and international travel.",
    intro: "A seven-day packing list has to avoid both extremes: not enough clothing to stay comfortable, but not so much that the bag becomes a burden. This preset assumes a one-week carry-on trip to Spain with city and beach plans, so clothing quantities are capped intelligently while international documents and warm-weather gear still make the list.",
    tripConfig: sevenDayTripPackingList,
    tips: [
      "Build outfits from repeatable layers instead of packing seven unrelated looks.",
      "Use laundry access if available, but still bring enough essentials for travel delays.",
      "Pack one pair of comfortable walking shoes before adding sandals or nicer shoes."
    ],
    relatedLinks: [related.carryOn, related.international, related.beach, related.weekend]
  },
  weekendTripPackingList: {
    title: "Weekend Trip Packing List",
    metadataTitle: "Weekend Trip Packing List - PackThisTrip",
    description: "Use this weekend trip packing list for a quick carry-on getaway with just the essentials.",
    intro: "Weekend trips reward restraint. This preset assumes a two-day carry-on city trip, so the list stays focused on essentials, compact toiletries, comfortable walking gear, and a few optional comfort items instead of long-trip extras.",
    tripConfig: weekendTripPackingList,
    tips: [
      "Start with your travel outfit, then pack only the extra clothing the weekend actually needs.",
      "Use a small toiletry kit that can live in your bag between short trips.",
      "Keep the personal item light enough for transit, stairs, and walking between check-in times."
    ],
    relatedLinks: [related.carryOn, related.business, related.sevenDay, related.family]
  },
  winterTravelPackingList: {
    title: "Winter Travel Packing List",
    metadataTitle: "Winter Travel Packing List - PackThisTrip",
    description: "Pack for cold weather, rain, layers, walking days, and international winter travel with this generated checklist.",
    intro: "Winter packing is about warmth without wasting your whole suitcase on bulky pieces. This preset assumes a cold Iceland trip with rain, outdoor activity, checked luggage, and international travel, so the generated list emphasizes layers, weather protection, adapters, documents, and sturdy walking gear.",
    tripConfig: winterTravelPackingList,
    tips: [
      "Pack layers in a system: base layer, mid-layer, weather shell, and warm outerwear.",
      "Wear your bulkiest coat or boots in transit when it helps save luggage space.",
      "Protect electronics and documents from rain, snow, and condensation."
    ],
    relatedLinks: [related.international, related.sevenDay, related.carryOn, related.business]
  },
  summerTravelPackingList: {
    title: "Summer Travel Packing List",
    metadataTitle: "Summer Travel Packing List - PackThisTrip",
    description: "Use this summer travel packing list for hot weather, beaches, hiking, rain bursts, and international travel.",
    intro: "Summer packing should handle heat, sweat, sun, water, and sudden rain without becoming a giant pile of extras. This preset assumes a warm Costa Rica trip with beach time, hiking, international travel, and laundry access, so it adds breathable clothing, sun protection, rain gear, hydration, and outdoor basics.",
    tripConfig: summerTravelPackingList,
    tips: [
      "Prioritize breathable fabrics that dry quickly after heat, humidity, or rain.",
      "Bring sun protection and hydration gear even when beach time is only part of the trip.",
      "Separate wet or sandy items from electronics, documents, and clean clothes."
    ],
    relatedLinks: [related.mexicoJuly, related.beach, related.international, related.family, related.cruise]
  }
} satisfies Record<string, SeoPackingListPageData>;
