"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  dashboardHome,
  type DashboardRole,
} from "@/components/dashboard/config";
import { useSession } from "@/lib/auth-client";

export default function DashboardIndex() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    const role =
      ((session?.user as { role?: string } | undefined)?.role ??
        "customer") as DashboardRole;
    router.replace(dashboardHome[role] ?? dashboardHome.customer);
  }, [isPending, session, router]);

  return (
    <div className="dashboard-scope flex min-h-screen flex-col items-center justify-center gap-4 bg-background font-body text-sm text-muted-foreground">
      <Image
        src="/images/HairCutter-2.png"
        alt="HairCutter Barber Shop"
        width={190}
        height={80}
        className="h-12 w-auto object-contain"
      />
      <p>Opening your dashboard…</p>
    </div>
  );
}
