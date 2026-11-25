"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock, Search } from "lucide-react";

import { cn } from "@/lib/utils";

export type BrowseService = {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  shortDescription: string;
  image: string;
  createdAt: number;
};

type Sort = "newest" | "price-asc" | "price-desc";

const PAGE_SIZE = 9;

const field =
  "h-11 rounded-xl border border-[#eee6df] bg-[#fdfbf9] px-4 text-sm text-[#3a2a2e] outline-none transition focus:border-[#d98a2b]";

export default function ServicesBrowser({
  services,
  headingClassName,
}: {
  services: BrowseService[];
  headingClassName?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))).sort(),
    [services],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = services.filter(
      (s) =>
        (category === "all" || s.category === category) &&
        (!q || s.name.toLowerCase().includes(q)),
    );

    return list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.createdAt - a.createdAt;
    });
  }, [services, query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-3 rounded-3xl border border-[#eee6df] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(60,30,40,0.25)] md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8a7d80]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search services by name..."
            className={cn(field, "w-full pl-11")}
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className={cn(field, "md:w-52")}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as Sort);
            setPage(1);
          }}
          className={cn(field, "md:w-52")}
        >
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      {/* Result meta */}
      <div className="mt-8 flex items-center justify-between text-xs text-[#8a7d80]">
        <span>
          {filtered.length === 0
            ? "Showing 0 of 0"
            : `Showing ${start + 1}–${start + visible.length} of ${filtered.length}`}
        </span>
        <span>
          Page {current} of {totalPages}
        </span>
      </div>

      {/* Cards */}
      {visible.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <article
              key={s.id}
              className="overflow-hidden rounded-2xl border border-[#f0e9e2] bg-[#fdfbf9] shadow-[0_12px_30px_-18px_rgba(60,30,40,0.35)]"
            >
              <div className="relative aspect-4/3 bg-[#efe7df]">
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d98a2b]">
                  {s.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={cn(
                      headingClassName,
                      "text-2xl font-semibold uppercase tracking-wide text-[#333]",
                    )}
                  >
                    {s.name}
                  </h3>
                  <span
                    className={cn(headingClassName, "text-2xl font-semibold text-[#d98a2b]")}
                  >
                    ${s.price.toFixed(2)}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-[#6f6266]">
                  {s.shortDescription}
                </p>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-[#6f6266]">
                  <Clock className="size-3.5 text-[#d98a2b]" />
                  {s.duration}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#eee6df] pt-5">
                  <span className="text-xs text-[#8a7d80]">At the salon</span>
                  <Link
                    href={`/services/${s.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#e3d9d0] bg-white px-5 py-2.5 text-xs font-medium text-[#333] transition hover:border-[#d98a2b] hover:bg-[#d98a2b] hover:text-white"
                  >
                    View details <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-[#8a7d80]">
          No services match your search.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={cn(
                "size-10 rounded-full border text-sm transition",
                n === current
                  ? "border-[#2b1d21] bg-[#2b1d21] text-white"
                  : "border-[#e3d9d0] bg-white text-[#3a2a2e] hover:border-[#2b1d21]",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}