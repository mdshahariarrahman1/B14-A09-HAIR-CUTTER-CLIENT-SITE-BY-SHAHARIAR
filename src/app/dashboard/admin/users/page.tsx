"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { users } from "@/components/dashboard/mock-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const rows = users.filter((item) =>
    `${item.name} ${item.email}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Users"
        description="See who uses HairCutter and their account status."
      />

      <Card className="border-primary/20">
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users…"
              className="pl-9"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No users match your search.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell className="capitalize">{item.role}</TableCell>
                    <TableCell>{item.joined}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
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
                          <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-border bg-card p-4 text-sm shadow-xl">
                            <p className="font-heading font-semibold">{item.name}</p>
                            <dl className="mt-3 space-y-2 text-xs">
                              <div>
                                <dt className="text-muted-foreground">User ID</dt>
                                <dd>{item.id}</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>{item.email}</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>{item.phone}</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Joined</dt>
                                <dd>{item.joined}</dd>
                              </div>
                            </dl>
                          </div>
                        </details>
                        <button
                          type="button"
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          {item.status === "Blocked" ? "Unblock" : "Block"}
                        </button>
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
