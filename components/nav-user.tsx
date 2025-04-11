"use client"

import { IconLogout } from "@tabler/icons-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import { useRouter } from "next/navigation"

export function NavUser({
    user,
    }: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()
    const router = useRouter()

    const handleClick = () => {
        router.push('/login') // Navigate to login page
    }

    return (
        <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">V3</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                    </span>
                </div>
                <div
                className="px-4 py-[1rem] rounded-lg bg-zinc-50 dark:bg-zinc-900"
                onClick={handleClick}
                >
                    <IconLogout className="ml-auto size-4 " />
                </div>

                </SidebarMenuButton>
            </DropdownMenuTrigger>

            </DropdownMenu>
        </SidebarMenuItem>
        </SidebarMenu>
    )
}
