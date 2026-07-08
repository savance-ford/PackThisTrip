import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { GearRecommendations } from "@/components/GearRecommendations";
import { TripSummary } from "@/components/TripSummary";
import { APPROVED_DESTINATION_MONTHS, getClimateProfile } from "@/data/climateProfiles";
import type { ClimateProfile } from "@/data/climateProfiles";
import { getDestination } from "@/data/destinations";
import { CATEGORY_LABELS, CATEGORY_ORDER, generatePackingList } from "@/lib/generatePackingList";
import { getDestinationMonthTripConfig } from "@/lib/getDestinationMonthTripConfig";
import { scorePageQuality } from "@/lib/scorePageQuality";
import type { Destination, PackingItem, TripConfig, TripType } from "@/lib/types";

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

function groupedItems(items: PackingItem[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category)
  })).filter((group) => group.items.length > 0);
}

function buildIntro(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination) {
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

function buildWeatherFlags(climateProfile: ClimateProfile) {
  return [
    { label: "Hot-weather packing", value: climateProfile.hotWeather ? "Yes" : "No" },
    { label: "Cold-weather gear", value: climateProfile.coldWeather ? "Yes" : "No" },
    { label: "Rain backup", value: climateProfile.rainExpected ? "Recommended" : "Light backup" }
  ];
}

function buildWhatToWear(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination) {
  const displayMonth = pretty(climateProfile.month);
  const suggestions: string[] = [];

  if (climateProfile.hotWeather) {
    suggestions.push(`Pack lightweight breathable shirts for ${tripConfig.destinationName} in ${displayMonth}, plus shorts or lightweight pants that stay comfortable in heat and humidity.`);
  } else if (climateProfile.coldWeather) {
    suggestions.push(`Build outfits around warm layers, long sleeves, and outerwear that can handle ${displayMonth} conditions in ${tripConfig.destinationName}.`);
  } else {
    suggestions.push(`Use light layers that can handle changing indoor, outdoor, and evening temperatures in ${tripConfig.destinationName}.`);
  }

  if (tripConfig.tripTypes.includes("beach")) {
    suggestions.push("Bring a swimsuit and sandals for beach, resort, pool, or boat days.");
  }

  if (tripConfig.tripTypes.includes("city") || destination?.walkingHeavy) {
    suggestions.push("Add comfortable walking shoes for cities, tours, airports, excursions, and long travel days.");
  }

  if (climateProfile.rainExpected) {
    suggestions.push(`Include a light rain layer or compact umbrella because ${displayMonth} can bring rain in many ${tripConfig.destinationName} destinations.`);
  }

  if (tripConfig.isInternational) {
    suggestions.push("Keep one outfit practical for travel days, immigration lines, transfers, and hotel check-in.");
  }

  return suggestions;
}

function buildWhyDifferent(tripConfig: TripConfig, climateProfile: ClimateProfile, destination?: Destination) {
  const reasons = [
    ...climateProfile.packingNotes,
    destination?.notes,
    climateProfile.hotWeather ? "The generated list leans toward breathable clothing, sun protection, and hydration instead of bulky layers." : null,
    climateProfile.rainExpected ? "Rain protection stays visible because the climate profile marks rain as expected or likely." : null,
    tripConfig.tripTypes.includes("beach") ? "Beach and swim items are included because the destination-month profile supports beach travel." : null,
    tripConfig.isInternational ? "Passport, backup documents, confirmations, and adapter items are included because this is treated as an international trip." : null
  ].filter(Boolean);

  return Array.from(new Set(reasons)).slice(0, 8);
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
  }

  if (!tripConfig.tripTypes.includes("business")) {
    items.push("Too many dressy shoes unless you already have formal dinners, events, or resort dress codes planned.");
  }

  if (climateProfile.rainExpected) {
    items.push(`A rain plan that only works if the forecast is dry. ${displayMonth} can still bring showers in many areas.`);
  }

  return items;
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
      answer: `Pack ${packingFocus.join(", ")}, plus the basics generated in the checklist.`
    },
    {
      question: `What should I wear in ${destinationName} in ${displayMonth}?`,
      answer: climateProfile.hotWeather
        ? "Wear lightweight shirts, shorts or light pants, comfortable shoes, and sun protection. Add sandals and a swimsuit for beach or resort days."
        : "Wear season-appropriate layers, comfortable shoes, and weather protection based on the monthly climate profile."
    },
    {
      question: `Is ${displayMonth} rainy in ${destinationName}?`,
      answer: `${displayMonth} has a ${climateProfile.rainLikelihood} rain likelihood in this packing profile. Conditions vary by region, but it is smart to plan for possible showers instead of relying on exact live weather.`
    },
    {
      question: `Do I need a rain jacket for ${destinationName} in ${displayMonth}?`,
      answer: climateProfile.rainExpected
        ? "A packable rain jacket or compact umbrella is a practical backup, especially for afternoon showers, tours, and transit days."
        : "A small rain backup can still be useful, but it is not the main driver of this list."
    },
    {
      question: `Can I pack carry-on only for ${destinationName} in ${displayMonth}?`,
      answer: "Yes. This starter list uses a seven-day solo carry-on assumption, so it prioritizes reusable clothing, compact weather gear, travel-size liquids, and essential documents."
    },
    {
      question: `What shoes should I pack for ${destinationName} in ${displayMonth}?`,
      answer: `${cityOrWalking ? "Bring comfortable walking shoes for airports, cities, tours, and excursions. " : "Bring comfortable shoes for travel days and activities. "}${tripConfig.tripTypes.includes("beach") ? "Sandals are useful for beach, pool, resort, or boat time." : "Choose shoes that match your planned activities."}`
    }
  ];
}

function buildFaqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
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
  const groups = groupedItems(items);
  const displayMonth = pretty(climateProfile.month);
  const relatedLinks = compactRelatedLinks(tripConfig.tripTypes);
  const weatherFlags = buildWeatherFlags(climateProfile);
  const whatToWear = buildWhatToWear(tripConfig, climateProfile, destination);
  const whyDifferent = buildWhyDifferent(tripConfig, climateProfile, destination);
  const notToPack = buildNotToPack(tripConfig, climateProfile);
  const faqs = buildFaqs(tripConfig, climateProfile, destination);
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <article className="bg-slate-50">
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Destination checklist</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            What to Pack for {tripConfig.destinationName} in {displayMonth}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {buildIntro(tripConfig, climateProfile, destination)}
          </p>
          <div className="mt-8">
            <Button href="/packing-list-generator">Customize this packing list</Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Weather summary</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{tripConfig.destinationName} in {displayMonth}</h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Average temperature</dt>
                  <dd className="mt-1 text-lg font-black text-slate-950">{climateProfile.avgTempF}F</dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Rain likelihood</dt>
                  <dd className="mt-1 text-lg font-black text-slate-950">{pretty(climateProfile.rainLikelihood)}</dd>
                </div>
                {weatherFlags.map((flag) => (
                  <div key={flag.label} className="rounded-xl bg-slate-50 p-3">
                    <dt className="font-bold text-slate-500">{flag.label}</dt>
                    <dd className="mt-1 text-lg font-black text-slate-950">{flag.value}</dd>
                  </div>
                ))}
                <div className="rounded-xl bg-slate-50 p-3 sm:col-span-2">
                  <dt className="font-bold text-slate-500">Recommended trip types</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {tripConfig.tripTypes.map((tripType) => (
                      <span key={tripType} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                        {pretty(tripType)}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-6 text-slate-600">{climateProfile.weatherSummary}</p>
              {destination?.notes ? (
                <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">{destination.notes}</p>
              ) : null}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Clothing plan</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">What to Wear in {tripConfig.destinationName} in {displayMonth}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {whatToWear.map((suggestion) => (
                  <li key={suggestion} className="border-l-2 border-slate-200 pl-3">{suggestion}</li>
                ))}
              </ul>
            </section>

            <TripSummary config={tripConfig} />

            <section>
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Generated checklist</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">What to pack</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Generated from a seven-day solo carry-on trip assumption, the local climate profile, and the destination activity mix.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {groups.map(({ category, items: categoryItems }) => (
                  <section key={category} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                      <h3 className="font-black text-slate-950">{CATEGORY_LABELS[category]}</h3>
                      <span className="text-xs font-bold text-slate-500">{categoryItems.length} items</span>
                    </div>
                    <ul className="divide-y divide-slate-100">
                      {categoryItems.map((item) => (
                        <li key={item.id} className="p-4">
                          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-950">
                            <span>{item.name}</span>
                            {item.quantity && item.quantity > 1 ? (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-600">Qty {item.quantity}</span>
                            ) : null}
                            {item.optional ? (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700">Optional</span>
                            ) : null}
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-600">{CATEGORY_LABELS[item.category]}</span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{item.reason}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <GearRecommendations items={items} tripConfig={tripConfig} />

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Why these items?</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Why this {tripConfig.destinationName} {displayMonth} packing list is different</h2>
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
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{tripConfig.destinationName} {displayMonth} Packing Questions</h2>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </article>
  );
}
