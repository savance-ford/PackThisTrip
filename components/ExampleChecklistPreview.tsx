const preview = [
  ["Clothing", "T-shirts", "Underwear", "Comfortable walking shoes"],
  ["Documents", "Passport", "Boarding pass", "Document copies"],
  ["Electronics", "Phone charger", "Universal power adapter", "Portable charger"],
  ["Weather", "Packable rain jacket", "Sunglasses", "Sun hat"],
  ["Travel Gear", "Packing cubes", "Laundry bag", "Luggage tag"]
];

export function ExampleChecklistPreview() {
  return (
    <section id="example-checklist" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Example checklist</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Readable, practical, and easy to scan.</h2>
          <p className="mt-3 text-slate-600">The real generator creates a custom version based on destination, weather, luggage type, duration, traveler type, and activities.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {preview.map(([category, ...items]) => (
            <div key={category} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-950">{category}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="h-4 w-4 rounded border border-slate-300" />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
