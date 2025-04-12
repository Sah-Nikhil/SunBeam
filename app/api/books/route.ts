import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import { z } from 'zod';
import { bookSchema } from '@/lib/validations/book';

// GET all books
export async function GET(req: NextRequest) {
  try {
    const books = await prisma.library.findMany({
      orderBy: { Book_Title: 'asc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books. Please try again later.' },
      { status: 500 }
    );
  }
}

// POST - Create new book
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = bookSchema.parse(body);

    // Ensure Book_ID is not included in the data
    const { Book_ID, ...dataWithoutID } = validatedData;

    const newBook = await prisma.library.create({
      data: {
        ...dataWithoutID,
        Year_Published: validatedData.Year_Published ?? null,
        Total_Copies: validatedData.Total_Copies,
        Available_Copies: validatedData.Available_Copies ?? validatedData.Total_Copies,
        Price: validatedData.Price ?? null,
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'A book with this title already exists.' },
        { status: 400 }
      );
    }
    console.error('Error creating book:', error);
    return NextResponse.json(
      { error: 'Failed to create book. Please try again later.' },
      { status: 500 }
    );
  }
}

// PUT - Update a book
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: 'Book ID is required.' }, { status: 400 });
    }

    const validatedData = bookSchema.partial().parse(rest);

    const updatedBook = await prisma.library.update({
      where: { Book_ID: parseInt(id) },
      data: {
        ...validatedData,
        Year_Published: validatedData.Year_Published
          ? (validatedData.Year_Published)
          : null,
        Total_Copies: validatedData.Total_Copies
          ? (validatedData.Total_Copies)
          : undefined,
        Available_Copies: validatedData.Available_Copies
          ? (validatedData.Available_Copies)
          : undefined,
        Price: validatedData.Price ? (validatedData.Price) : null,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Book not found.' }, { status: 404 });
    }
    console.error('Error updating book:', error);
    return NextResponse.json(
      { error: 'Failed to update book. Please try again later.' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a book by ID
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Book ID is required for deletion.' },
        { status: 400 }
      );
    }

    await prisma.library.delete({
      where: { Book_ID: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully.',
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Book not found.' }, { status: 404 });
    }
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { error: 'Failed to delete book. Please try again later.' },
      { status: 500 }
    );
  }
}
