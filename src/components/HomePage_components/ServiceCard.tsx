'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Roboto, Teko } from "next/font/google";

import { cn } from "@/lib/utils";

const heading = Teko({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export type Service = {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  shortDescription: string;
  image: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        body.className,
        "group flex h-full flex-col overflow-hidden rounded-xl border border-[#d98a2b] bg-white",
        "transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
      )}
    >
      {/* Service image + category */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#f3e4d0]">
        {service.image && (
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <span className="absolute left-4 top-4 bg-[#d98a2b] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1208]">
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={cn(
            heading.className,
            "text-[28px] font-semibold leading-8 text-[#333]",
          )}
        >
          {service.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span
            className={cn(
              heading.className,
              "text-[28px] font-semibold leading-9 text-[#d98a2b]",
            )}
          >
            ${service.price.toFixed(2)}
          </span>

          <span className="flex items-center gap-1.5 text-sm text-[#888]">
            <Clock className="size-4" />
            {service.duration}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-[14px] font-light leading-6 text-[#888]">
          {service.shortDescription}
        </p>

        <Link
          href={`/services/${service.id}`}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#d98a2b] text-base font-semibold text-[#1a1208] transition hover:bg-[#c07a22]"
        >
          View Details
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </article>
  );
}