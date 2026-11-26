"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/auth-client";

const field =
  "h-10 border-border bg-background focus-visible:border-primary focus-visible:ring-primary/40";

export default function ProfileForm() {
  const { data: session } = useSession();
  const user = session?.user;
  const [phone, setPhone] = useState("");
  const name = user?.name ?? "";
  const userRole = (user as { role?: string } | undefined)?.role;

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit border-primary/20">
        <CardHeader>
          <CardTitle>Profile photo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <Avatar className="size-24 ring-2 ring-primary/30">
            <AvatarImage src={user?.image ?? undefined} alt={name || "Profile"} />
            <AvatarFallback className="bg-primary/15 font-heading text-2xl font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">
            This preview comes from your signed-in account.
          </p>
          <label
            htmlFor="profile-photo"
            className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium transition hover:border-primary"
          >
            <Camera className="size-4" />
            Change photo
          </label>
          <Input id="profile-photo" type="file" accept="image/*" className="hidden" />
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Personal details</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            key={user?.id ?? "anonymous"}
            className="grid gap-5 sm:grid-cols-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full name</Label>
              <Input
                id="profile-name"
                className={field}
                defaultValue={name}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email address</Label>
              <Input
                id="profile-email"
                type="email"
                className={field}
                defaultValue={user?.email ?? ""}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone number</Label>
              <Input
                id="profile-phone"
                type="tel"
                className={field}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+880 1XX XXX XXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-role">Account type</Label>
              <Input
                id="profile-role"
                className={field}
                value={userRole === "admin" ? "Admin" : "Customer"}
                readOnly
              />
            </div>
            <div className="flex justify-end gap-3 pt-2 sm:col-span-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
