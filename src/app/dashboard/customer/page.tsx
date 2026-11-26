import Link from "next/link";
import { Ban, CalendarCheck, Clock3, Scissors } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { customerAppointments, customerStats } from "@/components/dashboard/mock-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="A quick look at your bookings and visits."
        action={
          <Link
            href="/services"
            className={buttonVariants({ variant: "outline" })}
          >
            Browse services
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {customerStats.map((stat, index) => {
          const Icon = [Scissors, Clock3, CalendarCheck, Ban][index];
          return <StatCard key={stat.label} {...stat} icon={Icon} />;
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Recent appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {customerAppointments.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.service}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} · {item.time}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link
              href="/dashboard/customer/appointments"
              className={buttonVariants({ variant: "default" })}
            >
              Manage appointments
            </Link>
            <Link
              href="/dashboard/customer/profile"
              className={buttonVariants({ variant: "outline" })}
            >
              Edit my profile
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
