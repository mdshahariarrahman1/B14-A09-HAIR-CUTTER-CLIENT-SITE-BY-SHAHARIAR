import Image from "next/image";
import Link from "next/link";
import { Rajdhani, Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function HeroSection() {
  return (
    <section className="relative flex min-h-155 items-center justify-center overflow-hidden text-white lg:h-202.5">
      {/* Background image */}
      <Image
        src="/images/img-71.webp"
        alt="Barber shop interior with a customer looking in the mirror"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <Image
          src="/images/logo-1.webp"
          alt="Barber Shop - Shaves and Cuts, est. 1996"
          width={140}
          height={120}
          className="mb-8 h-auto w-25 sm:w-32.5"
        />

        <h1
          className={cn(
            heading.className,
            "text-6xl font-bold leading-none tracking-wide sm:text-7xl lg:text-[88px]"
          )}
        >
          Haircut &amp; Shaves
        </h1>

        <p
          className={cn(
            body.className,
            "mt-6 max-w-2xl text-base leading-8 sm:text-xl"
          )}
        >
          Enjoy &amp; relax in a luxury barber shop environment Top Cut Hair
          Style with Fancy Tradition
        </p>

        <Link
          href="/services"
          className={cn(
            heading.className,
            "mt-10 inline-flex h-13.5 items-center justify-center bg-[#d98a2b] px-12 text-sm font-bold uppercase tracking-[0.15em] text-[#1a1208] transition-colors hover:bg-[#c07a22]"
          )}
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}