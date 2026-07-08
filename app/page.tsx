import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ExampleChecklistPreview } from "@/components/ExampleChecklistPreview";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorks } from "@/components/HowItWorks";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

const features = [
  {
    icon: "☀️",
    title: "Weather-aware suggestions",
    description: "Add rain, heat, or cold-weather items without turning the list into generic travel advice."
  },
  {
    icon: "📦",
    title: "Smart clothing quantities",
    description: "Clothing is capped based on laundry access and pack-light mode, instead of one outfit per day forever."
  },
  {
    icon: "🧳",
    title: "Carry-on and checked bag modes",
    description: "Carry-on travelers get TSA liquid reminders and packing cubes while longer trips get laundry helpers."
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family, baby, business, beach, and city support",
    description: "Switch on activity and traveler modules so the checklist matches the real trip."
  },
  {
    icon: "🖨️",
    title: "Save and print your checklist",
    description: "Check items off, refresh the page, and keep packing from the same saved list on your device."
  }
];

const popularPackingLists = [
  {
    title: "Mexico in July",
    href: "/packing-list/mexico/july",
    description: "Hot-weather packing list with sun protection, rain gear, beach items, and international essentials."
  },
  {
    title: "Iceland in November",
    href: "/packing-list/iceland/november",
    description: "Cold-weather checklist with layers, rain gear, and winter travel essentials."
  },
  {
    title: "Costa Rica in February",
    href: "/packing-list/costa-rica/february",
    description: "Beach and rainforest packing ideas for warm-weather travel."
  },
  {
    title: "Japan in October",
    href: "/packing-list/japan/october",
    description: "Fall city-travel checklist with layers, walking shoes, and travel documents."
  },
  {
    title: "Carry-On Packing List",
    href: "/carry-on-packing-list",
    description: "Pack lighter with a smart carry-on checklist."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="mx-auto mb-6 w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-slate-500 shadow-sm">Smart packing utility</p>
          <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">Pack smarter for any trip.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">Enter your destination, dates, trip length, activities, and luggage type. PackThisTrip builds a custom packing checklist you can save, print, and use offline.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/packing-list-generator">Build My Packing List</Button>
            <a href="#example-checklist" className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">View Example Checklist</a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Features</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Built like a utility, not a cluttered travel blog.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </div>
      </section>

      <HowItWorks />
      <ExampleChecklistPreview />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Start faster</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Popular packing lists</h2>
            <p className="mt-3 text-slate-600">Start with one of our weather-aware packing lists, then customize it for your trip.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularPackingLists.map((list) => (
              <Link
                key={list.href}
                href={list.href}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="text-lg font-black tracking-tight text-slate-950">{list.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{list.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Ready to build your list?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Start with the MVP generator now. Destination-specific SEO pages can be added after the core engine is proven.</p>
          <div className="mt-8"><Button href="/packing-list-generator">Build My Packing List</Button></div>
        </div>
      </section>
    </>
  );
}
