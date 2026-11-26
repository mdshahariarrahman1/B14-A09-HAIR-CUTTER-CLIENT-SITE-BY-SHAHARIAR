import { Badge } from "@/components/ui/badge";

const tones: Record<string, string> = {
  Pending: "border-primary/25 bg-primary/10 text-primary",
  Confirmed: "border-[#2f6b4f]/25 bg-[#2f6b4f]/10 text-[#2f6b4f]",
  Cancelled: "border-destructive/25 bg-destructive/10 text-destructive",
  Unpaid: "border-destructive/25 bg-destructive/10 text-destructive",
  Paid: "border-[#2f6b4f]/25 bg-[#2f6b4f]/10 text-[#2f6b4f]",
  Active: "border-[#2f6b4f]/25 bg-[#2f6b4f]/10 text-[#2f6b4f]",
  Inactive: "border-border bg-muted text-muted-foreground",
  Blocked: "border-destructive/25 bg-destructive/10 text-destructive",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={tones[status] ?? tones.Inactive}>
      {status}
    </Badge>
  );
}
