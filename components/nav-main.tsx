"use client"

import { useRouter } from 'next/navigation'
import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavMainProps {
    items: {
        title: string
        url: string
        icon?: Icon
    }[]
}

export function NavMain({ items }: NavMainProps) {
    const router = useRouter()

    const handleNavigation = (url: string) => {
        router.push(url)
    }

    return (
        <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
            </SidebarMenuItem>
            </SidebarMenu>
                <SidebarMenuButton
                        tooltip="Quick Create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                    >
                        <IconCirclePlusFilled />
                        <span>Quick Create</span>
                </SidebarMenuButton>
            <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title} onClick={() => handleNavigation(item.url)}>
                <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
    )
}
