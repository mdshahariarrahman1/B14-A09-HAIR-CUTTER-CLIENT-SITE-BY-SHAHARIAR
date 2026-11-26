"use client";

import Image from "next/image";
import { useState } from "react";

import AppointmentDetailPanel from "@/components/dashboard/AppointmentDetailPanel";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { appointments } from "@/components/dashboard/mock-data";
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

export default function AdminAppointmentsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const rows =
    filter === "All"
      ? appointments
      : appointments.filter((item) => item.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Appointments"
        description="Review and manage every booking request at the salon."
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date &amp; time</TableHead>
                  <TableHead>Message</TableHead>
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
                      colSpan={10}
                      className="py-12 text-center text-muted-foreground"
                    >
                      No appointments in this category.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <p>{item.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.customerEmail}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.service}
                            width={40}
                            height={40}
                            className="size-10 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="font-medium">{item.service}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p>{item.date}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </TableCell>
                      <TableCell className="max-w-40 text-xs text-muted-foreground">
                        {item.message ?? "—"}
                      </TableCell>
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
                              <AppointmentDetailPanel
                                appointment={item}
                                showCustomer
                              />
                            </div>
                          </details>
                          {item.status === "Pending" && (
                            <button
                              type="button"
                              className={buttonVariants({ size: "sm" })}
                            >
                              Confirm
                            </button>
                          )}
                          {(item.status === "Pending" ||
                            item.status === "Confirmed") && (
                            <button
                              type="button"
                              className={buttonVariants({ variant: "outline", size: "sm" })}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
