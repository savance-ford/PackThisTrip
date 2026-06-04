import Link from "next/link";
import { Button } from "@/components/Button";
import { TripSummary } from "@/components/TripSummary";
import { CATEGORY_LABELS, CATEGORY_ORDER, generatePackingList } from "@/lib/generatePackingList";
import type { PackingCategory, PackingItem, TripConfig } from "@/lib/types";
import type { RelatedLink } from "@/data/seoPackingListPages";

type SeoPackingListPageProps = {
  title: string;
  description: string;
  intro: string;
  tripConfig: TripConfig;
  tips: string[];
  relatedLinks: RelatedLink[];
};

function groupedItems(items: PackingItem[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category)
  })).filter((group): group is { category: PackingCategory; items: PackingItem[] } => group.items.length > 0);
}

export function SeoPackingListPage({
  title,
  description,
  intro,
  tripConfig,
  tips,
  relatedLinks
}: SeoPackingListPageProps) {
  const items = generatePackingList(tripConfig);
  const groups = groupedItems(items);

  return (
    <article className="bg-slate-50">
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Packing list</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
          <p className="mt-5 max-w-3xl leading-8 text-slate-700">{intro}</p>
          <div className="mt-8">
            <Button href="/packing-list-generator">Customize this packing list</Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8">
            <TripSummary config={tripConfig} />

            <section>
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Generated checklist</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">What to pack</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  This checklist is generated from the trip assumptions above. Adjust it for your airline rules, lodging, planned activities, medical needs, and personal preferences.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {groups.map(({ category, items: categoryItems }) => (
                  <section key={category} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                      <h3 className="font-black text-slate-950">{CATEGORY_LABELS[category]}</h3>
                      <span className="text-xs font-bold text-slate-500">{categoryItems.length} items</span>
                    </div>
                    <ul className="divide-y divide-slate-100">
                      {categoryItems.map((item) => (
                        <li key={item.id} className="p-4">
                          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-950">
                            <span>{item.name}</span>
                            {item.quantity && item.quantity > 1 ? (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-600">Qty {item.quantity}</span>
                            ) : null}
                            {item.optional ? (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-black text-amber-700">Optional</span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{item.reason}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black tracking-tight text-slate-950">Packing tips</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {tips.map((tip) => (
                  <li key={tip} className="border-l-2 border-slate-200 pl-3">{tip}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black tracking-tight text-slate-950">Related pages</h2>
              <nav className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                {relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </section>
          </aside>
        </div>
      </section>
    </article>
  );
}
