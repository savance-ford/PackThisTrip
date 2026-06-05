import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PackThisTrip does not require an account and stores saved checklist data locally on your own device.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">PackThisTrip</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
          <p>PackThisTrip does not require an account and does not use a database in this MVP. Saved checklist data is stored locally on your own device through browser localStorage.</p>
        </div>
      </div>
    </section>
  );
}
