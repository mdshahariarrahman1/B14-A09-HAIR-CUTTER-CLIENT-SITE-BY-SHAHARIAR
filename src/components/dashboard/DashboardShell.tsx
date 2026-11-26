"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { signOut, useSession } from "@/lib/auth-client";
import { dashboardLabels, dashboardLinks, type DashboardRole } from "./config";

const LOGO = "/images/HairCutter-2.png";

function initialsOf(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

function Brand() {
  return (
    <Link href="/" className="flex h-12 items-center" aria-label="HairCutter home">
      <Image
        src={LOGO}
        alt="HairCutter Barber Shop"
        width={190}
        height={80}
        priority
        className="h-10 w-auto object-contain group-data-[collapsible=icon]:hidden"
      />
      <span className="hidden size-10 shrink-0 items-center overflow-hidden group-data-[collapsible=icon]:flex">
        <Image
          src={LOGO}
          alt="HairCutter"
          width={190}
          height={80}
          priority
          className="h-10 w-auto max-w-none"
        />
      </span>
    </Link>
  );
}

export default function DashboardShell({
  role,
  children,
}: {
  role: DashboardRole;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const name = user?.name || "Valued Customer";
  const image = user?.image ?? undefined;
  const links = dashboardLinks[role];

  // Only the most specific matching link is active, so a parent link like
  // /services doesn't also highlight on /services/new.
  const activeHref = links
    .filter(
      (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  const isActive = (href: string) => activeHref === href;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <TooltipProvider>
      <SidebarProvider className="dashboard-scope min-h-[calc(100svh-5rem)]">
        <Sidebar collapsible="icon" side="left" className="border-sidebar-border">
          <SidebarHeader>
            <Brand />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/50">
                {dashboardLabels[role]}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                          render={<Link href={link.href} />}
                          isActive={isActive(link.href)}
                          tooltip={{
                            children: link.label,
                            className: "dashboard-scope",
                          }}
                          className="font-heading"
                        >
                          <Icon className="size-4 shrink-0" />
                          <span>{link.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 px-1 group-data-[collapsible=icon]:justify-center">
              <Avatar className="size-9 shrink-0">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="bg-sidebar-primary font-bold text-sidebar-primary-foreground">
                  {initialsOf(name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="truncate text-xs text-sidebar-foreground/50">
                  {user?.email ?? "Signed in"}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Sign out"
                onClick={handleSignOut}
                className="shrink-0 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:hidden"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <div className="flex-1 p-4 lg:p-8">
            <div className="mb-4">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
