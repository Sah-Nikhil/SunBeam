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
import { AddEntryModal } from "@/components/add-entry-modal"

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
            <AddEntryModal
                endpoint="/api/library"
                fields={[
                    { name: 'title', label: 'Title', required: true },
                    { name: 'author', label: 'Author', required: true },
                    { name: 'series', label: 'Series'},
                    { name: 'publisher', label: 'Publisher'},
                    { name: 'isbn', label: 'ISBN',type: 'number'},
                    { name: 'genre', label: 'Genre'},
                    { name: 'language', label: 'Language'},
                    { name: 'Year_Published', label: 'Year Published', type: 'number' },
                    { name: 'Total_Copies', label: 'Total Copies', type: 'number', required: true },
                    { name: 'Available_Copies', label: 'Available Copies', type: 'number', required: true },
                    { name: 'Price____', label: 'Price ($)', type: 'number', step: '0.01' }
                ]}
                >
                    <SidebarMenuButton
                    tooltip="Quick Create"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                    >
                    <IconCirclePlusFilled />
                    <span>Quick Create</span>
                    </SidebarMenuButton>
                </AddEntryModal>

                {/* <Button
                size="icon"
                className="size-8 group-data-[collapsible=icon]:opacity-0"
                variant="outline"
                >
                <IconMail />
                <span className="sr-only">Inbox</span>
                </Button> */}
            </SidebarMenuItem>
            </SidebarMenu>
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
