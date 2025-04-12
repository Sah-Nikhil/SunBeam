"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createBook } from '@/lib/axios-helpers';
import { toast } from "sonner"
import axios from 'axios';
import { SidebarMenuButton } from "@/components/ui/sidebar" // Import SidebarMenuButton
import { IconCirclePlusFilled } from "@tabler/icons-react" // Import Icon

interface CreateBookModalProps {
    // children prop removed
    onBookCreated?: () => void; // Optional callback after successful creation
}

export function CreateBookModal({ onBookCreated }: CreateBookModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const initialFormData = {
        Book_Title: '',
        Author: '',
        Series: '',
        Publisher: '',
        Genre: '',
        Language: '',
        Year_Published: '',
        Total_Copies: '1',
        Available_Copies: '1',
        Price: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await createBook(formData);
            toast.success("Book created successfully!")
            setIsOpen(false);
            setFormData(initialFormData); // Reset form
            onBookCreated?.(); // Call the callback if provided
        } catch (error) {
            console.error('Failed to create book:', error);
            // Attempt to parse server error message
            let errorMessage = "Failed to create book. Please try again.";
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage)
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger defined internally, removed asChild */}
            <DialogTrigger asChild={false}>
                 <SidebarMenuButton
                    tooltip="Quick Create"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                 >
                    <IconCirclePlusFilled />
                    <span>Quick Create</span>
                 </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Book</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Form Inputs - Copied from nav-main.tsx */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Book_Title" className="text-right">Title</Label>
                        <Input id="Book_Title" name="Book_Title" value={formData.Book_Title} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Author" className="text-right">Author</Label>
                        <Input id="Author" name="Author" value={formData.Author} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Series" className="text-right">Series</Label>
                        <Input id="Series" name="Series" value={formData.Series} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Publisher" className="text-right">Publisher</Label>
                        <Input id="Publisher" name="Publisher" value={formData.Publisher} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Genre" className="text-right">Genre</Label>
                        <Input id="Genre" name="Genre" value={formData.Genre} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Language" className="text-right">Language</Label>
                        <Input id="Language" name="Language" value={formData.Language} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Year_Published" className="text-right">Year Published</Label>
                        <Input id="Year_Published" name="Year_Published" type="number" value={formData.Year_Published} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Total_Copies" className="text-right">Total Copies</Label>
                        <Input id="Total_Copies" name="Total_Copies" type="number" value={formData.Total_Copies} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Available_Copies" className="text-right">Available Copies</Label>
                        <Input id="Available_Copies" name="Available_Copies" type="number" value={formData.Available_Copies} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Price" className="text-right">Price (USD)</Label>
                        <Input id="Price" name="Price" type="number" step="0.01" value={formData.Price} onChange={handleInputChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Create Book</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
