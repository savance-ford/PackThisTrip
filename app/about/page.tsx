import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how PackThisTrip creates smart packing lists from trip details, weather assumptions, luggage type, traveler needs, and activities.",
  alternates: {
    canonical: "/about"
  }
};

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">PackThisTrip</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">About</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
          <p>PackThisTrip creates smart packing lists based on trip details like destination, trip length, luggage type, weather, traveler type, and planned activities.</p>
          <p>The goal is to give travelers a practical starting point instead of a generic list that treats every trip the same. The checklist engine estimates clothing quantities, adds relevant documents and gear, and adjusts for factors like carry-on travel, international destinations, hot weather, cold weather, rain, family travel, business trips, and beach plans.</p>
          <p>Packing recommendations are estimates. Always confirm airline baggage rules, destination requirements, weather conditions, lodging details, personal needs, and personal medical needs before traveling.</p>
          <p>No login is required. Saved checklist progress is stored locally on your device so you can refresh the generator page and keep packing from the same browser.</p>
        </div>
      </div>
    </section>
  );
}
