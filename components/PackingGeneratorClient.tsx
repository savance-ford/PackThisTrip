"use client";

import { useEffect, useState } from "react";
import { PackingChecklist } from "@/components/PackingChecklist";
import { PackingForm } from "@/components/PackingForm";
import { generatePackingList } from "@/lib/generatePackingList";
import { clearSavedChecklist, loadCheckedItems, loadLastSavedAt, loadTripConfig, saveCheckedItems, saveTripConfig } from "@/lib/storage";
import type { PackingItem, TripConfig } from "@/lib/types";

export function PackingGeneratorClient() {
  const [tripConfig, setTripConfig] = useState<TripConfig | null>(null);
  const [items, setItems] = useState<PackingItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [editing, setEditing] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const savedConfig = loadTripConfig();
    const savedChecked = loadCheckedItems();
    const savedAt = loadLastSavedAt();

    if (savedConfig) {
      setTripConfig(savedConfig);
      setItems(generatePackingList(savedConfig));
      setCheckedItems(savedChecked);
      setEditing(false);
      setLastSavedAt(savedAt);
    }

    setLoaded(true);
  }, []);

  function handleSubmit(config: TripConfig) {
    const nextItems = generatePackingList(config);
    const nextIds = new Set(nextItems.map((item) => item.id));
    const relevantCheckedItems = checkedItems.filter((id) => nextIds.has(id));

    setTripConfig(config);
    setItems(nextItems);
    setCheckedItems(relevantCheckedItems);
    setEditing(false);

    saveTripConfig(config);
    saveCheckedItems(relevantCheckedItems);
    setLastSavedAt(loadLastSavedAt());
  }

  function handleToggleItem(id: string) {
    const next = checkedItems.includes(id)
      ? checkedItems.filter((itemId) => itemId !== id)
      : [...checkedItems, id];

    setCheckedItems(next);
    saveCheckedItems(next);
    setLastSavedAt(loadLastSavedAt());
  }

  function handleResetChecklist() {
    setCheckedItems([]);
    saveCheckedItems([]);
    setLastSavedAt(loadLastSavedAt());
  }

  function handleClearAndEdit() {
    clearSavedChecklist();
    setTripConfig(null);
    setItems([]);
    setCheckedItems([]);
    setLastSavedAt(null);
    setEditing(true);
  }

  if (!loaded) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-500">Loading your packing workspace…</p>
      </div>
    );
  }

  if (editing || !tripConfig) {
    return <PackingForm initialConfig={tripConfig} onSubmit={handleSubmit} />;
  }

  return (
    <PackingChecklist
      config={tripConfig}
      items={items}
      checkedItems={checkedItems}
      onToggleItem={handleToggleItem}
      onResetChecklist={handleResetChecklist}
      onClearSavedTrip={handleClearAndEdit}
      onEditDetails={() => setEditing(true)}
      onPrint={() => window.print()}
      lastSavedAt={lastSavedAt}
    />
  );
}
