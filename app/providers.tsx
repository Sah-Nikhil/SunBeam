"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools" // Optional but recommended for development
import { useState, ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} /> {/* Optional: adds the dev tools */}
    </QueryClientProvider>
  )
}
