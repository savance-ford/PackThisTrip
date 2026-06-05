import { CATEGORY_ORDER } from "@/lib/generatePackingList";
import type { PackingItem, TripConfig } from "@/lib/types";
import { ChecklistCategory } from "@/components/ChecklistCategory";
import { GearRecommendations } from "@/components/GearRecommendations";
import { ProgressBar } from "@/components/ProgressBar";
import { TripSummary } from "@/components/TripSummary";
import { Button } from "@/components/Button";

type PackingChecklistProps = {
  config: TripConfig;
  items: PackingItem[];
  checkedItems: string[];
  onToggleItem: (id: string) => void;
  onResetChecklist: () => void;
  onClearSavedTrip: () => void;
  onEditDetails: () => void;
  onPrint: () => void;
  lastSavedAt: string | null;
};

export function PackingChecklist({
  config,
  items,
  checkedItems,
  onToggleItem,
  onResetChecklist,
  onClearSavedTrip,
  onEditDetails,
  onPrint,
  lastSavedAt
}: PackingChecklistProps) {
  const checkedCount = items.filter((item) => checkedItems.includes(item.id)).length;
  const lastSavedLabel = lastSavedAt
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastSavedAt))
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-slate-950 p-6 text-white shadow-soft md:flex-row md:items-end md:justify-between print-hidden">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">Your checklist</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{config.destinationName} packing list</h1>
          <p className="mt-2 text-sm text-slate-300">Generated from your trip details. Check items off as you pack.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onPrint}>Print checklist</Button>
          <Button variant="secondary" onClick={onEditDetails}>Edit trip details</Button>
          <Button variant="ghost" onClick={onResetChecklist} className="text-white hover:bg-white/10">Reset checklist</Button>
          <Button variant="ghost" onClick={onClearSavedTrip} className="text-white hover:bg-white/10">Clear saved trip</Button>
        </div>
      </div>

      <TripSummary config={config} />

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950 print-hidden">
        <p className="font-bold">Saved on this device</p>
        <p className="mt-1">{lastSavedLabel ? `Last saved ${lastSavedLabel}.` : "Your checklist is saved locally in this browser as you update it."}</p>
      </div>

      <ProgressBar packedCount={checkedCount} totalCount={items.length} />

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950 print-hidden">
        Packing recommendations are estimates. Always confirm airline baggage rules, destination requirements, weather conditions, and personal medical needs before traveling.
      </div>

      <div className="grid gap-5 lg:grid-cols-2 print:block print:space-y-4">
        {CATEGORY_ORDER.map((category) => (
          <ChecklistCategory
            key={category}
            category={category}
            items={items.filter((item) => item.category === category)}
            checkedItems={checkedItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>

      <GearRecommendations items={items} tripConfig={config} />
    </div>
  );
}
