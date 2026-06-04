import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "PackThisTrip provides packing suggestions for general planning purposes. Recommendations are estimates and should be adjusted for "
};

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">PackThisTrip</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Terms of Service</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
          <p>PackThisTrip provides packing suggestions for general planning purposes. Recommendations are estimates and should be adjusted for your airline, lodging, local rules, medical needs, and personal preferences.</p>
        </div>
      </div>
    </section>
  );
}
