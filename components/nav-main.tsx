"use client"

import { useRouter } from 'next/navigation'
import { type Icon } from "@tabler/icons-react"
import { CreateBookModal } from './create-book-modal'; // Import the modal component

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

    const handleBookCreated = () => {
        // Optional: Add logic here if you need to refresh data
        // in the NavMain component after a book is created.
        console.log("Book created callback in NavMain");
    }

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                {/* Render the modal component directly (it has its own trigger) */}
                <CreateBookModal onBookCreated={handleBookCreated} />

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
