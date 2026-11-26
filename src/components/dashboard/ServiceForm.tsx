"use client";

import Image from "next/image";
import { useState } from "react";

import { type Service } from "./mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const field =
  "h-10 border-border bg-background focus-visible:border-primary focus-visible:ring-primary/40";

export default function ServiceForm({
  initialService,
  idPrefix = "service",
}: {
  initialService?: Service;
  idPrefix?: string;
}) {
  const [category, setCategory] = useState(initialService?.category ?? "");
  const [status, setStatus] = useState(initialService?.status ?? "Active");

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Service details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${idPrefix}-name`}>Service name</Label>
              <Input
                id={`${idPrefix}-name`}
                className={field}
                placeholder="e.g. Classic Haircut"
                defaultValue={initialService?.name}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${idPrefix}-description`}>Description</Label>
              <Textarea
                id={`${idPrefix}-description`}
                className="min-h-24 border-border bg-background focus-visible:border-primary focus-visible:ring-primary/40"
                placeholder="Describe this service…"
                defaultValue={initialService?.description}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
                <SelectTrigger className={field}>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="dashboard-scope">
                  <SelectItem value="Haircut">Haircut</SelectItem>
                  <SelectItem value="Shave">Shave</SelectItem>
                  <SelectItem value="Styling">Styling</SelectItem>
                  <SelectItem value="Care">Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value ?? "Active")}>
                <SelectTrigger className={field}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dashboard-scope">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-price`}>Price ($)</Label>
              <Input
                id={`${idPrefix}-price`}
                type="number"
                min="1"
                step="0.01"
                className={field}
                placeholder="45"
                defaultValue={initialService?.price}
              />
              <p className="text-xs text-muted-foreground">Must be a positive number.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-duration`}>Estimated duration (minutes)</Label>
              <Input
                id={`${idPrefix}-duration`}
                type="number"
                min="1"
                className={field}
                placeholder="45"
                defaultValue={initialService?.durationMinutes}
              />
              <p className="text-xs text-muted-foreground">Must be a positive number.</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${idPrefix}-image`}>Service image</Label>
              {initialService && (
                <Image
                  src={initialService.image}
                  alt={initialService.name}
                  width={64}
                  height={64}
                  className="size-16 rounded-lg object-cover"
                />
              )}
              <label
                htmlFor={`${idPrefix}-image`}
                className="flex h-11 cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 text-sm text-muted-foreground transition hover:border-primary"
              >
                Choose an image to upload (JPG, PNG or WEBP)
              </label>
              <Input id={`${idPrefix}-image`} type="file" accept="image/*" className="hidden" />
              <p className="text-xs text-muted-foreground">
                Upload a file rather than pasting an image URL.
              </p>
            </div>
          </div>

          <Separator />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Reset
            </Button>
            <Button type="submit">
              {initialService ? "Save changes" : "Create service"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
