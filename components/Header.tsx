import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur print-hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm text-white">PT</span>
          <span>PackThisTrip</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/packing-list-generator" className="hover:text-slate-950">Generator</Link>
          <Link href="/about" className="hover:text-slate-950">About</Link>
          <Link href="/contact" className="hover:text-slate-950">Contact</Link>
        </nav>

        <Link
          href="/packing-list-generator"
          className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
        >
          Build List
        </Link>
      </div>
    </header>
  );
}
