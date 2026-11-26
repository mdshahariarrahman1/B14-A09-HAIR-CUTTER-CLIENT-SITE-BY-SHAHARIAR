import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "@/components/dashboard/ServiceForm";
import { services } from "@/components/dashboard/mock-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = services.find((item) => item.id === id);

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
