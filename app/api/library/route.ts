import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fixBigInts } from '@/lib/utils/fixBigInts';

// GET all books
export async function GET() {
  try {
    const books = await prisma.library.findMany({
      orderBy: { Book_Title: 'asc' },
    });
    return NextResponse.json(fixBigInts(books));
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books. Please try again later.' },
      { status: 500 }
    );
  }
}

// POST - Create a new book
export async function POST(req: NextRequest) {
  console.log('POST /api/library request received');
  try {
    const body = await req.json();
    console.log('Request Body:', body);

    // Validate and parse numeric fields more robustly
    const yearPublished = body.Year_Published && body.Year_Published !== '' ? parseInt(body.Year_Published) : null;
    const totalCopies = body.Total_Copies && body.Total_Copies !== '' ? parseInt(body.Total_Copies) : NaN;
    const availableCopies = body.Available_Copies && body.Available_Copies !== '' ? parseInt(body.Available_Copies) : NaN;
    const price = body.Price && body.Price !== '' ? parseFloat(body.Price) : null;

    // Basic validation example (you might want more comprehensive validation)
    if (isNaN(totalCopies) || isNaN(availableCopies)) {
        console.error('Validation Error: Invalid number for copies', { totalCopies, availableCopies }); // Added log
        return NextResponse.json(
            { error: 'Total Copies and Available Copies must be valid numbers.' },
            { status: 400 }
          );
    }
    if (price !== null && isNaN(price)) {
        console.error('Validation Error: Invalid number for price', { price }); // Added log
        return NextResponse.json(
            { error: 'Price must be a valid number or empty.' },
            { status: 400 }
          );
    }
    if (yearPublished !== null && isNaN(yearPublished)) {
        console.error('Validation Error: Invalid number for year published', { yearPublished }); // Added log
        return NextResponse.json(
            { error: 'Year Published must be a valid number or empty.' },
            { status: 400 }
          );
    }

    // Construct the data object explicitly, excluding Book_ID
    const data = {
      Book_Title: body.Book_Title,
      Author: body.Author,
      Series: body.Series,
      Publisher: body.Publisher,
      Genre: body.Genre,
      Language: body.Language,
      Year_Published: yearPublished, // Use the parsed value
      Total_Copies: totalCopies,     // Use the parsed value
      Available_Copies: availableCopies, // Use the parsed value
      Price: price,                 // Use the parsed value
    };
    console.log('Data prepared for Prisma (excluding Book_ID):', data); // Added log

    const newBook = await prisma.library.create({
      data,
    });
    console.log('Book created successfully:', newBook); // Added log
    return NextResponse.json(fixBigInts(newBook), { status: 201 });
  } catch (error) {
    console.error('Error creating book in POST /api/library:', error); // Enhanced log
    // Provide more specific error feedback if possible
    let errorMessage = 'Failed to create book. Please try again later.';
    if (error instanceof Error) {
        // Check for specific Prisma errors if needed
        errorMessage = `Failed to create book: ${error.message}`;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update a book
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming PUT request payload:', body);
    const { Book_ID, ...rest } = body;

    if (!Book_ID) {
      return NextResponse.json({ error: 'Book_ID is required' }, { status: 400 });
    }

    // Ensure numeric fields are correctly typed and validated
    const yearPublished = rest.Year_Published ? parseInt(rest.Year_Published) : null;
    const totalCopies = rest.Total_Copies ? parseInt(rest.Total_Copies) : NaN;
    const availableCopies = rest.Available_Copies ? parseInt(rest.Available_Copies) : NaN;
    const price = rest.Price ? parseFloat(rest.Price) : null;

    // Basic validation example
    if (isNaN(totalCopies) || isNaN(availableCopies)) {
        return NextResponse.json(
            { error: 'Total Copies and Available Copies must be valid numbers.' },
            { status: 400 }
          );
    }
    if (price !== null && isNaN(price)) {
        return NextResponse.json(
            { error: 'Price must be a valid number or empty.' },
            { status: 400 }
          );
    }
    if (yearPublished !== null && isNaN(yearPublished)) {
        return NextResponse.json(
            { error: 'Year Published must be a valid number or empty.' },
            { status: 400 }
          );
    }

    const data = {
      ...rest,
      Year_Published: yearPublished,
      Total_Copies: totalCopies,
      Available_Copies: availableCopies,
      Price: price,
    };

    const updatedBook = await prisma.library.update({
      where: { Book_ID: parseInt(Book_ID) }, // Assuming Book_ID is always a valid integer string from client
      data,
    });
    return NextResponse.json(fixBigInts(updatedBook));
  } catch (error) {
    console.error('Error updating book:', error);
    let errorMessage = 'Failed to update book. Please try again later.';
    if (error instanceof Error) {
        errorMessage = `Failed to update book: ${error.message}`;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete a book
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const Book_ID_Str = searchParams.get('Book_ID');

    if (!Book_ID_Str) {
      return NextResponse.json({ error: 'Book_ID is required' }, { status: 400 });
    }

    const Book_ID = parseInt(Book_ID_Str);
    if (isNaN(Book_ID)) {
      return NextResponse.json({ error: 'Book_ID must be a valid number.' }, { status: 400 });
    }

    await prisma.library.delete({
      where: { Book_ID: Book_ID },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting book:', error);
    let errorMessage = 'Failed to delete book. Please try again later.';
    if (error instanceof Error) {
        errorMessage = `Failed to delete book: ${error.message}`;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
