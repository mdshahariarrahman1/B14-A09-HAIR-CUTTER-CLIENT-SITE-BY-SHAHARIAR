"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AppointmentDetailPanel from "@/components/dashboard/AppointmentDetailPanel";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { customerAppointments } from "@/components/dashboard/mock-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const filters = ["All", "Pending", "Confirmed", "Cancelled"] as const;
type Filter = (typeof filters)[number];

export default function CustomerAppointmentsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const rows =
    filter === "All"
      ? customerAppointments
      : customerAppointments.filter((item) => item.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Appointments"
        description="Review your past and upcoming salon visits."
        action={
          <Link href="/services" className={buttonVariants()}>
            Book a new visit
          </Link>
        }
      />

      <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)}>
        <TabsList>
          {filters.map((item) => (
            <TabsTrigger key={item} value={item}>
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="border-primary/20">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No appointments in this category yet.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.image}
                          alt={item.service}
                          width={40}
                          height={40}
                          className="size-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{item.service}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.paymentStatus} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {item.requestedAt}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <details className="relative">
                          <summary
                            className={cn(
                              buttonVariants({ variant: "outline", size: "sm" }),
                              "cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                            )}
                          >
                            Details
                          </summary>
                          <div className="absolute right-0 top-full z-20 mt-2 w-96 rounded-xl border border-border bg-card p-4 shadow-xl">
                            <AppointmentDetailPanel appointment={item} />
                          </div>
                        </details>
                        {item.status === "Pending" && (
                          <button
                            type="button"
                            className={buttonVariants({ variant: "outline", size: "sm" })}
                          >
                            Cancel
                          </button>
                        )}
                        {item.status === "Confirmed" &&
                          item.paymentStatus === "Unpaid" && (
                            <button
                              type="button"
                              className={buttonVariants({ size: "sm" })}
                            >
                              Pay Now
                            </button>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
