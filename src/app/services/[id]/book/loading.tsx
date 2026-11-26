import { TableSkeleton } from "@/components/dashboard/LoadingState";

export default function BookingLoading() {
  return <TableSkeleton rows={4} columns={2} />;
}
