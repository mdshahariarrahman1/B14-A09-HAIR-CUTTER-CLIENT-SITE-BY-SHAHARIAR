import PageHeader from "@/components/dashboard/PageHeader";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Your account details and contact information."
      />
      <ProfileForm />
    </div>
  );
}
