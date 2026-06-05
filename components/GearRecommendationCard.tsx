import type { GearRecommendation } from "@/data/gearRecommendations";

type GearRecommendationCardProps = {
  recommendation: GearRecommendation;
};

export function GearRecommendationCard({ recommendation }: GearRecommendationCardProps) {
  return (
    <a
      href={recommendation.placeholderUrl}
      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{recommendation.category}</p>
      <h3 className="mt-2 text-base font-black tracking-tight text-slate-950">{recommendation.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{recommendation.description}</p>
      <p className="mt-3 text-xs leading-5 text-slate-500">{recommendation.disclosureNote}</p>
    </a>
  );
}
