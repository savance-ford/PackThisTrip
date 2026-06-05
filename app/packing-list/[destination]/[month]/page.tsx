import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { TripSummary } from "@/components/TripSummary";
import { APPROVED_DESTINATION_MONTHS, getClimateProfile } from "@/data/climateProfiles";
import { CATEGORY_LABELS, CATEGORY_ORDER, generatePackingList } from "@/lib/generatePackingList";
import { getDestinationMonthTripConfig } from "@/lib/getDestinationMonthTripConfig";
import { scorePageQuality } from "@/lib/scorePageQuality";
import type { PackingItem, TripType } from "@/lib/types";

type PageProps = {
  params: Promise<{
    destination: string;
    month: string;
  }>;
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

function groupedItems(items: PackingItem[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category)
  })).filter((group) => group.items.length > 0);
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

  if (!tripConfig) {
    return {
      title: "Packing List - PackThisTrip"
    };
  }

  const displayMonth = pretty(month);

  return {
    title: { absolute: `What to Pack for ${tripConfig.destinationName} in ${displayMonth} - PackThisTrip` },
    description: `Use this smart packing list for ${tripConfig.destinationName} in ${displayMonth}, with weather-aware clothing, travel gear, documents, and activity recommendations.`
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

  if (!tripConfig || !climateProfile) {
    notFound();
  }

  const items = generatePackingList(tripConfig);
  const groups = groupedItems(items);
  const displayMonth = pretty(climateProfile.month);
  const relatedLinks = [
    { label: "Packing List Generator", href: "/packing-list-generator" },
    { label: "Carry-On Packing List", href: "/carry-on-packing-list" },
    { label: "International Travel Packing List", href: "/international-travel-packing-list" },
    ...relatedTripTypeLinks(tripConfig.tripTypes)
  ];

  return (
    <article className="bg-slate-50">
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Destination checklist</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            What to Pack for {tripConfig.destinationName} in {displayMonth}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            This weather-aware packing checklist uses a local monthly climate profile for {tripConfig.destinationName} in {displayMonth}, then runs those assumptions through the PackThisTrip packing engine.
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
                  <dd className="mt-1 text-lg font-black text-slate-950">{climateProfile.avgTempF}°F</dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-slate-500">Rain likelihood</dt>
                  <dd className="mt-1 text-lg font-black text-slate-950">{pretty(climateProfile.rainLikelihood)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-6 text-slate-600">{climateProfile.weatherSummary}</p>
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
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{item.reason}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Why these items?</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Climate-based packing notes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {climateProfile.packingNotes.map((note) => (
                  <li key={note} className="border-l-2 border-slate-200 pl-3">{note}</li>
                ))}
              </ul>
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
