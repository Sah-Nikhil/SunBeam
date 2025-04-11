import api from '@/lib/axios'

// GET all books
export const fetchBooks = async () => {
  const response = await api.get('/library')
  return response.data
}

// POST new book
export const addBook = async (bookData: any) => {
  const response = await api.post('/library', bookData)
  return response.data
}

// DELETE book by ID
export const deleteBook = async (Book_ID: string | number) => {
  const response = await api.delete('/library', {
    data: { Book_ID },
  })
  return response.data
}

// PATCH: update Available_Copies by delta
export const updateAvailableCopies = async (Book_Title: string, delta: number) => {
  const response = await api.patch('/library', {
    Book_Title,
    delta,
  })
  return response.data
}
