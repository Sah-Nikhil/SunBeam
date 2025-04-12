"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconCirclePlusFilled } from "@tabler/icons-react"
import { BookForm } from "@/components/forms/BookForm"
import { BookFormValues } from "@/lib/validations/book"
import { Toaster } from "@/components/ui/sonner"

interface BookFormModalProps {
  initialData?: BookFormValues & { Book_ID?: number }
  trigger?: React.ReactNode
  title?: string
  description?: string
  children?: React.ReactNode
}

export function BookFormModal({
  initialData,
  trigger,
  title = "Add New Book",
  description = "Fill in the details to add a new book to the library."
}: BookFormModalProps) {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <IconCirclePlusFilled className="h-4 w-4" />
              <span>Quick Add</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <BookForm initialData={initialData} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" />
    </>
  )
}
