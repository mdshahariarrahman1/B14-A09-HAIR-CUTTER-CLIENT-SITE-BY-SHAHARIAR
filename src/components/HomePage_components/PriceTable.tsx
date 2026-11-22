import type { ComponentType, SVGProps } from "react";
import { Scissors } from "lucide-react";
import { Roboto, Teko } from "next/font/google";

import { cn } from "@/lib/utils";

const heading = Teko({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

type IconProps = SVGProps<SVGSVGElement>;

const DARK = "#3e464a";
const ORANGE = "#c8742a";

/* ---------- Inline SVG icons (no image files needed) ---------- */

function ShaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="priceShaveBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8e6d0" />
          <stop offset="1" stopColor="#eccaa4" />
        </linearGradient>
      </defs>

      {/* Circle background */}
      <path
        style={{ fill: "url(#priceShaveBg)" }}
        d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z"
      />
      <circle
        cx="256"
        cy="256"
        r="244"
        fill="none"
        stroke={DARK}
        strokeWidth="24"
      />

      {/* Beard */}
      <path
        d="M116 196 C112 300 170 400 256 420 C342 400 400 300 396 196 C370 212 340 212 320 196 L192 196 C172 212 142 212 116 196 Z"
        fill={ORANGE}
        stroke={DARK}
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Face */}
      <path
        d="M184 236 C184 300 216 346 256 356 C296 346 328 300 328 236 Z"
        fill="#f3d3b0"
        stroke={DARK}
        strokeWidth="12"
        strokeLinejoin="round"
      />

      {/* Mustache */}
      <path
        d="M146 232 C186 190 236 210 256 238 C276 210 326 190 366 232 C344 280 292 268 256 264 C220 268 168 280 146 232 Z"
        fill={ORANGE}
        stroke={DARK}
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Mouth */}
      <path
        d="M226 312 Q256 330 286 312"
        fill="none"
        stroke={DARK}
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HairCutIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="priceJarBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfb28d" />
          <stop offset="1" stopColor="#c68a60" />
        </linearGradient>
        <linearGradient id="priceJarLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6c0a0" />
          <stop offset="1" stopColor="#d7a47c" />
        </linearGradient>
      </defs>

      {/* Cream on top */}
      <path
        d="M130 176 C124 112 196 84 262 96 C330 78 392 118 384 176 Z"
        fill="#fbf0e6"
        stroke={DARK}
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Jar body */}
      <rect
        x="84"
        y="214"
        width="344"
        height="200"
        rx="26"
        fill="url(#priceJarBody)"
        stroke={DARK}
        strokeWidth="16"
      />

      {/* Lid */}
      <rect
        x="64"
        y="164"
        width="384"
        height="56"
        rx="16"
        fill="url(#priceJarLid)"
        stroke={DARK}
        strokeWidth="16"
      />

      {/* Mustache */}
      <path
        d="M166 318 C196 288 240 298 256 322 C272 298 316 288 346 318 C328 356 284 348 256 344 C228 348 184 356 166 318 Z"
        fill={ORANGE}
        stroke={DARK}
        strokeWidth="12"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScissorsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="priceScissorsBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8e6d0" />
          <stop offset="1" stopColor="#eccaa4" />
        </linearGradient>
      </defs>

      {/* Circle background */}
      <path
        style={{ fill: "url(#priceScissorsBg)" }}
        d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z"
      />
      <circle
        cx="256"
        cy="256"
        r="244"
        fill="none"
        stroke={DARK}
        strokeWidth="24"
      />

      {/* Blades */}
      <g stroke={DARK} strokeLinecap="round" strokeLinejoin="round">
        <line x1="222" y1="98" x2="296" y2="328" strokeWidth="24" />
        <line x1="290" y1="98" x2="216" y2="328" strokeWidth="24" />
      </g>

      {/* Handles */}
      <circle
        cx="306"
        cy="362"
        r="32"
        fill="none"
        stroke={DARK}
        strokeWidth="18"
      />
      <circle
        cx="206"
        cy="362"
        r="32"
        fill="none"
        stroke={DARK}
        strokeWidth="18"
      />
    </svg>
  );
}

/* ---------- Data ---------- */

type PriceItem = {
  name: string;
  description: string;
  price: string;
};

type PriceCard = {
  title: string;
  Icon: ComponentType<IconProps>;
  featured?: boolean;
  items: PriceItem[];
};

const description = "Hair and beard cuttting expert";

const cards: PriceCard[] = [
  {
    title: "Shave Style",
    Icon: ShaveIcon,
    items: [
      { name: "Haircut with Fade", description, price: "$50.00" },
      { name: "Haircut with Fade", description, price: "$50.00" },
      { name: "Haircut with Fade", description, price: "$50.00" },
    ],
  },
  {
    title: "HAIR CUT",
    Icon: HairCutIcon,
    featured: true,
    items: [
      { name: "Haircut with Fade", description, price: "$50.00" },
      { name: "Haircut with Fade", description, price: "$50.00" },
      { name: "Haircut with Fade", description, price: "$50.00" },
    ],
  },
  {
    title: "SPA & HEALTH",
    Icon: ScissorsIcon,
    items: [
      { name: "Relax with us today", description, price: "$50.00" },
      { name: "Custom Service", description, price: "$50.00" },
      { name: "Haircut with Fade", description, price: "$50.00" },
    ],
  },
];

function Dots() {
  return (
    <div className="mt-2.5 flex justify-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="size-1 rounded-full bg-[#d9d9d9]" />
      ))}
    </div>
  );
}

export default function PriceTable() {
  return (
    <section
      className={cn(body.className, "bg-white px-6 pb-24 pt-20 text-[#333]")}
    >
      {/* Section heading */}
      <div className="flex flex-col items-center text-center">
        <h2
          className={cn(
            heading.className,
            "text-[56px] font-bold uppercase leading-none tracking-wide text-[#333]",
          )}
        >
          Price Table
        </h2>

        <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.3em] text-[#d98a2b]">
          Get your beard
        </p>

        <div className="mt-2.5 flex w-52.5 items-center gap-2">
          <span className="h-px flex-1 bg-[#e5e5e5]" />
          <Scissors className="size-4 -rotate-90 text-[#333]" />
          <span className="h-px flex-1 bg-[#e5e5e5]" />
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-10 grid max-w-280 gap-3.25 md:grid-cols-3">
        {cards.map(({ title, Icon, featured, items }) => (
          <div
            key={title}
            className={cn(
              "border border-[#d98a2b] bg-white px-10 pb-10 pt-14 text-center",
              "transition-transform duration-500 hover:-translate-y-2",
              featured &&
                "shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
            )}
          >
            <Icon className="mx-auto size-22.5" />

            <h3
              className={cn(
                heading.className,
                "mt-7 text-[32px] font-semibold leading-none text-[#333]",
              )}
            >
              {title}
            </h3>

            <div className="mt-6">
              {items.map((item, index) => (
                <div key={index} className={cn(index > 0 && "mt-4")}>
                  <h4
                    className={cn(
                      heading.className,
                      "text-[22px] font-semibold leading-7 text-[#333]",
                    )}
                  >
                    {item.name}
                  </h4>

                  <p className="mt-1 text-[14px] font-light leading-6 text-[#888]">
                    {item.description}
                  </p>

                  <p
                    className={cn(
                      heading.className,
                      "mt-2 text-[28px] font-semibold leading-9 text-[#d98a2b]",
                    )}
                  >
                    {item.price}
                  </p>

                  {index < items.length - 1 && <Dots />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}