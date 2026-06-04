import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "For questions, feedback, or bug reports, contact the PackThisTrip team using the contact email you choose to publish for the domai"
};

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">PackThisTrip</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Contact</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
          <p>For questions, feedback, or bug reports, contact the PackThisTrip team using the contact email you choose to publish for the domain.</p>
        </div>
      </div>
    </section>
  );
}
