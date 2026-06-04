import type { Metadata } from "next";
import { PackingGeneratorClient } from "@/components/PackingGeneratorClient";

export const metadata: Metadata = {
  title: "Packing List Generator",
  description: "Create a personalized packing checklist for any trip, destination, season, and activity."
};

export default function PackingListGeneratorPage() {
  return (
    <section className="bg-slate-50 py-10 md:py-16 print:bg-white print:py-0">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <PackingGeneratorClient />
      </div>
    </section>
  );
}
