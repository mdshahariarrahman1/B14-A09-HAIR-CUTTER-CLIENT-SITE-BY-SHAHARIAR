import Link from "next/link";
import { CalendarCheck, CheckCircle2, Clock3, Scissors, Users, Wallet } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { adminStats, transactions } from "@/components/dashboard/mock-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="Today at HairCutter, at a glance."
        action={
          <Link
            href="/dashboard/admin/services/new"
            className={buttonVariants()}
          >
            Add a service
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat, index) => {
          const Icon = [
            Users,
            Scissors,
            CalendarCheck,
            Clock3,
            CheckCircle2,
            Wallet,
          ][index];
          return <StatCard key={stat.label} {...stat} icon={Icon} />;
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Latest transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} · {item.service}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-semibold">
                    ${item.amount.toFixed(2)}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
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
              href="/dashboard/admin/appointments"
              className={buttonVariants()}
            >
              Manage appointments
            </Link>
            <Link
              href="/dashboard/admin/services"
              className={buttonVariants({ variant: "outline" })}
            >
              Manage services
            </Link>
            <Link
              href="/dashboard/admin/users"
              className={buttonVariants({ variant: "outline" })}
            >
              View customers
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
