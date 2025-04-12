import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { BookFormValues } from '@/lib/validations/book'

// Fetch all books
export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await fetch('/api/books')
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      return response.json()
    },
  })
}

// Add a new book
export function useAddBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (book: BookFormValues) => {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add book')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Book added successfully')
    },
    onError: (error) => {
      toast.error(`Error adding book: ${error.message}`)
    },
  })
}

// Update a book
export function useUpdateBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<BookFormValues> }) => {
      const response = await fetch('/api/books', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update book')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Book updated successfully')
    },
    onError: (error) => {
      toast.error(`Error updating book: ${error.message}`)
    },
  })
}

// Delete a book
export function useDeleteBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/books?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete book')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Book deleted successfully')
    },
    onError: (error) => {
      toast.error(`Error deleting book: ${error.message}`)
    },
  })
}
