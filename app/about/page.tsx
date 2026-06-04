import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "PackThisTrip is a lightweight travel utility that helps travelers build practical packing checklists based on destination, trip le"
};

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">PackThisTrip</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">About</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
          <p>PackThisTrip is a lightweight travel utility that helps travelers build practical packing checklists based on destination, trip length, luggage type, weather, traveler type, and activities.</p>
        </div>
      </div>
    </section>
  );
}
