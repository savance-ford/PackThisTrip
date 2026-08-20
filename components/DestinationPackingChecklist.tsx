"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { ChecklistCategory } from "@/components/ChecklistCategory";
import { ProgressBar } from "@/components/ProgressBar";
import { CATEGORY_ORDER } from "@/lib/generatePackingList";
import type { PackingItem } from "@/lib/types";

type DestinationPackingChecklistProps = {
  items: PackingItem[];
  storageKey: string;
};

function getSavedItemIds(storageKey: string, validIds: Set<string>): string[] {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return [];

    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string" && validIds.has(item))
      : [];
  } catch {
    return [];
  }
}

export function DestinationPackingChecklist({ items, storageKey }: DestinationPackingChecklistProps) {
  const localStorageKey = `packthistrip:destination-checklist:${storageKey}`;
  const validIds = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    setCheckedItems(getSavedItemIds(localStorageKey, validIds));
  }, [localStorageKey, validIds]);

  function saveCheckedItems(next: string[]) {
    setCheckedItems(next);

    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(next));
    } catch {
      // The checklist still works for this session when browser storage is unavailable.
    }
  }

  function toggleItem(id: string) {
    const next = checkedItems.includes(id)
      ? checkedItems.filter((itemId) => itemId !== id)
      : [...checkedItems, id];

    saveCheckedItems(next);
  }

  async function copyChecklist() {
    const lines = CATEGORY_ORDER.flatMap((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      if (categoryItems.length === 0) return [];

      return categoryItems.map((item) => {
        const checked = checkedItems.includes(item.id) ? "x" : " ";
        const quantity = item.quantity && item.quantity > 1 ? ` (Qty ${item.quantity})` : "";
        return `[${checked}] ${item.name}${quantity}`;
      });
    });

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyStatus("Checklist copied.");
    } catch {
      setCopyStatus("Copy was unavailable. You can still print the checklist.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between print-hidden">
        <p className="text-sm leading-6 text-slate-600">Check off items as you pack. Progress is saved on this device.</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" variant="secondary" onClick={copyChecklist}>Copy list</Button>
          <Button type="button" variant="secondary" onClick={() => window.print()}>Print</Button>
          <Button type="button" variant="ghost" onClick={() => saveCheckedItems([])}>Reset</Button>
        </div>
      </div>

      <p className="min-h-5 text-sm font-semibold text-emerald-700 print-hidden" role="status" aria-live="polite">
        {copyStatus}
      </p>

      <ProgressBar packedCount={checkedItems.length} totalCount={items.length} />

      <div className="grid gap-5 lg:grid-cols-2 print:block print:space-y-4">
        {CATEGORY_ORDER.map((category) => (
          <ChecklistCategory
            key={category}
            category={category}
            items={items.filter((item) => item.category === category)}
            checkedItems={checkedItems}
            onToggleItem={toggleItem}
          />
        ))}
      </div>
    </div>
  );
}
