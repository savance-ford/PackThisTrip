import { Button } from "@/components/Button";
import { ExampleChecklistPreview } from "@/components/ExampleChecklistPreview";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorks } from "@/components/HowItWorks";

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
