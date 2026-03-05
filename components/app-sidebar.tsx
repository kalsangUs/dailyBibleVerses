"use client";

import { BookOpenIcon, BookmarkIcon, HeartIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Discover", href: "/", icon: BookOpenIcon },
  { title: "Saved", href: "/saved", icon: BookmarkIcon },
  { title: "Liked", href: "/liked", icon: HeartIcon },
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = useQuery(api.users.me);
  const { signOut } = useAuthActions();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Bible Quotes</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <div className="flex items-center justify-between gap-2 px-2 py-1">
            <span className="text-sm truncate">{user.name ?? user.email}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void signOut()}
            >
              <LogOutIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="px-2 py-1">
            <Link href="/signin" className="text-sm text-muted-foreground hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
