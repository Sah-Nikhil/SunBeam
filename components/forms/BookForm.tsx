"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BookFormValues, bookSchema, defaultBookValues } from "@/lib/validations/book"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddBook, useUpdateBook } from "@/hooks/useBooks"

interface BookFormProps {
  initialData?: BookFormValues & { Book_ID?: number }
  onSuccess?: () => void
}

export function BookForm({ initialData, onSuccess }: BookFormProps) {
  const isEditing = !!initialData?.Book_ID

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData || defaultBookValues,
  })

  const { mutate: updateBook, isPending: isUpdatingBook } = useUpdateBook()
  const { mutate: addBook, isPending: isAddingBook, error } = useAddBook()
  const isPending = isAddingBook || isUpdatingBook

  function onSubmit(data: BookFormValues) {
    if (isEditing && initialData?.Book_ID) {
      updateBook(
        { id: initialData.Book_ID, data },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      // Exclude Book_ID when adding a new book
      const { Book_ID, ...newBookData } = data;
      addBook(newBookData, { onSuccess: () => onSuccess?.() });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Book_Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Series"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Series (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter series name" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter publisher name" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="Genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter genre" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter language" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="Year_Published"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Published (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter year"
                    {...field}
                    value={field.value || ''}
                    onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (USD) (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    {...field}
                    value={field.value || ''}
                    onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="Total_Copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter total copies"
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEditing ? "Update Book" : "Add Book"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
