"use client";

import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { dashboardHome, type DashboardRole } from "./config";

export default function RoleGuard({
  role,
  children,
}: {
  role: DashboardRole;
  children: ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const userRole =
    (session?.user as { role?: string } | undefined)?.role ?? "customer";

  // UI-only guard (as requested): it redirects after hydration but is not a
  // server-side enforcement and can be bypassed by typing a URL directly.
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }
    if (userRole !== role) {
      router.replace(
        dashboardHome[userRole as DashboardRole] ?? dashboardHome.customer
      );
    }
  }, [isPending, session, userRole, role, router]);

  if (isPending) {
    return (
      <div className="space-y-6">
        <Image
          src="/images/HairCutter-2.png"
          alt="HairCutter Barber Shop"
          width={190}
          height={80}
          className="h-10 w-auto object-contain"
        />
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (!session?.user || userRole !== role) {
    return (
      <p className="py-20 text-center text-sm text-muted-foreground">
        Redirecting you to the right place…
      </p>
    );
  }

  return <>{children}</>;
}
