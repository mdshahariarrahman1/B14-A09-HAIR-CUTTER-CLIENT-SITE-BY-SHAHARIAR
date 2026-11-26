import PageHeader from "@/components/dashboard/PageHeader";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function CustomerProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Keep your contact details up to date."
      />
      <ProfileForm />
    </div>
  );
}
