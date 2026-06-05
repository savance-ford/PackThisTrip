import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact PackThisTrip for questions, feedback, bug reports, or packing list suggestions.",
  alternates: {
    canonical: "/contact"
  }
};

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">PackThisTrip</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Contact</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
          <p>For questions, feedback, bug reports, or packing list suggestions, email <a href="mailto:hello@packthistrip.com" className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950">hello@packthistrip.com</a>.</p>
          <p>There is no contact form yet. Keeping contact simple helps avoid collecting extra personal information before the product needs it.</p>
        </div>
      </div>
    </section>
  );
}
