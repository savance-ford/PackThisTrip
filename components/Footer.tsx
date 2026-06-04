import Link from "next/link";

export function Footer() {
  const links = [
    ["Packing List Generator", "/packing-list-generator"],
    ["Carry-On Packing List", "/carry-on-packing-list"],
    ["Beach Vacation Packing List", "/beach-vacation-packing-list"],
    ["International Travel Packing List", "/international-travel-packing-list"],
    ["Family Vacation Packing List", "/family-vacation-packing-list"],
    ["About", "/about"],
    ["Privacy", "/privacy"],
    ["Terms", "/terms"],
    ["Contact", "/contact"]
  ];

  return (
    <footer className="border-t border-slate-200 bg-white print-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-bold text-slate-950">PackThisTrip</p>
          <p className="mt-1 text-sm text-slate-500">Smart packing lists for any trip.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-slate-950">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
