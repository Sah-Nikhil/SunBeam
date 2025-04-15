"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ManageBookCard } from "@/components/manage-book-card"
import { Book } from "@/components/library-columns"
import { fetchBooks } from "@/lib/axios-helpers"
import { Skeleton } from "@/components/ui/skeleton" // For loading state
import { toast } from "sonner"
import axios from "axios"

const ITEMS_PER_PAGE = 12; // Number of cards per page

export default function ManagePage() {
  const [allBooks, setAllBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters and Search State
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedSeries, setSelectedSeries] = useState<string>("all")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)

  // Fetch initial data
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchBooks()
        setAllBooks(data)
        setFilteredBooks(data) // Initially show all books
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError('Unknown error');
        }
        toast.error("Failed to load library data.")
      } finally {
        setIsLoading(false)
      }
    }
    loadBooks()
  }, [])

  // Memoized filter options
  const authors = useMemo(() => ["all", ...new Set(allBooks.map(b => b.Author).filter(Boolean))], [allBooks])
  // Filter out null values from genres
  const genres = useMemo(() => ["all", ...new Set(allBooks.map(b => b.Genre).filter((genre): genre is string => Boolean(genre)))], [allBooks])
  // Filter out null values from series
  const series = useMemo(() => ["all", ...new Set(allBooks.map(b => b.Series).filter((series): series is string => Boolean(series)))], [allBooks])

  // Apply filters and search whenever dependencies change
  useEffect(() => {
    let books = [...allBooks]

    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      books = books.filter(book =>
        book.Book_Title.toLowerCase().includes(lowerSearchTerm) ||
        book.Author.toLowerCase().includes(lowerSearchTerm) ||
        book.Genre?.toLowerCase().includes(lowerSearchTerm) ||
        book.Series?.toLowerCase().includes(lowerSearchTerm)
      )
    }

    // Apply filters
    if (selectedAuthor !== "all") {
      books = books.filter(book => book.Author === selectedAuthor)
    }
    if (selectedGenre !== "all") {
      books = books.filter(book => book.Genre === selectedGenre)
    }
    if (selectedSeries !== "all") {
      books = books.filter(book => book.Series === selectedSeries)
    }

    setFilteredBooks(books)
    setCurrentPage(1) // Reset to first page on filter change
  }, [searchTerm, selectedAuthor, selectedGenre, selectedSeries, allBooks])

  // Paginate filtered books
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredBooks.slice(startIndex, endIndex)
  }, [filteredBooks, currentPage])

  // Handler to update book list state when a card updates its data
  const handleBookUpdate = (updatedBook: Book) => {
    setAllBooks(prevBooks =>
      prevBooks.map(b => b.Book_ID === updatedBook.Book_ID ? updatedBook : b)
    );
    // No need to manually update filteredBooks here, the useEffect will handle it
    // when allBooks changes.
  };

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
        <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
          <h1 className="text-2xl font-semibold">Manage Inventory</h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by title, author, genre, series..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map(author => (
                  <SelectItem key={author} value={author}>{author === 'all' ? 'All Authors' : author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre === 'all' ? 'All Genres' : genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             <Select value={selectedSeries} onValueChange={setSelectedSeries}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Series" />
              </SelectTrigger>
              <SelectContent>
                {series.map(s => (
                  <SelectItem key={s} value={s}>{s === 'all' ? 'All Series' : s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Book Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                 <Skeleton key={index} className="w-[300px] h-[250px] rounded-xl" />
              ))}
            </div>
          ) : error ? (
             <div className="text-red-600">{error}</div>
          ) : filteredBooks.length === 0 ? (
             <div className="text-center text-muted-foreground py-10">No books found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {paginatedBooks.map((book) => (
                <ManageBookCard key={book.Book_ID} book={book} onUpdate={handleBookUpdate} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
