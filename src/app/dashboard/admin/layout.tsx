import type { ReactNode } from "react";

import DashboardShell from "@/components/dashboard/DashboardShell";
import RoleGuard from "@/components/dashboard/RoleGuard";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard role="admin">
      <DashboardShell role="admin">{children}</DashboardShell>
    </RoleGuard>
  );
}
