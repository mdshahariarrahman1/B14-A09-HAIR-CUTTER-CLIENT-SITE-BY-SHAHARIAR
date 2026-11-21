"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { Rajdhani, Roboto } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

const heading = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });
const body = Roboto({ subsets: ["latin"], weight: ["400"] });

export type UserRole = "customer" | "owner" | "admin";

interface NavLink {
  label: string;
  href: string;
}

// Public links (logged out)
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

/* -------------------------------------------------------------------------- */
/*                                  User menu                                 */
/* -------------------------------------------------------------------------- */

interface UserMenuProps {
  name: string;
  email?: string;
  image?: string | null;
  dashboardHref: string;
  onSignOut: () => void;
}

function UserMenu({
  name,
  email,
  image,
  dashboardHref,
  onSignOut,
}: UserMenuProps) {
  const router = useRouter();

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          heading.className,
          "flex items-center gap-2 rounded-full border border-[#e9dfcc] bg-[#fbf6ec] py-1.5 pl-1.5 pr-4 text-[#1a1208] outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#d98a2b]"
        )}
      >
        <Avatar className="size-10">
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback className="bg-[#d98a2b] font-bold text-[#1a1208]">
            {initials || "U"}
          </AvatarFallback>
        </Avatar>
        <span className="hidden max-w-30 truncate text-base font-bold sm:block">
          {name}
        </span>
        <ChevronDown className="size-4 text-[#1a1208]/60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          body.className,
          "w-56 border-white/10 bg-[#120d08] text-white"
        )}
      >
        {/* User name */}
        <div className="px-2 py-2">
          <p className={cn(heading.className, "truncate text-sm font-bold")}>
            {name}
          </p>
          {email && (
            <p className="truncate text-xs text-white/50">{email}</p>
          )}
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        {/* Dashboard */}
        <DropdownMenuItem
          onClick={() => router.push(dashboardHref)}
          className="cursor-pointer focus:bg-white/10 focus:text-[#d98a2b]"
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </DropdownMenuItem>

        {/* Sign out */}
        <DropdownMenuItem
          onClick={onSignOut}
          className="cursor-pointer text-red-400 focus:bg-white/10 focus:text-red-400"
        >
          <LogOut className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const sessionUser = session?.user;

  const role = ((sessionUser as { role?: UserRole } | undefined)?.role ??
    "customer") as UserRole;

  const links = sessionUser ? getAuthLinks(role) : publicLinks;
  const showAuthButtons = !sessionUser && !isPending; // loading er somoy flash hobe na
  const dashboardHref = dashboardByRole[role] ?? "/dashboard";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(body.className, "absolute inset-x-0 top-0 z-50 text-white")}
    >
      <nav className="mx-auto flex h-30 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="HairCutter home">
          <Image
            src="/images/HairCutter-2.png"
            alt="HairCutter Barber Shop"
            width={190}
            height={80}
            priority
            className="h-auto w-37.5 sm:w-47.5"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  heading.className,
                  "text-[15px] font-semibold uppercase tracking-wider transition-colors hover:text-[#d98a2b]",
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
          {/* Logged out: Sign In / Sign Up */}
          {showAuthButtons && (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href={signInLink.href}
                className={cn(
                  heading.className,
                  outlineClasses,
                  "h-15.5 px-8 text-sm"
                )}
              >
                {signInLink.label}
              </Link>
              <Link
                href={signUpLink.href}
                className={cn(
                  heading.className,
                  ctaClasses,
                  "h-15.5 px-8 text-sm"
                )}
              >
                {signUpLink.label}
              </Link>
            </div>
          )}

          {/* Logged in: Avatar + Profile dropdown */}
          {sessionUser && (
            <UserMenu
              name={sessionUser.name}
              email={sessionUser.email}
              image={sessionUser.image}
              dashboardHref={dashboardHref}
              onSignOut={handleSignOut}
            />
          )}

          {/* Hamburger */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu className="size-7" strokeWidth={1.25} />
          </Button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className={cn(
            body.className,
            "w-75 border-white/10 bg-[#120d08] text-white"
          )}
        >
          <SheetHeader>
            <SheetTitle className={cn(heading.className, "text-white")}>
              Menu
            </SheetTitle>
          </SheetHeader>

          <ul className="flex flex-col px-4">
            {links.map((link) => (
              <li key={link.href} className="border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    heading.className,
                    "block py-4 text-base font-semibold uppercase tracking-wider transition-colors hover:text-[#d98a2b]",
                    isActive(link.href) && "text-[#d98a2b]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Drawer: logged out */}
          {showAuthButtons && (
            <div className="flex gap-3 px-4 pt-6">
              <Link
                href={signInLink.href}
                onClick={() => setOpen(false)}
                className={cn(
                  heading.className,
                  outlineClasses,
                  "h-12 flex-1 text-sm"
                )}
              >
                {signInLink.label}
              </Link>
              <Link
                href={signUpLink.href}
                onClick={() => setOpen(false)}
                className={cn(
                  heading.className,
                  ctaClasses,
                  "h-12 flex-1 text-sm"
                )}
              >
                {signUpLink.label}
              </Link>
            </div>
          )}

          {/* Drawer: logged in */}
          {sessionUser && (
            <div className="px-4 pt-6">
              <Button
                type="button"
                onClick={handleSignOut}
                className={cn(
                  heading.className,
                  outlineClasses,
                  "h-12 w-full rounded-none bg-transparent text-sm"
                )}
              >
                Sign Out
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}