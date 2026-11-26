import PageHeader from "@/components/dashboard/PageHeader";
import ServiceForm from "@/components/dashboard/ServiceForm";

export default function AdminServiceFormPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Service"
        description="Create a new service for your salon."
      />
      <ServiceForm idPrefix="add" />
    </div>
  );
}
