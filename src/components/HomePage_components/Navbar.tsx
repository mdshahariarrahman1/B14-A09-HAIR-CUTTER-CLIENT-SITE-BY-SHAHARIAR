"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type UserRole = "customer" | "owner" | "admin";

export interface NavbarUser {
  role: UserRole;
}

interface NavbarProps {
  /** null/undefined = public navbar, object = authenticated navbar */
  user?: NavbarUser | null;
}

interface NavLink {
  label: string;
  href: string;
}

// Public: Sign In ar Sign Up alada button hishebe dekhabe
const publicLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
];

const signInLink: NavLink = { label: "Sign In", href: "/sign-in" };
const signUpLink: NavLink = { label: "Sign Up", href: "/sign-up" };

const dashboardByRole: Record<UserRole, string> = {
  customer: "/dashboard/customer",
  owner: "/dashboard/owner",
  admin: "/dashboard/admin",
};

const getAuthLinks = (role: UserRole): NavLink[] => [
  { label: "Home", href: "/" },
  { label: "Salon Details", href: "/salons" },
  { label: "Dashboard", href: dashboardByRole[role] ?? "/dashboard" },
];

// Orange CTA style (Sign Up button)
const ctaClasses =
  "inline-flex items-center justify-center bg-[#d98a2b] font-bold uppercase tracking-[0.15em] text-[#1a1208] transition-colors hover:bg-[#c07a22]";

// Outline style (Sign In button)
const outlineClasses =
  "inline-flex items-center justify-center border border-[#d98a2b] font-bold uppercase tracking-[0.15em] text-[#d98a2b] transition-colors hover:bg-[#d98a2b] hover:text-[#1a1208]";

export default function Navbar({ user = null }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = user ? getAuthLinks(user.role) : publicLinks;
  const showAuthButtons = !user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <nav className="mx-auto flex h-30 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="HairCutter home">
          <Image
            src="/images/HairCutter-2.png"
            alt="HairCutter Barber Shop"
            width={190}
            height={80}
            priority
            className="h-auto w-37. sm:w-47.5"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-[15px] transition-colors hover:text-[#d98a2b]",
                  isActive(link.href) ? "text-[#d98a2b]" : "text-white"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {showAuthButtons && (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href={signInLink.href}
                className={cn(outlineClasses, "h-15.5 px-8 text-sm")}
              >
                {signInLink.label}
              </Link>
              <Link
                href={signUpLink.href}
                className={cn(ctaClasses, "h-15.5 px-8 text-sm")}
              >
                {signUpLink.label}
              </Link>
            </div>
          )}

          {/* Hamburger (shadcn Button, no asChild) */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-white hover:bg-white/10 hover:text-white lg:hidden">
            <Menu className="size-7" strokeWidth={1.25} />
          </Button>
        </div>
      </nav>

      {/* Drawer (shadcn Sheet, controlled) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-75 border-white/10 bg-[#120d08] text-white"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
          </SheetHeader>

          <ul className="flex flex-col px-4">
            {links.map((link) => (
              <li key={link.href} className="border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-4 text-base transition-colors hover:text-[#d98a2b]",
                    isActive(link.href) && "text-[#d98a2b]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {showAuthButtons && (
            <div className="flex gap-3 px-4 pt-6">
              <Link
                href={signInLink.href}
                onClick={() => setOpen(false)}
                className={cn(outlineClasses, "h-12 flex-1 text-sm")}
              >
                {signInLink.label}
              </Link>
              <Link
                href={signUpLink.href}
                onClick={() => setOpen(false)}
                className={cn(ctaClasses, "h-12 flex-1 text-sm")}
              >
                {signUpLink.label}
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}