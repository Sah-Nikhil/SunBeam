"use client"

import * as React from "react"

import { IconDashboard, IconFolder, IconInnerShadowTop, IconListDetails, IconSettings, IconProps } from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

// Define types for navigation items and user
interface NavItem {
  title: string;
  url: string;
  icon: React.FunctionComponent<IconProps>;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

const data: {
  user: User;
  navMain: NavItem[];
  navSecondary: NavItem[];
} = {
  user: {
    name: "V3SPER",
    email: "win@goat.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Library",
      url: "/library",
      icon: IconFolder,
    },
    {
      title: "Manage",
      url: "/manage",
      icon: IconListDetails,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/account",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
                >
                <div>
                    <IconInnerShadowTop className="!size-5" />
                    <span className="text-base font-semibold">Project SunBeam</span>
                </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser user={data.user} />
        </SidebarFooter>
        </Sidebar>
    )
}
