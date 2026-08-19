import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const siteUrl = "https://packthistrip.com";

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString()
    }))
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const current = index === items.length - 1;

            return (
              <li key={item.href} className="flex min-w-0 items-center gap-2">
                {index > 0 ? <span aria-hidden="true" className="text-slate-400">/</span> : null}
                {current ? (
                  <span aria-current="page" className="truncate font-semibold text-slate-950">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="rounded-sm font-semibold transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
