import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { prisma } from '@/lib/prisma';
import { LibraryTable } from '@/components/library-table';
import { columns, Book } from '@/components/library-columns';

// Fetch library data directly
async function getLibraryData(): Promise<Book[]> {
  try {
    return await prisma.library.findMany();
  } catch (error) {
    console.error("Failed to fetch library data:", error);
    return []; // Return empty array on error
  }
}

export default async function Page() {
  const libraryData: Book[] = await getLibraryData();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-4">Library Inventory</h1>
          <div className="flex-1 overflow-auto">
            {/* Pass fetched data and columns to the table component */}
            <LibraryTable columns={columns} data={libraryData} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
