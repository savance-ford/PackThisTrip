import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { DestinationPackingChecklist } from "@/components/DestinationPackingChecklist";
import { GearRecommendations } from "@/components/GearRecommendations";
import { APPROVED_DESTINATION_MONTHS, getClimateProfile } from "@/data/climateProfiles";
import type { ClimateProfile, WearGuidanceSection } from "@/data/climateProfiles";
import { getDestination } from "@/data/destinations";
import { generatePackingList } from "@/lib/generatePackingList";
import { getDestinationMonthTripConfig } from "@/lib/getDestinationMonthTripConfig";
import { scorePageQuality } from "@/lib/scorePageQuality";
import type { Destination, TripConfig, TripType } from "@/lib/types";

type PageProps = {
  params: Promise<{
    destination: string;
    month: string;
  }>;
};

type Faq = {
  question: string;
  answer: string;
};

export const dynamicParams = false;

function pretty(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function relatedTripTypeLinks(tripTypes: TripType[]) {
  const links = [];

  if (tripTypes.includes("beach")) {
    links.push({ label: "Beach Vacation Packing List", href: "/beach-vacation-packing-list" });
  }

  if (tripTypes.includes("business")) {
    links.push({ label: "Business Trip Packing List", href: "/business-trip-packing-list" });
  }

  if (tripTypes.includes("cruise")) {
    links.push({ label: "Cruise Packing List", href: "/cruise-packing-list" });
  }

  if (tripTypes.includes("disney")) {
    links.push({ label: "Family Vacation Packing List", href: "/family-vacation-packing-list" });
  }

  if (tripTypes.includes("hiking") || tripTypes.includes("camping")) {
    links.push({ label: "Summer Travel Packing List", href: "/summer-travel-packing-list" });
  }

  return links.slice(0, 2);
}

function compactRelatedLinks(tripTypes: TripType[]) {
  const links = [
    { label: "Packing List Generator", href: "/packing-list-generator" },
    { label: "Carry-On Packing List", href: "/carry-on-packing-list" },
    { label: "International Travel Packing List", href: "/international-travel-packing-list" },
    ...relatedTripTypeLinks(tripTypes),
    { label: "Summer Travel Packing List", href: "/summer-travel-packing-list" },
    { label: "All Destination Packing Lists", href: "/packing-list" }
  ];

  return links.filter((link, index) => links.findIndex((item) => item.href === link.href) === index);
}

function buildIntro(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination) {
  if (climateProfile.intro) {
    return climateProfile.intro;
  }

  const displayMonth = pretty(climateProfile.month);
  const details = [
    climateProfile.hotWeather ? "hot-weather clothing" : "clothing that fits the season",
    climateProfile.rainExpected ? "rain backup" : "weather backup",
    tripConfig.tripTypes.includes("beach") ? "beach and swim gear" : null,
    tripConfig.tripTypes.includes("city") || destination?.walkingHeavy ? "comfortable shoes for walking days" : null,
    tripConfig.isInternational ? "international documents" : null
  ].filter(Boolean);

  return `Use this ${tripConfig.destinationName} ${displayMonth} packing list to balance ${details.join(", ")}. It is built from typical ${displayMonth} conditions, destination notes, and the same generated checklist engine used by PackThisTrip.`;
}

function buildWhatToWear(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination): WearGuidanceSection[] {
  if (climateProfile.wearGuidance) {
    return climateProfile.wearGuidance;
  }

  const displayMonth = pretty(climateProfile.month);
  const suggestions: WearGuidanceSection[] = [];

  if (climateProfile.hotWeather) {
    suggestions.push({
      heading: "Daytime clothing",
      body: `Pack lightweight breathable shirts for ${tripConfig.destinationName} in ${displayMonth}, plus shorts or lightweight pants that stay comfortable in warm conditions.`
    });
  } else if (climateProfile.coldWeather) {
    suggestions.push({
      heading: "Cold-weather layers",
      body: `Build outfits around warm layers, long sleeves, and outerwear that can handle ${displayMonth} conditions in ${tripConfig.destinationName}.`
    });
  } else {
    suggestions.push({
      heading: "Flexible layers",
      body: `Use light layers that can handle changing indoor, outdoor, and evening temperatures in ${tripConfig.destinationName}.`
    });
  }

  if (tripConfig.tripTypes.includes("beach")) {
    suggestions.push({ heading: "Beach and pool", body: "Bring a swimsuit, sandals, and light coverage for beach, resort, pool, or boat days." });
  }

  if (tripConfig.tripTypes.includes("city") || destination?.walkingHeavy) {
    suggestions.push({ heading: "Walking days", body: "Add comfortable walking shoes for cities, tours, airports, excursions, and long travel days." });
  }

  if (climateProfile.rainExpected) {
    suggestions.push({ heading: "Rain backup", body: `Include a light rain layer or compact umbrella because ${displayMonth} can bring rain in ${tripConfig.destinationName}.` });
  }

  if (tripConfig.isInternational) {
    suggestions.push({ heading: "Travel days", body: "Keep one outfit practical for travel days, immigration lines, transfers, and hotel check-in." });
  }

  return suggestions;
}

function buildWhyDifferent(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination) {
  const climateTags = destination?.climateTags ?? [];
  const sunExpected = climateTags.some((tag) => ["sunny", "hot-summer", "tropical"].includes(tag));
  const cityOrWalking = tripConfig.tripTypes.includes("city") || destination?.walkingHeavy;
  const reasons = [
    climateProfile.hotWeather ? "Hot-weather clothing is prioritized, with more breathable tops and fewer bulky layers." : null,
    climateProfile.coldWeather ? "Warm layers and cold-weather protection are included because the monthly climate profile calls for them." : null,
    sunExpected ? "Sun protection stays prominent for outdoor sightseeing, beach days, and extended daytime exposure." : null,
    climateProfile.rainExpected ? "Compact rain gear is included because the monthly profile calls for a practical rain backup." : null,
    tripConfig.tripTypes.includes("beach") ? "Beach and swim gear is included because coastal, resort, or pool travel is relevant to this destination-month profile." : null,
    cityOrWalking ? "Comfortable walking shoes and a day bag remain useful for sightseeing, transit, tours, and excursions." : null,
    tripConfig.isInternational ? "Passport, backup documents, confirmations, and destination-appropriate charging gear are considered for international travel." : null,
    climateProfile.hotWeather && !climateProfile.coldWeather ? "Bulky cold-weather items are intentionally minimized unless the exact itinerary requires them." : null,
    ...climateProfile.packingNotes
  ].filter(Boolean);

  return Array.from(new Set(reasons)).slice(0, 7);
}

function buildNotToPack(tripConfig: TripConfig, climateProfile: ClimateProfile) {
  const displayMonth = pretty(climateProfile.month);
  const items: string[] = [];

  if (climateProfile.hotWeather && !climateProfile.coldWeather) {
    items.push("Bulky cold-weather coats or heavy sweaters unless a specific high-elevation plan calls for them.");
    items.push("Too much heavy denim, which can feel uncomfortable in hot or humid weather and dries slowly after rain.");
  }

  if (tripConfig.tripTypes.includes("beach") && tripConfig.tripTypes.includes("city")) {
    items.push("Only beachwear. Add a few city, dining, airport, or tour-friendly pieces too.");
  }

  if (tripConfig.luggageType === "carry-on") {
    items.push("Full-size liquids in your carry-on. Use travel-size containers and a TSA liquids bag.");
    items.push("A separate outfit for every day. Build a compact wardrobe from tops and bottoms that can be worn more than once.");
  }

  if (!tripConfig.tripTypes.includes("business")) {
    items.push("Multiple bulky pairs of shoes. Start with walking shoes and add sandals or dressier footwear only when the itinerary needs them.");
  }

  if (climateProfile.rainExpected) {
    items.push(`A rain plan that only works if the forecast is dry. ${displayMonth} can still bring showers in many areas.`);
  }

  return items;
}

function buildPackingTips(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination) {
  const cityOrWalking = tripConfig.tripTypes.includes("city") || destination?.walkingHeavy;
  const sunExpected = destination?.climateTags.some((tag) => ["sunny", "hot-summer", "tropical"].includes(tag));
  const tips = [
    climateProfile.hotWeather ? "Build outfits from breathable layers and repeatable lightweight pieces instead of heavy, single-use outfits." : "Build outfits from repeatable layers that match the monthly climate profile.",
    climateProfile.rainExpected ? "Keep compact rain protection near the top of your day bag during tours and excursions." : null,
    cityOrWalking ? "Wear proven walking shoes for sightseeing days rather than packing an untested pair for the trip." : null,
    sunExpected ? "Keep sunglasses, a sun hat, sunscreen, and water easy to reach during daytime plans." : null,
    tripConfig.luggageType === "carry-on" ? "Use packing cubes or a simple outfit plan to keep the carry-on wardrobe compact." : null,
    `Check the forecast for your exact ${tripConfig.destinationName} city or region shortly before departure.`,
    "Adjust the starter list for planned beaches, hikes, resorts, nightlife, formal dining, or other itinerary-specific activities."
  ].filter(Boolean);

  return Array.from(new Set(tips)).slice(0, 7);
}

function buildFaqs(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination): Faq[] {
  const displayMonth = pretty(climateProfile.month);
  const destinationName = tripConfig.destinationName;
  const cityOrWalking = tripConfig.tripTypes.includes("city") || destination?.walkingHeavy;
  const packingFocus = [
    climateProfile.hotWeather ? "breathable clothing and sun protection" : null,
    climateProfile.coldWeather ? "warm layers and cold-weather accessories" : null,
    !climateProfile.hotWeather && !climateProfile.coldWeather ? "season-appropriate layers" : null,
    climateProfile.rainExpected ? "light rain gear" : null,
    tripConfig.tripTypes.includes("beach") ? "swim and beach items" : null,
    tripConfig.isInternational ? "passport and travel documents" : null
  ].filter(Boolean);

  return [
    {
      question: `What should I pack for ${destinationName} in ${displayMonth}?`,
      answer: `Start with ${packingFocus.join(", ")}, plus the everyday basics in the generated checklist. Use the generator to adjust the list for your trip length, luggage, and activities.`
    },
    {
      question: `What should I wear in ${destinationName} in ${displayMonth}?`,
      answer: climateProfile.hotWeather
        ? "Wear lightweight shirts, shorts or light pants, comfortable shoes, and sun protection. Add sandals and a swimsuit for beach or resort days."
        : "Wear season-appropriate layers, comfortable shoes, and weather protection based on the monthly climate profile."
    },
    {
      question: `Is ${displayMonth} rainy in ${destinationName}?`,
      answer: climateProfile.rainExpected
        ? `Seasonal showers are possible in ${displayMonth}, but conditions vary by region and elevation. Pack a compact rain backup and check the local forecast before departure.`
        : `${displayMonth} has a ${climateProfile.rainLikelihood} rain likelihood in this monthly profile. Check the forecast for your exact destination before departure.`
    },
    {
      question: `Do I need a rain jacket for ${destinationName} in ${displayMonth}?`,
      answer: climateProfile.rainExpected
        ? "A packable rain jacket or compact umbrella is a practical backup, especially for afternoon showers, tours, and transit days."
        : "A small rain backup can still be useful, but it is not the main driver of this list."
    },
    {
      question: `What shoes should I pack for ${destinationName} in ${displayMonth}?`,
      answer: `${cityOrWalking ? "Bring comfortable walking shoes for airports, cities, tours, and excursions. " : "Bring comfortable shoes for travel days and activities. "}${tripConfig.tripTypes.includes("beach") ? "Sandals are useful for beach, pool, resort, or boat time." : "Choose shoes that match your planned activities."}`
    },
    {
      question: `Can I pack carry-on only for ${destinationName} in ${displayMonth}?`,
      answer: "Yes. This starter list uses a seven-day solo carry-on assumption, prioritizing repeatable clothing, compact weather gear, travel-size liquids, and essential documents. Customize it if your itinerary or airline limits differ."
    }
  ];
}

function buildMetadataTitle(tripConfig: TripConfig, climateProfile: ClimateProfile) {
  if (climateProfile.metadataTitle) {
    return climateProfile.metadataTitle;
  }

  const displayMonth = pretty(climateProfile.month);
  const baseTitle = `What to Pack for ${tripConfig.destinationName} in ${displayMonth}`;

  if (climateProfile.hotWeather) {
    return `${baseTitle}: Hot Weather Packing List`;
  }

  if (climateProfile.coldWeather) {
    return `${baseTitle}: Cold Weather Packing List`;
  }

  return `${baseTitle} - PackThisTrip`;
}

function buildMetadataDescription(tripConfig: TripConfig, climateProfile: ClimateProfile) {
  if (climateProfile.metadataDescription) {
    return climateProfile.metadataDescription;
  }

  const displayMonth = pretty(climateProfile.month);
  const details = [
    climateProfile.hotWeather ? "hot-weather clothing" : null,
    climateProfile.coldWeather ? "cold-weather layers" : null,
    climateProfile.rainExpected ? "rain gear" : null,
    tripConfig.tripTypes.includes("beach") ? "beach items" : null,
    tripConfig.isInternational ? "travel documents" : null,
    "carry-on essentials"
  ].filter(Boolean);

  return `Build a smart packing list for ${tripConfig.destinationName} in ${displayMonth} with ${details.join(", ")}.`;
}

export function generateStaticParams() {
  return APPROVED_DESTINATION_MONTHS.map((item) => ({
    destination: item.destination,
    month: item.month
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { destination: destinationSlug, month } = await params;
  const tripConfig = getDestinationMonthTripConfig(destinationSlug, month);
  const climateProfile = getClimateProfile(destinationSlug, month);

  if (!tripConfig || !climateProfile) {
    return {
      title: "Packing List - PackThisTrip"
    };
  }

  const title = buildMetadataTitle(tripConfig, climateProfile);
  const description = buildMetadataDescription(tripConfig, climateProfile);
  const canonical = `/packing-list/${destinationSlug.toLowerCase()}/${month.toLowerCase()}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "PackThisTrip",
      type: "website"
    }
  };
}

export default async function DestinationMonthPackingListPage({ params }: PageProps) {
  const { destination: destinationSlug, month } = await params;
  const quality = scorePageQuality(destinationSlug, month);

  if (!quality.indexable) {
    notFound();
  }

  const tripConfig = getDestinationMonthTripConfig(destinationSlug, month);
  const climateProfile = getClimateProfile(destinationSlug, month);
  const destination = getDestination(destinationSlug);

  if (!tripConfig || !climateProfile) {
    notFound();
  }

  const items = generatePackingList(tripConfig);
  const displayMonth = pretty(climateProfile.month);
  const relatedLinks = compactRelatedLinks(tripConfig.tripTypes);
  const whatToWear = buildWhatToWear(tripConfig, climateProfile, destination);
  const whyDifferent = buildWhyDifferent(tripConfig, climateProfile, destination);
  const notToPack = buildNotToPack(tripConfig, climateProfile);
  const packingTips = buildPackingTips(tripConfig, climateProfile, destination);
  const faqs = buildFaqs(tripConfig, climateProfile, destination);

  return (
    <article className="bg-slate-50">
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Destination Packing Lists", href: "/packing-list" },
              {
                label: `${tripConfig.destinationName} in ${displayMonth}`,
                href: `/packing-list/${tripConfig.destinationSlug}/${climateProfile.month}`
              }
            ]}
          />
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Destination checklist</p>
          <h1 className="mt-4 max-w-4xl break-words text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            What to Pack for {tripConfig.destinationName} in {displayMonth}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {buildIntro(tripConfig, climateProfile, destination)}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/packing-list-generator" className="w-full sm:w-auto">Customize this packing list</Button>
            <Button href="#packing-list" variant="secondary" className="w-full sm:w-auto">View the packing list</Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="destination-at-a-glance">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Monthly trip context</p>
              <h2 id="destination-at-a-glance" className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                {tripConfig.destinationName} in {displayMonth} at a Glance
              </h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Typical conditions</dt>
                  <dd className="mt-1 break-words font-black leading-6 text-slate-950">
                    {climateProfile.typicalTemperature ?? `${climateProfile.avgTempF}\u00b0F monthly average`}
                  </dd>
                </div>
                <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Rain</dt>
                  <dd className="mt-1 break-words font-black leading-6 text-slate-950">
                    {climateProfile.rainSummary ?? `${pretty(climateProfile.rainLikelihood)} likelihood in the monthly profile`}
                  </dd>
                </div>
                <div className="min-w-0 rounded-xl bg-slate-50 p-3 sm:col-span-2">
                  <dt className="font-bold text-slate-500">Packing focus</dt>
                  <dd className="mt-1 break-words font-black leading-6 text-slate-950">
                    {climateProfile.packingFocus ?? climateProfile.packingNotes[0]}
                  </dd>
                </div>
                {destination?.climateTags.length ? (
                  <div className="rounded-xl bg-slate-50 p-3 sm:col-span-2">
                    <dt className="font-bold text-slate-500">Climate tags</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {destination.climateTags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                          {pretty(tag)}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
                <div className="rounded-xl bg-slate-50 p-3 sm:col-span-2">
                  <dt className="font-bold text-slate-500">Recommended trip styles</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {tripConfig.tripTypes.map((tripType) => (
                      <span key={tripType} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                        {pretty(tripType)}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Default trip length</dt>
                  <dd className="mt-1 font-black text-slate-950">{tripConfig.durationDays} days</dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Default luggage</dt>
                  <dd className="mt-1 font-black text-slate-950">{pretty(tripConfig.luggageType)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-6 text-slate-600">{climateProfile.weatherSummary}</p>
              <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-950">
                {climateProfile.forecastNote ?? `This monthly profile is a planning guide, not a live forecast. Check conditions for your exact ${tripConfig.destinationName} itinerary shortly before departure.`}
              </p>
            </section>

            <section id="packing-list" aria-labelledby="packing-list-heading" className="scroll-mt-24">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Generated checklist</p>
                <h2 id="packing-list-heading" className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  {tripConfig.destinationName} {displayMonth} Packing List
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Generated from a seven-day solo carry-on assumption, the monthly climate profile, and the destination activity mix. Adjust it for your airline, lodging, personal needs, and exact itinerary.
                </p>
              </div>
              <DestinationPackingChecklist
                items={items}
                storageKey={`${tripConfig.destinationSlug}-${climateProfile.month}`}
              />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Clothing plan</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">What to Wear in {tripConfig.destinationName} in {displayMonth}</h2>
              <div className="mt-5 grid gap-4">
                {whatToWear.map((section) => (
                  <section key={section.heading} className="rounded-xl bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">{section.heading}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{section.body}</p>
                  </section>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Why these items?</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Why This {tripConfig.destinationName} {displayMonth} Packing List Is Different</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {whyDifferent.map((note) => (
                  <li key={note} className="border-l-2 border-slate-200 pl-3">{note}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Pack smarter</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">What Not to Pack for {tripConfig.destinationName} in {displayMonth}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {notToPack.map((item) => (
                  <li key={item} className="border-l-2 border-slate-200 pl-3">{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Practical planning</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{tripConfig.destinationName} in {displayMonth} Packing Tips</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {packingTips.map((tip) => (
                  <li key={tip} className="border-l-2 border-slate-200 pl-3">{tip}</li>
                ))}
              </ul>
            </section>

            <GearRecommendations items={items} tripConfig={tripConfig} />

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{tripConfig.destinationName} {displayMonth} Packing FAQs</h2>
              <div className="mt-4 divide-y divide-slate-100">
                {faqs.map((faq) => (
                  <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="text-base font-black text-slate-950">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black tracking-tight text-slate-950">Related pages</h2>
              <nav className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                {relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </section>
          </aside>
        </div>
      </section>
    </article>
  );
}
