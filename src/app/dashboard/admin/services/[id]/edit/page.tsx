import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "@/components/dashboard/ServiceForm";
import {
  toDashboardService,
  type DashboardService,
  type ServiceDoc,
} from "@/components/dashboard/service-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let service: DashboardService | undefined;
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/services`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data: ServiceDoc[] = await res.json();
      service = data.map(toDashboardService).find((item) => item.id === id);
    }
  } catch (error) {
    console.error("Failed to load service:", error);
  }

  if (!service) {
    return (
      <div className="space-y-6">
        <PageHeader title="Service not found" description="This service does not exist." />
        <Card className="border-primary/20">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <p>The requested service could not be found.</p>
            <Link
              href="/dashboard/admin/services"
              className={buttonVariants({ variant: "outline", className: "mt-6" })}
            >
              <ArrowLeft className="size-4" /> Back to Manage Services
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Service"
        description={`Update the details for ${service.name}.`}
        action={
          <Link
            href="/dashboard/admin/services"
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeft className="size-4" /> Back to Manage Services
          </Link>
        }
      />
      <ServiceForm initialService={service} idPrefix="edit" />
    </div>
  );
}
