import Link from "next/link";

import PageHeader from "@/components/dashboard/PageHeader";
import ServicesTable from "@/components/dashboard/ServicesTable";
import {
  toDashboardService,
  type DashboardService,
  type ServiceDoc,
} from "@/components/dashboard/service-data";
import { buttonVariants } from "@/components/ui/button";

export default async function AdminServicesPage() {
  let rows: DashboardService[] = [];

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/services`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data: ServiceDoc[] = await res.json();
      rows = data.map(toDashboardService);
    }
  } catch (error) {
    console.error("Failed to load services:", error);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Services"
        description="Review the services offered at your salon."
        action={
          <Link
            href="/dashboard/admin/services/new"
            className={buttonVariants()}
          >
            Add service
          </Link>
        }
      />

      <ServicesTable services={rows} />
    </div>
  );
}
