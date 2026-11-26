import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
  ReceiptText,
  Scissors,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "customer" | "admin";

export const dashboardHome: Record<DashboardRole, string> = {
  customer: "/dashboard/customer",
  admin: "/dashboard/admin",
};

export type DashboardLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const dashboardLinks: Record<DashboardRole, DashboardLink[]> = {
  customer: [
    {
      label: "Overview",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      label: "My Appointments",
      href: "/dashboard/customer/appointments",
      icon: CalendarDays,
    },
    {
      label: "My Profile",
      href: "/dashboard/customer/profile",
      icon: UserRound,
    },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    {
      label: "Manage Services",
      href: "/dashboard/admin/services",
      icon: Scissors,
    },
    {
      label: "Add Service",
      href: "/dashboard/admin/services/new",
      icon: PlusCircle,
    },
    {
      label: "Manage Appointments",
      href: "/dashboard/admin/appointments",
      icon: ClipboardList,
    },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: ReceiptText,
    },
    { label: "My Profile", href: "/dashboard/admin/profile", icon: UserRound },
  ],
};

export const dashboardLabels: Record<DashboardRole, string> = {
  customer: "Customer Dashboard",
  admin: "Admin Dashboard",
};
