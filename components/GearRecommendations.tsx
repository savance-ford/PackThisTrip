import { GearRecommendationCard } from "@/components/GearRecommendationCard";
import { GEAR_RECOMMENDATIONS } from "@/data/gearRecommendations";
import type { PackingItem, TripConfig } from "@/lib/types";

type GearRecommendationsProps = {
  items: PackingItem[];
  tripConfig: TripConfig;
};

function getContextTags(items: PackingItem[], tripConfig: TripConfig) {
  const tags = new Set<string>();

  items.forEach((item) => {
    tags.add(item.id);
    item.tags?.forEach((tag) => tags.add(tag));
  });

  tripConfig.tripTypes.forEach((tripType) => tags.add(tripType));
  tags.add(tripConfig.luggageType);
  tags.add(tripConfig.travelerType);

  if (tripConfig.hotWeather) tags.add("hot");
  if (tripConfig.coldWeather) tags.add("cold");
  if (tripConfig.rainExpected) tags.add("rain");
  if (tripConfig.isInternational) tags.add("international");
  if (tripConfig.durationDays >= 7) tags.add("long-trip");
  if (tripConfig.hasLaundry) tags.add("laundry");

  return tags;
}

export function getGearRecommendations(items: PackingItem[], tripConfig: TripConfig) {
  const contextTags = getContextTags(items, tripConfig);

  return GEAR_RECOMMENDATIONS
    .map((recommendation) => ({
      recommendation,
      score: recommendation.recommendedForTags.filter((tag) => contextTags.has(tag)).length
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.recommendation.name.localeCompare(b.recommendation.name))
    .slice(0, 6)
    .map((match) => match.recommendation);
}

export function GearRecommendations({ items, tripConfig }: GearRecommendationsProps) {
  const recommendations = getGearRecommendations(items, tripConfig);

  if (recommendations.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 print-hidden">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Optional helpful gear</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Gear that fits this checklist context</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Some gear recommendations may contain affiliate links in the future. PackThisTrip only recommends items that fit the checklist context.
        </p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((recommendation) => (
          <GearRecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>
    </section>
  );
}
