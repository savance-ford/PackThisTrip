import type { Metadata } from "next";
import Link from "next/link";
import { APPROVED_DESTINATION_MONTHS } from "@/data/climateProfiles";
import { getDestination } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destination Packing Lists",
  description: "Browse PackThisTrip destination and month packing lists built from local climate profiles and the smart packing engine."
};

function prettyMonth(month: string) {
  return month.replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DestinationPackingListsPage() {
  const pages = APPROVED_DESTINATION_MONTHS.map((item) => {
    const destination = getDestination(item.destination);

    return {
      ...item,
      destinationName: destination?.name ?? item.destination,
      href: `/packing-list/${item.destination}/${item.month}`
    };
  });

  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Destination packing lists</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Weather-aware packing lists by destination</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            These starter pages use local monthly climate profiles and the PackThisTrip checklist engine. The list is intentionally small while each page has enough destination, weather, and packing context to be useful.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{prettyMonth(page.month)}</p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">What to Pack for {page.destinationName} in {prettyMonth(page.month)}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">View the generated checklist, weather notes, trip assumptions, and related packing pages.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
