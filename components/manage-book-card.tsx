"use client"

import * as React from "react"
import { useState } from "react"
import { Book } from "@/components/library-columns" // Assuming Book type is exported from library-columns
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { updateBook } from "@/lib/axios-helpers"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog" // For confirmation
import { Minus, Plus } from "lucide-react"

interface ManageBookCardProps {
  book: Book
  onUpdate: (updatedBook: Book) => void // Callback to update the parent state
}

export function ManageBookCard({ book, onUpdate }: ManageBookCardProps) {
  const [availableCopies, setAvailableCopies] = useState(book.Available_Copies)
  const [totalCopies, setTotalCopies] = useState(book.Total_Copies)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async (newAvailable: number, newTotal?: number) => {
    setIsLoading(true)
    const validatedAvailableCopies = Number.isNaN(newAvailable) ? 0 : newAvailable;
    const validatedTotalCopies = newTotal !== undefined && Number.isNaN(newTotal) ? 0 : newTotal;

    const updatedData: Partial<Book> & { Book_ID: number } = {
      Book_ID: book.Book_ID,
      Available_Copies: validatedAvailableCopies,
      Total_Copies: totalCopies, // Always include total copies
      Year_Published: book.Year_Published, // Always include year published
      Price: book.Price, // Always include price
    };
    if (newTotal !== undefined) {
      updatedData.Total_Copies = validatedTotalCopies;
    }

    try {
      const updatedBookData = await updateBook(updatedData)
      setAvailableCopies(updatedBookData.Available_Copies)
      if (newTotal !== undefined) {
        setTotalCopies(updatedBookData.Total_Copies)
      }
      onUpdate(updatedBookData) // Notify parent component
      toast.success(`Copies updated for "${book.Book_Title}"`)
    } catch (error: any) {
      console.error("Failed to update book:", error)
      toast.error(error.response?.data?.error || "Failed to update copies.")
      // Revert optimistic update if needed, though we update state after success here
      setAvailableCopies(book.Available_Copies) // Revert on error
      if (newTotal !== undefined) setTotalCopies(book.Total_Copies)
    } finally {
      setIsLoading(false)
    }
  }

  const handleIncrement = () => {
    const newAvailable = availableCopies + 1
    if (newAvailable > totalCopies) {
      setIsConfirmDialogOpen(true) // Ask for confirmation
    } else {
      handleUpdate(newAvailable)
    }
  }

  const handleDecrement = () => {
    if (availableCopies > 0) {
      handleUpdate(availableCopies - 1, totalCopies)
    }
  }

  const confirmAddCopyToTotal = () => {
    const newAvailable = availableCopies + 1
    const newTotal = totalCopies + 1
    handleUpdate(newAvailable, newTotal)
    setIsConfirmDialogOpen(false)
  }

  const cancelAddCopyToTotal = () => {
     // Optionally update only available copies up to the current total if desired,
     // but current logic prevents incrementing beyond total without confirmation.
     // If we wanted to allow incrementing available up to total without confirmation:
     // if (availableCopies < totalCopies) {
     //   handleUpdate(availableCopies + 1);
     // }
    setIsConfirmDialogOpen(false)
  }


  return (
    <Card className="w-[16rem] h-[12.5rem] flex flex-col justify-between"> {/* Fixed dimensions */}
      <CardHeader>
        <CardTitle className="text-lg truncate" title={book.Book_Title}>{book.Book_Title}</CardTitle>
        <p className="text-sm text-muted-foreground truncate" title={book.Author}>{book.Author}</p>
        <p className="text-xs text-muted-foreground truncate" title={book.Genre ?? undefined}>{book.Genre || "N/A"}</p>
      </CardHeader>
      <CardContent>
        {/* Add more content here if needed */}
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2">
        <span className="text-sm text-muted-foreground">Available:</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleDecrement}
          disabled={availableCopies <= 0 || isLoading}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-semibold w-6 text-center">{availableCopies}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={handleIncrement}
          disabled={isLoading} // Disable only during loading, confirmation handles > total
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>

      {/* Confirmation Dialog */}
       <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm New Copy</DialogTitle>
            <DialogDescription>
              Increasing available copies beyond the total ({totalCopies}). Do you want to add a new copy to the library, increasing the total as well?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelAddCopyToTotal}>Cancel</Button>
            <Button onClick={confirmAddCopyToTotal}>Yes, Add New Copy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
