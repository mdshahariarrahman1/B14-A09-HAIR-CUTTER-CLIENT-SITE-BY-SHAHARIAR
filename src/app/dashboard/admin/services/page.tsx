"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import { services } from "@/components/dashboard/mock-data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminServicesPage() {
  const [query, setQuery] = useState("");
  const rows = services.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Services"
        description="Review the services offered at your salon."
        action={
          <Link
            href="/dashboard/admin/services/new"
            className={buttonVariants()}
          >
            Add service
          </Link>
        }
      />

      <Card className="border-primary/20">
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services…"
              className="pl-9"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration (min)</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No services match your search.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="size-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.durationMinutes}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Select defaultValue={item.status}>
                        <SelectTrigger size="sm" className="w-28" aria-label="Service status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dashboard-scope">
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/services/${item.id}/edit`}
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          Edit
                        </Link>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
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
