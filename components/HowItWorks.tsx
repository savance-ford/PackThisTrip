const steps = [
  ["1", "Tell us your trip", "Choose your destination, month, trip length, luggage type, weather, traveler type, and activities."],
  ["2", "Get a smart checklist", "PackThisTrip applies rule-based packing logic and smart clothing quantity caps."],
  ["3", "Check off items as you pack", "Save your list locally, print it, reset it, or come back later on the same device."]
];

export function HowItWorks() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">How it works</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">A packing list that adapts to the actual trip.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, description]) => (
            <div key={number} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-slate-950">{number}</div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
