"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Rajdhani, Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

const ORANGE = "#d98a2b";

const usefulLinksLeft = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Blog & News", href: "/blog" },
  { label: "About Us", href: "/about" },
];

const usefulLinksRight = [
  { label: "Contact", href: "/contact" },
  { label: "Members", href: "/members" },
  { label: "Appointments", href: "/appointments" },
  { label: "Gallery Style", href: "/gallery" },
];

const contactInfo = [
  { label: "Phone:", value: "+010 234 789234" },
  { label: "Fax:", value: "+010 435 5798982" },
  { label: "Email:", value: "info@mustachea.com" },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];

// Year is read only on the client, never during prerender.
const subscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);
  return <>{year}</>;
}

function FooterLinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="flex flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex items-center gap-2.5 text-[15px] font-medium text-white transition-colors hover:text-[#d98a2b]"
          >
            <span className="text-xs font-bold">&gt;</span>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function FooterSection() {
  return (
    <footer className={cn(body.className, "text-white")}>
      {/* Top part (solid black, no background image) */}
      <div className="bg-black">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.1fr_1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-20">
          {/* Column 1: logo, text, newsletter, socials */}
          <div>
            <Link href="/" aria-label="HairCutter home">
              <Image
                src="/images/HairCutter-2.png"
                alt="HairCutter Barber Shop"
                width={190}
                height={80}
                className="h-auto w-47.5"
              />
            </Link>

            <p className="mt-5 max-w-sm text-base leading-7 text-white/60">
              Etiam semper nibh orci, ac timcidunt mi consectetur a. In quis
              tortor ex. Morbi cursus sed neque quis dictum.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex h-16.5 max-w-97"
            >
              <input
                type="email"
                required
                placeholder="Enter Your Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-white px-5 text-sm text-black outline-none placeholder:text-black/50"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                style={{ backgroundColor: ORANGE }}
                className="flex w-16 shrink-0 items-center justify-center text-white transition-opacity hover:opacity-90"
              >
                <Send className="size-5" />
              </button>
            </form>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#d98a2b] hover:bg-[#d98a2b] hover:text-[#1a1208]"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: useful links */}
          <div>
            <h3
              className={cn(
                heading.className,
                "text-2xl font-bold uppercase tracking-wide"
              )}
            >
              Useful Links
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-x-6">
              <FooterLinkList links={usefulLinksLeft} />
              <FooterLinkList links={usefulLinksRight} />
            </div>
          </div>

          {/* Column 3: contact */}
          <div>
            <h3
              className={cn(
                heading.className,
                "text-2xl font-bold uppercase tracking-wide"
              )}
            >
              Contact Us
            </h3>

            <dl className="mt-8 flex flex-col gap-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-6 text-[15px]">
                  <dt
                    className={cn(heading.className, "w-14 text-lg font-bold")}
                    style={{ color: ORANGE }}
                  >
                    {item.label}
                  </dt>
                  <dd className="text-white/60">{item.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 text-lg font-medium text-white/90">
              1394 Argonne Street, New Castle, USA
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#1e1e1e] py-4 text-center text-[15px] text-white/60">
        Copyright &copy; <CurrentYear />, Hair Cutter Powered by{" "}
        <Link
          href="http://localhost:3000/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: ORANGE }}
          className="hover:underline"
        >
          Webinane
        </Link>
      </div>
    </footer>
  );
}