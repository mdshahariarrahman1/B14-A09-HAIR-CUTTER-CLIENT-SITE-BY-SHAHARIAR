"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/HomePage_components/Navbar";

export default function SiteNavbar() {
  const pathname = usePathname();

  // The homepage keeps its own transparent overlay navbar over the hero.
  if (pathname === "/") return null;

  return <Navbar variant="solid" />;
}
