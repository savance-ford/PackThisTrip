import type { PackingCategory, PackingItem } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/generatePackingList";

type ChecklistCategoryProps = {
  category: PackingCategory;
  items: PackingItem[];
  checkedItems: string[];
  onToggleItem: (id: string) => void;
};

export function ChecklistCategory({ category, items, checkedItems, onToggleItem }: ChecklistCategoryProps) {
  if (items.length === 0) return null;

  const packed = items.filter((item) => checkedItems.includes(item.id)).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print-card">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h3 className="font-black text-slate-950">{CATEGORY_LABELS[category]}</h3>
        <span className="text-xs font-bold text-slate-500">{packed}/{items.length}</span>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const checked = checkedItems.includes(item.id);
          const inputId = `packing-item-${item.id}`;

          return (
            <label key={item.id} htmlFor={inputId} className={`flex cursor-pointer gap-4 p-4 transition hover:bg-slate-50 ${checked ? "bg-slate-50/70" : ""}`}>
              <input
                id={inputId}
                type="checkbox"
                checked={checked}
                onChange={() => onToggleItem(item.id)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
              />
              <span className="min-w-0 flex-1">
                <span className={`flex flex-wrap items-center gap-2 text-sm font-bold ${checked ? "text-slate-400 line-through" : "text-slate-950"}`}>
                  {item.name}
                  {item.quantity && item.quantity > 1 ? (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-600 no-underline">Qty {item.quantity}</span>
                  ) : null}
                  {item.optional ? (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700 no-underline">Optional</span>
                  ) : null}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{item.reason}</span>
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
