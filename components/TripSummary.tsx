import type { TripConfig } from "@/lib/types";

type TripSummaryProps = {
  config: TripConfig;
};

function pretty(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function TripSummary({ config }: TripSummaryProps) {
  const chips = [
    config.month,
    `${config.durationDays} day${config.durationDays === 1 ? "" : "s"}`,
    pretty(config.luggageType),
    pretty(config.travelerType),
    config.hasLaundry ? "Laundry access" : "No laundry access",
    config.packLight ? "Pack light" : "Standard packing",
    config.rainExpected ? "Rain expected" : null,
    config.coldWeather ? "Cold weather" : null,
    config.hotWeather ? "Hot weather" : null
  ].filter(Boolean) as string[];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print-card">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Trip summary</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{config.destinationName}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            {chip}
          </span>
        ))}
      </div>
      {config.tripTypes.length > 0 && (
        <p className="mt-4 text-sm text-slate-600">
          Activities: {config.tripTypes.map(pretty).join(", ")}
        </p>
      )}
    </section>
  );
}
