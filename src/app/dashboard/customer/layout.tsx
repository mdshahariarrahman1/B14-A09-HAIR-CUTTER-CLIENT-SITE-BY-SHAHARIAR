import type { ReactNode } from "react";

import DashboardShell from "@/components/dashboard/DashboardShell";
import RoleGuard from "@/components/dashboard/RoleGuard";

export default function CustomerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard role="customer">
      <DashboardShell role="customer">{children}</DashboardShell>
    </RoleGuard>
  );
}
